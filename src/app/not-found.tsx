import Link from "next/link";
import Image from "next/image";
import { Home, ArrowRight, Compass, Headphones, ExternalLink, ShieldCheck } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen w-full flex-col justify-between overflow-hidden bg-[#F5F6F8] font-sans antialiased selection:bg-[#D4AF37]/20">
      {/* ================= IMAGEM DE FUNDO 100% TELA CHEIA E LARGURA INTEIRA ================= */}
      <div className="fixed inset-0 z-0 h-screen w-screen">
        <Image
          src="/astronauta404.png"
          alt="NeverX 404 Background"
          fill
          priority
          quality={100}
          sizes="100vw"
          className="h-full w-full object-cover object-center pointer-events-none select-none"
        />
      </div>

      {/* ================= HEADER ================= */}
      <header className="relative z-10 flex w-full items-center justify-between px-6 pt-8 sm:px-12 lg:pt-10">
        <div className="flex items-center">
          <span className="text-2xl font-black tracking-tight text-[#111111]">
            Never<span className="text-[#D4AF37]">X</span>
          </span>
        </div>

        <Link
          href="/dashboard"
          className="flex h-9 items-center gap-2 rounded-full border border-black/[0.06] bg-white/90 px-4 text-[11px] font-bold text-[#111111] shadow-xs transition-all hover:bg-white hover:border-black/15 hover:shadow-md active:scale-95"
        >
          <Home className="h-3.5 w-3.5 text-[#111111]/70" />
          <span className="hidden sm:inline">Voltar para o início</span>
        </Link>
      </header>

      {/* ================= CONTEÚDO CENTRAL ================= */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-6 sm:px-12">
        <div className="flex w-full max-w-xl flex-col items-start pt-6 sm:pt-0">
          
          {/* Badge ERRO 404 */}
          <span className="mb-4 inline-flex items-center rounded-full bg-[#D4AF37]/15 px-3.5 py-1 text-[10px] font-extrabold uppercase tracking-widest text-[#B89428] border border-[#D4AF37]/30">
            ERRO 404
          </span>

          {/* Título Principal */}
          <h1 className="mb-5 text-[2.75rem] font-black leading-[1.04] tracking-tight text-[#111111] sm:text-[3.5rem] lg:text-[4.25rem]">
            Página não <br className="hidden sm:block" />
            encontrada
          </h1>

          {/* Subtítulo */}
          <p className="mb-8 max-w-[360px] text-xs leading-relaxed font-medium text-[#6E6E73] sm:text-sm sm:leading-relaxed">
            Parece que você se perdeu no espaço. <br className="hidden sm:block" />
            A página que você procura não existe <br className="hidden sm:block" />
            ou foi movida.
          </p>

          {/* Botões de Ação */}
          <div className="flex w-full flex-col items-start gap-3.5 sm:w-auto sm:flex-row sm:items-center">
            <Link
              href="/dashboard"
              className="group flex h-12 w-full items-center justify-center gap-3 rounded-full bg-[#111111] px-7 text-xs font-bold text-white shadow-[0_10px_25px_rgba(0,0,0,0.15)] transition-all hover:bg-black hover:shadow-[0_15px_30px_rgba(0,0,0,0.22)] active:scale-95 sm:w-auto"
            >
              <span>Voltar para o início</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>

            <Link
              href="/dashboard"
              className="flex h-12 w-full items-center justify-center gap-2 rounded-full border border-black/[0.08] bg-white px-7 text-xs font-bold text-[#111111] shadow-xs transition-all hover:border-black/20 hover:bg-white hover:shadow-md active:scale-95 sm:w-auto"
            >
              <Compass className="h-4 w-4 text-[#111111]/70" />
              <span>Explorar plataforma</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ================= SESSÃO INFERIOR ================= */}
      <div className="relative z-10 w-full px-6 pb-6">
        <div className="mx-auto mb-8 flex w-full max-w-[760px] flex-col items-center justify-between gap-5 rounded-[2.25rem] border border-black/[0.06] bg-white p-5 shadow-[0_12px_40px_rgba(0,0,0,0.03)] sm:flex-row sm:px-8 sm:py-4.5">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="flex h-13 w-13 shrink-0 items-center justify-center rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/25 shadow-xs">
              <Headphones className="h-5.5 w-5.5 text-[#D4AF37]" />
            </div>
            <div>
              <h3 className="text-xs font-extrabold text-[#111111] sm:text-sm">
                Precisa de ajuda?
              </h3>
              <p className="mt-0.5 text-[11px] font-medium text-[#6E6E73]">
                Nossa equipe está pronta para te ajudar.
              </p>
            </div>
          </div>

          <Link
            href="/conversas"
            className="flex h-9.5 items-center justify-center gap-2 rounded-full border border-black/[0.06] bg-[#F5F6F8] px-5 text-[11px] font-bold text-[#111111] transition-all hover:bg-[#EAEBED] hover:border-black/15 active:scale-95"
          >
            <span>Fale com o suporte</span>
            <ExternalLink className="h-3 w-3 text-[#111111]/60" />
          </Link>
        </div>

        <footer className="mx-auto flex w-full max-w-[760px] flex-col items-center justify-center gap-1">
          <ShieldCheck className="h-4.5 w-4.5 text-black/20" />
          <div className="text-center">
            <p className="text-[10px] font-black tracking-widest text-[#D4AF37] uppercase">
              NEVERX CRM
            </p>
            <p className="mt-0.5 text-[9px] font-medium text-[#6E6E73]">
              Todos os direitos reservados.
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}