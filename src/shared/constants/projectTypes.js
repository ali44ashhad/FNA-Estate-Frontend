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

