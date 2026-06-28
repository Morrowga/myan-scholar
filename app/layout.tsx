import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'YourScholar — မြန်မာနိုင်ငံသားများအတွက် ပညာသင်ဆုများ',
  description: 'Scholarships worldwide open to Myanmar citizens — with Burmese language guides.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="my">
      <body>
        <header className="site-header">
          <div className="container">
            <a href="/" className="site-logo">Your <span>Scholar</span></a>
          </div>
        </header>
        {children}
      </body>
    </html>
  )
}