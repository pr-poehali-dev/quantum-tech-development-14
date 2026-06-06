import { useReveal } from "@/hooks/use-reveal"

const menuItems = [
  {
    number: "01",
    title: "Эспрессо Fox",
    category: "Классика · 200 мл",
    price: "150 ₽",
    direction: "left",
  },
  {
    number: "02",
    title: "Лисий латте",
    category: "Фирменный · 350 мл",
    price: "280 ₽",
    direction: "right",
  },
  {
    number: "03",
    title: "Рыжий айс",
    category: "Холодный · 400 мл",
    price: "320 ₽",
    direction: "left",
  },
  {
    number: "04",
    title: "Круассан",
    category: "Выпечка · свежая",
    price: "190 ₽",
    direction: "right",
  },
]

export function WorkSection() {
  const { ref, isVisible } = useReveal(0.3)

  return (
    <section
      ref={ref}
      className="relative flex h-screen w-screen shrink-0 snap-start items-center px-6 pt-20 md:px-12 md:pt-0 lg:px-16 overflow-hidden"
    >
      {/* паттерн сбоку */}
      <div
        className="absolute right-0 top-0 h-full w-48 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `url(https://cdn.poehali.dev/projects/963fbc5c-4b0f-4150-af5c-0d79cab4661e/bucket/36f126b2-f331-4725-826d-50b9989a5664.png)`,
          backgroundSize: "160px",
          backgroundRepeat: "repeat",
        }}
      />

      <div className="mx-auto w-full max-w-7xl">
        <div
          className={`mb-12 transition-all duration-700 md:mb-16 ${
            isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
          }`}
        >
          <h2 className="mb-2 font-sans text-5xl font-light tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Меню
          </h2>
          <p className="font-mono text-sm text-foreground/60 md:text-base">/ Наши напитки и закуски</p>
        </div>

        <div className="space-y-4 md:space-y-6">
          {menuItems.map((item, i) => (
            <MenuCard key={i} item={item} index={i} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  )
}

function MenuCard({
  item,
  index,
  isVisible,
}: {
  item: { number: string; title: string; category: string; price: string; direction: string }
  index: number
  isVisible: boolean
}) {
  const getRevealClass = () => {
    if (!isVisible) {
      return item.direction === "left" ? "-translate-x-16 opacity-0" : "translate-x-16 opacity-0"
    }
    return "translate-x-0 opacity-100"
  }

  return (
    <div
      className={`group flex items-center justify-between border-b border-foreground/10 py-5 transition-all duration-700 hover:border-foreground/30 md:py-6 ${getRevealClass()}`}
      style={{
        transitionDelay: `${index * 120}ms`,
        marginLeft: index % 2 === 0 ? "0" : "auto",
        maxWidth: index % 2 === 0 ? "85%" : "92%",
      }}
    >
      <div className="flex items-baseline gap-4 md:gap-8">
        <span className="font-mono text-sm text-foreground/30 transition-colors group-hover:text-foreground/50 md:text-base">
          {item.number}
        </span>
        <div>
          <h3 className="mb-1 font-sans text-2xl font-light text-foreground transition-transform duration-300 group-hover:translate-x-2 md:text-3xl lg:text-4xl">
            {item.title}
          </h3>
          <p className="font-mono text-xs text-foreground/50 md:text-sm">{item.category}</p>
        </div>
      </div>
      <span className="font-sans text-lg font-light text-foreground/70 transition-colors group-hover:text-foreground md:text-2xl">
        {item.price}
      </span>
    </div>
  )
}
