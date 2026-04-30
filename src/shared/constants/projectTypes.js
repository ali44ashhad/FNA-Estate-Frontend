export const PROJECT_CATEGORIES = /** @type {const} */ ({
  residential: 'Residential',
  commercial: 'Commercial',
  mixed_use: 'Mixed-use',
})

export const PROJECT_CATEGORY_OPTIONS = [
  { value: '', label: 'All projects' },
  { value: 'residential', label: PROJECT_CATEGORIES.residential },
  { value: 'commercial', label: PROJECT_CATEGORIES.commercial },
]

export const PROJECT_SUBTYPES = /** @type {const} */ ({
  // Commercial
  sco: 'SCO',
  office: 'Office',
  showroom: 'Showroom',
  commercial_plot: 'Commercial plot',

  // Residential
  residential_plot: 'Residential plot',
  apartment: 'Apartment',
  villa: 'Villa',
})

export const PROJECT_SUBTYPE_OPTIONS_BY_CATEGORY = /** @type {const} */ ({
  residential: [
    { value: '', label: 'All residential' },
    { value: 'residential_plot', label: PROJECT_SUBTYPES.residential_plot },
    { value: 'apartment', label: PROJECT_SUBTYPES.apartment },
    { value: 'villa', label: PROJECT_SUBTYPES.villa },
  ],
  commercial: [
    { value: '', label: 'All commercial' },
    { value: 'sco', label: PROJECT_SUBTYPES.sco },
    { value: 'office', label: PROJECT_SUBTYPES.office },
    { value: 'showroom', label: PROJECT_SUBTYPES.showroom },
    { value: 'commercial_plot', label: PROJECT_SUBTYPES.commercial_plot },
  ],
})

export function getSubTypeOptions(category) {
  if (category === 'residential') return PROJECT_SUBTYPE_OPTIONS_BY_CATEGORY.residential
  if (category === 'commercial') return PROJECT_SUBTYPE_OPTIONS_BY_CATEGORY.commercial
  return [{ value: '', label: 'All sub-types' }]
}

export function getCategoryLabel(category) {
  if (category === 'residential') return PROJECT_CATEGORIES.residential
  if (category === 'commercial') return PROJECT_CATEGORIES.commercial
  return 'Project'
}

export function getSubTypeLabel(subType) {
  return PROJECT_SUBTYPES[subType] || 'Project'
}

// Legacy exports (kept for backward compatibility inside the UI)
export const PROJECT_PROPERTY_TYPES = /** @type {const} */ ({
  apartment: 'Apartments',
  plot: 'Plots',
  villa: 'Villas',
})

export const PROJECT_PROPERTY_TYPE_OPTIONS = [
  { value: '', label: 'All projects' },
  { value: 'apartment', label: PROJECT_PROPERTY_TYPES.apartment },
  { value: 'plot', label: PROJECT_PROPERTY_TYPES.plot },
  { value: 'villa', label: PROJECT_PROPERTY_TYPES.villa },
]

