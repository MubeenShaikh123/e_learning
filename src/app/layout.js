import "./globals.css";
import Navbar from "@/components/navbar";

export const metadata = {
  title: "e_learning app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <div className="min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
