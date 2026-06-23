"use client";


import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  Brain,
  Activity,
  Bell,
  Settings,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const navItems = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Users",
    href: "/admin/users",
    icon: Users,
    badge: "1.2k",
  },
  {
    label: "Training Sessions",
    href: "/admin/training",
    icon: Brain,
    badge: "18",
  },
  {
    label: "System Monitor",
    href: "/admin/monitor",
    icon: Activity,
  },
  {
    label: "Notifications",
    href: "/admin/notifications",
    icon: Bell,
    badge: "5",
  },
  {
    label: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-screen bg-slate-950 border-r border-slate-800 flex flex-col">
      {/* Logo */}
      <div className="h-16 flex items-center gap-2 px-6 border-b border-slate-800">
        <ShieldCheck className="h-6 w-6 text-violet-400" />
        <span className="font-bold text-white text-lg tracking-tight">
          Priv<span className="text-violet-400">Async</span>
        </span>
        <Badge
          variant="outline"
          className="ml-auto text-[10px] border-violet-500 text-violet-400"
        >
          Admin
        </Badge>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group",
                isActive
                  ? "bg-violet-600/20 text-violet-300 border border-violet-500/30"
                  : "text-slate-400 hover:text-slate-100 hover:bg-slate-800"
              )}
            >
              <item.icon
                className={cn(
                  "h-4 w-4 flex-shrink-0",
                  isActive ? "text-violet-400" : "text-slate-500 group-hover:text-slate-300"
                )}
              />
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <Badge
                  variant="secondary"
                  className="text-[10px] bg-slate-700 text-slate-300 border-0"
                >
                  {item.badge}
                </Badge>
              )}
              {isActive && (
                <ChevronRight className="h-3 w-3 text-violet-400" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom profile strip */}
      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center gap-3 px-2">
          <div className="h-8 w-8 rounded-full bg-violet-600 flex items-center justify-center text-white text-sm font-bold">
            A
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-200 truncate">Admin</p>
            <p className="text-xs text-slate-500 truncate">admin@privasync.io</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
