import { RegisterForm } from "@/components/auth/register-form"

export default function RegisterPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <RegisterForm />
    </div>
  )
}

export const metadata = {
  title: "Create Account - Adfinitum Trails",
  description: "Create your Adfinitum Trails account",
}
