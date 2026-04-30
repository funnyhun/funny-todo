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
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, Sparkles } from "lucide-react";
import { useIdeas } from "@/hooks/useIdeas";
import { motion, AnimatePresence } from "framer-motion";

export default function CalendarPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const { ideas } = useIdeas();

  const renderHeader = () => (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2.5rem" }}>
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
          <Sparkles size={14} color="var(--primary)" />
          <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--primary)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Timeline</span>
        </div>
        <h1 style={{ fontSize: "2rem", fontWeight: 800, letterSpacing: "-0.02em" }}>Calendar</h1>
      </div>
      <div className="glass" style={{ display: "flex", gap: "0.5rem", alignItems: "center", padding: "0.5rem", borderRadius: "var(--radius-full)", border: "1px solid var(--border)" }}>
        <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} className="btn btn-ghost" style={{ width: "36px", height: "36px", padding: 0, borderRadius: "50%" }}>
          <ChevronLeft size={18} />
        </button>
        <span style={{ fontSize: "1rem", fontWeight: 700, minWidth: "140px", textAlign: "center", letterSpacing: "-0.01em" }}>
          {format(currentMonth, "MMMM yyyy")}
        </span>
        <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} className="btn btn-ghost" style={{ width: "36px", height: "36px", padding: 0, borderRadius: "50%" }}>
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );

  const renderDays = () => {
    const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    return (
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", marginBottom: "1rem" }}>
        {days.map(day => (
          <div key={day} style={{ textAlign: "center", color: "var(--text-muted)", fontSize: "0.75rem", fontWeight: 800, letterSpacing: "0.05em" }}>
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
            className="glass"
            style={{
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
              position: "relative"
            }}
          >
            <span style={{ 
              fontSize: "0.85rem", 
              fontWeight: 700, 
              color: isToday ? "var(--primary-light)" : "var(--text-secondary)",
              marginBottom: "0.25rem"
            }}>
              {format(day, "d")}
            </span>
            {dayIdeas.map(idea => (
              <motion.div 
                key={idea.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ 
                  fontSize: "0.7rem", 
                  fontWeight: 600,
                  background: idea.type === 'blog' ? "rgba(16, 185, 129, 0.1)" : "rgba(124, 92, 252, 0.1)",
                  color: idea.type === 'blog' ? "var(--status-completed)" : "var(--primary-light)",
                  padding: "0.3rem 0.6rem",
                  borderRadius: "8px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  border: `1px solid ${idea.type === 'blog' ? "rgba(16, 185, 129, 0.2)" : "rgba(124, 92, 252, 0.2)"}`,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                }}
              >
                {idea.title}
              </motion.div>
            ))}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div key={day.toString()} style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "1px", background: "rgba(255,255,255,0.05)" }}>
          {days}
        </div>
      );
      days = [];
    }

    return (
      <div style={{ 
        border: "1px solid var(--border)", 
        borderRadius: "var(--radius-2xl)", 
        overflow: "hidden",
        boxShadow: "0 20px 50px rgba(0,0,0,0.3)"
      }}>
        {rows}
      </div>
    );
  };

  return (
    <div className="fade-in" style={{ maxWidth: "1400px", margin: "0 auto" }}>
      {renderHeader()}
      <div className="glass" style={{ padding: "2rem", borderRadius: "var(--radius-3xl)", border: "1px solid var(--border)" }}>
        {renderDays()}
        {renderCells()}
      </div>
    </div>
  );
}
