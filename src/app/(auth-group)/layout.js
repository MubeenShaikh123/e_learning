import "../globals.css";
import Head from "next/head";

export const metadata = {
  title: 'E_learning',
};

export default function AuthGroupLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <title>Login</title>
      </Head>
      <body>
        <div className="min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
