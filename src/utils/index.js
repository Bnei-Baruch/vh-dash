// A custom hook that builds on useLocation to parse
// the query string for you.
const lang = {
    bul: "bg",
    dut: "nl",
    eng: "en",
    fre: "fr",
    geo: "ge",
    ger: "de",
    heb: "he",
    hrv: "hr",
    hun: "hu",
    ita: "it",
    jpn: "jp",
    lav: "lv",
    lit: "lt",
    nor: "no",
    pol: "pl",
    por: "pt",
    rum: "ro",
    rus: "ru",
    slv: "si",
    spa: "es",
    swe: "se",
    tur: "tr",
    ukr: "ua",

}
export function setDirection(dir) {
    document.body.style.direction = dir;
}

export function getCountryCode(code) {
    if (lang[code]) {
        return lang[code];
    }
    return "en";
}

export function getCustomCodeFromCoutryCode(code) {
    if (Object.values(lang).includes(code)) {
        return Object.keys(lang).find(key => lang[key] === code);
    } else {
        return "eng"
    }
}