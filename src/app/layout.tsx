import './globals.css'

import { Providers } from '@/redux/provider'

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};


import Header from '@/components/layout/Header'
import Sidebar from '@/components/layout/Sidebar'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className='flex h-screen flex-col'>
            <div className='flex-grow-0'>
              <Header />
            </div>
            <div className='flex-1 flex w-screen overflow-x-hidden'>
              <div className='h-full'>
                <Sidebar />
              </div>
              <div className='flex-1 h-full min-w-0'>
                { children }
              </div>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  )
}
