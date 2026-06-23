

export const statsData = [
  {
    title: "Total Users",
    value: "1,284",
    change: "+12%",
    trend: "up" as const,
    description: "vs last month",
  },
  {
    title: "Active Users",
    value: "342",
    change: "+5%",
    trend: "up" as const,
    description: "in last 24 hrs",
  },
  {
    title: "Active Training Sessions",
    value: "18",
    change: "+3",
    trend: "up" as const,
    description: "running now",
  },
  {
    title: "System Uptime",
    value: "99.8%",
    change: "0.0%",
    trend: "neutral" as const,
    description: "last 30 days",
  },
];

export const userGrowthData = [
  { month: "Jan", users: 400, active: 180 },
  { month: "Feb", users: 520, active: 230 },
  { month: "Mar", users: 680, active: 290 },
  { month: "Apr", users: 810, active: 310 },
  { month: "May", users: 970, active: 330 },
  { month: "Jun", users: 1100, active: 338 },
  { month: "Jul", users: 1284, active: 342 },
];

export const trainingSessionsData = [
  { day: "Mon", sessions: 6, completed: 4 },
  { day: "Tue", sessions: 9, completed: 7 },
  { day: "Wed", sessions: 12, completed: 10 },
  { day: "Thu", sessions: 8, completed: 6 },
  { day: "Fri", sessions: 15, completed: 13 },
  { day: "Sat", sessions: 5, completed: 5 },
  { day: "Sun", sessions: 3, completed: 3 },
];

export const modelAccuracyData = [
  { round: "R1", accuracy: 71 },
  { round: "R2", accuracy: 75 },
  { round: "R3", accuracy: 79 },
  { round: "R4", accuracy: 82 },
  { round: "R5", accuracy: 85 },
  { round: "R6", accuracy: 87 },
  { round: "R7", accuracy: 89 },
];

export const recentUsersData = [
  {
    id: "u1",
    name: "Aryan Mehta",
    email: "aryan@iitk.ac.in",
    organization: "IIT Kanpur",
    status: "active" as const,
    joinedAt: "2025-06-10",
  },
  {
    id: "u2",
    name: "Priya Sharma",
    email: "priya@nitk.edu",
    organization: "NIT Karnataka",
    status: "active" as const,
    joinedAt: "2025-06-11",
  },
  {
    id: "u3",
    name: "Rohit Verma",
    email: "rohit@bits.edu",
    organization: "BITS Pilani",
    status: "inactive" as const,
    joinedAt: "2025-06-12",
  },
  {
    id: "u4",
    name: "Sneha Patel",
    email: "sneha@iitb.ac.in",
    organization: "IIT Bombay",
    status: "active" as const,
    joinedAt: "2025-06-13",
  },
  {
    id: "u5",
    name: "Karan Singh",
    email: "karan@iitd.ac.in",
    organization: "IIT Delhi",
    status: "pending" as const,
    joinedAt: "2025-06-14",
  },
];

export const activeSessionsData = [
  {
    id: "s1",
    name: "MedFL-Round-7",
    participants: 12,
    progress: 72,
    status: "running" as const,
    startedAt: "2 hrs ago",
  },
  {
    id: "s2",
    name: "TextPredict-Round-3",
    participants: 8,
    progress: 45,
    status: "running" as const,
    startedAt: "45 min ago",
  },
  {
    id: "s3",
    name: "ImageFL-Round-1",
    participants: 5,
    progress: 15,
    status: "running" as const,
    startedAt: "10 min ago",
  },
  {
    id: "s4",
    name: "SentimentFL-Round-5",
    participants: 10,
    progress: 98,
    status: "completing" as const,
    startedAt: "3 hrs ago",
  },
];

export const systemStatsData = {
  totalModels: 34,
  totalRounds: 187,
  avgAccuracy: "87.4%",
  totalDataPoints: "2.3M",
  storageUsed: "68%",
  cpuLoad: "42%",
  memoryUsed: "57%",
  networkIO: "1.2 GB/s",
};
