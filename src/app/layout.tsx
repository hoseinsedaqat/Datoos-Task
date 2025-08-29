import type { Metadata } from "next";
import "./globals.css";
import ReactQueryProvider from "@/lib/queryClient";

export const metadata: Metadata = {
  title: "Crypto List",
  description: "Crypto list with IndexedDB and React Query",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  );
}
