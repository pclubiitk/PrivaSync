"use client";


import { Bell, Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface AdminNavbarProps {
  onMenuClick?: () => void;
}

export default function AdminNavbar({ onMenuClick }: AdminNavbarProps) {
  return (
    <header className="h-16 bg-slate-950 border-b border-slate-800 flex items-center px-6 gap-4 sticky top-0 z-10">
      
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden text-slate-400 hover:text-white"
        onClick={onMenuClick}
      >
        <Menu className="h-5 w-5" />
      </Button>

      
      <div className="relative flex-1 max-w-sm hidden sm:block">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
        <Input
          placeholder="Search users, sessions..."
          className="pl-9 bg-slate-900 border-slate-700 text-slate-200 placeholder:text-slate-500 focus-visible:ring-violet-500 h-9"
        />
      </div>

      <div className="ml-auto flex items-center gap-3">
        
        <Button
          variant="ghost"
          size="icon"
          className="relative text-slate-400 hover:text-white"
        >
          <Bell className="h-5 w-5" />
          <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px] bg-violet-600 border-0">
            5
          </Badge>
        </Button>

        
        <div className="h-8 w-8 rounded-full bg-violet-600 flex items-center justify-center text-white text-sm font-bold cursor-pointer">
          A
        </div>
      </div>
    </header>
  );
}
