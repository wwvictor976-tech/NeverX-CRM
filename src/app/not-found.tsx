import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="card-surface w-full max-w-xl p-8 text-center sm:p-10">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10 text-4xl font-semibold text-emerald-300">
          404
        </div>

        <h1 className="mt-8 text-3xl font-semibold tracking-tight text-white">Página não encontrada</h1>
        <p className="mt-3 text-base text-slate-300">
          A página acessada não existe ou foi movida. Você pode voltar ao dashboard ou começar do início.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-3 font-medium text-slate-950 transition-colors hover:bg-emerald-400"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar para o Dashboard
          </Link>
          <Link
            href="/login"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 font-medium text-white transition-colors hover:bg-white/10"
          >
            <Home className="h-4 w-4" />
            Ir para o início
          </Link>
        </div>
      </div>
    </main>
  );
}
