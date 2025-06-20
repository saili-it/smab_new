// Utility to generate slug from ProductLabel
export function generateSlug(label) {
  return label
    .toString()
    .normalize('NFD') // split accented letters
    .replace(/\p{Diacritic}/gu, '') // remove accents
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // replace non-alphanumeric with dash
    .replace(/^-+|-+$/g, '') // trim dashes
    .replace(/--+/g, '-'); // collapse multiple dashes
}