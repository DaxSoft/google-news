// https://news.google.com/rss/search?q=lojas+renner&hl=pt-BR&gl=BR&ceid=BR:pt-419
// -> %20when%3A1d
//
// https://news.google.com/search?q=Lojas%20Renner&hl=pt-BR&gl=BR&ceid=BR%3Apt-419
// search, therm: when:1d -> last 24 hours

export function URL_GOOGLE_NEWS(
    search: string,
    language: string,
    gl: string
): string {
    const enconded_search = encodeURIComponent(search);
    const enconded_language = encodeURIComponent(language);
    const enconded_gl = encodeURIComponent(gl);
    const ceid = language.split('-').reverse().join(':');
    return `https://news.google.com/rss/search?q=${enconded_search}&hl=${enconded_language}&gl=${enconded_gl}&ceid=${ceid}`;
}
