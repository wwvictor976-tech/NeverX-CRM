import { Suspense } from "react";
import { PrivateLayout } from "@/components/layout/private-layout";
import { ConversationsContent } from "./_components/conversations-content";

export default function ConversationsPage() {
  return (
    <PrivateLayout
      title="Conversas"
      subtitle="Centralize o atendimento e mantenha o histórico de relacionamento por cliente."
      mainClassName="overflow-hidden"
      contentClassName="h-full min-h-0"
    >
      <Suspense fallback={<div className="card-surface flex min-h-[420px] items-center justify-center text-xs text-muted-foreground">A carregar conversas...</div>}>
        <ConversationsContent />
      </Suspense>
    </PrivateLayout>
  );
}
