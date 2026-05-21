'use client';

import { useState } from "react";
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  isSameMonth, 
  isSameDay, 
  addDays 
} from "date-fns";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { useIdeas } from "@/common/hooks/useIdeas";
import { motion } from "framer-motion";
import { 
  calendarStyles, 
  calendarClasses, 
  getDayCellStyles, 
  getDayNumberStyles, 
  getIdeaItemStyles 
} from "./CalendarClient.style";

/**
 * 3선식 구조에 맞춰 인라인 스타일 및 로직을 격리 분리한 달력 뷰 클라이언트 컴포넌트
 */
export default function CalendarClient() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const { ideas } = useIdeas();

  const renderHeader = () => (
    <div style={calendarStyles.headerContainer}>
      <div>
        <div style={calendarStyles.subtitleWrapper}>
          <Sparkles size={14} color="var(--primary)" />
          <span style={calendarStyles.subtitleText}>Timeline</span>
        </div>
        <h1 style={calendarStyles.mainTitle}>Calendar</h1>
      </div>
      <div className={calendarClasses.headerControl} style={calendarStyles.monthController}>
        <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} className="btn btn-ghost" style={calendarStyles.arrowBtn}>
          <ChevronLeft size={18} />
        </button>
        <span style={calendarStyles.currentMonthLabel}>
          {format(currentMonth, "MMMM yyyy")}
        </span>
        <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} className="btn btn-ghost" style={calendarStyles.arrowBtn}>
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );

  const renderDays = () => {
    const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    return (
      <div style={calendarStyles.daysHeaderRow}>
        {days.map(day => (
          <div key={day} style={calendarStyles.dayHeaderCell}>
            {day}
          </div>
        ))}
      </div>
    );
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const cloneDay = day;
        const dayIdeas = ideas.filter(idea => 
          idea.start_date && isSameDay(new Date(idea.start_date), cloneDay)
        );

        const isToday = isSameDay(day, new Date());
        const isCurrentMonth = isSameMonth(day, monthStart);

        days.push(
          <div
            key={day.toString()}
            className={calendarClasses.dayCell}
            style={getDayCellStyles(isToday, isCurrentMonth)}
          >
            <span style={getDayNumberStyles(isToday)}>
              {format(day, "d")}
            </span>
            {dayIdeas.map(idea => (
              <motion.div 
                key={idea.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                style={getIdeaItemStyles(idea.type)}
              >
                {idea.title}
              </motion.div>
            ))}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div key={day.toString()} style={calendarStyles.weeksRow}>
          {days}
        </div>
      );
      days = [];
    }

    return (
      <div style={calendarStyles.calendarGrid}>
        {rows}
      </div>
    );
  };

  return (
    <div className={calendarClasses.pageContainer} style={calendarStyles.pageRoot}>
      {renderHeader()}
      <div className={calendarClasses.bodyWrapper} style={calendarStyles.glassContainer}>
        {renderDays()}
        {renderCells()}
      </div>
    </div>
  );
}
