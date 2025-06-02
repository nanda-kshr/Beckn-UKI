import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SoilConnect - Smart Soil Testing for Farmers',
  description: 'Connect with certified soil testing centers for comprehensive NPK, pH, and micronutrient analysis to maximize crop yields. Join as Farmer or Buyer.',
  keywords: 'soil testing, farmers, agriculture, NPK analysis, pH testing, crop yield, India, मिट्टी परीक्षण, किसान',
  openGraph: {
    title: 'SoilConnect - Smart Soil Testing Platform',
    description: 'Connecting farmers with soil testing centers for better crop yields',
    type: 'website',
  }
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