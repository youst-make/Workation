# Instrukcja edytowania strony Workation

## 📁 Gdzie znajduje się kod strony?

Cały kod strony znajduje się w jednym pliku:
```
/src/app/App.tsx
```

## 🎨 Jak zmienić kolory?

### Paleta kolorów pastelowych używana w projekcie:
- **Różowy:** `#FFF5F7` → `#F3E5F5`
- **Fioletowy:** `#F5F0FF` → `#E1BEE7`
- **Żółty:** `#FFF9E6` → `#FFECB3`
- **Niebieski:** `#E0F7FA` → `#B2EBF2`
- **Zielony:** `#E8F5E9` → `#C8E6C9`
- **Koralowy:** `#FFE0D8` → `#FFCCBC`

### Tło strony (linia 385)
```tsx
<div className="min-h-screen bg-gradient-to-br from-[#FFF5F7] via-[#F5F0FF] to-[#FFF9E6] ...">
```
- `from-[#FFF5F7]` - różowy pastel
- `via-[#F5F0FF]` - fioletowy pastel  
- `to-[#FFF9E6]` - żółty pastel

### Kolory zakładek (linia 439-450) - PASTELOWE
Każda zakładka ma swój pastelowy gradient:
```tsx
{ id: "plan", label: "📋 Plan dnia", color: "from-[#FFF9E6] to-[#FFECB3]" }
{ id: "transport", label: "🚗 Transport", color: "from-[#E0F7FA] to-[#B2EBF2]" }
{ id: "zrzutka", label: "💸 Zrzutka", color: "from-[#E8F5E9] to-[#C8E6C9]" }
```

### Kolory chipów w hero (linia 414-417) - PASTELOWE
```tsx
{ emoji: "📅", text: settings.date, color: "from-[#F3E5F5] to-[#E1BEE7]" }
{ emoji: "📍", text: settings.location, color: "from-[#E0F7FA] to-[#B2EBF2]" }
{ emoji: "🏡", text: settings.venue, color: "from-[#E8F5E9] to-[#C8E6C9]" }
{ emoji: "👥", text: people.length, color: "from-[#FFF9E6] to-[#FFECB3]" }
```

### Kolory avatarów (linia 374-381) - PASTELOWE
```tsx
const getAvatarClass = (av: string) => {
  const map: Record<string, string> = {
    "av-g": "bg-gradient-to-br from-[#D4F1D4] to-[#B8E6B8] ...",
    "av-a": "bg-gradient-to-br from-[#FFF4D6] to-[#FFE9B3] ...",
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

Kolory avatarów (pastelowe):
- `av-g` - zielony pastel (#D4F1D4 → #B8E6B8)
- `av-a` - bursztynowy pastel (#FFF4D6 → #FFE9B3)
- `av-b` - niebieski pastel (#D1F2F9 → #B3E5FC)
- `av-c` - koralowy pastel (#FFE0D8 → #FFCCBC)
- `av-p` - fioletowy pastel (#EDD7F0 → #E1BEE7)
- `av-2` - szary pastel (#ECEFF1 → #CFD8DC)

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
