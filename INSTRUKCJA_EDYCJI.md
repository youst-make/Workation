# Instrukcja edytowania strony Workation

## 📁 Gdzie znajduje się kod strony?

Cały kod strony znajduje się w jednym pliku:
```
/src/app/App.tsx
```

## 🎨 Jak zmienić kolory?

### Paleta kolorów Travel App używana w projekcie:

**Główne kolory:**
- **Niebieski Primary:** `#006FFD` (przyciski, akcje)
- **Niebieski Light:** `#EAF2FF` (tła, karty)
- **Tekst główny:** `#1F2024`
- **Tekst pomocniczy:** `#71727A`
- **Tło strony:** `#F8F9FE`
- **Bordery:** `#E8E9F1` lub `#C5C6CC`

**Kolory wsparcia:**
- **Sukces (zielony):** `#3AC0A0` / tło `#E7F4E8`
- **Ostrzeżenie (pomarańczowy):** `#FFB37C` / tło `#FFF4E4`
- **Błąd (czerwony):** `#FF616D` / tło `#FFE2E5`

📖 **Pełna paleta:** Zobacz `PALETA_TRAVEL_APP.md`

### Tło strony (linia ~385)
```tsx
<div className="min-h-screen bg-[#F8F9FE] py-6 px-4 pb-20">
```
- `bg-[#F8F9FE]` - bardzo jasny szary (Neutral Lightest)

### Kolory zakładek (linia ~439)
Wszystkie zakładki używają tego samego niebieskieg koloru:
```tsx
// Aktywna zakładka
className="bg-[#006FFD] text-white"

// Nieaktywna zakładka  
className="bg-white text-[#71727A] border border-[#E8E9F1]"
```

### Kolory chipów w hero (linia ~414)
```tsx
// Wszystkie chipy mają ten sam styl
className="bg-[#F8F9FE] border border-[#E8E9F1] text-[#1F2024]"
```

### Kolory avatarów (linia ~374)
```tsx
const getAvatarClass = (av: string) => {
  const map: Record<string, string> = {
    "av-g": "bg-[#E7F4E8] text-[#3AC0A0] border-[#3AC0A0]",  // Zielony
    "av-a": "bg-[#FFF4E4] text-[#FFB37C] border-[#FFB37C]",  // Pomarańczowy
    "av-b": "bg-[#EAF2FF] text-[#006FFD] border-[#006FFD]",  // Niebieski
    "av-c": "bg-[#FFE2E5] text-[#FF616D] border-[#FF616D]",  // Czerwony
    // itd.
  };
}
```

## 📝 Jak edytować zawartość?

### 1. Tytuł i podstawowe dane (linia 98-106)
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

### 2. Lista uczestników (linia 30-37)
```tsx
const PEOPLE: Person[] = [
  { init: "TS", name: "Tomek", av: "av-g" },
  { init: "JW", name: "Justyna", av: "av-p" },
  // ... dodaj więcej osób
];
```

Kolory avatarów (Travel App):
- `av-g` - zielony sukcesu (#E7F4E8 tło, #3AC0A0 tekst)
- `av-a` - pomarańczowy ostrzeżenia (#FFF4E4 tło, #FFB37C tekst)
- `av-b` - niebieski primary (#EAF2FF tło, #006FFD tekst)
- `av-c` - czerwony błędu (#FFE2E5 tło, #FF616D tekst)
- `av-p` - niebieski medium (#EAF2FF tło, #6FBAFF tekst)
- `av-2` - szary neutralny (#F8F9FE tło, #71727A tekst)

### 3. Lista zakupów (linia 39-53)
```tsx
const DEFAULT_SHOP: ShopItem[] = [
  {
    name: "Kiełbaski & karkówka",
    who: "Tomek",
    done: false,
    cost: 0,
  },
  // ... dodaj więcej produktów
];
```

### 4. Plan dnia - Piątek (linia 973-1017)
```tsx
{
  time: "09:00",
  name: "Zbiórka i wyjazd",
  desc: "Wyjazd z Warszawy",
  dot: "bg-[#00ACC1]", // kolor kropki
}
```

### 5. Plan dnia - Sobota (linia 1046-1062)
```tsx
{
  time: "09:00",
  name: "Śniadanie",
  desc: "Wspólny posiłek",
  dot: "bg-[#FFA000]",
}
```

### 6. Informacje o transporcie (linia 159-165)
```tsx
const [drivers, setDrivers] = useState<CarDriver[]>(() => {
  const saved = localStorage.getItem('wk2_drivers');
  return saved ? JSON.parse(saved) : [
    { personIndex: 0, departureTime: '09:00', departureLocation: 'Wawer', passengers: [1, 2] },
    { personIndex: 3, departureTime: '09:00', departureLocation: 'Ursynów', passengers: [4, 5] },
  ];
});
```

### 7. Budżet i koszty (linia 367-368)
```tsx
const totalShoppingCost = Object.values(shoppingCosts).reduce((a, b) => a + b, 0);
const baseTotal = 820; // ← TUTAJ zmień stałe koszty (nocleg, grill, paliwo)
```

### 8. Szczegóły kosztów (linia 1094-1101)
```tsx
{
  name: "Nocleg",
  amount: "480 zł",
},
{ name: "Grill & mięso", amount: "160 zł" },
{ name: "Alko & napoje", amount: "120 zł" },
{ name: "Paliwo (2 auta)", amount: "60 zł" },
```

## 🎮 Jak dodać/zmienić emoji?

Po prostu zamień emoji w tekście, np.:
```tsx
label: "🚗 Transport"  →  label: "🚙 Transport"
```

## 🔧 Najczęstsze zmiany

### Zmiana liczby osób w aucie
Edytuj `passengers` w `drivers` (linia 164):
```tsx
passengers: [1, 2]  // indeksy osób z listy PEOPLE (0=pierwsza osoba)
```

### Zmiana kosztów noclegów
Edytuj `baseTotal` (linia 368) i rozpiskę (linia 1094-1101)

### Dodanie nowej zakładki
1. Dodaj typ w `TabType` (linia 79)
2. Dodaj przycisk w nawigacji (linia 441)
3. Dodaj sekcję z zawartością (wzoruj się na istniejących)

## 💡 Wskazówki

- **Zawsze zapisuj plik** po zmianie
- **Odśwież przeglądarkę** aby zobaczyć zmiany
- **Kolory zapisuj jako hex** w formacie `[#FF0000]`
- **Nie usuwaj kluczowych linii** jak `export default function App()`

## 🚨 Co może się zepsuć?

1. **Błąd składni** - brakujący przecinek, nawias, cudzysłów
2. **Zła ścieżka** - sprawdź czy nazwy plików się zgadzają
3. **Nie ma osoby o tym indeksie** - sprawdź listę PEOPLE

---

## 🎨 Praca z Figma Design

Jeśli chcesz:
- Importować design z Figmy do tego projektu
- Eksportować ten projekt do Figmy
- Pracować wizualnie nad layoutem

📖 **Zobacz:** `INSTRUKCJA_FIGMA.md` - szczegółowy przewodnik po integracji Figma ↔ Kod

---

**Potrzebujesz pomocy?** Szukaj w kodzie komentarzy oznaczonych jako:
```tsx
{/* Transport Section */}
{/* Plan Section */}
{/* Zakupy Section */}
```

## 📚 Dokumentacja

- `INSTRUKCJA_EDYCJI.md` (ten plik) - jak edytować zawartość i kolory
- `INSTRUKCJA_FIGMA.md` - jak pracować z Figma Design
- `PALETA_TRAVEL_APP.md` - pełna paleta kolorów Travel App z przykładami
