import { Shader, ChromaFlow, Swirl } from "shaders/react"
import { CustomCursor } from "@/components/custom-cursor"
import { GrainOverlay } from "@/components/grain-overlay"
import { WorkSection } from "@/components/sections/work-section"
import { ServicesSection } from "@/components/sections/services-section"
import { AboutSection } from "@/components/sections/about-section"
import { ContactSection } from "@/components/sections/contact-section"
import { MagneticButton } from "@/components/magnetic-button"
import { useRef, useEffect, useState } from "react"

const NAV_ITEMS = ["Главная", "Меню", "О нас", "История", "Контакты"]

export default function Index() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [activeSection, setActiveSection] = useState(0)
  const [scrolled, setScrolled] = useState(false)
  const shaderContainerRef = useRef<HTMLDivElement>(null)
  const sectionRefs = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    const checkShaderReady = () => {
      if (shaderContainerRef.current) {
        const canvas = shaderContainerRef.current.querySelector("canvas")
        if (canvas && canvas.width > 0 && canvas.height > 0) {
          setIsLoaded(true)
          return true
        }
      }
      return false
    }

    if (checkShaderReady()) return

    const intervalId = setInterval(() => {
      if (checkShaderReady()) clearInterval(intervalId)
    }, 100)

    const fallbackTimer = setTimeout(() => setIsLoaded(true), 1500)

    return () => {
      clearInterval(intervalId)
      clearTimeout(fallbackTimer)
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)

      const offsets = sectionRefs.current.map((el) => {
        if (!el) return Infinity
        const rect = el.getBoundingClientRect()
        return Math.abs(rect.top)
      })
      const closest = offsets.indexOf(Math.min(...offsets))
      setActiveSection(closest)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (index: number) => {
    const el = sectionRefs.current[index]
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="relative w-full bg-background">
      <CustomCursor />
      <GrainOverlay />

      {/* Шейдерный фон — фиксирован */}
      <div
        ref={shaderContainerRef}
        className={`fixed inset-0 z-0 transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        style={{ contain: "strict" }}
      >
        <Shader className="h-full w-full">
          <Swirl
            colorA="#3d1a00"
            colorB="#e8850a"
            speed={0.5}
            detail={0.7}
            blend={60}
            coarseX={35}
            coarseY={35}
            mediumX={45}
            mediumY={45}
            fineX={30}
            fineY={30}
          />
          <ChromaFlow
            baseColor="#c96a10"
            upColor="#f5a235"
            downColor="#2a1005"
            leftColor="#d4521a"
            rightColor="#f0c060"
            intensity={0.85}
            radius={1.6}
            momentum={20}
            maskType="alpha"
            opacity={0.95}
          />
        </Shader>
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Навигационная шапка */}
      <nav
        className={`fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-8 py-4 transition-all duration-300 lg:px-16 ${
          isLoaded ? "opacity-100" : "opacity-0"
        } ${scrolled ? "bg-background/60 backdrop-blur-xl shadow-lg border-b border-foreground/10" : "bg-transparent"}`}
      >
        {/* Логотип */}
        <button
          onClick={() => scrollToSection(0)}
          className="flex items-center gap-3 transition-transform hover:scale-105"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-foreground/15 backdrop-blur-md transition-all duration-300 hover:bg-foreground/25">
            <span className="text-xl">🦊</span>
          </div>
          <span className="font-sans text-xl font-semibold tracking-tight text-foreground">Fox Coffee</span>
        </button>

        {/* Ссылки */}
        <div className="flex items-center gap-8">
          {NAV_ITEMS.map((item, index) => (
            <button
              key={item}
              onClick={() => scrollToSection(index)}
              className={`group relative font-sans text-sm font-medium transition-colors ${
                activeSection === index ? "text-foreground" : "text-foreground/70 hover:text-foreground"
              }`}
            >
              {item}
              <span
                className={`absolute -bottom-1 left-0 h-0.5 rounded-full bg-primary transition-all duration-300 ${
                  activeSection === index ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </button>
          ))}
        </div>

        {/* CTA */}
        <MagneticButton variant="secondary" onClick={() => scrollToSection(4)}>
          Написать нам
        </MagneticButton>
      </nav>

      {/* Контент — вертикальный скролл */}
      <main className={`relative z-10 transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}`}>

        {/* ── Секция 0: Hero ── */}
        <section
          ref={(el) => { sectionRefs.current[0] = el }}
          className="relative flex min-h-screen w-full flex-col items-start justify-end px-8 pb-24 pt-32 lg:px-16 lg:pb-32"
        >
          {/* Паттерн-фон */}
          <div
            className="absolute inset-0 z-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: `url(https://cdn.poehali.dev/projects/963fbc5c-4b0f-4150-af5c-0d79cab4661e/bucket/36f126b2-f331-4725-826d-50b9989a5664.png)`,
              backgroundSize: "300px",
              backgroundRepeat: "repeat",
            }}
          />
          <div className="relative z-10 max-w-3xl">
            <div className="mb-5 inline-block animate-in fade-in slide-in-from-bottom-4 rounded-full border border-foreground/20 bg-foreground/15 px-4 py-1.5 backdrop-blur-md duration-700">
              <p className="font-mono text-xs text-foreground/90">🦊 Молодёжный кофейный бренд</p>
            </div>
            <h1 className="mb-6 animate-in fade-in slide-in-from-bottom-8 font-sans text-7xl font-light leading-[1.05] tracking-tight text-foreground duration-1000 xl:text-8xl 2xl:text-9xl">
              Fox Coffee
            </h1>
            <p className="mb-10 max-w-xl animate-in fade-in slide-in-from-bottom-4 text-xl leading-relaxed text-foreground/90 duration-1000 delay-200">
              Кофе с характером. Яркий вкус, живая атмосфера и фирменный стиль — для тех, кто не идёт в ногу, а задаёт ритм.
            </p>
            <div className="flex animate-in fade-in slide-in-from-bottom-4 flex-row gap-4 duration-1000 delay-300">
              <MagneticButton size="lg" variant="primary" onClick={() => scrollToSection(1)}>
                Смотреть меню
              </MagneticButton>
              <MagneticButton size="lg" variant="secondary" onClick={() => scrollToSection(4)}>
                Связаться с нами
              </MagneticButton>
            </div>
          </div>

          {/* Стрелка вниз */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-in fade-in duration-1000 delay-500">
            <div className="flex flex-col items-center gap-2">
              <p className="font-mono text-xs text-foreground/60">Листайте вниз</p>
              <div className="flex h-8 w-5 items-start justify-center rounded-full border border-foreground/30 pt-1.5">
                <div className="h-2 w-0.5 animate-bounce rounded-full bg-foreground/60" />
              </div>
            </div>
          </div>
        </section>

        {/* ── Секция 1: Меню ── */}
        <section
          ref={(el) => { sectionRefs.current[1] = el }}
          className="relative min-h-screen w-full px-8 py-24 lg:px-16 lg:py-32"
        >
          <WorkSection />
        </section>

        {/* ── Секция 2: О нас ── */}
        <section
          ref={(el) => { sectionRefs.current[2] = el }}
          className="relative min-h-screen w-full px-8 py-24 lg:px-16 lg:py-32"
        >
          <ServicesSection />
        </section>

        {/* ── Секция 3: История ── */}
        <section
          ref={(el) => { sectionRefs.current[3] = el }}
          className="relative min-h-screen w-full px-8 py-24 lg:px-16 lg:py-32"
        >
          <AboutSection scrollToSection={scrollToSection} />
        </section>

        {/* ── Секция 4: Контакты ── */}
        <section
          ref={(el) => { sectionRefs.current[4] = el }}
          className="relative min-h-screen w-full px-8 py-24 lg:px-16 lg:py-32"
        >
          <ContactSection />
        </section>
      </main>

      <style>{`
        html { scroll-behavior: smooth; }
      `}</style>
    </div>
  )
}
