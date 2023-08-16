import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './client/auth';
import './globals.css';
import { Poppins } from 'next/font/google';

const poppins = Poppins({ 
  weight: ["400", "500", "600", "700", "300"],
  subsets: ['latin'] 
});

export const metadata = {
  title: 'fireset',
  description: 'Multipurpose application for simplifying management',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <AuthProvider>
         
          {children}
          </AuthProvider>
      </body>
    </html>
  )
};
