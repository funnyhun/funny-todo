import React from "react";
import Sidebar from "@/ui/layout/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <Sidebar>{children}</Sidebar>;
}
