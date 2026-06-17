import { getSession } from '@/lib/static-auth'
import { redirect } from 'next/navigation'

export default async function Page() {
  const session = await getSession()

  if (session?.user) {
    redirect('/dashboard')
  } else {
    redirect('/sign-in')
  }
}
