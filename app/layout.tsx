import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "SINOVA26",
  description: "24-Hour National Level Hackathon",
  verification: {
    google: "2iVMdTIg4mu4Rkei4ivAGFaByxpf4b0k9BzAnP0Wu90",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
