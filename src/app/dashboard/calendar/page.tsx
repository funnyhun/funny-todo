"use client";

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
  addDays, 
  eachDayOfInterval 
} from "date-fns";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock } from "lucide-react";
import { useIdeas } from "@/hooks/useIdeas";

export default function CalendarPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const { ideas } = useIdeas();

  const renderHeader = () => (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
      <div>
        <h1 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: "0.5rem" }}>Calendar</h1>
        <p style={{ color: "var(--text-secondary)" }}>Visualize your idea lifecycle.</p>
      </div>
      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} className="btn btn-ghost" style={{ padding: "0.5rem" }}>
          <ChevronLeft size={20} />
        </button>
        <span style={{ fontSize: "1.1rem", fontWeight: 600, minWidth: "140px", textAlign: "center" }}>
          {format(currentMonth, "MMMM yyyy")}
        </span>
        <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} className="btn btn-ghost" style={{ padding: "0.5rem" }}>
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );

  const renderDays = () => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return (
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", marginBottom: "1rem" }}>
        {days.map(day => (
          <div key={day} style={{ textAlign: "center", color: "var(--text-muted)", fontSize: "0.85rem", fontWeight: 600 }}>
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

        days.push(
          <div
            key={day.toString()}
            className="glass"
            style={{
              height: "120px",
              padding: "0.5rem",
              border: "1px solid rgba(255, 255, 255, 0.05)",
              opacity: isSameMonth(day, monthStart) ? 1 : 0.3,
              display: "flex",
              flexDirection: "column",
              gap: "0.25rem",
              overflowY: "auto"
            }}
          >
            <span style={{ fontSize: "0.8rem", fontWeight: 600, color: isSameDay(day, new Date()) ? "var(--primary)" : "var(--text-muted)" }}>
              {format(day, "d")}
            </span>
            {dayIdeas.map(idea => (
              <div 
                key={idea.id}
                style={{ 
                  fontSize: "0.7rem", 
                  background: idea.type === 'blog' ? "rgba(16, 185, 129, 0.15)" : "rgba(124, 92, 252, 0.15)",
                  color: idea.type === 'blog' ? "#10B981" : "var(--primary)",
                  padding: "0.2rem 0.4rem",
                  borderRadius: "4px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  border: `1px solid ${idea.type === 'blog' ? "rgba(16, 185, 129, 0.2)" : "rgba(124, 92, 252, 0.2)"}`
                }}
              >
                {idea.title}
              </div>
            ))}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div key={day.toString()} style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)" }}>
          {days}
        </div>
      );
      days = [];
    }

    return <div style={{ border: "1px solid rgba(255, 255, 255, 0.05)", borderRadius: "var(--radius-lg)", overflow: "hidden" }}>{rows}</div>;
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
}
