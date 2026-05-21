import GraphClient from "@/ui/dashboard/GraphClient";

export const metadata = {
  title: "Mind Graph - Funny Todo",
  description: "Visualize and map out your connected idea chains in a premium mind map.",
};

/**
 * 서버 컴포넌트(SSR) 역할로 회귀한 마인드 그래프 페이지
 * 하위 클라이언트 바운더리 컴포넌트인 GraphClient로 ReactFlow와 상태 위임
 */
export default function NodeGraphPage() {
  return <GraphClient />;
}
