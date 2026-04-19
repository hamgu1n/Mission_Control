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
      <body className="app-bg text-primary antialiased">{children}</body>
    </html>
  );
}
