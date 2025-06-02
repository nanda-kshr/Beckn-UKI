# **UKI Implementation Guide \- Soil Testing**

## **Introduction**

This document provides material that helps network participants build and integrate their application with the Beckn Network for Soil Testing services. This document is part of the starter kit that provides information about the use case of “Soil Testing” in the Unified Krishi Interface (UKI) domain.

The use case involves farmers discovering and booking soil testing services from certified laboratories, with options for sample collection, testing, and advisory recommendations through the UKI network powered by Beckn Protocol.

## **Structure of the document**

This document has the following parts:

1. BAP-BPP Roles and Entity Mapping \- This section defines the roles of different participants in the soil testing ecosystem  
2. Outcome Visualization \- This is a pictorial or descriptive representation of the different use cases that are supported by the network  
3. Flow diagrams \- This section provides a pictorial representation of the message flows that happen during the use case  
4. API Calls and Schema \- This section provides details on the API calls and the schema of the message that is sent in the form of sample schemas  
5. Taxonomy and layer 2 configuration \- This section provides details on the taxonomy, enumerations and any rules defined for either the use case or by the network  
6. Notes on writing/integrating with your own software \- This section describes ways in which you can integrate (Becknify) your new or existing software  
7. Links to downloadable resources \- This section contains the downloadable files referenced in this document

## **BAP-BPP Roles and Entity Mapping**

### **Network Participants**

#### **Entities Involved:**

1. **Farmer** \- Service seeker who needs soil testing services  
2. **Soil Testing Laboratory** \- Certified lab that provides soil analysis services  
3. **Collection Agent** \- Field agent who collects soil samples from farm locations  
4. **Advisory Service Provider** \- Agricultural experts who provide recommendations based on soil test results  
5. **Aggregator Platform** \- Technology platform that aggregates multiple soil testing services

#### 

#### 

#### **BAP-BPP Role Mapping:**

**BAP (Beckn Application Platform) \- Farmer Side:**

* **Farmer Mobile App/Portal**: Interface used by farmers to discover and book soil testing services  
* **Agricultural Advisory Platform**: Apps that help farmers with farm management and need soil testing integration  
* **Government Extension Services**: Digital platforms used by agricultural extension officers

**BPP (Beckn Provider Platform) \- Service Provider Side:**

* **Soil Testing Laboratory Platform**: Digital platform of certified soil testing labs  
* **Agricultural Service Aggregator**: Platform that aggregates multiple soil testing services and collection agents  
* **Integrated Farm Service Provider**: Companies providing end-to-end agricultural services including soil testing

### **Network Architecture**

![image1](https://raw.githubusercontent.com/nanda-kshr/Beckn-UKI/5e143fb2c8cc026e98d7783bca57a6119dc03d14/local/images/bigpicture.png)

## 

## 

## 

## 

## 

## 

## 

## 

## **Outcome Visualisation**

### **Use case \- Discovery and Booking of Soil Testing Services**

**Scenario: Ravi’s Soil Testing Journey**

1. **Ravi**, a cotton farmer from Wardha, Maharashtra, notices declining crop yields and suspects soil nutrient deficiency. He wants to get his soil tested to understand fertilizer requirements.  
2. Using a **UKI-enabled farmer app**, Ravi searches for soil testing services by entering:  
   * **Location**: His farm coordinates or village name  
   * **Test Type**: NPK analysis, pH testing, micronutrient analysis  
   * **Collection Method**: Home pickup or drop-off at lab  
   * **Budget**: Maximum amount he’s willing to spend  
3. The app shows him **multiple service providers**:  
   * **AgriLab Solutions**: NPK \+ Micronutrients @ ₹500, 4.2 rating, pickup available  
   * **SoilCare Labs**: Comprehensive analysis @ ₹750, 4.6 rating, pickup in 2 days  
   * **FarmTest Services**: Basic NPK @ ₹300, 4.0 rating, self drop-off  
4. Ravi selects **SoilCare Labs** for comprehensive testing and chooses **home pickup** option.  
5. He provides:  
   * **Personal details**: Name, contact number  
   * **Farm location**: GPS coordinates and address  
   * **Preferred collection time**: Morning between 9-11 AM  
   * **Payment method**: Cash on delivery  
6. **Order confirmation** received with:  
   * Order ID: SOIL001234  
   * Collection agent: Rajesh Kumar (Contact: 9876543210\)  
   * Expected collection: Tomorrow 10 AM  
   * Test results: Within 3-5 working days  
7. **Collection day**: Rajesh arrives, collects soil samples from 5 different spots as per protocol, provides receipt  
8. **Testing phase**: Ravi receives SMS updates \- “Sample received”, “Testing in progress”, “Results ready”  
9. **Results delivery**: Digital report sent via app/SMS with:  
   * Soil nutrient status (NPK levels, pH, organic matter)  
   * Deficiency analysis  
   * **Fertilizer recommendations** with quantities  
   * **Crop suggestions** for his soil type  
10. **Post-fulfillment**: Ravi rates the service and can access advisory support for implementing recommendations

## 

## 

## 

## 

## **Flow diagram**

### **General Beckn message flow and error handling**

This section is relevant to all the message flows illustrated below and discussed further in the document.

Beckn is an asynchronous protocol at its core.

* When a network participant(NP1) sends a message to another participant(NP2), the other participant(NP2) immediately returns back an ACK/NACK(Acknowledgement or Negative Acknowledgement in case of error)  
* An ACK is an indicator that the receiving participant(NP2) will process this message and dispatch an on\_xxxxxx message to original NP (NP1)  
* Subsequently after processing the message NP2 sends back the real response in the corresponding on\_xxxxxx message, to which again the first participant(NP1)  
* This message can contain a message field (for success) or error field (for failure)  
* NP1 when it receives the on\_xxxxxx message, sends back an ACK/NACK (Here in both the cases NP1 will not send any subsequent message)  
* In the Use case diagrams, this ACK/NACK is not illustrated explicitly to keep the diagrams crisp  
* However when writing software we should be prepared to receive these NACK messages as well as error field in the on\_xxxxxx messages

**Structure of a message with a NACK**

{  
    "message": {  
        "ack": {  
            "status": "NACK"  
        }  
    },  
    "error": {  
        "code": 400,  
        "message": "OpenApiValidator Error at BAP-CLIENT"  
    }  
}

**Structure of a on\_select message with an error**

{  
    "context": {  
        "action": "on\_select",  
        "version": "1.1.0"  
    },  
    "error": {  
        "code": 30001,  
        "message": "Requested provider is not in the database"  
    }  
}

### **DOFP Flow for Soil Testing**

#### **Discovery Phase**

Farmer → search → UKI Gateway → BPP (Labs)  
Farmer ← on\_search ← UKI Gateway ← BPP (Labs)

#### **Order Phase**

Farmer → select → UKI Gateway → BPP (Selected Lab)  
Farmer ← on\_select ← UKI Gateway ← BPP (Quote)  
Farmer → init → UKI Gateway → BPP (Customer Details)  
Farmer ← on\_init ← UKI Gateway ← BPP (Payment Terms)  
Farmer → confirm → UKI Gateway → BPP (Final Order)  
Farmer ← on\_confirm ← UKI Gateway ← BPP (Order ID)

#### **Fulfillment Phase**

Farmer → status → UKI Gateway → BPP (Track Order)  
Farmer ← on\_status ← UKI Gateway ← BPP (Updates)  
\[Agent Collection, Lab Testing, Result Generation\]

#### **Post-Fulfillment Phase**

Farmer → rating → UKI Gateway → BPP (Rate Service)  
Farmer ← on\_rating ← UKI Gateway ← BPP (Feedback Form)  
Farmer → support → UKI Gateway → BPP (Help Request)  
Farmer ← on\_support ← UKI Gateway ← BPP (Support Details)

## **API Calls and Schema**

### **Discovery of Soil Testing Services**

#### **search**

**Search by test type and location**

{  
  "context": {  
    "domain": "services:uki",  
    "action": "search",  
    "location": {  
      "country": {  
        "name": "India",  
        "code": "IND"  
      },  
      "city": {  
        "name": "Wardha",  
        "code": "std:07152"  
      }  
    },  
    "version": "1.1.0",  
    "bap\_id": "farmer-app.uki.com",  
    "bap\_uri": "https://farmer-app.uki.com",  
    "transaction\_id": "soil-test-001",  
    "message\_id": "msg-001",  
    "timestamp": "2025-06-02T19:07:25Z"  
  },  
  "message": {  
    "intent": {  
      "category": {  
        "descriptor": {  
          "code": "soil-testing"  
        }  
      },  
      "item": {  
        "descriptor": {  
          "name": "NPK soil analysis"  
        },  
        "tags": \[  
          {  
            "descriptor": {  
              "name": "test-parameters"  
            },  
            "list": \[  
              {  
                "descriptor": {  
                  "code": "nitrogen"  
                },  
                "value": "required"  
              },  
              {  
                "descriptor": {  
                  "code": "phosphorus"  
                },  
                "value": "required"  
              },  
              {  
                "descriptor": {  
                  "code": "potassium"  
                },  
                "value": "required"  
              },  
              {  
                "descriptor": {  
                  "code": "ph-level"  
                },  
                "value": "required"  
              }  
            \]  
          }  
        \]  
      },  
      "fulfillment": {  
        "stops": \[  
          {  
            "type": "collection-location",  
            "location": {  
              "gps": "20.7489, 78.6085",  
              "address": "Village Karanja, Wardha District"  
            }  
          }  
        \]  
      }  
    }  
  }  
}

**Search with price filter and collection preference**

{  
  "context": {  
    "domain": "services:uki",  
    "action": "search",  
    "location": {  
      "country": {  
        "name": "India",  
        "code": "IND"  
      },  
      "city": {  
        "name": "Wardha",  
        "code": "std:07152"  
      }  
    },  
    "version": "1.1.0",  
    "bap\_id": "farmer-app.uki.com",  
    "bap\_uri": "https://farmer-app.uki.com",  
    "transaction\_id": "soil-test-002",  
    "message\_id": "msg-002",  
    "timestamp": "2025-06-02T19:07:25Z"  
  },  
  "message": {  
    "intent": {  
      "category": {  
        "descriptor": {  
          "code": "soil-testing"  
        }  
      },  
      "item": {  
        "price": {  
          "currency": "INR",  
          "maximum\_value": "800"  
        }  
      },  
      "fulfillment": {  
        "type": "home-collection",  
        "stops": \[  
          {  
            "type": "collection-location",  
            "location": {  
              "circle": {  
                "gps": "20.7489, 78.6085",  
                "radius": {  
                  "unit": "km",  
                  "value": "15"  
                }  
              }  
            },  
            "time": {  
              "range": {  
                "start": "2025-06-03T09:00:00Z",  
                "end": "2025-06-05T18:00:00Z"  
              }  
            }  
          }  
        \]  
      }  
    }  
  }  
}

#### **on\_search**

**Catalog response with multiple lab services**

{  
  "context": {  
    "domain": "services:uki",  
    "action": "on\_search",  
    "location": {  
      "country": {  
        "name": "India",  
        "code": "IND"  
      },  
      "city": {  
        "name": "Wardha",  
        "code": "std:07152"  
      }  
    },  
    "version": "1.1.0",  
    "bap\_id": "farmer-app.uki.com",  
    "bap\_uri": "https://farmer-app.uki.com",  
    "bpp\_id": "soil-lab-network.com",  
    "bpp\_uri": "https://soil-lab-network.com",  
    "transaction\_id": "soil-test-001",  
    "message\_id": "msg-001",  
    "timestamp": "2025-06-02T19:07:25Z"  
  },  
  "message": {  
    "catalog": {  
      "descriptor": {  
        "name": "Soil Testing Services"  
      },  
      "providers": \[  
        {  
          "id": "agrilab-solutions",  
          "descriptor": {  
            "name": "AgriLab Solutions",  
            "short\_desc": "NABL certified soil testing laboratory",  
            "long\_desc": "Leading agricultural testing laboratory with 15 years experience in soil, water and plant analysis",  
            "images": \[  
              {  
                "url": "https://agrilab-solutions.com/logo.png"  
              }  
            \]  
          },  
          "rating": "4.2",  
          "categories": \[  
            {  
              "id": "c1",  
              "descriptor": {  
                "code": "soil-testing",  
                "name": "Soil Testing Services"  
              }  
            }  
          \],  
          "fulfillments": \[  
            {  
              "id": "f1",  
              "type": "home-collection"  
            },  
            {  
              "id": "f2",  
              "type": "drop-off"  
            }  
          \],  
          "locations": \[  
            {  
              "id": "lab-wardha",  
              "gps": "20.7489, 78.6085",  
              "address": "AgriLab Solutions, MIDC Area, Wardha",  
              "city": {  
                "name": "Wardha"  
              },  
              "state": {  
                "name": "Maharashtra"  
              }  
            }  
          \],  
          "items": \[  
            {  
              "id": "npk-micro-test",  
              "descriptor": {  
                "name": "NPK \+ Micronutrients Analysis",  
                "short\_desc": "Complete soil fertility analysis including macro and micro nutrients",  
                "long\_desc": "Comprehensive soil test covering Nitrogen, Phosphorus, Potassium, pH, Organic Carbon, and essential micronutrients (Zn, Fe, Mn, Cu, B, S)",  
                "images": \[  
                  {  
                    "url": "https://agrilab-solutions.com/soil-test.jpg"  
                  }  
                \]  
              },  
              "price": {  
                "currency": "INR",  
                "value": "500"  
              },  
              "category\_ids": \["c1"\],  
              "fulfillment\_ids": \["f1", "f2"\],  
              "location\_ids": \["lab-wardha"\],  
              "time": {  
                "label": "Report delivery time",  
                "duration": "P3D"  
              },  
              "tags": \[  
                {  
                  "descriptor": {  
                    "name": "test-parameters"  
                  },  
                  "list": \[  
                    {  
                      "descriptor": {  
                        "code": "nitrogen",  
                        "name": "Available Nitrogen"  
                      },  
                      "value": "included"  
                    },  
                    {  
                      "descriptor": {  
                        "code": "phosphorus",  
                        "name": "Available Phosphorus"  
                      },  
                      "value": "included"  
                    },  
                    {  
                      "descriptor": {  
                        "code": "potassium",  
                        "name": "Available Potassium"  
                      },  
                      "value": "included"  
                    },  
                    {  
                      "descriptor": {  
                        "code": "ph-level",  
                        "name": "Soil pH"  
                      },  
                      "value": "included"  
                    },  
                    {  
                      "descriptor": {  
                        "code": "organic-carbon",  
                        "name": "Organic Carbon"  
                      },  
                      "value": "included"  
                    },  
                    {  
                      "descriptor": {  
                        "code": "micronutrients",  
                        "name": "Zn, Fe, Mn, Cu, B, S"  
                      },  
                      "value": "included"  
                    }  
                  \]  
                },  
                {  
                  "descriptor": {  
                    "name": "certifications"  
                  },  
                  "list": \[  
                    {  
                      "descriptor": {  
                        "code": "nabl-certified"  
                      },  
                      "value": "yes"  
                    },  
                    {  
                      "descriptor": {  
                        "code": "iso-certified"  
                      },  
                      "value": "ISO 17025"  
                    }  
                  \]  
                }  
              \]  
            }  
          \]  
        },  
        {  
          "id": "soilcare-labs",  
          "descriptor": {  
            "name": "SoilCare Labs",  
            "short\_desc": "Advanced soil analysis with AI-powered recommendations",  
            "long\_desc": "Modern laboratory using latest technology for precise soil analysis and AI-driven crop recommendations",  
            "images": \[  
              {  
                "url": "https://soilcare-labs.com/logo.png"  
              }  
            \]  
          },  
          "rating": "4.6",  
          "categories": \[  
            {  
              "id": "c1",  
              "descriptor": {  
                "code": "soil-testing",  
                "name": "Soil Testing Services"  
              }  
            }  
          \],  
          "fulfillments": \[  
            {  
              "id": "f1",  
              "type": "home-collection"  
            }  
          \],  
          "locations": \[  
            {  
              "id": "lab-nagpur",  
              "gps": "21.1458, 79.0882",  
              "address": "SoilCare Labs, Tech Park, Nagpur",  
              "city": {  
                "name": "Nagpur"  
              },  
              "state": {  
                "name": "Maharashtra"  
              }  
            }  
          \],  
          "items": \[  
            {  
              "id": "comprehensive-analysis",  
              "descriptor": {  
                "name": "Comprehensive Soil Analysis \+ Advisory",  
                "short\_desc": "Complete soil testing with personalized crop recommendations",  
                "long\_desc": "Advanced soil analysis including all macro/micro nutrients, physical properties, and AI-powered fertilizer recommendations with crop advisory",  
                "images": \[  
                  {  
                    "url": "https://soilcare-labs.com/comprehensive-test.jpg"  
                  }  
                \]  
              },  
              "price": {  
                "currency": "INR",  
                "value": "750"  
              },  
              "category\_ids": \["c1"\],  
              "fulfillment\_ids": \["f1"\],  
              "location\_ids": \["lab-nagpur"\],  
              "time": {  
                "label": "Report delivery time",  
                "duration": "P5D"  
              },  
              "tags": \[  
                {  
                  "descriptor": {  
                    "name": "test-parameters"  
                  },  
                  "list": \[  
                    {  
                      "descriptor": {  
                        "code": "complete-npk"  
                      },  
                      "value": "included"  
                    },  
                    {  
                      "descriptor": {  
                        "code": "all-micronutrients"  
                      },  
                      "value": "included"  
                    },  
                    {  
                      "descriptor": {  
                        "code": "physical-properties",  
                        "name": "Soil texture, bulk density"  
                      },  
                      "value": "included"  
                    },  
                    {  
                      "descriptor": {  
                        "code": "advisory-recommendations"  
                      },  
                      "value": "included"  
                    }  
                  \]  
                }  
              \]  
            }  
          \]  
        }  
      \]  
    }  
  }  
}

#### **select**

**Selecting a specific soil testing service**

{  
  "context": {  
    "domain": "services:uki",  
    "action": "select",  
    "location": {  
      "country": {  
        "name": "India",  
        "code": "IND"  
      },  
      "city": {  
        "name": "Wardha",  
        "code": "std:07152"  
      }  
    },  
    "version": "1.1.0",  
    "bap\_id": "farmer-app.uki.com",  
    "bap\_uri": "https://farmer-app.uki.com",  
    "bpp\_id": "soil-lab-network.com",  
    "bpp\_uri": "https://soil-lab-network.com",  
    "transaction\_id": "soil-test-001",  
    "message\_id": "msg-003",  
    "timestamp": "2025-06-02T19:07:25Z"  
  },  
  "message": {  
    "order": {  
      "provider": {  
        "id": "soilcare-labs"  
      },  
      "items": \[  
        {  
          "id": "comprehensive-analysis",  
          "quantity": {  
            "selected": {  
              "count": 1  
            }  
          }  
        }  
      \],  
      "fulfillments": \[  
        {  
          "id": "f1",  
          "stops": \[  
            {  
              "type": "collection-location",  
              "location": {  
                "gps": "20.7489, 78.6085",  
                "address": "Ravi Sharma Farm, Village Karanja, Wardha"  
              },  
              "time": {  
                "range": {  
                  "start": "2025-06-03T09:00:00Z",  
                  "end": "2025-06-03T11:00:00Z"  
                }  
              }  
            }  
          \]  
        }  
      \]  
    }  
  }  
}

#### **on\_select**

**Quote response from selected provider**

{  
  "context": {  
    "domain": "services:uki",  
    "action": "on\_select",  
    "location": {  
      "country": {  
        "name": "India",  
        "code": "IND"  
      },  
      "city": {  
        "name": "Wardha",  
        "code": "std:07152"  
      }  
    },  
    "version": "1.1.0",  
    "bap\_id": "farmer-app.uki.com",  
    "bap\_uri": "https://farmer-app.uki.com",  
    "bpp\_id": "soil-lab-network.com",  
    "bpp\_uri": "https://soil-lab-network.com",  
    "transaction\_id": "soil-test-001",  
    "message\_id": "msg-003",  
    "timestamp": "2025-06-02T19:07:25Z"  
  },  
  "message": {  
    "order": {  
      "provider": {  
        "id": "soilcare-labs",  
        "descriptor": {  
          "name": "SoilCare Labs",  
          "short\_desc": "Advanced soil analysis with AI-powered recommendations"  
        }  
      },  
      "items": \[  
        {  
          "id": "comprehensive-analysis",  
          "descriptor": {  
            "name": "Comprehensive Soil Analysis \+ Advisory",  
            "short\_desc": "Complete soil testing with personalized crop recommendations"  
          },  
          "price": {  
            "currency": "INR",  
            "value": "750"  
          },  
          "quantity": {  
            "selected": {  
              "count": 1  
            }  
          },  
          "fulfillment\_ids": \["f1"\],  
          "time": {  
            "label": "Report delivery time",  
            "duration": "P5D"  
          }  
        }  
      \],  
      "fulfillments": \[  
        {  
          "id": "f1",  
          "type": "home-collection",  
          "stops": \[  
            {  
              "type": "collection-location",  
              "location": {  
                "gps": "20.7489, 78.6085",  
                "address": "Ravi Sharma Farm, Village Karanja, Wardha"  
              },  
              "time": {  
                "range": {  
                  "start": "2025-06-03T09:00:00Z",  
                  "end": "2025-06-03T11:00:00Z"  
                }  
              }  
            }  
          \]  
        }  
      \],  
      "quote": {  
        "price": {  
          "currency": "INR",  
          "value": "780"  
        },  
        "breakup": \[  
          {  
            "title": "Soil Test Fee",  
            "price": {  
              "currency": "INR",  
              "value": "750"  
            }  
          },  
          {  
            "title": "Collection Charges",  
            "price": {  
              "currency": "INR",  
              "value": "30"  
            }  
          }  
        \]  
      }  
    }  
  }  
}

#### **init**

**Initialize order with customer details**

{  
  "context": {  
    "domain": "services:uki",  
    "action": "init",  
    "location": {  
      "country": {  
        "name": "India",  
        "code": "IND"  
      },  
      "city": {  
        "name": "Wardha",  
        "code": "std:07152"  
      }  
    },  
    "version": "1.1.0",  
    "bap\_id": "farmer-app.uki.com",  
    "bap\_uri": "https://farmer-app.uki.com",  
    "bpp\_id": "soil-lab-network.com",  
    "bpp\_uri": "https://soil-lab-network.com",  
    "transaction\_id": "soil-test-001",  
    "message\_id": "msg-004",  
    "timestamp": "2025-06-02T19:07:25Z"  
  },  
  "message": {  
    "order": {  
      "provider": {  
        "id": "soilcare-labs"  
      },  
      "items": \[  
        {  
          "id": "comprehensive-analysis",  
          "quantity": {  
            "selected": {  
              "count": 1  
            }  
          }  
        }  
      \],  
      "fulfillments": \[  
        {  
          "id": "f1",  
          "stops": \[  
            {  
              "type": "collection-location",  
              "location": {  
                "gps": "20.7489, 78.6085",  
                "address": "Ravi Sharma Farm, Village Karanja, Wardha"  
              },  
              "time": {  
                "range": {  
                  "start": "2025-06-03T09:00:00Z",  
                  "end": "2025-06-03T11:00:00Z"  
                }  
              }  
            }  
          \],  
          "customer": {  
            "person": {  
              "name": "Ravi Sharma"  
            },  
            "contact": {  
              "phone": "9876543210",  
              "email": "ravi.sharma@email.com"  
            }  
          }  
        }  
      \],  
      "billing": {  
        "name": "Ravi Sharma",  
        "phone": "9876543210",  
        "email": "ravi.sharma@email.com",  
        "address": "Village Karanja, Wardha, Maharashtra \- 442001"  
      }  
    }  
  }  
}

#### **on\_init**

**Payment terms and order confirmation details**

{  
  "context": {  
    "domain": "services:uki",  
    "action": "on\_init",  
    "location": {  
      "country": {  
        "name": "India",  
        "code": "IND"  
      },  
      "city": {  
        "name": "Wardha",  
        "code": "std:07152"  
      }  
    },  
    "version": "1.1.0",  
    "bap\_id": "farmer-app.uki.com",  
    "bap\_uri": "https://farmer-app.uki.com",  
    "bpp\_id": "soil-lab-network.com",  
    "bpp\_uri": "https://soil-lab-network.com",  
    "transaction\_id": "soil-test-001",  
    "message\_id": "msg-004",  
    "timestamp": "2025-06-02T19:07:25Z"  
  },  
  "message": {  
    "order": {  
      "provider": {  
        "id": "soilcare-labs",  
        "descriptor": {  
          "name": "SoilCare Labs"  
        }  
      },  
      "items": \[  
        {  
          "id": "comprehensive-analysis",  
          "descriptor": {  
            "name": "Comprehensive Soil Analysis \+ Advisory"  
          },  
          "price": {  
            "currency": "INR",  
            "value": "750"  
          },  
          "quantity": {  
            "selected": {  
              "count": 1  
            }  
          }  
        }  
      \],  
      "fulfillments": \[  
        {  
          "id": "f1",  
          "type": "home-collection",  
          "stops": \[  
            {  
              "type": "collection-location",  
              "location": {  
                "gps": "20.7489, 78.6085",  
                "address": "Ravi Sharma Farm, Village Karanja, Wardha"  
              },  
              "time": {  
                "range": {  
                  "start": "2025-06-03T09:00:00Z",  
                  "end": "2025-06-03T11:00:00Z"  
                }  
              }  
            }  
          \],  
          "customer": {  
            "person": {  
              "name": "Ravi Sharma"  
            },  
            "contact": {  
              "phone": "9876543210",  
              "email": "ravi.sharma@email.com"  
            }  
          }  
        }  
      \],  
      "quote": {  
        "price": {  
          "currency": "INR",  
          "value": "780"  
        },  
        "breakup": \[  
          {  
            "title": "Soil Test Fee",  
            "price": {  
              "currency": "INR",  
              "value": "750"  
            }  
          },  
          {  
            "title": "Collection Charges",  
            "price": {  
              "currency": "INR",  
              "value": "30"  
            }  
          }  
        \]  
      },  
      "billing": {  
        "name": "Ravi Sharma",  
        "phone": "9876543210",  
        "email": "ravi.sharma@email.com",  
        "address": "Village Karanja, Wardha, Maharashtra \- 442001"  
      },  
      "payments": \[  
        {  
          "type": "ON-FULFILLMENT",  
          "collected\_by": "BPP",  
          "status": "NOT-PAID",  
          "params": {  
            "amount": "780",  
            "currency": "INR"  
          }  
        }  
      \],  
      "cancellation\_terms": \[  
        {  
          "fulfillment\_state": {  
            "descriptor": {  
              "code": "sample-not-collected"  
            }  
          },  
          "cancellation\_fee": {  
            "percentage": "0"  
          }  
        },  
        {  
          "fulfillment\_state": {  
            "descriptor": {  
              "code": "sample-collected"  
            }  
          },  
          "cancellation\_fee": {  
            "percentage": "50"  
          }  
        }  
      \]  
    }  
  }  
}

#### **confirm**

**Final order confirmation**

{  
  "context": {  
    "domain": "services:uki",  
    "action": "confirm",  
    "location": {  
      "country": {  
        "name": "India",  
        "code": "IND"  
      },  
      "city": {  
        "name": "Wardha",  
        "code": "std:07152"  
      }  
    },  
    "version": "1.1.0",  
    "bap\_id": "farmer-app.uki.com",  
    "bap\_uri": "https://farmer-app.uki.com",  
    "bpp\_id": "soil-lab-network.com",  
    "bpp\_uri": "https://soil-lab-network.com",  
    "transaction\_id": "soil-test-001",  
    "message\_id": "msg-005",  
    "timestamp": "2025-06-02T19:07:25Z"  
  },  
  "message": {  
    "order": {  
      "provider": {  
        "id": "soilcare-labs"  
      },  
      "items": \[  
        {  
          "id": "comprehensive-analysis",  
          "quantity": {  
            "selected": {  
              "count": 1  
            }  
          }  
        }  
      \],  
      "fulfillments": \[  
        {  
          "id": "f1",  
          "stops": \[  
            {  
              "type": "collection-location",  
              "location": {  
                "gps": "20.7489, 78.6085",  
                "address": "Ravi Sharma Farm, Village Karanja, Wardha"  
              },  
              "time": {  
                "range": {  
                  "start": "2025-06-03T09:00:00Z",  
                  "end": "2025-06-03T11:00:00Z"  
                }  
              }  
            }  
          \],  
          "customer": {  
            "person": {  
              "name": "Ravi Sharma"  
            },  
            "contact": {  
              "phone": "9876543210",  
              "email": "ravi.sharma@email.com"  
            }  
          }  
        }  
      \],  
      "billing": {  
        "name": "Ravi Sharma",  
        "phone": "9876543210",  
        "email": "ravi.sharma@email.com",  
        "address": "Village Karanja, Wardha, Maharashtra \- 442001"  
      },  
      "payments": \[  
        {  
          "type": "ON-FULFILLMENT",  
          "collected\_by": "BPP",  
          "status": "NOT-PAID",  
          "params": {  
            "amount": "780",  
            "currency": "INR"  
          }  
        }  
      \]  
    }  
  }  
}

#### **on\_confirm**

**Order confirmed with tracking details**

{  
  "context": {  
    "domain": "services:uki",  
    "action": "on\_confirm",  
    "location": {  
      "country": {  
        "name": "India",  
        "code": "IND"  
      },  
      "city": {  
        "name": "Wardha",  
        "code": "std:07152"  
      }  
    },  
    "version": "1.1.0",  
    "bap\_id": "farmer-app.uki.com",  
    "bap\_uri": "https://farmer-app.uki.com",  
    "bpp\_id": "soil-lab-network.com",  
    "bpp\_uri": "https://soil-lab-network.com",  
    "transaction\_id": "soil-test-001",  
    "message\_id": "msg-005",  
    "timestamp": "2025-06-02T19:07:25Z"  
  },  
  "message": {  
    "order": {  
      "id": "SOIL001234",  
      "status": "CONFIRMED",  
      "provider": {  
        "id": "soilcare-labs",  
        "descriptor": {  
          "name": "SoilCare Labs"  
        }  
      },  
      "items": \[  
        {  
          "id": "comprehensive-analysis",  
          "descriptor": {  
            "name": "Comprehensive Soil Analysis \+ Advisory"  
          },  
          "price": {  
            "currency": "INR",  
            "value": "750"  
          },  
          "quantity": {  
            "selected": {  
              "count": 1  
            }  
          }  
        }  
      \],  
      "fulfillments": \[  
        {  
          "id": "f1",  
          "type": "home-collection",  
          "state": {  
            "descriptor": {  
              "code": "CONFIRMED",  
              "name": "Collection scheduled"  
            }  
          },  
          "stops": \[  
            {  
              "type": "collection-location",  
              "location": {  
                "gps": "20.7489, 78.6085",  
                "address": "Ravi Sharma Farm, Village Karanja, Wardha"  
              },  
              "time": {  
                "range": {  
                  "start": "2025-06-03T09:00:00Z",  
                  "end": "2025-06-03T11:00:00Z"  
                }  
              }  
            }  
          \],  
          "customer": {  
            "person": {  
              "name": "Ravi Sharma"  
            },  
            "contact": {  
              "phone": "9876543210",  
              "email": "ravi.sharma@email.com"  
            }  
          },  
          "agent": {  
            "person": {  
              "name": "Rajesh Kumar"  
            },  
            "contact": {  
              "phone": "9988776655"  
            }  
          }  
        }  
      \],  
      "quote": {  
        "price": {  
          "currency": "INR",  
          "value": "780"  
        },  
        "breakup": \[  
          {  
            "title": "Soil Test Fee",  
            "price": {  
              "currency": "INR",  
              "value": "750"  
            }  
          },  
          {  
            "title": "Collection Charges",  
            "price": {  
              "currency": "INR",  
              "value": "30"  
            }  
          }  
        \]  
      },  
      "billing": {  
        "name": "Ravi Sharma",  
        "phone": "9876543210",  
        "email": "ravi.sharma@email.com",  
        "address": "Village Karanja, Wardha, Maharashtra \- 442001"  
      },  
      "payments": \[  
        {  
          "type": "ON-FULFILLMENT",  
          "collected\_by": "BPP",  
          "status": "NOT-PAID",  
          "params": {  
            "amount": "780",  
            "currency": "INR"  
          }  
        }  
      \]  
    }  
  }  
}

#### **status**

**Track order status**

{  
  "context": {  
    "domain": "services:uki",  
    "action": "status",  
    "location": {  
      "country": {  
        "name": "India",  
        "code": "IND"  
      },  
      "city": {  
        "name": "Wardha",  
        "code": "std:07152"  
      }  
    },  
    "version": "1.1.0",  
    "bap\_id": "farmer-app.uki.com",  
    "bap\_uri": "https://farmer-app.uki.com",  
    "bpp\_id": "soil-lab-network.com",  
    "bpp\_uri": "https://soil-lab-network.com",  
    "transaction\_id": "soil-test-001",  
    "message\_id": "msg-006",  
    "timestamp": "2025-06-04T10:00:00Z"  
  },  
  "message": {  
    "order\_id": "SOIL001234"  
  }  
}

#### **on\_status (Multiple status updates)**

**Status: Sample collected**

{  
  "context": {  
    "domain": "services:uki",  
    "action": "on\_status",  
    "location": {  
      "country": {  
        "name": "India",  
        "code": "IND"  
      },  
      "city": {  
        "name": "Wardha",  
        "code": "std:07152"  
      }  
    },  
    "version": "1.1.0",  
    "bap\_id": "farmer-app.uki.com",  
    "bap\_uri": "https://farmer-app.uki.com",  
    "bpp\_id": "soil-lab-network.com",  
    "bpp\_uri": "https://soil-lab-network.com",  
    "transaction\_id": "soil-test-001",  
    "message\_id": "msg-006",  
    "timestamp": "2025-06-04T10:00:00Z"  
  },  
  "message": {  
    "order": {  
      "id": "SOIL001234",  
      "status": "IN-PROGRESS",  
      "provider": {  
        "id": "soilcare-labs",  
        "descriptor": {  
          "name": "SoilCare Labs"  
        }  
      },  
      "items": \[  
        {  
          "id": "comprehensive-analysis",  
          "descriptor": {  
            "name": "Comprehensive Soil Analysis \+ Advisory"  
          }  
        }  
      \],  
      "fulfillments": \[  
        {  
          "id": "f1",  
          "type": "home-collection",  
          "state": {  
            "descriptor": {  
              "code": "SAMPLE-COLLECTED",  
              "name": "Sample collected and sent to lab"  
            }  
          },  
          "agent": {  
            "person": {  
              "name": "Rajesh Kumar"  
            },  
            "contact": {  
              "phone": "9988776655"  
            }  
          }  
        }  
      \]  
    }  
  }  
}

**Status: Results ready**

{  
  "context": {  
    "domain": "services:uki",  
    "action": "on\_status",  
    "location": {  
      "country": {  
        "name": "India",  
        "code": "IND"  
      },  
      "city": {  
        "name": "Wardha",  
        "code": "std:07152"  
      }  
    },  
    "version": "1.1.0",  
    "bap\_id": "farmer-app.uki.com",  
    "bap\_uri": "https://farmer-app.uki.com",  
    "bpp\_id": "soil-lab-network.com",  
    "bpp\_uri": "https://soil-lab-network.com",  
    "transaction\_id": "soil-test-001",  
    "message\_id": "msg-007",  
    "timestamp": "2025-06-07T15:00:00Z"  
  },  
  "message": {  
    "order": {  
      "id": "SOIL001234",  
      "status": "COMPLETED",  
      "provider": {  
        "id": "soilcare-labs",  
        "descriptor": {  
          "name": "SoilCare Labs"  
        }  
      },  
      "items": \[  
        {  
          "id": "comprehensive-analysis",  
          "descriptor": {  
            "name": "Comprehensive Soil Analysis \+ Advisory"  
          }  
        }  
      \],  
      "fulfillments": \[  
        {  
          "id": "f1",  
          "type": "home-collection",  
          "state": {  
            "descriptor": {  
              "code": "COMPLETED",  
              "name": "Test results ready"  
            }  
          }  
        }  
      \],  
      "documents": \[  
        {  
          "url": "https://soilcare-labs.com/reports/SOIL001234.pdf",  
          "label": "Soil Test Report",  
          "media\_type": "application/pdf"  
        }  
      \],  
      "payments": \[  
        {  
          "type": "ON-FULFILLMENT",  
          "collected\_by": "BPP",  
          "status": "PAID",  
          "params": {  
            "amount": "780",  
            "currency": "INR"  
          }  
        }  
      \]  
    }  
  }  
}

#### **support**

**Request support**

{  
  "context": {  
    "domain": "services:uki",  
    "action": "support",  
    "location": {  
      "country": {  
        "name": "India",  
        "code": "IND"  
      },  
      "city": {  
        "name": "Wardha",  
        "code": "std:07152"  
      }  
    },  
    "version": "1.1.0",  
    "bap\_id": "farmer-app.uki.com",  
    "bap\_uri": "https://farmer-app.uki.com",  
    "bpp\_id": "soil-lab-network.com",  
    "bpp\_uri": "https://soil-lab-network.com",  
    "transaction\_id": "soil-test-001",  
    "message\_id": "msg-008",  
    "timestamp": "2025-06-07T16:00:00Z"  
  },  
  "message": {  
    "ref\_id": "SOIL001234"  
  }  
}

#### **on\_support**

**Support contact details**

{  
  "context": {  
    "domain": "services:uki",  
    "action": "on\_support",  
    "location": {  
      "country": {  
        "name": "India",  
        "code": "IND"  
      },  
      "city": {  
        "name": "Wardha",  
        "code": "std:07152"  
      }  
    },  
    "version": "1.1.0",  
    "bap\_id": "farmer-app.uki.com",  
    "bap\_uri": "https://farmer-app.uki.com",  
    "bpp\_id": "soil-lab-network.com",  
    "bpp\_uri": "https://soil-lab-network.com",  
    "transaction\_id": "soil-test-001",  
    "message\_id": "msg-008",  
    "timestamp": "2025-06-07T16:00:00Z"  
  },  
  "message": {  
    "support": {  
      "ref\_id": "SOIL001234",  
      "phone": "18002345678",  
      "email": "support@soilcare-labs.com",  
      "url": "https://soilcare-labs.com/support"  
    }  
  }  
}

#### **rating**

**Rate the service**

{  
  "context": {  
    "domain": "services:uki",  
    "action": "rating",  
    "location": {  
      "country": {  
        "name": "India",  
        "code": "IND"  
      },  
      "city": {  
        "name": "Wardha",  
        "code": "std:07152"  
      }  
    },  
    "version": "1.1.0",  
    "bap\_id": "farmer-app.uki.com",  
    "bap\_uri": "https://farmer-app.uki.com",  
    "bpp\_id": "soil-lab-network.com",  
    "bpp\_uri": "https://soil-lab-network.com",  
    "transaction\_id": "soil-test-001",  
    "message\_id": "msg-009",  
    "timestamp": "2025-06-07T17:00:00Z"  
  },  
  "message": {  
    "ratings": \[  
      {  
        "id": "soilcare-labs",  
        "rating\_category": "Provider",  
        "value": "5"  
      },  
      {  
        "id": "comprehensive-analysis",  
        "rating\_category": "Item",  
        "value": "5"  
      }  
    \]  
  }  
}

#### **on\_rating**

**Rating acknowledgment with feedback form**

{  
  "context": {  
    "domain": "services:uki",  
    "action": "on\_rating",  
    "location": {  
      "country": {  
        "name": "India",  
        "code": "IND"  
      },  
      "city": {  
        "name": "Wardha",  
        "code": "std:07152"  
      }  
    },  
    "version": "1.1.0",  
    "bap\_id": "farmer-app.uki.com",  
    "bap\_uri": "https://farmer-app.uki.com",  
    "bpp\_id": "soil-lab-network.com",  
    "bpp\_uri": "https://soil-lab-network.com",  
    "transaction\_id": "soil-test-001",  
    "message\_id": "msg-009",  
    "timestamp": "2025-06-07T17:00:00Z"  
  },  
  "message": {  
    "feedback\_form": {  
      "form": {  
        "url": "https://soilcare-labs.com/feedback/SOIL001234"  
      }  
    }  
  }  
}

## **Taxonomy and Layer 2 Configuration**

### **Service Categories**

| Category Code | Name | Description |
| :---- | :---- | :---- |
| soil-testing | Soil Testing Services | Laboratory analysis of soil samples |
| soil-health-advisory | Soil Health Advisory | Consultation and recommendations based on soil tests |

### **Test Parameter Taxonomy**

| Parameter Code | Name | Description |
| :---- | :---- | :---- |
| nitrogen | Available Nitrogen | Nitrogen content in soil |
| phosphorus | Available Phosphorus | Phosphorus content in soil |
| potassium | Available Potassium | Potassium content in soil |
| ph-level | Soil pH | Acidity/alkalinity of soil |
| organic-carbon | Organic Carbon | Organic matter content |
| micronutrients | Micronutrients | Zn, Fe, Mn, Cu, B, S analysis |
| soil-texture | Soil Texture | Clay, silt, sand composition |
| electrical-conductivity | EC | Soil salinity measurement |

### **Fulfillment Types**

| Type Code | Name | Description |
| :---- | :---- | :---- |
| home-collection | Home Collection | Agent visits farm to collect samples |
| drop-off | Drop-off | Farmer brings samples to lab |
| mobile-lab | Mobile Lab | Lab vehicle visits farm |

### **Order Status Codes**

| Status Code | Name | Description |
| :---- | :---- | :---- |
| CONFIRMED | Order Confirmed | Lab has confirmed the order |
| AGENT-ASSIGNED | Agent Assigned | Collection agent assigned |
| SAMPLE-COLLECTED | Sample Collected | Soil samples collected from farm |
| RECEIVED-AT-LAB | Received at Lab | Samples received at laboratory |
| TESTING-IN-PROGRESS | Testing in Progress | Laboratory analysis ongoing |
| COMPLETED | Completed | Test results ready |
| CANCELLED | Cancelled | Order cancelled |

## **Challenges and Assumptions**

### **Technical Challenges**

1. **Sample Quality Assurance**  
   * Ensuring proper sample collection methodology  
   * Maintaining sample integrity during transport  
   * Standardizing collection procedures across agents  
2. **Lab Capacity Management**  
   * Dynamic pricing based on lab workload  
   * Realistic delivery time estimation  
   * Queue management for peak seasons  
3. **Result Interpretation**  
   * Standardizing report formats across labs  
   * Ensuring actionable recommendations  
   * Multi-language support for regional farmers  
4. **Geographic Coverage**  
   * Limited lab presence in remote areas  
   * Collection agent availability  
   * Logistics for sample transport

### **Business Assumptions**

1. **Certification Requirements**  
   * All labs are NABL/ISO certified  
   * Agents are trained in proper sampling  
   * Quality assurance protocols in place  
2. **Pricing Models**  
   * Transparent pricing with no hidden costs  
   * Standardized collection charges  
   * Volume discounts for multiple tests  
3. **Digital Literacy**  
   * Farmers can access digital reports  
   * Basic smartphone usage capability  
   * Support for voice-based interactions

## **Developer Notes**

### **Integration Guidelines**

#### **For BAP Developers (Farmer Apps)**

**Search Implementation**  
// Example search with location radius  
const searchPayload \= {  
  intent: {  
    category: { descriptor: { code: "soil-testing" } },  
    fulfillment: {  
      stops: \[{  
        location: {  
          circle: {  
            gps: "20.7489, 78.6085",  
            radius: { unit: "km", value: "25" }  
          }  
        }  
      }\]  
    }  
  }  
};

1. **Order Tracking**  
   * Implement periodic status calls  
   * Handle asynchronous status updates  
   * Store order IDs for future reference  
2. **Payment Integration**  
   * Support multiple payment modes  
   * Handle payment collection by agents  
   * Implement refund mechanisms

#### **For BPP Developers (Lab Platforms)**

**Catalog Management**  
// Dynamic pricing based on capacity  
const calculatePrice \= (basePrice, demandFactor, distance) \=\> {  
  return basePrice \* demandFactor \+ (distance \* collectionRate);  
};

1.   
2. **Agent Management**  
   * Real-time agent tracking  
   * Capacity planning algorithms  
   * Route optimization for collections  
3. **Lab Integration**  
   * LIMS (Laboratory Information Management System) integration  
   * Automated report generation  
   * Quality control workflows

### **Testing Recommendations**

1. **Sandbox Testing**  
   * Mock lab responses for different test types  
   * Simulate agent collection scenarios  
   * Test payment failure cases  
2. **Load Testing**  
   * Peak season demand simulation  
   * Multiple concurrent orders  
   * Geographic distribution testing  
3. **Integration Testing**  
   * End-to-end flow validation  
   * Cross-platform compatibility  
   * Mobile network reliability

### **Security Considerations**

1. **Data Privacy**  
   * Farmer data protection  
   * Secure report transmission  
   * GDPR compliance for data handling  
2. **Authentication**  
   * Secure API endpoints  
   * Agent identity verification  
   * Digital signature for reports

## **Schema Details**

| Use Case | Input Details | Values | Data Types |
| :---- | :---- | :---- | :---- |
| Soil Testing | Test Parameters | NPK, pH, micronutrients | array |
| Collection | Location | GPS coordinates, address | point/string |
| Timing | Collection Window | Date/time range | datetime |
| Lab Selection | Certification | NABL, ISO | varchar |
| Pricing | Test Type | Basic, comprehensive | varchar |
| Results | Report Format | PDF, digital | varchar |

## 

## **Links to Resources**

* [Beckn Protocol Specification](https://github.com/beckn/missions/blob/main/UAI/implementation-guides/)  
* [UKI Network Documentation](https://github.com/beckn/missions/blob/main/UAI/implementation-guides/)  
* [Soil Testing Standards](https://github.com/beckn/missions/blob/main/UAI/implementation-guides/)

## **Sandbox Details**

### **Registry/Gateway:**

* **Gateway Sandbox:**   
* **Registry Sandbox:** 

### **BPP:**

* **BPP Client Sandbox:**   
* **BPP Network Sandbox:**    
* **BPP Sandbox:**   
* 

### **Domain name:**

services:uki

---

This comprehensive implementation guide provides developers with all necessary information to integrate soil testing services into the UKI network using the Beckn Protocol. The guide includes practical examples, real-world scenarios, and technical considerations for successful implementation.

[image1]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnAAAAC/CAYAAAB+MuHrAAAbG0lEQVR4Xu3dj/cUVf3H8f4nfhjKD7HwSIoFCkIdw2OHA0icstAi9aT8sCRJLBQ/EX1QEdEglfghvwxLNCFBUyALUxBFjumBUoKDcPu+L987zrx37u7s57Ozd+58no9z7vns3Lk7e3d37s5r58d+vmAAAAAQlS/oCgAAAFQbAQ4AACAyBDgAAIDIEOAAAAAiQ4ADAACIDAEOAAAgMgQ4AACAyBDgAAAAIkOAAwAAiExbAW7QoEEUSvASG91/CiVEiY3uP4USolxyySV61ayMtgPczp07k7J169bMdF4ZyG22bNnSUKcLbRrrm7WRdTA2etwUKUXWL9o01pfRRq+DeaXqbYYMGaJXy8rLGzf6eVW9FFm/aNNYH6qNXr9k3NQqwAEhxbgOxthn1EuVN0I+jBuEJuOmymOHAIeoxLgOxthn1EuVN0I+jBuERoADOijGdTDGPqNeqrwR8mHcIDQCHNBBMa6DMfYZ9VLljZAP4wahEeCADopxHYyxz6iXKm+EfBg3CI0AB3RQjOtgjH1GvVR5I+TDuEFoBDigg2JcB2PsM+qlyhshH8YNQqtVgAMAAEB4BDgAAIDItBXglixZoquAropxHYyxz6iXnp4eXVV5jBuEJuOmymOnrQDHOQkILcZ1MMY+o16qfB6PD+MGodXqHDgGFEKLcR2Msc+olypvhHwYNwiNAAd0UIzrYIx9Rr1UeSPkE9u4+fTTT82iRYt0NSJGgOuwdevWeUvdPfXUU8lzfeaZZ/TsAaEK62C7Qvf50KFDyXqzf/9+W/e73/0uM26OHj2aTMs88corr2SmxZYtWxrGXX/G3v3332+mTJliHnjgATt94sQJ1aK1559/XldBqfJGyKdb42bhwoVm/Pjx5uc//7n58MMPzdmzZ3WTQo4fP960zzLPlb7qxLgbOnRov/rgHDlyJNMX2T7Ja6DpPsvnilakTQgEuA577LHHbD/kb7pUoW9lSz/XgfB888T4vEP3+Y033jBf//rX7bojt4Xc/tnPfmYmTZpkp9966y1b95vf/MasWbPG1kkwkr4/8cQTybLkw9Wth9/97neT2+16/fXX7bLvu+8+u+dCHkOmH3roId20pdCvbwyqvBHy6cb7OmrUKLNx40Zz6tQps2HDBvuYL730km5WiCxDvpC00p/nJWNt8uTJ5qc//Wmfxp3Tnz44f//7381ll11mHn30UduXFStWmCuuuMIMGTIk085ts9xnxe23396nNiEQ4EqQ1w9d969//cvMnTvXruh53wpkg+X2Roj//Oc/ZvXq1cm0zDt37pzp7e1N2slAz/vWc/r0aXPnnXeaX/7yl+bw4cN6dsNj7dixI/NY7fjmN79pdu/ebZeRdv78efsY7nE2b95sN7Dp5+7a/Pe//03ayLfPvNenqvT7HIMq9Pmuu+7SVebNN980P/rRjzJ1EqbEpk2bbL9lDPg8/vjjuqow2QuQJx0WRbNxfObMGbs+Sz/dui/ls88+y7QTzcaou59efno8OTLuXH80ee2k/YEDB5I62aOYt5xuq/JGyKfscfOnP/3JzJkzJ1P34x//2OzZsydTJ9avX28/T31HPiTMFH2f+/u87rjjDvsFqBkZNxIm88aNcH345z//aW6++Wa7Z70v5Aug/oyQ11XTz1nuM3jw4ExdkTbdRoArQbofs2fPTs25YOzYsWb06NHmtddes3sRLrroIt3EDgL5IBaXX3653aDccsstyQozZswY+zjyoS9/ZXrq1Knm0ksvtUHOueeee+z8Xbt2md///vd2OXLIKk0ea9iwYfa2PNa3v/3tzGO1I/3c05c3y0ZJno/MlyKHpPbt22e/xYwbNy7TZuXKlUkb2e2dblN1VVkH21GFPrcT4OSD0xew0voT4P72t7/pqgatxrHUuXVe/roizyut1Ri95pprbPnVr36Vupexh9WuvfbaZFr68/3vfz/pj35fZc+N1Ml4dx5++GEzceJE+7kRUpU3Qj769e00CfVf/OIXdXUD+exfvHixefXVV+1fmdYk+Ll1sZUibZopEuBk3MieLDduZD1Mkz7I+jx8+HB7uPJ73/ten/qVF+BkJ4Omly07E3Sdns5r020EuBJIPyS8LFu2zH7wFiGDL48sSwalJgHrJz/5ib29atUq89WvftXefu+998z1119vb7/zzju5r0lenWwMfI/VjvTgyHucvDo5TJBWpE1V5fW96qrQ56IBzp3H88EHH2Tq8/Q1wOkP/HbkjeNmr2+RMfqPf/zDzJgxw97+4x//aF544QV7e9q0aXbvuY98edT9efbZZ+2GJ02+qH3yySeZum6r8kbIJ+996zQJQ1/+8pftqQNy/psm24FZs2Zl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>
