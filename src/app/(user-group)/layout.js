import "../globals.css";
import Navbar from "@/components/navbar";
import Head from "next/head";

export const metadata = {
  title: 'e_learning app',
};

export default function UserGroupLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <title>E_learning app</title>
      </Head>
      <body>
        <header>
          <Navbar />
        </header>
        <main className="min-h-screen">
          {children}
        </main>
        <footer></footer>
      </body>
    </html>
  );
}
