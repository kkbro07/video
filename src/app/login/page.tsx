
'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { authenticate } from '@/app/login/actions' // We will create this next

const initialState = {
  message: null,
}

function LoginButton() {
  const { pending } = useFormStatus()

  return (
    <button type="submit" aria-disabled={pending} className="w-full bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 disabled:bg-gray-400">
      {pending ? 'Logging in...' : 'Login'}
    </button>
  )
}

export default function LoginPage() {
  const [state, formAction] = useFormState(authenticate, initialState)

  return (
    <main className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center">Admin Login</h1>
        <form action={formAction} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
            />
          </div>
          <div className="flex flex-col items-center justify-between">
            <LoginButton />
            {state?.message && <p className="text-red-500 mt-4">{state.message}</p>}
          </div>
        </form>
      </div>
    </main>
  )
}
