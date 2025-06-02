# UKI Implementation Guide - Soil Testing


## Introduction

This document provides material that helps network participants build and integrate their application with the Beckn Network for Soil Testing services. This document is part of the starter kit that provides information about the use case of "Soil Testing" in the Unified Krishi Interface (UKI) domain.

The use case involves farmers discovering and booking soil testing services from certified laboratories, with options for sample collection, testing, and advisory recommendations through the UKI network powered by Beckn Protocol.

## Structure of the document

This document has the following parts:

1. BAP-BPP Roles and Entity Mapping - This section defines the roles of different participants in the soil testing ecosystem
2. Outcome Visualization - This is a pictorial or descriptive representation of the different use cases that are supported by the network
3. Flow diagrams - This section provides a pictorial representation of the message flows that happen during the use case
4. API Calls and Schema - This section provides details on the API calls and the schema of the message that is sent in the form of sample schemas
5. Taxonomy and layer 2 configuration - This section provides details on the taxonomy, enumerations and any rules defined for either the use case or by the network
6. Notes on writing/integrating with your own software - This section describes ways in which you can integrate (Becknify) your new or existing software
7. Links to downloadable resources - This section contains the downloadable files referenced in this document

## BAP-BPP Roles and Entity Mapping

### Network Participants

#### Entities Involved:
1. **Farmer** - Service seeker who needs soil testing services
2. **Soil Testing Laboratory** - Certified lab that provides soil analysis services
3. **Collection Agent** - Field agent who collects soil samples from farm locations
4. **Advisory Service Provider** - Agricultural experts who provide recommendations based on soil test results
5. **Aggregator Platform** - Technology platform that aggregates multiple soil testing services

#### BAP-BPP Role Mapping:

**BAP (Beckn Application Platform) - Farmer Side:**
- **Farmer Mobile App/Portal**: Interface used by farmers to discover and book soil testing services
- **Agricultural Advisory Platform**: Apps that help farmers with farm management and need soil testing integration
- **Government Extension Services**: Digital platforms used by agricultural extension officers

**BPP (Beckn Provider Platform) - Service Provider Side:**
- **Soil Testing Laboratory Platform**: Digital platform of certified soil testing labs
- **Agricultural Service Aggregator**: Platform that aggregates multiple soil testing services and collection agents
- **Integrated Farm Service Provider**: Companies providing end-to-end agricultural services including soil testing

### Network Architecture

###################################################################################################################################################################################################################################################################################################################################

## Outcome Visualisation

### Use case - Discovery and Booking of Soil Testing Services

**Scenario: Ravi's Soil Testing Journey**

1. **Ravi**, a cotton farmer from Wardha, Maharashtra, notices declining crop yields and suspects soil nutrient deficiency. He wants to get his soil tested to understand fertilizer requirements.

2. Using a **UKI-enabled farmer app**, Ravi searches for soil testing services by entering:
   - **Location**: His farm coordinates or village name
   - **Test Type**: NPK analysis, pH testing, micronutrient analysis
   - **Collection Method**: Home pickup or drop-off at lab
   - **Budget**: Maximum amount he's willing to spend

3. The app shows him **multiple service providers**:
   - **AgriLab Solutions**: NPK + Micronutrients @ ₹500, 4.2 rating, pickup available
   - **SoilCare Labs**: Comprehensive analysis @ ₹750, 4.6 rating, pickup in 2 days
   - **FarmTest Services**: Basic NPK @ ₹300, 4.0 rating, self drop-off

4. Ravi selects **SoilCare Labs** for comprehensive testing and chooses **home pickup** option.

5. He provides:
   - **Personal details**: Name, contact number
   - **Farm location**: GPS coordinates and address
   - **Preferred collection time**: Morning between 9-11 AM
   - **Payment method**: Cash on delivery

6. **Order confirmation** received with:
   - Order ID: SOIL001234
   - Collection agent: Rajesh Kumar (Contact: 9876543210)
   - Expected collection: Tomorrow 10 AM
   - Test results: Within 3-5 working days

7. **Collection day**: Rajesh arrives, collects soil samples from 5 different spots as per protocol, provides receipt

8. **Testing phase**: Ravi receives SMS updates - "Sample received", "Testing in progress", "Results ready"

9. **Results delivery**: Digital report sent via app/SMS with:
   - Soil nutrient status (NPK levels, pH, organic matter)
   - Deficiency analysis
   - **Fertilizer recommendations** with quantities
   - **Crop suggestions** for his soil type

10. **Post-fulfillment**: Ravi rates the service and can access advisory support for implementing recommendations

## Flow diagrams

###################################################################################################################################################################################################################################################################################################################################


### General Beckn message flow and error handling

Beckn is an asynchronous protocol at its core.

- When a network participant(NP1) sends a message to another participant(NP2), the other participant(NP2) immediately returns back an ACK/NACK(Acknowledgement or Negative Acknowledgement in case of error)
- An ACK is an indicator that the receiving participant(NP2) will process this message and dispatch an on_xxxxxx message to original NP (NP1)
- Subsequently after processing the message NP2 sends back the real response in the corresponding on_xxxxxx message, to which again the first participant(NP1)
- This message can contain a message field (for success) or error field (for failure)
- NP1 when it receives the on_xxxxxx message, sends back an ACK/NACK (Here in both the cases NP1 will not send any subsequent message)
- In the Use case diagrams, this ACK/NACK is not illustrated explicitly to keep the diagrams crisp
- However when writing software we should be prepared to receive these NACK messages as well as error field in the on_xxxxxx messages


**Structure of a message with a NACK**

```json
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
```

**Structure of a on_select message with an error**

```json
{
    "context": {
        "action": "on_select",
        "version": "1.1.0"
    },
    "error": {
        "code": 30001,
        "message": "Requested provider is not in the database"
    }
}
```

### DOFP Flow for Soil Testing

#### Discovery Phase
###################################################################################################################################################################################################################################################################################################################################


#### Order Phase
###################################################################################################################################################################################################################################################################################################################################


#### Fulfillment Phase
###################################################################################################################################################################################################################################################################################################################################


#### Post-Fulfillment Phase
###################################################################################################################################################################################################################################################################################################################################


## API Calls and Schema

### Discovery of Soil Testing Services

#### search

**Search by test type and location**

```json
{
  "context": {
    "domain": "services:uai",
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
    "bap_id": "farmer-app.uki.com",
    "bap_uri": "https://farmer-app.uki.com",
    "transaction_id": "soil-test-001",
    "message_id": "msg-001",
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
        "tags": [
          {
            "descriptor": {
              "name": "test-parameters"
            },
            "list": [
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
            ]
          }
        ]
      },
      "fulfillment": {
        "stops": [
          {
            "type": "collection-location",
            "location": {
              "gps": "20.7489, 78.6085",
              "address": "Village Karanja, Wardha District"
            }
          }
        ]
      }
    }
  }
}
```

**Search with price filter and collection preference**

```json
{
  "context": {
    "domain": "services:uai",
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
    "bap_id": "farmer-app.uki.com",
    "bap_uri": "https://farmer-app.uki.com",
    "transaction_id": "soil-test-002",
    "message_id": "msg-002",
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
          "maximum_value": "800"
        }
      },
      "fulfillment": {
        "type": "home-collection",
        "stops": [
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
        ]
      }
    }
  }
}
```

#### on_search

**Catalog response with multiple lab services**

```json
{
  "context": {
    "domain": "services:uai",
    "action": "on_search",
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
    "bap_id": "farmer-app.uki.com",
    "bap_uri": "https://farmer-app.uki.com",
    "bpp_id": "soil-lab-network.com",
    "bpp_uri": "https://soil-lab-network.com",
    "transaction_id": "soil-test-001",
    "message_id": "msg-001",
    "timestamp": "2025-06-02T19:07:25Z"
  },
  "message": {
    "catalog": {
      "descriptor": {
        "name": "Soil Testing Services"
      },
      "providers": [
        {
          "id": "agrilab-solutions",
          "descriptor": {
            "name": "AgriLab Solutions",
            "short_desc": "NABL certified soil testing laboratory",
            "long_desc": "Leading agricultural testing laboratory with 15 years experience in soil, water and plant analysis",
            "images": [
              {
                "url": "https://agrilab-solutions.com/logo.png"
              }
            ]
          },
          "rating": "4.2",
          "categories": [
            {
              "id": "c1",
              "descriptor": {
                "code": "soil-testing",
                "name": "Soil Testing Services"
              }
            }
          ],
          "fulfillments": [
            {
              "id": "f1",
              "type": "home-collection"
            },
            {
              "id": "f2",
              "type": "drop-off"
            }
          ],
          "locations": [
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
          ],
          "items": [
            {
              "id": "npk-micro-test",
              "descriptor": {
                "name": "NPK + Micronutrients Analysis",
                "short_desc": "Complete soil fertility analysis including macro and micro nutrients",
                "long_desc": "Comprehensive soil test covering Nitrogen, Phosphorus, Potassium, pH, Organic Carbon, and essential micronutrients (Zn, Fe, Mn, Cu, B, S)",
                "images": [
                  {
                    "url": "https://agrilab-solutions.com/soil-test.jpg"
                  }
                ]
              },
              "price": {
                "currency": "INR",
                "value": "500"
              },
              "category_ids": ["c1"],
              "fulfillment_ids": ["f1", "f2"],
              "location_ids": ["lab-wardha"],
              "time": {
                "label": "Report delivery time",
                "duration": "P3D"
              },
              "tags": [
                {
                  "descriptor": {
                    "name": "test-parameters"
                  },
                  "list": [
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
                  ]
                },
                {
                  "descriptor": {
                    "name": "certifications"
                  },
                  "list": [
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
                  ]
                }
              ]
            }
          ]
        },
        {
          "id": "soilcare-labs",
          "descriptor": {
            "name": "SoilCare Labs",
            "short_desc": "Advanced soil analysis with AI-powered recommendations",
            "long_desc": "Modern laboratory using latest technology for precise soil analysis and AI-driven crop recommendations",
            "images": [
              {
                "url": "https://soilcare-labs.com/logo.png"
              }
            ]
          },
          "rating": "4.6",
          "categories": [
            {
              "id": "c1",
              "descriptor": {
                "code": "soil-testing",
                "name": "Soil Testing Services"
              }
            }
          ],
          "fulfillments": [
            {
              "id": "f1",
              "type": "home-collection"
            }
          ],
          "locations": [
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
          ],
          "items": [
            {
              "id": "comprehensive-analysis",
              "descriptor": {
                "name": "Comprehensive Soil Analysis + Advisory",
                "short_desc": "Complete soil testing with personalized crop recommendations",
                "long_desc": "Advanced soil analysis including all macro/micro nutrients, physical properties, and AI-powered fertilizer recommendations with crop advisory",
                "images": [
                  {
                    "url": "https://soilcare-labs.com/comprehensive-test.jpg"
                  }
                ]
              },
              "price": {
                "currency": "INR",
                "value": "750"
              },
              "category_ids": ["c1"],
              "fulfillment_ids": ["f1"],
              "location_ids": ["lab-nagpur"],
              "time": {
                "label": "Report delivery time",
                "duration": "P5D"
              },
              "tags": [
                {
                  "descriptor": {
                    "name": "test-parameters"
                  },
                  "list": [
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
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  }
}
```

#### select

**Selecting a specific soil testing service**

```json
{
  "context": {
    "domain": "services:uai",
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
    "bap_id": "farmer-app.uki.com",
    "bap_uri": "https://farmer-app.uki.com",
    "bpp_id": "soil-lab-network.com",
    "bpp_uri": "https://soil-lab-network.com",
    "transaction_id": "soil-test-001",
    "message_id": "msg-003",
    "timestamp": "2025-06-02T19:07:25Z"
  },
  "message": {
    "order": {
      "provider": {
        "id": "soilcare-labs"
      },
      "items": [
        {
          "id": "comprehensive-analysis",
          "quantity": {
            "selected": {
              "count": 1
            }
          }
        }
      ],
      "fulfillments": [
        {
          "id": "f1",
          "stops": [
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
          ]
        }
      ]
    }
  }
}
```

#### on_select

**Quote response from selected provider**

```json
{
  "context": {
    "domain": "services:uai",
    "action": "on_select",
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
    "bap_id": "farmer-app.uki.com",
    "bap_uri": "https://farmer-app.uki.com",
    "bpp_id": "soil-lab-network.com",
    "bpp_uri": "https://soil-lab-network.com",
    "transaction_id": "soil-test-001",
    "message_id": "msg-003",
    "timestamp": "2025-06-02T19:07:25Z"
  },
  "message": {
    "order": {
      "provider": {
        "id": "soilcare-labs",
        "descriptor": {
          "name": "SoilCare Labs",
          "short_desc": "Advanced soil analysis with AI-powered recommendations"
        }
      },
      "items": [
        {
          "id": "comprehensive-analysis",
          "descriptor": {
            "name": "Comprehensive Soil Analysis + Advisory",
            "short_desc": "Complete soil testing with personalized crop recommendations"
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
          "fulfillment_ids": ["f1"],
          "time": {
            "label": "Report delivery time",
            "duration": "P5D"
          }
        }
      ],
      "fulfillments": [
        {
          "id": "f1",
          "type": "home-collection",
          "stops": [
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
          ]
        }
      ],
      "quote": {
        "price": {
          "currency": "INR",
          "value": "780"
        },
        "breakup": [
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
        ]
      }
    }
  }
}
```

#### init

**Initialize order with customer details**

```json
{
  "context": {
    "domain": "services:uai",
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
    "bap_id": "farmer-app.uki.com",
    "bap_uri": "https://farmer-app.uki.com",
    "bpp_id": "soil-lab-network.com",
    "bpp_uri": "https://soil-lab-network.com",
    "transaction_id": "soil-test-001",
    "message_id": "msg-004",
    "timestamp": "2025-06-02T19:07:25Z"
  },
  "message": {
    "order": {
      "provider": {
        "id": "soilcare-labs"
      },
      "items": [
        {
          "id": "comprehensive-analysis",
          "quantity": {
            "selected": {
              "count": 1
            }
          }
        }
      ],
      "fulfillments": [
        {
          "id": "f1",
          "stops": [
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
          ],
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
      ],
      "billing": {
        "name": "Ravi Sharma",
        "phone": "9876543210",
        "email": "ravi.sharma@email.com",
        "address": "Village Karanja, Wardha, Maharashtra - 442001"
      }
    }
  }
}
```

#### on_init

**Payment terms and order confirmation details**

```json
{
  "context": {
    "domain": "services:uai",
    "action": "on_init",
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
    "bap_id": "farmer-app.uki.com",
    "bap_uri": "https://farmer-app.uki.com",
    "bpp_id": "soil-lab-network.com",
    "bpp_uri": "https://soil-lab-network.com",
    "transaction_id": "soil-test-001",
    "message_id": "msg-004",
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
      "items": [
        {
          "id": "comprehensive-analysis",
          "descriptor": {
            "name": "Comprehensive Soil Analysis + Advisory"
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
      ],
      "fulfillments": [
        {
          "id": "f1",
          "type": "home-collection",
          "stops": [
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
          ],
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
      ],
      "quote": {
        "price": {
          "currency": "INR",
          "value": "780"
        },
        "breakup": [
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
        ]
      },
      "billing": {
        "name": "Ravi Sharma",
        "phone": "9876543210",
        "email": "ravi.sharma@email.com",
        "address": "Village Karanja, Wardha, Maharashtra - 442001"
      },
      "payments": [
        {
          "type": "ON-FULFILLMENT",
          "collected_by": "BPP",
          "status": "NOT-PAID",
          "params": {
            "amount": "780",
            "currency": "INR"
          }
        }
      ],
      "cancellation_terms": [
        {
          "fulfillment_state": {
            "descriptor": {
              "code": "sample-not-collected"
            }
          },
          "cancellation_fee": {
            "percentage": "0"
          }
        },
        {
          "fulfillment_state": {
            "descriptor": {
              "code": "sample-collected"
            }
          },
          "cancellation_fee": {
            "percentage": "50"
          }
        }
      ]
    }
  }
}
```

#### confirm

**Final order confirmation**

```json
{
  "context": {
    "domain": "services:uai",
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
    "bap_id": "farmer-app.uki.com",
    "bap_uri": "https://farmer-app.uki.com",
    "bpp_id": "soil-lab-network.com",
    "bpp_uri": "https://soil-lab-network.com",
    "transaction_id": "soil-test-001",
    "message_id": "msg-005",
    "timestamp": "2025-06-02T19:07:25Z"
  },
  "message": {
    "order": {
      "provider": {
        "id": "soilcare-labs"
      },
      "items": [
        {
          "id": "comprehensive-analysis",
          "quantity": {
            "selected": {
              "count": 1
            }
          }
        }
      ],
      "fulfillments": [
        {
          "id": "f1",
          "stops": [
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
          ],
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
      ],
      "billing": {
        "name": "Ravi Sharma",
        "phone": "9876543210",
        "email": "ravi.sharma@email.com",
        "address": "Village Karanja, Wardha, Maharashtra - 442001"
      },
      "payments": [
        {
          "type": "ON-FULFILLMENT",
          "collected_by": "BPP",
          "status": "NOT-PAID",
          "params": {
            "amount": "780",
            "currency": "INR"
          }
        }
      ]
    }
  }
}
```

#### on_confirm

**Order confirmed with tracking details**

```json
{
  "context": {
    "domain": "services:uai",
    "action": "on_confirm",
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
    "bap_id": "farmer-app.uki.com",
    "bap_uri": "https://farmer-app.uki.com",
    "bpp_id": "soil-lab-network.com",
    "bpp_uri": "https://soil-lab-network.com",
    "transaction_id": "soil-test-001",
    "message_id": "msg-005",
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
      "items": [
        {
          "id": "comprehensive-analysis",
          "descriptor": {
            "name": "Comprehensive Soil Analysis + Advisory"
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
      ],
      "fulfillments": [
        {
          "id": "f1",
          "type": "home-collection",
          "state": {
            "descriptor": {
              "code": "CONFIRMED",
              "name": "Collection scheduled"
            }
          },
          "stops": [
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
          ],
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
      ],
      "quote": {
        "price": {
          "currency": "INR",
          "value": "780"
        },
        "breakup": [
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
        ]
      },
      "billing": {
        "name": "Ravi Sharma",
        "phone": "9876543210",
        "email": "ravi.sharma@email.com",
        "address": "Village Karanja, Wardha, Maharashtra - 442001"
      },
      "payments": [
        {
          "type": "ON-FULFILLMENT",
          "collected_by": "BPP",
          "status": "NOT-PAID",
          "params": {
            "amount": "780",
            "currency": "INR"
          }
        }
      ]
    }
  }
}
```

#### status

**Track order status**

```json
{
  "context": {
    "domain": "services:uai",
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
    "bap_id": "farmer-app.uki.com",
    "bap_uri": "https://farmer-app.uki.com",
    "bpp_id": "soil-lab-network.com",
    "bpp_uri": "https://soil-lab-network.com",
    "transaction_id": "soil-test-001",
    "message_id": "msg-006",
    "timestamp": "2025-06-04T10:00:00Z"
  },
  "message": {
    "order_id": "SOIL001234"
  }
}
```

#### on_status (Multiple status updates)

**Status: Sample collected**

```json
{
  "context": {
    "domain": "services:uai",
    "action": "on_status",
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
    "bap_id": "farmer-app.uki.com",
    "bap_uri": "https://farmer-app.uki.com",
    "bpp_id": "soil-lab-network.com",
    "bpp_uri": "https://soil-lab-network.com",
    "transaction_id": "soil-test-001",
    "message_id": "msg-006",
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
      "items": [
        {
          "id": "comprehensive-analysis",
          "descriptor": {
            "name": "Comprehensive Soil Analysis + Advisory"
          }
        }
      ],
      "fulfillments": [
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
      ]
    }
  }
}
```

**Status: Results ready**

```json
{
  "context": {
    "domain": "services:uai",
    "action": "on_status",
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
    "bap_id": "farmer-app.uki.com",
    "bap_uri": "https://farmer-app.uki.com",
    "bpp_id": "soil-lab-network.com",
    "bpp_uri": "https://soil-lab-network.com",
    "transaction_id": "soil-test-001",
    "message_id": "msg-007",
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
      "items": [
        {
          "id": "comprehensive-analysis",
          "descriptor": {
            "name": "Comprehensive Soil Analysis + Advisory"
          }
        }
      ],
      "fulfillments": [
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
      ],
      "documents": [
        {
          "url": "https://soilcare-labs.com/reports/SOIL001234.pdf",
          "label": "Soil Test Report",
          "media_type": "application/pdf"
        }
      ],
      "payments": [
        {
          "type": "ON-FULFILLMENT",
          "collected_by": "BPP",
          "status": "PAID",
          "params": {
            "amount": "780",
            "currency": "INR"
          }
        }
      ]
    }
  }
}
```

#### support

**Request support**

```json
{
  "context": {
    "domain": "services:uai",
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
    "bap_id": "farmer-app.uki.com",
    "bap_uri": "https://farmer-app.uki.com",
    "bpp_id": "soil-lab-network.com",
    "bpp_uri": "https://soil-lab-network.com",
    "transaction_id": "soil-test-001",
    "message_id": "msg-008",
    "timestamp": "2025-06-07T16:00:00Z"
  },
  "message": {
    "ref_id": "SOIL001234"
  }
}
```

#### on_support

**Support contact details**

```json
{
  "context": {
    "domain": "services:uai",
    "action": "on_support",
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
    "bap_id": "farmer-app.uki.com",
    "bap_uri": "https://farmer-app.uki.com",
    "bpp_id": "soil-lab-network.com",
    "bpp_uri": "https://soil-lab-network.com",
    "transaction_id": "soil-test-001",
    "message_id": "msg-008",
    "timestamp": "2025-06-07T16:00:00Z"
  },
  "message": {
    "support": {
      "ref_id": "SOIL001234",
      "phone": "18002345678",
      "email": "support@soilcare-labs.com",
      "url": "https://soilcare-labs.com/support"
    }
  }
}
```

#### rating

**Rate the service**

```json
{
  "context": {
    "domain": "services:uai",
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
    "bap_id": "farmer-app.uki.com",
    "bap_uri": "https://farmer-app.uki.com",
    "bpp_id": "soil-lab-network.com",
    "bpp_uri": "https://soil-lab-network.com",
    "transaction_id": "soil-test-001",
    "message_id": "msg-009",
    "timestamp": "2025-06-07T17:00:00Z"
  },
  "message": {
    "ratings": [
      {
        "id": "soilcare-labs",
        "rating_category": "Provider",
        "value": "5"
      },
      {
        "id": "comprehensive-analysis",
        "rating_category": "Item",
        "value": "5"
      }
    ]
  }
}
```

#### on_rating

**Rating acknowledgment with feedback form**

```json
{
  "context": {
    "domain": "services:uai",
    "action": "on_rating",
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
    "bap_id": "farmer-app.uki.com",
    "bap_uri": "https://farmer-app.uki.com",
    "bpp_id": "soil-lab-network.com",
    "bpp_uri": "https://soil-lab-network.com",
    "transaction_id": "soil-test-001",
    "message_id": "msg-009",
    "timestamp": "2025-06-07T17:00:00Z"
  },
  "message": {
    "feedback_form": {
      "form": {
        "url": "https://soilcare-labs.com/feedback/SOIL001234"
      }
    }
  }
}
```

## Taxonomy and Layer 2 Configuration

### Service Categories

| Category Code | Name | Description |
|---------------|------|-------------|
| soil-testing | Soil Testing Services | Laboratory analysis of soil samples |
| soil-health-advisory | Soil Health Advisory | Consultation and recommendations based on soil tests |

### Test Parameter Taxonomy

| Parameter Code | Name | Description |
|----------------|------|-------------|
| nitrogen | Available Nitrogen | Nitrogen content in soil |
| phosphorus | Available Phosphorus | Phosphorus content in soil |
| potassium | Available Potassium | Potassium content in soil |
| ph-level | Soil pH | Acidity/alkalinity of soil |
| organic-carbon | Organic Carbon | Organic matter content |
| micronutrients | Micronutrients | Zn, Fe, Mn, Cu, B, S analysis |
| soil-texture | Soil Texture | Clay, silt, sand composition |
| electrical-conductivity | EC | Soil salinity measurement |

### Fulfillment Types

| Type Code | Name | Description |
|-----------|------|-------------|
| home-collection | Home Collection | Agent visits farm to collect samples |
| drop-off | Drop-off | Farmer brings samples to lab |
| mobile-lab | Mobile Lab | Lab vehicle visits farm |

### Order Status Codes

| Status Code | Name | Description |
|-------------|------|-------------|
| CONFIRMED | Order Confirmed | Lab has confirmed the order |
| AGENT-ASSIGNED | Agent Assigned | Collection agent assigned |
| SAMPLE-COLLECTED | Sample Collected | Soil samples collected from farm |
| RECEIVED-AT-LAB | Received at Lab | Samples received at laboratory |
| TESTING-IN-PROGRESS | Testing in Progress | Laboratory analysis ongoing |
| COMPLETED | Completed | Test results ready |
| CANCELLED | Cancelled | Order cancelled |

## Challenges and Assumptions

### Technical Challenges

1. **Sample Quality Assurance**
   - Ensuring proper sample collection methodology
   - Maintaining sample integrity during transport
   - Standardizing collection procedures across agents

2. **Lab Capacity Management**
   - Dynamic pricing based on lab workload
   - Realistic delivery time estimation
   - Queue management for peak seasons

3. **Result Interpretation**
   - Standardizing report formats across labs
   - Ensuring actionable recommendations
   - Multi-language support for regional farmers

4. **Geographic Coverage**
   - Limited lab presence in remote areas
   - Collection agent availability
   - Logistics for sample transport

### Business Assumptions

1. **Certification Requirements**
   - All labs are NABL/ISO certified
   - Agents are trained in proper sampling
   - Quality assurance protocols in place

2. **Pricing Models**
   - Transparent pricing with no hidden costs
   - Standardized collection charges
   - Volume discounts for multiple tests

3. **Digital Literacy**
   - Farmers can access digital reports
   - Basic smartphone usage capability
   - Support for voice-based interactions

## Developer Notes

### Integration Guidelines

#### For BAP Developers (Farmer Apps)

1. **Search Implementation**
   ```javascript
   // Example search with location radius
   const searchPayload = {
     intent: {
       category: { descriptor: { code: "soil-testing" } },
       fulfillment: {
         stops: [{
           location: {
             circle: {
               gps: "20.7489, 78.6085",
               radius: { unit: "km", value: "25" }
             }
           }
         }]
       }
     }
   };
   ```

2. **Order Tracking**
   - Implement periodic status calls
   - Handle asynchronous status updates
   - Store order IDs for future reference

3. **Payment Integration**
   - Support multiple payment modes
   - Handle payment collection by agents
   - Implement refund mechanisms

#### For BPP Developers (Lab Platforms)

1. **Catalog Management**
   ```javascript
   // Dynamic pricing based on capacity
   const calculatePrice = (basePrice, demandFactor, distance) => {
     return basePrice * demandFactor + (distance * collectionRate);
   };
   ```

2. **Agent Management**
   - Real-time agent tracking
   - Capacity planning algorithms
   - Route optimization for collections

3. **Lab Integration**
   - LIMS (Laboratory Information Management System) integration
   - Automated report generation
   - Quality control workflows

### Testing Recommendations

1. **Sandbox Testing**
   - Mock lab responses for different test types
   - Simulate agent collection scenarios
   - Test payment failure cases

2. **Load Testing**
   - Peak season demand simulation
   - Multiple concurrent orders
   - Geographic distribution testing

3. **Integration Testing**
   - End-to-end flow validation
   - Cross-platform compatibility
   - Mobile network reliability

### Security Considerations

1. **Data Privacy**
   - Farmer data protection
   - Secure report transmission
   - GDPR compliance for data handling

2. **Authentication**
   - Secure API endpoints
   - Agent identity verification
   - Digital signature for reports

## Schema Details

| Use Case | Input Details | Values | Data Types |
|----------|---------------|--------|------------|
| Soil Testing | Test Parameters | NPK, pH, micronutrients | array |
| Collection | Location | GPS coordinates, address | point/string |
| Timing | Collection Window | Date/time range | datetime |
| Lab Selection | Certification | NABL, ISO | varchar |
| Pricing | Test Type | Basic, comprehensive | varchar |
| Results | Report Format | PDF, digital | varchar |

## Links to Resources

- [Beckn Protocol Specification](https://developers.becknprotocol.io/)
- [UKI Network Documentation](https://github.com/beckn/missions/tree/main/UAI)
- [Soil Testing Standards](https://www.nabl-india.org/)

## Sandbox Details

### Registry/Gateway:
- **Gateway Sandbox:** gateway-uki.becknprotocol.io
- **Registry Sandbox:** registry-uki.becknprotocol.io

### BPP:
- **BPP Client Sandbox:** bpp-ps-client-sandbox-uki.becknprotocol.io
- **BPP Network Sandbox:** bpp-ps-network-sandbox-uki.becknprotocol.io
- **BPP Sandbox:** bpp-unified-sandbox-uki.becknprotocol.io

### Domain name:
```
services:uai
```

---

This comprehensive implementation guide provides developers with all necessary information to integrate soil testing services into the UKI network using the Beckn Protocol. The guide includes practical examples, real-world scenarios, and technical considerations for successful implementation.
