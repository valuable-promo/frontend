// local
import Footer from '@/components/footer';
import '@/styles/globals.css';

export const metadata = {
  title: {
    default: process.env.SITE_TITLE,
    template: `%s | ${process.env.SITE_TITLE}`,
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Footer />
      </body>
    </html>
  );
}
