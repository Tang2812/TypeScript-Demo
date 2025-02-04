
/**
 * function find the max substring whithout repeating characters
 */
function findMaxLenghtSubString(s: string): number {
  if (s.length === 0) return 0;

  // Map contain key is char and index of this char
  const charMap: Map<string, number> = new Map();
  let start = -1;
  let maxLenght = 0;
  for (let i = 0; i < s.length; i++) {
    if (charMap.has(s[i]!)) {
      start = Math.max(start, charMap.get(s[i]!)!);
    }
    charMap.set(s[i]!, i);
    maxLenght = Math.max(maxLenght, i - start)
  }
  return maxLenght;
}

// example
console.log(findMaxLenghtSubString("bbbbb"))
