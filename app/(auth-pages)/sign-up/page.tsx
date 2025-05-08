import { signUpAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { SmtpMessage } from "../smtp-message";

export default function Signup({ searchParams }: { searchParams: Message }) {
  if ("message" in searchParams) {
    return (
      <div className="w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2 p-4">
        <FormMessage message={searchParams} />
      </div>
    );
  }

  return (
    <div>
      <form className="flex flex-col min-w-64 mt-5 md:w-80 mx-auto">
        <h1 className="text-2xl font-medium">Registre-se</h1>
        <p className="text-sm text text-foreground">
          Já possuí uma conta?{" "}
          <Link className="text-primary font-medium underline" href="/sign-in">
            Faça Login
          </Link>
        </p>
        <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
          <Label htmlFor="name">Nome completo</Label>
          <Input name="name" placeholder="Seu nome completo" required />

          <Label htmlFor="email">E-mail</Label>
          <Input
            name="email"
            type="email"
            placeholder="seu@email.com"
            required
            aria-describedby="emailHelp"
          />

          <Label htmlFor="password">Sua senha</Label>
          <Input
            type="password"
            name="password"
            placeholder="Sua senha"
            minLength={6}
            required
          />

          <SubmitButton formAction={signUpAction} pendingText="Signing up...">
            Registrar-se
          </SubmitButton>

          <FormMessage message={searchParams} />
        </div>
      </form>
      <SmtpMessage />
    </div>
  );
}