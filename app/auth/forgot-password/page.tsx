import { ForgotPasswordForm } from "@/components/auth/forgot-password-form"

export default function ForgotPasswordPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <ForgotPasswordForm />
    </div>
  )
}

export const metadata = {
  title: "Forgot Password - Adfinitum Trails",
  description: "Reset your Adfinitum Trails account password",
}
