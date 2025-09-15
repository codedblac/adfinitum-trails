import { ForgotPasswordForm } from "@/components/auth/forgot-password-form"

export default function ForgotPasswordPage() {
  return (
    <main className="flex justify-center items-center min-h-screen bg-muted">
      <div className="w-full max-w-md px-4">
        <ForgotPasswordForm />
      </div>
    </main>
  )
}

export const metadata = {
  title: "Forgot Password - Adfinitum Trails",
  description: "Reset your Adfinitum Trails account password",
}
