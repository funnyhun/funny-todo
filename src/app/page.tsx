import React from 'react';
import { getIdeasAPI } from '@/api/ideas/ideas';
import DashboardClient from '@/ui/dashboard/DashboardClient';

export const revalidate = 0; // 항상 실시간 갱신 처리

export default async function DashboardPage() {
  // 서버 측에서 비동기로 초기 아이디어 데이터를 호출합니다.
  const ideas = await getIdeasAPI();

  return <DashboardClient initialIdeas={ideas} />;
}
