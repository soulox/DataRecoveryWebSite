import { NextResponse } from 'next/server'
import { checkS3Health } from '@/lib/cloud-storage'

// Configure for Edge Runtime
export const runtime = 'edge'

export async function GET() {
  try {
    // Check if cloud storage is configured
    const isConfigured = !!(
      process.env.AWS_ACCESS_KEY_ID && 
      process.env.AWS_SECRET_ACCESS_KEY && 
      process.env.AWS_S3_BUCKET
    )

    if (!isConfigured) {
      return NextResponse.json({
        status: 'not_configured',
        message: 'Cloud storage not configured. Using local storage fallback.',
        cloudStorage: false,
        localStorage: true,
        timestamp: new Date().toISOString()
      })
    }

    // Check cloud storage health
    const healthCheck = await checkS3Health()
    
    if (healthCheck.healthy) {
      return NextResponse.json({
        status: 'healthy',
        message: 'Cloud storage is working correctly',
        cloudStorage: true,
        localStorage: false,
        provider: 'AWS S3',
        bucket: process.env.AWS_S3_BUCKET,
        region: process.env.AWS_REGION || 'us-east-1',
        timestamp: new Date().toISOString()
      })
    } else {
      return NextResponse.json({
        status: 'unhealthy',
        message: `Cloud storage error: ${healthCheck.error}`,
        cloudStorage: false,
        localStorage: true,
        provider: 'AWS S3',
        error: healthCheck.error,
        timestamp: new Date().toISOString()
      }, { status: 503 })
    }

  } catch (error) {
    console.error('Health check error:', error)
    return NextResponse.json({
      status: 'error',
      message: 'Health check failed',
      cloudStorage: false,
      localStorage: true,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}

// Handle preflight requests for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
