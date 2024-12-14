import type { Metadata } from 'next';
import './globals.css';
import { Open_Sans } from 'next/font/google';
import NextAuthSessionProvider from '@/providers/sessionProvider';
import { AuthAPIProvider } from '@/data/context/AuthContextAPI';

const mainFontFamily = Open_Sans({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-main',
});

export const metadata: Metadata = {
    title: 'Dr Teeth',
    description: 'Sistema para Consultório Dentário',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={mainFontFamily.variable}>
            <head>
                <link rel="shortcut icon" href="/favicon.ico" />
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
                />
            </head>
            <body>
                <NextAuthSessionProvider>
                    <AuthAPIProvider>{children}</AuthAPIProvider>
                </NextAuthSessionProvider>
            </body>
        </html>
    );
}
