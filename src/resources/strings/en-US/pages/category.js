export const category = (category) => ({
  pageMeta: {
    title: `${category}`,
    description: `Browse products by category: ${category}.`,
    keywords: [ 'shop','commerce',  'e-commerce', category ],
  },
  fetchCategoriesError: 'Error retrieving categories. Please, try again',
});
