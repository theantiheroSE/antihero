import dynamic from 'next/dynamic'

const AntiHero = dynamic(() => import('@/components/AntiHero'), { ssr: false })

export default function Home() {
  return (
    <main>
      <AntiHero />
    </main>
  )
}
