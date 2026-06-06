import { MagneticButton } from "@/components/magnetic-button"
import { useReveal } from "@/hooks/use-reveal"

export function AboutSection({ scrollToSection }: { scrollToSection?: (index: number) => void }) {
  const { ref, isVisible } = useReveal(0.3)

  return (
    <section
      ref={ref}
      className="flex w-full items-start"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid gap-8 md:grid-cols-2 md:gap-16 lg:gap-24">
          {/* Левая сторона — история */}
          <div>
            <div
              className={`mb-6 transition-all duration-700 md:mb-12 ${
                isVisible ? "translate-y-0 opacity-100" : "-translate-y-12 opacity-0"
              }`}
            >
              <h2 className="mb-3 font-sans text-3xl font-light leading-[1.1] tracking-tight text-foreground md:mb-4 md:text-6xl lg:text-7xl">
                История
                <br />
                бренда
                <br />
                <span className="text-foreground/40">Fox</span>
              </h2>
            </div>

            <div
              className={`space-y-3 transition-all duration-700 md:space-y-4 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              <p className="max-w-md text-sm leading-relaxed text-foreground/90 md:text-lg">
                Fox Coffee родился из любви к кофе и уличной эстетике. Мы хотели создать место, где молодёжь чувствует себя дома — с горячей чашкой и фирменным стилем.
              </p>
              <p className="max-w-md text-sm leading-relaxed text-foreground/90 md:text-lg">
                Каждая деталь — от паттерна с лисой до авторских рецептов — продумана, чтобы создать что-то большее, чем просто кофейня.
              </p>
            </div>
          </div>

          {/* Правая сторона — фото + цифры */}
          <div className="flex flex-col justify-center gap-6 md:gap-8">
            {/* Коллаж фото */}
            <div
              className={`relative h-48 overflow-hidden rounded-2xl transition-all duration-700 md:h-56 ${
                isVisible ? "translate-x-0 opacity-100" : "translate-x-16 opacity-0"
              }`}
              style={{ transitionDelay: "300ms" }}
            >
              <img
                src="https://cdn.poehali.dev/projects/963fbc5c-4b0f-4150-af5c-0d79cab4661e/bucket/26a70f9b-bce8-4912-9acb-3e063a81c0fc.jpg"
                alt="Fox Coffee напитки"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
            </div>

            {/* Цифры */}
            {[
              { value: "4+", label: "Авторских напитка", sublabel: "в нашем меню", direction: "right" },
              { value: "100%", label: "Свежая обжарка", sublabel: "еженедельно", direction: "left" },
            ].map((stat, i) => {
              const getRevealClass = () => {
                if (!isVisible) {
                  return stat.direction === "left" ? "-translate-x-16 opacity-0" : "translate-x-16 opacity-0"
                }
                return "translate-x-0 opacity-100"
              }
              return (
                <div
                  key={i}
                  className={`flex items-baseline gap-4 border-l border-foreground/30 pl-4 transition-all duration-700 md:gap-6 md:pl-6 ${getRevealClass()}`}
                  style={{
                    transitionDelay: `${450 + i * 150}ms`,
                    marginLeft: i % 2 === 0 ? "0" : "auto",
                    maxWidth: i % 2 === 0 ? "100%" : "85%",
                  }}
                >
                  <div className="text-3xl font-light text-foreground md:text-5xl">{stat.value}</div>
                  <div>
                    <div className="font-sans text-base font-light text-foreground md:text-lg">{stat.label}</div>
                    <div className="font-mono text-xs text-foreground/60">{stat.sublabel}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div
          className={`mt-8 flex flex-wrap gap-3 transition-all duration-700 md:mt-12 md:gap-4 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
          style={{ transitionDelay: "750ms" }}
        >
          <MagneticButton size="lg" variant="primary" onClick={() => scrollToSection?.(4)}>
            Написать нам
          </MagneticButton>
          <MagneticButton size="lg" variant="secondary" onClick={() => scrollToSection?.(1)}>
            Смотреть меню
          </MagneticButton>
        </div>
      </div>
    </section>
  )
}