export const formatToCompactNumber = (number) => {
  if (number >= 100_000) {
    return '100k'
  }

  if (number >= 10_000) {
    return '10k'
  }

  if (number >= 1_000) {
    return '1k'
  }

  return '' + number
}
