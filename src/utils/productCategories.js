export const ALL_COLLECTIONS_CATEGORY = {
  id: 'category-all-collections',
  name: 'All Collections',
}

export const PRODUCT_CATEGORY_FILTERS = [
  { label: "Men's Shoes / Slippers", slug: 'men', matches: ['men'] },
  { label: "Women's Shoes / Slippers", slug: 'women', matches: ['women'] },
  {
    label: 'Sports Shoes / Slippers',
    slug: 'sports',
    matches: ['sport', 'running'],
  },
  { label: 'Kids Shoes / Slippers', slug: 'kids', matches: ['kid', 'children'] },
  { label: 'School Shoes / Slippers', slug: 'school', matches: ['school'] },
  { label: 'Casual & Formal', slug: 'formal', matches: ['casual', 'formal'] },
]

export const INITIAL_PRODUCT_CATEGORIES = [
  ALL_COLLECTIONS_CATEGORY,
  ...PRODUCT_CATEGORY_FILTERS.map((category) => ({
    id: `category-${category.slug}`,
    name: category.label,
  })),
]
