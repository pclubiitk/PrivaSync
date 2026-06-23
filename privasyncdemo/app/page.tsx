import { redirect } from "next/navigation";

export default function Page() {
 
  const role = "admin"; // "user" or "admin"

  if (role === "admin") {
    redirect("/admin/dashboard");
  }

  redirect("/user/dashboard");
}
