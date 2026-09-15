import type { Metadata, Viewport } from 'next';
import './globals.css';
import { SALON } from '@/lib/config/salon';

export const viewport: Viewport = {
  themeColor: SALON.cores.fundoCard,
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: `${SALON.nome} - Agende seu Horário`,
  description: `Agende seu horário na ${SALON.nome}. ${SALON.description}`,
  applicationName: SALON.nome.split(' ')[0],
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: SALON.nome.split(' ')[0],
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: SALON.logo,
    shortcut: SALON.logo,
    apple: SALON.logo,
  },
  openGraph: {
    title: `${SALON.nome} - Agende seu Horário`,
    description: `Agende seu horário na ${SALON.nome}. ${SALON.description}`,
    type: 'website',
    siteName: SALON.nome,
    images: [{ url: SALON.logo, width: 512, height: 512, alt: SALON.nome }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SALON.nome} - Agende seu Horário`,
    description: `Agende seu horário na ${SALON.nome}. ${SALON.description}`,
  },
};

import { AppProvider } from '@/context/AppContext';
import { AuthProvider } from '@/context/AuthContext';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className="dark">
      <body className="min-h-screen bg-[var(--color-bg)] text-slate-100 antialiased selection:bg-amber-500 selection:text-black">
        <AuthProvider>
          <AppProvider>
            {children}
          </AppProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
