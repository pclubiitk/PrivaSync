"use client";

import Link from "next/link";
import { redirect, usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  if (pathname.startsWith("/auth")) {
    return null;
  }

  const isAdmin = pathname.startsWith("/admin");
  const isUser = pathname.startsWith("/user");

  const adminLinks = [
    { name: "Dashboard", href: "/admin/dashboard" },
    { name: "Training", href: "/admin/training/status" },
  ];

  const userLinks = [
    { name: "Dashboard", href: "/user/dashboard" },
    { name: "Training", href: "/user/training" },
    { name: "Notifications", href: "/user/notification" },
  ];

  const links = isAdmin ? adminLinks : isUser ? userLinks : [];
const logout = () => {
  redirect("/auth/login");
  console.log("User logged out");
}
  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex h-16 items-center justify-between px-4 md:px-6">
     
        <Link
          href={isAdmin ? "/admin/dashboard" : "/user/dashboard"}
          className="text-xl font-bold"
        >
          Privasync
        </Link>

   
        <nav className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition-colors hover:text-blue-600 ${
                pathname === link.href
                  ? "font-semibold text-blue-600"
                  : "text-gray-700"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="md:hidden flex gap-3 overflow-x-auto">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm whitespace-nowrap ${
                pathname === link.href
                  ? "font-semibold text-blue-600"
                  : "text-gray-700"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

      
        <button className="rounded-md border px-3 py-1.5 text-sm hover:bg-gray-100" onClick={logout}>
          Logout
        </button>
      </div>
    </header>
  );
}