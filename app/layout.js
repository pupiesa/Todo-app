import "./globals.css";
import Nav from "./components/pageComponents/Nav";
import { Footer } from "./components/pageComponents/Footer";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`antialiased min-h-screen flex flex-col justify-between`}>
        <Nav />
        <main className="flex-grow">
        {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
