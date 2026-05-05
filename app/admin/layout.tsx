import type { Metadata } from "next";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const adminId = process.env.ADMIN_CLERK_USER_ID;
  if (adminId && userId !== adminId) {
    redirect("/dashboard");
  }

  return <>{children}</>;
}
