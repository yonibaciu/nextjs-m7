export async function getRandomQuote() {
  const res = await fetch('https://api.quotable.io/quotes/random');
  
  return res.json()
}
