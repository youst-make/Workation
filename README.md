# 🏕️ Workation — Żulin

Aplikacja do organizacji wyjazdów integracyjnych z funkcjami:
- 📋 Plan dnia (piątek + sobota)
- 🚗 Organizacja transportu i kierowców
- 💸 Zrzutka i podział kosztów **z edycją wydatków**
- 🛒 Lista zakupów
- 🎒 Checklista rzeczy do spakowania
- 🏡 Informacje o noclegu

## ✨ Najnowsze funkcje

### Edycja wydatków w Zrzutce
- ➕ Dodawanie nowych wydatków bezpośrednio w aplikacji
- ✏️ Edycja nazwy i kwoty istniejących wydatków
- ✕ Usuwanie wydatków
- 🔄 Automatyczne przeliczanie sum

## 🎨 Design

Projekt wykorzystuje **czysty, minimalistyczny design** z:
- Paletą niebieską (#006FFD jako główny kolor)
- Białymi kartami z subtelnymi cieniami
- Zaokrąglonymi rogami (12px)
- Czystą typografią Inter
- Dużą ilością białej przestrzeni

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
- **Inter Font** - typografia (Google Fonts)

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
- `wk2_personal_items` - elementy checklisty
- `wk2_pay` - statusy wpłat
- `wk2_drivers` - informacje o kierowcach
- `wk2_expenses` - **NOWE:** lista wydatków (edytowalna w aplikacji)

**Uwaga:** Dane pozostają w przeglądarce nawem po odświeżeniu strony!

## ❓ Pomoc

1. Sprawdź odpowiednią instrukcję powyżej
2. Szukaj komentarzy w kodzie: `{/* Transport Section */}`
3. Sprawdź PALETA_KOLOROW.md dla kodów kolorów
4. Testuj zmiany w przeglądarce po każdej edycji
