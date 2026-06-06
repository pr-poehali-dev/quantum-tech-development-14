import { useReveal } from "@/hooks/use-reveal"

const features = [
  {
    title: "Фирменный стиль",
    description: "Каждая чашка — это арт. Лисий латте-арт и упаковка с нашим паттерном делают Fox узнаваемым.",
    direction: "top",
  },
  {
    title: "Свежая обжарка",
    description: "Зёрна обжариваются еженедельно. Только свежий кофе с насыщенным вкусом и ярким ароматом.",
    direction: "right",
  },
  {
    title: "Молодёжная атмосфера",
    description: "Музыка, эстетика и комьюнити — Fox это не просто кофе, это стиль жизни для поколения Z.",
    direction: "left",
  },
  {
    title: "Авторские рецепты",
    description: "Рыжий айс, Лисий латте и сезонные новинки — напитки, которых нет больше нигде.",
    direction: "bottom",
  },
]

export function ServicesSection() {
  const { ref, isVisible } = useReveal(0.3)

  return (
    <section
      ref={ref}
      className="relative flex w-full items-start overflow-hidden"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div
          className={`mb-12 transition-all duration-700 md:mb-16 ${
            isVisible ? "translate-y-0 opacity-100" : "-translate-y-12 opacity-0"
          }`}
        >
          <h2 className="mb-2 font-sans text-5xl font-light tracking-tight text-foreground md:text-6xl lg:text-7xl">
            О нас
          </h2>
          <p className="font-mono text-sm text-foreground/60 md:text-base">/ Почему выбирают Fox</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 md:gap-x-16 md:gap-y-12 lg:gap-x-24">
          {features.map((feature, i) => (
            <FeatureCard key={i} feature={feature} index={i} isVisible={isVisible} />
          ))}
        </div>
      </div>

      {/* фото напитков справа-снизу */}
      <div
        className={`absolute bottom-0 right-0 h-48 w-48 overflow-hidden rounded-tl-3xl opacity-30 transition-all duration-1000 md:h-72 md:w-72 ${
          isVisible ? "translate-x-0 opacity-30" : "translate-x-16 opacity-0"
        }`}
        style={{ transitionDelay: "600ms" }}
      >
        <img
          src="https://cdn.poehali.dev/projects/963fbc5c-4b0f-4150-af5c-0d79cab4661e/bucket/138861cb-a003-4cb9-8eec-e1ce3c48cb89.jpg"
          alt="Fox Coffee"
          className="h-full w-full object-cover"
        />
      </div>
    </section>
  )
}

function FeatureCard({
  feature,
  index,
  isVisible,
}: {
  feature: { title: string; description: string; direction: string }
  index: number
  isVisible: boolean
}) {
  const getRevealClass = () => {
    if (!isVisible) {
      switch (feature.direction) {
        case "left":
          return "-translate-x-16 opacity-0"
        case "right":
          return "translate-x-16 opacity-0"
        case "top":
          return "-translate-y-16 opacity-0"
        case "bottom":
          return "translate-y-16 opacity-0"
        default:
          return "translate-y-12 opacity-0"
      }
    }
    return "translate-x-0 translate-y-0 opacity-100"
  }

  return (
    <div
      className={`group transition-all duration-700 ${getRevealClass()}`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="mb-3 flex items-center gap-3">
        <div className="h-px w-8 bg-foreground/30 transition-all duration-300 group-hover:w-12 group-hover:bg-foreground/50" />
        <span className="font-mono text-xs text-foreground/60">0{index + 1}</span>
      </div>
      <h3 className="mb-2 font-sans text-2xl font-light text-foreground md:text-3xl">{feature.title}</h3>
      <p className="max-w-sm text-sm leading-relaxed text-foreground/80 md:text-base">{feature.description}</p>
    </div>
  )
}