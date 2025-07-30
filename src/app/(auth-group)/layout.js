import "../globals.css";
import Head from "next/head";

export default function AuthGroupLayout({ children }) {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  );
}
