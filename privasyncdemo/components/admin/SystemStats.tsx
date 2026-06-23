
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { systemStatsData } from "@/lib/mock/adminMockData";

const resourceMetrics = [
  { label: "Storage", value: systemStatsData.storageUsed, raw: 68 },
  { label: "CPU Load", value: systemStatsData.cpuLoad, raw: 42 },
  { label: "Memory", value: systemStatsData.memoryUsed, raw: 57 },
];

const quickStats = [
  { label: "Total Models Trained", value: systemStatsData.totalModels },
  { label: "Total FL Rounds", value: systemStatsData.totalRounds },
  { label: "Avg Global Accuracy", value: systemStatsData.avgAccuracy },
  { label: "Data Points Processed", value: systemStatsData.totalDataPoints },
  { label: "Network I/O", value: systemStatsData.networkIO },
];

function getProgressColor(val: number) {
  if (val >= 85) return "bg-red-500";
  if (val >= 65) return "bg-amber-500";
  return "bg-emerald-500";
}

export default function SystemStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Resource usage */}
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-slate-100 text-sm font-semibold">
            Resource Usage
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          {resourceMetrics.map((m) => (
            <div key={m.label}>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-slate-400">{m.label}</span>
                <span className="text-slate-200 font-medium">{m.value}</span>
              </div>
              <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${getProgressColor(m.raw)}`}
                  style={{ width: `${m.raw}%` }}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-slate-100 text-sm font-semibold">
            Global Statistics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {quickStats.map((s) => (
              <div
                key={s.label}
                className="flex items-center justify-between py-2 border-b border-slate-800 last:border-0"
              >
                <span className="text-xs text-slate-400">{s.label}</span>
                <span className="text-sm font-semibold text-slate-100">{s.value}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
