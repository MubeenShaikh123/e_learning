import Footer from "@/components/footer";
import "../globals.css";
import Navbar from "@/components/navbar";
import Head from "next/head";
import AuthWrapper from "./AuthWrapper";
import { getServerSession } from "next-auth";
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { redirect } from "next/navigation";

export const metadata = {
  title: 'e_learning app',
};

export default async function UserGroupLayout({ children }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/auth/login");
  }
  console.log(`session.user: ${JSON.stringify(session)}`);
  return (
    <html lang="en">
      <Head>
        <title>E_learning app</title>
      </Head>
      <body>
        <AuthWrapper user={session.user}>
          <main className="min-h-screen">
            {children}
          </main>
        </AuthWrapper>
      </body>
    </html>
  );
}
