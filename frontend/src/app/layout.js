import localFont from "next/font/local";
import "./globals.css";
import Navbar from "../../component/Funct-Components/Navbar/navbar";
// import Footer from "../../component/Funct-Components/Footer/footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Liver Health Checker",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Navbar />
        <div className="content">
          {children}
        </div>
      </body>
    </html>
  );
}