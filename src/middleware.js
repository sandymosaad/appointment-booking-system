import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'

export async function middleware(request) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })

          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()
  const pathname = request.nextUrl.pathname

  if (!user) {
    const isProtected = pathname.startsWith('/client-dashboard') || 
                        pathname.startsWith('/provider-dashboard') 

    if (isProtected) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
    return response
  }

  const role = user.user_metadata?.role

  if (role === 'Client' && pathname.startsWith('/provider-dashboard')) {
    return NextResponse.redirect(new URL('/client-dashboard', request.url))
  }

  if (role === 'Provider' && pathname.startsWith('/client-dashboard')) {
    return NextResponse.redirect(new URL('/provider-dashboard', request.url))
  }

  return response
}

 export const config = {

matcher: ['/client-dashboard', '/provider-dashboard'],

};
