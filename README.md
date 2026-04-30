# 🌿 Workation — Stodoła Artystów, Żulin

Aplikacja do organizacji wyjazdu zespołowego. Jeden plik HTML, zero zależności (poza Google Fonts).

## Funkcje

| Zakładka | Co robi |
|----------|---------|
| 🚗 Transport | Auta, pasażerowie, trasa |
| 🏡 Nocleg | Obiekt, podział pokoi, udogodnienia |
| 🛒 Zakupy | Wspólna lista z przypisaniem kto co kupuje |
| 🎒 Co zabrać | Gry & gadżety + osobista checklista |
| 📋 Plan dnia | Harmonogram piątku i soboty |
| 💸 Zrzutka | Edytowalne wydatki, podział na osoby, status wpłat |

## Użycie

Otwórz `workation.html` w przeglądarce — nie wymaga serwera.

Stan (listy zakupów, checklisty, wydatki, wpłaty) jest zapisywany w `localStorage`.

## Edycja danych

Wszystkie dane zespołu są na górze pliku w sekcji `<script>`:

```js
const PEOPLE = [ ... ]          // lista osób
const DEFAULT_EXPENSES = [ ... ] // startowe wydatki
const DEFAULT_SHOP     = [ ... ] // startowa lista zakupów
const DEFAULT_GEAR     = [ ... ] // startowe gadżety
```

## GitHub Pages

Aby hostować jako stronę:

1. Wrzuć plik do repozytorium
2. Wejdź w **Settings → Pages**
3. Ustaw branch `main`, folder `/root`
4. Gotowe — aplikacja dostępna pod `https://<user>.github.io/<repo>/workation.html`

---

*Workation · Żulin · 10 lipca 2026*
