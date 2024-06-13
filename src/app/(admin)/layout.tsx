import { getSession } from "@/libs/getSession";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session: any = await getSession();
  if (!session) redirect("/login");
  if (session.user.role !== "admin") redirect("/");
  return <>{children}</>;
}
