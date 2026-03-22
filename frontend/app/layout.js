import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
  title: "SHAHZAIB. | Full Stack Developer",
  description: "Modern MERN Stack Developer Portfolio of Shahzaib. Transforming Ideas into Interactive Designs.",
  icons: {
    icon: "/images/favicon.png",
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="antialiased bg-slate-900 text-slate-50 selection:bg-blue-500/30">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
