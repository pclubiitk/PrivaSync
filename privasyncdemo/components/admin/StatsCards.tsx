
import { Users, UserCheck, Brain, Server } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { statsData } from "@/lib/mock/adminMockData";

const icons = [Users, UserCheck, Brain, Server];

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {statsData.map((stat, i) => {
        const Icon = icons[i];
        return (
          <Card
            key={stat.title}
            className="bg-slate-900 border-slate-800 hover:border-violet-500/40 transition-colors"
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                {stat.title}
              </CardTitle>
              <div className="h-8 w-8 rounded-md bg-violet-600/10 flex items-center justify-center">
                <Icon className="h-4 w-4 text-violet-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{stat.value}</div>
              <div className="flex items-center gap-2 mt-1">
                <Badge
                  variant="outline"
                  className={
                    stat.trend === "up"
                      ? "border-emerald-500/40 text-emerald-400 text-[10px]"
                      : "border-slate-600 text-slate-400 text-[10px]"
                  }
                >
                  {stat.change}
                </Badge>
                <span className="text-xs text-slate-500">{stat.description}</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}