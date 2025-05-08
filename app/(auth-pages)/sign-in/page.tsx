import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function Login({ searchParams }: { searchParams: Message }) {
  return (
    <form className="flex-1 flex flex-col mt-5 min-w-64 md:w-80 ">
      <h1 className="text-2xl font-medium">Faça Login</h1>
      <p className="text-sm text-foreground">
        Não possuí uma conta?{" "}
        <Link className="text-foreground font-medium underline" href="/sign-up">
          Registre-se
        </Link>
      </p>
      <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
        <Label htmlFor="email">E-mail</Label>
        <Input name="email" placeholder="you@example.com" required />
        <div className="flex justify-between items-center">
          <Label htmlFor="password">Senha</Label>
          <Link
            className="text-xs text-foreground underline"
            href="/forgot-password"
          >
            Esqueceu sua senha?
          </Link>
        </div>
        <Input
          type="password"
          name="password"
          placeholder="Your password"
          required
        />
        <SubmitButton pendingText="Signing In..." formAction={signInAction}>
          Entrar
        </SubmitButton>
        <FormMessage message={searchParams} />
      </div>
    </form>
  );
}