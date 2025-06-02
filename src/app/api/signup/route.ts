import { NextRequest, NextResponse } from 'next/server'
import { MongoClient } from 'mongodb'

interface SignupData {
  name: string
  role: 'farmer' | 'buyer'
  phone: string
  district: string
  state: string
}

export async function POST(request: NextRequest) {
  try {
    const data: SignupData = await request.json()
    
    // Validate required fields
    if (!data.name || !data.role || !data.phone || !data.district || !data.state) {
      return NextResponse.json(
        { message: 'All fields are required | सभी फ़ील्ड आवश्यक हैं' },
        { status: 400 }
      )
    }

    // Validate role
    if (data.role !== 'farmer' && data.role !== 'buyer') {
      return NextResponse.json(
        { message: 'Invalid role selected | अमान्य भूमिका चयनित' },
        { status: 400 }
      )
    }

    // Get MongoDB URI from environment variables
    const mongoUri = process.env.MONGO_URI
    if (!mongoUri) {
      console.error('MONGO_URI environment variable is not set')
      return NextResponse.json(
        { message: 'Database configuration error | डेटाबेस कॉन्फ़िगरेशन त्रुटि' },
        { status: 500 }
      )
    }

    // Connect to MongoDB
    const client = new MongoClient(mongoUri)
    await client.connect()

    const db = client.db('soilconnect')
    const collection = db.collection('signups')

    // Use the current timestamp provided: 2025-06-02 21:01:53 UTC
    const currentTime = new Date('2025-06-02T21:01:53.000Z')
    
    const signupDoc = {
      ...data,
      roleType: data.role === 'buyer' ? 'Buyer/Testing Center | खरीदार/परीक्षण केंद्र' : 'Farmer | किसान',
      createdAt: currentTime,
      status: 'pending',
      submittedBy: 'nanda-kshr', // Current user login as provided
      serviceType: 'soil_testing',
      platform: 'soilconnect_web',
      language: 'bilingual_english_hindi',
      lastUpdated: currentTime,
      metadata: {
        userAgent: request.headers.get('user-agent') || 'unknown',
        ipAddress: request.headers.get('x-forwarded-for') || 
                   request.headers.get('x-real-ip') || 
                   'unknown',
        registrationSource: 'website_form',
        buttonClicked: data.role === 'farmer' ? 'Join as Farmer' : 'Join as Buyer',
        expectedServices: data.role === 'farmer' ? 
          ['soil_testing', 'npk_analysis', 'ph_testing', 'micronutrient_analysis', 'organic_carbon_test'] :
          ['provide_testing_services', 'farmer_outreach', 'laboratory_services', 'soil_analysis', 'consultation'],
        formCompletionTime: currentTime,
        sessionInfo: {
          submissionMethod: 'web_form',
          deviceType: request.headers.get('user-agent')?.includes('Mobile') ? 'mobile' : 'desktop'
        }
      }
    }

    // Insert the document
    const result = await collection.insertOne(signupDoc)
    
    // Close the connection
    await client.close()

    return NextResponse.json(
      { 
        message: 'Registration successful | पंजीकरण सफल',
        id: result.insertedId,
        welcomeMessage: data.role === 'farmer' ? 
          'Welcome as a Farmer | किसान के रूप में स्वागत है' :
          'Welcome as a Buyer | खरीदार के रूप में स्वागत है',
        timestamp: currentTime.toISOString(),
        nextSteps: data.role === 'farmer' ? 
          'We will connect you with soil testing centers in your area | हम आपको आपके क्षेत्र के मिट्टी परीक्षण केंद्रों से जोड़ेंगे' :
          'We will connect you with farmers who need soil testing services | हम आपको उन किसानों से जोड़ेंगे जिन्हें मिट्टी परीक्षण सेवाओं की आवश्यकता है'
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { message: 'Internal server error | आंतरिक सर्वर त्रुटि' },
      { status: 500 }
    )
  }
}