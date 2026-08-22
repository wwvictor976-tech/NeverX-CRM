import { Suspense } from "react";
import { PrivateLayout } from "@/components/layout/private-layout";
import { ConversationsContent } from "./_components/conversations-content";

export default function ConversationsPage() {
  return (
    <PrivateLayout
      title="Inbox"
      subtitle="Atendimento omnicanal e contexto do cliente em um só lugar."
      mainClassName="overflow-hidden !px-0 !py-0"
      contentClassName="h-full min-h-0 !max-w-none"
    >
      <Suspense fallback={<div className="flex h-full min-h-[420px] items-center justify-center bg-background text-xs text-muted-foreground">Carregando inbox...</div>}>
        <ConversationsContent />
      </Suspense>
    </PrivateLayout>
  );
}
