import { LoginForm } from "@/components/auth/login-form"

export default function LoginPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <LoginForm />
    </div>
  )
}

export const metadata = {
  title: "Sign In - Adfinitum Trails",
  description: "Sign in to your Adfinitum Trails account",
}
