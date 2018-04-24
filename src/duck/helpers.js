export const getNewComponentName = (names, baseName = 'NewComponent') => {
  let nextNameSuffix = null
  const checkName = nameId => names[nameId] === `${baseName}${nextNameSuffix || ''}`
  while (Object.keys(names).find(checkName)) {
    nextNameSuffix += 1
  }
  return `${baseName}${nextNameSuffix || ''}`
}
