import { NextRequest, NextResponse } from 'next/server'
import { getFileById } from '@/lib/file-storage'

// Configure for Edge Runtime (required for Cloudflare Pages)
export const runtime = 'edge'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ fileId: string }> }
) {
  try {
    const { fileId } = await params
    
    if (!fileId) {
      return NextResponse.json(
        { error: 'File ID is required' },
        { status: 400 }
      )
    }

    // Get file from storage (cloud or local)
    const fileData = await getFileById(fileId)
    
    if (!fileData) {
      return NextResponse.json(
        { error: 'File not found' },
        { status: 404 }
      )
    }

    const { file, metadata } = fileData

    // Set appropriate headers
    const headers = new Headers()
    headers.set('Content-Type', metadata.mimeType || 'application/octet-stream')
    headers.set('Content-Length', metadata.size.toString())
    headers.set('Content-Disposition', `attachment; filename="${metadata.originalName}"`)
    headers.set('Cache-Control', 'private, max-age=3600') // Cache for 1 hour

    return new NextResponse(file, {
      status: 200,
      headers
    })

  } catch (error) {
    console.error('Error serving file:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
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
