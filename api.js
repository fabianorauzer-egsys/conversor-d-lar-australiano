export async function getDolarAustraliano() {
    const response = await fetch(`http://data.fixer.io/api/latest?access_key=HAJy9BBZ0avu5gigNM9O1hNXAPTJZYlX&symbols=AUD`);
    const data = await response.json();
    if (data.rates) {
        const cotacao = data.rates.AUD;
        return cotacao;
    } else {
        const cotacao = 3.51;
        return cotacao;
    }
}