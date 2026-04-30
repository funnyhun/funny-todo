import { Suspense } from "react";
import { BrainCircuit } from "lucide-react";
import IdeaChainContent from "@/components/dashboard/IdeaChainContent";

function IdeaPageFallback() {
  return (
    <div style={{ height: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <BrainCircuit className="animate-pulse" size={48} color="var(--primary)" />
    </div>
  );
}

export default function IdeaPage() {
  return (
    <Suspense fallback={<IdeaPageFallback />}>
      <IdeaChainContent />
    </Suspense>
  );
}
