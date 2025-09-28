
'use server'
 
import { signIn } from '@/auth'
 
export async function authenticate(prevState: any, formData: FormData) {
  try {
    await signIn('credentials', Object.fromEntries(formData))
    return { message: null } // On success, this won't be returned due to redirect
  } catch (error) {
    if ((error as Error).message.includes('CredentialsSignin')) {
      return { message: 'Invalid email or password.' }
    }
    // If it's not a credentials error, re-throw it
    throw error
  }
}
