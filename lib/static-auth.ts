import { cookies } from 'next/headers'

const ADMIN_USERNAME = 'admin'
const ADMIN_PASSWORD = 'admin123!'
const SESSION_COOKIE_NAME = 'inventory_session'

// Simple base64 encoding/decoding for session data
// In production, use proper JWT or encryption
function encodeSession(data: any): string {
  return Buffer.from(JSON.stringify(data)).toString('base64')
}

function decodeSession(token: string): any {
  try {
    return JSON.parse(Buffer.from(token, 'base64').toString('utf-8'))
  } catch {
    return null
  }
}

export async function validateCredentials(username: string, password: string) {
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD
}

export async function createSession() {
  const cookieStore = await cookies()
  
  // Create session token with expiration
  const expiresAt = Date.now() + 60 * 60 * 24 * 7 * 1000 // 7 days
  const sessionData = { user: ADMIN_USERNAME, expiresAt }
  const sessionToken = encodeSession(sessionData)
  
  // Set cookie with the session data
  cookieStore.set(SESSION_COOKIE_NAME, sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })
}

export async function getSession() {
  try {
    const cookieStore = await cookies()
    const sessionToken = cookieStore.get(SESSION_COOKIE_NAME)?.value
    
    if (!sessionToken) {
      return null
    }
    
    const session = decodeSession(sessionToken)
    
    if (!session || !session.user) {
      return null
    }
    
    // Check if session has expired
    if (session.expiresAt < Date.now()) {
      return null
    }
    
    return { user: session.user }
  } catch (error) {
    return null
  }
}

export async function clearSession() {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE_NAME)
}
