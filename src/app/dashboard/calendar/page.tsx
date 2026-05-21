import CalendarClient from "@/ui/dashboard/CalendarClient";

export const metadata = {
  title: "Timeline Calendar - Funny Todo",
  description: "Visualize and track your smashed ideas and timeline plans neatly.",
};

/**
 * 서버 컴포넌트(SSR) 역할로 회귀한 달력 페이지
 * 하위 클라이언트 바운더리 컴포넌트인 CalendarClient로 UI 제어 및 비즈니스 훅 위임
 */
export default function CalendarPage() {
  return <CalendarClient />;
}
