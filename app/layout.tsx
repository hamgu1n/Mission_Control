import "./globals.css";

export const metadata = {
  title: "Mission Control",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-stone-50 text-slate-800 antialiased">{children}</body>
    </html>
  );
}
