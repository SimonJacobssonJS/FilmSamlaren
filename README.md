# FilmSamlaren

Välkommen till FilmSamlarens kollektion av filmer, här kan du hitta filmer från de 250 högst rankade IMDB filmerna. Du kan även katagorisera filmer efter mina top 10 listor.

Figma länk/screenshot:
https://www.figma.com/design/xWQVnFrA3If3euLh4aRFkB/Untitled?node-id=2-2&p=f&t=6yDHDggdcvOve80O-0

https://gyazo.com/75a1dbbd7090e5442610835569b5cbb3

Genom att använda Asynkrona funktioner för att hämta hem API har jag med JSON Data, programmerat om ett JSON objekt från en array med information från API:et jag använde. Med simpla färger taget med inspiration från hemmakvälls logga samt hemsida har jag både använt Web extensionet WAVE för att säkerställa att hemsidan följer kraven för för Web Accessibility samt även använt mig av Dev tools som Lighthouse som även tittar på SEO och ger en bild på hemsidans prestanda.

API hämtas från en hemsida som heter www.rapidapi.com Där går det att skapa ett konto som ger dig begränsad tillgång till vissa API. Mitt konto är ett betalkonto, men det behövs inte då det är gratis fast med fler begränsningar.

URL: https://imdb236.p.rapidapi.com/imdb/top250-movies

Nyckel: facf05d2a1msh10079e5138d281ap141a75jsn65752110123b

Parametrar(GET):
'x-rapidapi-key': 'facf05d2a1msh10079e5138d281ap141a75jsn65752110123b',
'x-rapidapi-host': 'imdb236.p.rapidapi.com',

Navigering: Du kommer in på startsidan där det kommer att genereras filmposters med titel i blandad ordning. Du kan skrolla igenom hundratals filmer, men även få lite mer information om filmerna när du trycker på vald film. Det går även att söka på filmer för att se om filmen finns med i listan och det gör du enkelt genom att skriva in första bokstäverna eller namnet på filmen.
Genom att söka eller hitta en film kan du välja att få mer information i form av en modal som öppnas på sidan, det finns lite kort information om filmen, betyg och datum, men även en länk till IMDB om man vill veta mer om den. Förövrigt kan du även gå in på kategorier där du kan kategorisera efter Top 10 filmer baserat på IMDB Betyg, se de äldsta filmerna, de längsta samt de filmer som har fått flest röster.
