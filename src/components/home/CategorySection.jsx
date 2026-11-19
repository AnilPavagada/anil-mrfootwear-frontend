import {
  Activity,
  Baby,
  Briefcase,
  Footprints,
  GraduationCap,
  ShoppingBag,
  Sparkles,
} from 'lucide-react'
import {
  ALL_COLLECTIONS_CATEGORY,
  PRODUCT_CATEGORY_FILTERS,
} from '../../utils/productCategories'

const categoryArt = {
  all: {
    icon: ShoppingBag,
    tone: 'from-[#e8edf2] to-[#cdd8e2]',
  },
  men: {
    icon: Footprints,
    tone: 'from-[#f1e4d8] to-[#e1c2a8]',
  },
  women: {
    icon: Sparkles,
    tone: 'from-[#f3e4e6] to-[#dfbcc2]',
  },
  sports: {
    icon: Activity,
    tone: 'from-[#dce8f1] to-[#b4c9dc]',
  },
  kids: {
    icon: Baby,
    tone: 'from-[#f3edcf] to-[#e4d89b]',
  },
  school: {
    icon: GraduationCap,
    tone: 'from-[#e2e4e8] to-[#c3c9d2]',
  },
  formal: {
    icon: Briefcase,
    tone: 'from-[#eee0d5] to-[#d7bea9]',
  },
}

const categories = [
  {
    name: ALL_COLLECTIONS_CATEGORY.name,
    href: '/products',
    ...categoryArt.all,
  },
  ...PRODUCT_CATEGORY_FILTERS.map((category) => ({
    name: category.label,
    href: `/products/${category.slug}`,
    ...categoryArt[category.slug],
  })),
]

function CategorySection() {
  return (
    <section
      id="categories"
      aria-labelledby="categories-heading"
      className="bg-[#f8f7f5] px-5 py-12 sm:px-8 sm:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-[1440px]">
        <header className="mb-7 text-center sm:mb-9">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600">
            Shop by
          </p>
          <h2
            id="categories-heading"
            className="mt-1 text-2xl font-black uppercase tracking-wide text-gray-950 sm:text-3xl"
          >
            Category
          </h2>
          <span className="mx-auto mt-3 block h-1 w-12 rounded-full bg-orange-500" />
          <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-gray-600">
            Find a pair for your style, your day and everyone in the family.
          </p>
        </header>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-7">
          {categories.map(({ name, href, icon: Icon, tone }) => (
            <a
              key={name}
              href={href}
              className="group overflow-hidden rounded-xl border border-gray-200 bg-white text-center shadow-sm transition duration-200 hover:-translate-y-1 hover:border-orange-300 hover:shadow-lg"
            >
              <span
                className={`relative flex aspect-[1.45] items-center justify-center overflow-hidden bg-gradient-to-br ${tone}`}
              >
                <span
                  aria-hidden="true"
                  className="absolute h-24 w-24 rounded-full bg-white/35 blur-xl transition-transform duration-300 group-hover:scale-125"
                />
                <Icon
                  size={48}
                  strokeWidth={1.5}
                  aria-hidden="true"
                  className="relative text-gray-800 transition-transform duration-300 group-hover:scale-110"
                />
              </span>
              <span className="flex min-h-16 items-center justify-center px-2 py-3 text-xs font-bold leading-4 text-gray-900 sm:min-h-[68px] sm:px-3 sm:text-sm">
                {name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CategorySection
