"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import StatsCards from "@/components/admin/StatsCards";
import DashboardCharts from "@/components/admin/DashboardCharts";
import SystemStats from "@/components/admin/SystemStats";
import ActiveSessions from "@/components/admin/ActiveSessions";
import RecentUsers from "@/components/admin/RecentUsers";

export default function AdminDashboardPage() {
  return (
    <AdminLayout>
      <div className="space-y-6 max-w-screen-xl mx-auto">
        <div>
          <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Platform overview — all data is live-mocked
          </p>
        </div>
        <StatsCards />
        <DashboardCharts />
        <SystemStats />
        <ActiveSessions />
        <RecentUsers />
      </div>
    </AdminLayout>
  );
}