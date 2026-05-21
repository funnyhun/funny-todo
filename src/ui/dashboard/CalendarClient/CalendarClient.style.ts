import { CSSProperties } from 'react';

/**
 * CalendarClient 컴포넌트의 레이아웃 및 디자인에 쓰이는 CSS 클래스명 매핑
 */
export const calendarClasses = {
  headerControl: "glass",
  bodyWrapper: "glass",
  dayCell: "glass",
  dayRow: "",
  pageContainer: "fade-in",
} as const;

/**
 * 정적 인라인 스타일 매핑
 */
export const calendarStyles = {
  pageRoot: {
    maxWidth: "1400px",
    margin: "0 auto",
  } as CSSProperties,
  
  headerContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "2.5rem",
  } as CSSProperties,

  subtitleWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    marginBottom: "0.25rem",
  } as CSSProperties,

  subtitleText: {
    fontSize: "0.75rem",
    fontWeight: 700,
    color: "var(--primary)",
    textTransform: "uppercase",
    letterSpacing: "0.1em",
  } as CSSProperties,

  mainTitle: {
    fontSize: "2rem",
    fontWeight: 800,
    letterSpacing: "-0.02em",
  } as CSSProperties,

  monthController: {
    display: "flex",
    gap: "0.5rem",
    alignItems: "center",
    padding: "0.5rem",
    borderRadius: "var(--radius-full)",
    border: "1px solid var(--border)",
  } as CSSProperties,

  arrowBtn: {
    width: "36px",
    height: "36px",
    padding: 0,
    borderRadius: "50%",
  } as CSSProperties,

  currentMonthLabel: {
    fontSize: "1rem",
    fontWeight: 700,
    minWidth: "140px",
    textAlign: "center",
    letterSpacing: "-0.01em",
  } as CSSProperties,

  daysHeaderRow: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    marginBottom: "1rem",
  } as CSSProperties,

  dayHeaderCell: {
    textAlign: "center",
    color: "var(--text-muted)",
    fontSize: "0.75rem",
    fontWeight: 800,
    letterSpacing: "0.05em",
  } as CSSProperties,

  calendarGrid: {
    border: "1px solid var(--border)",
    borderRadius: "var(--radius-2xl)",
    overflow: "hidden",
    boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
  } as CSSProperties,

  weeksRow: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: "1px",
    background: "rgba(255,255,255,0.05)",
  } as CSSProperties,

  glassContainer: {
    padding: "2rem",
    borderRadius: "var(--radius-3xl)",
    border: "1px solid var(--border)",
  } as CSSProperties,
};

/**
 * 동적 상태에 따른 달력 날짜 셀 스타일 반환 함수
 */
export const getDayCellStyles = (isToday: boolean, isCurrentMonth: boolean): CSSProperties => {
  return {
    height: "140px",
    padding: "0.75rem",
    border: isToday ? "2px solid var(--primary)" : "1px solid var(--border)",
    background: isToday ? "rgba(124, 92, 252, 0.05)" : "var(--surface)",
    opacity: isCurrentMonth ? 1 : 0.2,
    display: "flex",
    flexDirection: "column",
    gap: "0.4rem",
    overflowY: "auto",
    transition: "transform 0.2s ease, background 0.2s ease",
    cursor: "default",
    position: "relative",
  };
};

/**
 * 동적 상태에 따른 날짜 텍스트 스타일 반환 함수
 */
export const getDayNumberStyles = (isToday: boolean): CSSProperties => {
  return {
    fontSize: "0.85rem",
    fontWeight: 700,
    color: isToday ? "var(--primary-light)" : "var(--text-secondary)",
    marginBottom: "0.25rem",
  };
};

/**
 * 아이디어/투두 종류별 동적 카드 스타일 반환 함수
 */
export const getIdeaItemStyles = (type: string): CSSProperties => {
  const isBlog = type === 'blog';
  return {
    fontSize: "0.7rem",
    fontWeight: 600,
    background: isBlog ? "rgba(16, 185, 129, 0.1)" : "rgba(124, 92, 252, 0.1)",
    color: isBlog ? "var(--status-completed)" : "var(--primary-light)",
    padding: "0.3rem 0.6rem",
    borderRadius: "8px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    border: `1px solid ${isBlog ? "rgba(16, 185, 129, 0.2)" : "rgba(124, 92, 252, 0.2)"}`,
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  };
};
