import { cookies } from 'next/headers'

const ADMIN_USERNAME = 'admin'
const ADMIN_PASSWORD = 'admin123!'
const SESSION_COOKIE_NAME = 'inventory_session'

export async function validateCredentials(username: string, password: string) {
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD
}

export async function createSession() {
  const cookieStore = await cookies()
  const sessionToken = Buffer.from(JSON.stringify({
    user: ADMIN_USERNAME,
    timestamp: Date.now()
  })).toString('base64')
  
  cookieStore.set(SESSION_COOKIE_NAME, sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })
}

export async function getSession() {
  const cookieStore = await cookies()
  const sessionToken = cookieStore.get(SESSION_COOKIE_NAME)?.value
  
  if (!sessionToken) return null
  
  try {
    const session = JSON.parse(Buffer.from(sessionToken, 'base64').toString('utf-8'))
    return { user: session.user }
  } catch {
    return null
  }
}

export async function clearSession() {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE_NAME)
}
