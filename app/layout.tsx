import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Myan Scholar — မြန်မာနိုင်ငံသားများအတွက် ပညာသင်ဆုများ',
  description: 'Scholarships worldwide open to Myanmar citizens — with Burmese language guides on how to apply.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="my">
      <body>
        <header className="site-header">
          <div className="container">
            <a href="/" className="site-logo">Myan<span>Scholar</span></a>
            <a href="/add" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', textDecoration: 'none' }}>
              + Add Scholarship
            </a>
          </div>
        </header>
        {children}
      </body>
    </html>
  )
}
