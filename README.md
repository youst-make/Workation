# 🏕️ Workation — Żulin

Aplikacja do organizacji wyjazdów integracyjnych z funkcjami:
- 📋 Plan dnia (piątek + sobota)
- 🚗 Organizacja transportu i kierowców
- 💸 Zrzutka i podział kosztów
- 🛒 Lista zakupów
- 🎒 Checklista rzeczy do spakowania
- 🏡 Informacje o noclegu

## 🎨 Design

Projekt wykorzystuje **czysty, minimalistyczny design Travel App** z:
- Paletą niebieską (#006FFD jako główny kolor)
- Białymi kartami z subtelnymi cieniami
- Zaokrąglonymi rogami (12px)
- Czystą typografią Inter
- Dużą ilością białej przestrzeni

## 📚 Dokumentacja

### Dla osób edytujących zawartość
📖 **[INSTRUKCJA_EDYCJI.md](./INSTRUKCJA_EDYCJI.md)**
- Jak zmienić tytuł, datę, lokalizację
- Jak dodać/usunąć uczestników
- Jak edytować plan dnia
- Jak zmieniać koszty i budżet
- Jak zmieniać kolory i style

### Dla osób pracujących z Figma
📖 **[INSTRUKCJA_FIGMA.md](./INSTRUKCJA_FIGMA.md)**
- Jak importować design z Figmy do projektu
- Jak eksportować projekt do Figmy
- Workflow Figma ↔ Kod
- Mapowanie stylów Figma → Tailwind CSS

### Paleta kolorów
🎨 **[PALETA_TRAVEL_APP.md](./PALETA_TRAVEL_APP.md)**
- Wszystkie kolory z szablonu Travel App
- Kody hex dla wszystkich odcieni
- Przykłady zastosowania w kodzie
- Zasady projektowe Travel App
- Tabela migracji ze starych kolorów

## 🚀 Szybki start

### Główny plik z kodem
```
/src/app/App.tsx
```

### Edycja podstawowych danych (linia 98-106)
```tsx
const DEFAULT_SETTINGS: EventSettings = {
  title: "Workation — Żulin",
  subtitle: "Wypad integracyjny: piątek–sobota",
  date: "9 maja 2025",
  location: "Żulin",
  venue: "",
  venueAddress: "Żulin 1",
  venuePhone: "+48 602 123 456",
};
```

### Edycja uczestników (linia 30-37)
```tsx
const PEOPLE: Person[] = [
  { init: "TS", name: "Tomek", av: "av-g" },
  { init: "JW", name: "Justyna", av: "av-p" },
  // ... dodaj więcej
];
```

## 🛠️ Technologie

- **React** - framework UI
- **TypeScript** - typowanie
- **Tailwind CSS v4** - stylowanie
- **Vite** - build tool
- **LocalStorage** - przechowywanie danych

## 📱 Responsywność

Aplikacja jest responsywna i działa na:
- 📱 Telefonach (320px+)
- 📱 Tabletach (768px+)
- 💻 Komputerach (1024px+)

## 💾 Dane

Wszystkie dane są przechowywane lokalnie w przeglądarce (LocalStorage):
- `wk2_settings` - podstawowe informacje
- `wk2_people` - lista uczestników
- `wk2_shop` - lista zakupów
- `wk2_gear` - gry i gadżety
- `wk2_personal` - checklista osobista
- `wk2_pay` - statusy wpłat
- `wk2_drivers` - informacje o kierowcach

**Uwaga:** Dane pozostają w przeglądarce nawet po odświeżeniu strony!

## 🎯 Najczęstsze edycje

### Zmiana kolorów
Zobacz: [PALETA_TRAVEL_APP.md](./PALETA_TRAVEL_APP.md)

### Zmiana planu dnia
Zobacz: [INSTRUKCJA_EDYCJI.md](./INSTRUKCJA_EDYCJI.md#5-plan-dnia---piątek-linia-973-1017)

### Zmiana budżetu
Zobacz: [INSTRUKCJA_EDYCJI.md](./INSTRUKCJA_EDYCJI.md#7-budżet-i-koszty-linia-367-368)

### Import z Figmy
Zobacz: [INSTRUKCJA_FIGMA.md](./INSTRUKCJA_FIGMA.md#-import-designu-z-figma-do-projektu)

## ❓ Pomoc

1. Sprawdź odpowiednią instrukcję powyżej
2. Szukaj komentarzy w kodzie: `{/* Transport Section */}`
3. Sprawdź PALETA_KOLOROW.md dla kodów kolorów
4. Testuj zmiany w przeglądarce po każdej edycji

---

**Stworzone z ❤️ przy użyciu Figma Make**
