import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import {ReactQueryProvider} from "@/app/ui/ReactQueryProvider";
import {Analytics} from "@vercel/analytics/next";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata = {
    title: "Learn Access",
    description: "Learn how to program accessibly in React",
};

//wraps application
export default function RootLayout({children}) {

    return (
        <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ReactQueryProvider>{children}</ReactQueryProvider>
        <Analytics/>
        </body>
        </html>
    );
}
