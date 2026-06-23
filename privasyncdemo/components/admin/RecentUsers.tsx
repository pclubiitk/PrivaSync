
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { recentUsersData } from "@/lib/mock/adminMockData";

const statusConfig = {
  active: { label: "Active", class: "border-emerald-500/40 text-emerald-400" },
  inactive: { label: "Inactive", class: "border-slate-600 text-slate-400" },
  pending: { label: "Pending", class: "border-amber-500/40 text-amber-400" },
};

export default function RecentUsers() {
  return (
    <Card className="bg-slate-900 border-slate-800">
      <CardHeader>
        <CardTitle className="text-slate-100 text-sm font-semibold">Recent Users</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="border-slate-800 hover:bg-transparent">
              <TableHead className="text-slate-500 text-xs font-medium pl-6">Name</TableHead>
              <TableHead className="text-slate-500 text-xs font-medium hidden md:table-cell">
                Organization
              </TableHead>
              <TableHead className="text-slate-500 text-xs font-medium hidden sm:table-cell">
                Joined
              </TableHead>
              <TableHead className="text-slate-500 text-xs font-medium pr-6">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentUsersData.map((user) => {
              const status = statusConfig[user.status];
              return (
                <TableRow
                  key={user.id}
                  className="border-slate-800 hover:bg-slate-800/50 transition-colors"
                >
                  <TableCell className="pl-6">
                    <div>
                      <p className="text-sm font-medium text-slate-200">{user.name}</p>
                      <p className="text-xs text-slate-500">{user.email}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-400 text-sm hidden md:table-cell">
                    {user.organization}
                  </TableCell>
                  <TableCell className="text-slate-500 text-xs hidden sm:table-cell">
                    {user.joinedAt}
                  </TableCell>
                  <TableCell className="pr-6">
                    <Badge variant="outline" className={`text-[10px] ${status.class}`}>
                      {status.label}
                    </Badge>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
