import { LoginForm } from "@/modules/auth/login/components/login-form";

export default function Login() {
  return (
    <section className="flex justify-center items-center h-dvh">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </section>
  );
}
