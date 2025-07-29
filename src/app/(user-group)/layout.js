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
  console.log(`session.user: ${JSON.stringify(session)}`);

  if (!session) {
    redirect("/auth/login");
  }
  return (
    <html lang="en">
      <Head>
        <title>E_learning app</title>
      </Head>
      <body>
        {/* <AuthWrapper> */}
        {/* <header>
          <Navbar />
          </header> */}
        <main className="min-h-screen">
          {children}
        </main>
        {/* <footer className="text-gray-600 body-font border-t">
          <Footer></Footer>
          </footer> */}
        {/* </AuthWrapper> */}
      </body>
    </html>
  );
}
