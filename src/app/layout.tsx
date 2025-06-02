import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SoilConnect - Smart Soil Testing for Farmers',
  description: 'Connect with certified soil testing centers for comprehensive NPK, pH, and micronutrient analysis to maximize crop yields',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-gray-50">{children}</body>
    </html>
  )
}