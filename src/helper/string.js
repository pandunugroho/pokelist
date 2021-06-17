/**
 * 
 * @param {pokemonName} string 
 */
export function capsFirstChar(string = "") {
  const splitString = string.split("-")
  let newSplitString = []
  splitString.map(string => newSplitString.push(string.charAt(0).toUpperCase() + string.substring(1)))
  return newSplitString.join("-")
}

