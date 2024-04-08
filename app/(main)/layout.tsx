import { Footer } from "@/components/common/footer"
import { Navbar } from "@/components/common/navbar"

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Navbar />
      <main className="mx-auto min-h-[calc(100vh-120px)] max-w-screen-md space-y-6 px-2 py-6 md:px-0">
        {children}
      </main>
      <Footer />
    </>
  )
}
