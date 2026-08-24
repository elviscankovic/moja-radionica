# Moja radionica

Jednostavna javna stranica za tri mala projekta:

- Moja potrošnja struje
- Zlatne ruke
- Moje radno vrijeme

Stranica je statična i namijenjena GitHub Pages hostingu. Najnoviji stabilni APK-ovi aplikacija **Moja potrošnja struje** i **Moje radno vrijeme** dohvaćaju se pri svakom otvaranju putem javnog GitHub Releases API-ja. Ako API trenutačno nije dostupan, gumb vodi na GitHubovu stranicu najnovijeg izdanja.

## Lokalna provjera

```bash
npm test
python3 -m http.server 8080
```
