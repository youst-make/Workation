# Instrukcja edytowania strony Workation

## 📁 Gdzie znajduje się kod strony?

Cały kod strony znajduje się w jednym pliku:
```
/src/app/App.tsx
```

## 🎨 Jak zmienić kolory?

### Tło strony (linia 385)
```tsx
<div className="min-h-screen bg-gradient-to-br from-[#FFF5F7] via-[#F5F0FF] to-[#FFF9E6] ...">
```
- `from-[#FFF5F7]` - różowy pastel
- `via-[#F5F0FF]` - fioletowy pastel  
- `to-[#FFF9E6]` - żółty pastel

### Kolory zakładek (linia 439-444)
Każda zakładka ma swój gradient:
```tsx
{ id: "plan", label: "📋 Plan dnia", color: "from-[#FFECB3] to-[#FFE082]" }
```

### Kolory chipów w hero (linia 414-417)
```tsx
{ emoji: "📅", text: settings.date, color: "from-[#E1BEE7] to-[#CE93D8]" }
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

Kolory avatarów:
- `av-g` - zielony
- `av-a` - bursztynowy
- `av-b` - niebieski
- `av-c` - koralowy
- `av-p` - fioletowy
- `av-2` - szary

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

**Potrzebujesz pomocy?** Szukaj w kodzie komentarzy oznaczonych jako:
```tsx
{/* Transport Section */}
{/* Plan Section */}
{/* Zakupy Section */}
```
