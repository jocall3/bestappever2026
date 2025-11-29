import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'bestappever2026',
  description: 'The best app ever, in 2026.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header>
          <h1>bestappever2026</h1>
          <nav>
            {/* Navigation links would go here */}
            <a href="/">Home</a>
            <a href="/about">About</a>
            <a href="/contact">Contact</a>
          </nav>
        </header>
        <main>{children}</main>
        <footer>
          <p>&copy; 2026 bestappever2026. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}