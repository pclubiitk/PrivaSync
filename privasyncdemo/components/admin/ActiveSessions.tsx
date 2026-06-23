// components/admin/ActiveSessions.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Users } from "lucide-react";
import { activeSessionsData } from "@/lib/mock/adminMockData";

const statusConfig = {
  running: { label: "Running", class: "border-emerald-500/40 text-emerald-400" },
  completing: { label: "Completing", class: "border-amber-500/40 text-amber-400" },
  paused: { label: "Paused", class: "border-slate-600 text-slate-400" },
};

export default function ActiveSessions() {
  return (
    <Card className="bg-slate-900 border-slate-800">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-slate-100 text-sm font-semibold">
          Active Training Sessions
        </CardTitle>
        <Badge
          variant="outline"
          className="border-violet-500/40 text-violet-400 text-[10px]"
        >
          {activeSessionsData.length} live
        </Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        {activeSessionsData.map((session) => {
          const status = statusConfig[session.status];
          return (
            <div key={session.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-200">{session.name}</p>
                  <div className="flex items-center gap-3 mt-0.5">
                    <span className="flex items-center gap-1 text-xs text-slate-500">
                      <Users className="h-3 w-3" />
                      {session.participants} participants
                    </span>
                    <span className="text-xs text-slate-600">•</span>
                    <span className="text-xs text-slate-500">{session.startedAt}</span>
                  </div>
                </div>
                <Badge variant="outline" className={`text-[10px] ${status.class}`}>
                  {status.label}
                </Badge>
              </div>
              <div className="flex items-center gap-3">
                <Progress
                  value={session.progress}
                  className="h-1.5 flex-1 bg-slate-800 [&>div]:bg-violet-500"
                />
                <span className="text-xs text-slate-400 w-8 text-right">
                  {session.progress}%
                </span>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
