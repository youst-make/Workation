# 🎨 Paleta kolorów Travel App

## Kolory z szablonu Figma Travel App

### 🔵 Highlight (Primary) - Niebieski
```
Darkest:  #006FFD  - Główny kolor akcji, przyciski
Dark:     #2897FF  - Hover states, aktywne elementy
Medium:   #6FBAFF  - Delikatne akcenty
Light:    #B4DBFF  - Tła pomocnicze, bordery
Lightest: #EAF2FF  - Bardzo jasne tła, karty
```

**Użycie:**
- Przyciski główne: `bg-[#006FFD]`
- Przyciski hover: `bg-[#2897FF]`
- Zaznaczenia, aktywne zakładki: `bg-[#006FFD]`
- Tagi, chipy: `bg-[#EAF2FF] border-[#B4DBFF] text-[#006FFD]`

---

### ⚪ Neutral - Light Grey (Jasne)
```
Dark:     #C5C6CC  - Bordery, separatory
Medium:   #D4D6DD  - Delikatne bordery
Light:    #E8E9F1  - Tła elementów, inputy
Lightest: #F8F9FE  - Tło strony, karty
White:    #FFFFFF  - Białe karty, elementy
```

**Użycie:**
- Tło strony: `bg-[#F8F9FE]`
- Karty: `bg-white` lub `bg-[#F8F9FE]`
- Bordery: `border-[#E8E9F1]` lub `border-[#C5C6CC]`
- Inputy: `bg-white border-[#C5C6CC]`

---

### ⚫ Neutral - Dark Grey (Ciemne)
```
Darkest:  #1F2024  - Tekst główny, nagłówki
Dark:     #2F3036  - Tekst ciemny
Medium:   #494A50  - Tekst średni
Light:    #71727A  - Tekst pomocniczy, opisy
Lightest: #8F9098  - Tekst bardzo jasny, labels
```

**Użycie:**
- Nagłówki: `text-[#1F2024]`
- Tekst podstawowy: `text-[#1F2024]`
- Opisy, podpisy: `text-[#71727A]`
- Labels, małe teksty: `text-[#8F9098]`

---

### ✅ Support - Success (Sukces/Zielony)
```
Dark:   #298267  - Sukces ciemny
Medium: #3AC0A0  - Sukces główny
Light:  #E7F4E8  - Sukces jasny, tła
```

**Użycie:**
- Badge "Opłacone": `bg-[#E7F4E8] text-[#3AC0A0] border-[#3AC0A0]`
- Kropki w timeline (pozytywne): `bg-[#3AC0A0]`
- Avatary zielone: `bg-[#E7F4E8] text-[#3AC0A0]`

---

### ⚠️ Support - Warning (Ostrzeżenie/Pomarańczowy)
```
Darkest: #E86339  - Warning ciemny
Dark:    #FFB37C  - Warning główny
Medium:  #FFF4E4  - Warning jasny, tła
```

**Użycie:**
- Badge "Do zapłaty": `bg-[#FFF4E4] text-[#FFB37C] border-[#FFB37C]`
- Kropki w timeline (neutralne): `bg-[#FFB37C]`
- Avatary bursztynowe: `bg-[#FFF4E4] text-[#FFB37C]`

---

### ❌ Support - Error (Błąd/Czerwony)
```
Darkest: #ED3241  - Error ciemny
Dark:    #FF616D  - Error główny
Medium:  #FFE2E5  - Error jasny, tła
```

**Użycie:**
- Przycisk usuń (X): `text-[#FF0000]` lub `text-[#FF616D]`
- Komunikaty błędów: `text-[#ED3241]`
- Avatary koralowe: `bg-[#FFE2E5] text-[#FF616D]`

---

## Przykłady zastosowania

### Przycisk główny (Primary Button)
```tsx
className="bg-[#006FFD] text-white rounded-[12px] px-4 py-2.5 font-semibold hover:bg-[#2897FF] transition-colors"
```

### Karta (Card)
```tsx
className="bg-white rounded-[12px] shadow-sm p-5"
```

### Input
```tsx
className="border border-[#C5C6CC] rounded-[12px] bg-white text-[#1F2024] px-3 py-2 outline-none focus:border-[#006FFD] transition-all"
```

### Zakładka aktywna (Active Tab)
```tsx
className="bg-[#006FFD] text-white rounded-[12px] px-4 py-2.5 font-semibold"
```

### Zakładka nieaktywna (Inactive Tab)
```tsx
className="bg-white text-[#71727A] border border-[#E8E9F1] rounded-[12px] px-4 py-2.5 hover:border-[#006FFD] hover:text-[#006FFD]"
```

### Chip/Tag
```tsx
className="bg-[#EAF2FF] text-[#006FFD] border border-[#B4DBFF] rounded-[8px] px-3 py-1.5 text-[12px] font-medium"
```

### Badge sukcesu
```tsx
className="bg-[#E7F4E8] text-[#3AC0A0] border border-[#3AC0A0] rounded-[8px] px-3 py-1.5 text-[12px] font-medium"
```

### Badge ostrzeżenia
```tsx
className="bg-[#FFF4E4] text-[#FFB37C] border border-[#FFB37C] rounded-[8px] px-3 py-1.5 text-[12px] font-medium"
```

### Avatar (niebieski)
```tsx
className="bg-[#EAF2FF] text-[#006FFD] border border-[#006FFD] rounded-full w-9 h-9 flex items-center justify-center"
```

### Nagłówek sekcji
```tsx
className="text-[10px] font-semibold tracking-[0.8px] uppercase text-[#8F9098]"
```

### Tytuł główny
```tsx
className="text-[28px] font-extrabold tracking-[0.28px] text-[#1F2024]"
```

### Progress bar
```tsx
// Container
className="bg-[#E8E9F1] rounded-[4px] h-[8px] overflow-hidden"

// Fill
className="bg-[#006FFD] rounded-[4px] h-full"
```

---

## Zasady projektowe Travel App

1. **Minimalizm** - dużo białej przestrzeni, czyste karty
2. **Zaokrąglone rogi** - `rounded-[12px]` dla kart, `rounded-[8px]` dla małych elementów
3. **Subtle cienie** - `shadow-sm` zamiast mocnych cieni
4. **Niebieski jako główny kolor** - `#006FFD` dla wszystkich akcji
5. **Czysta typografia** - **Inter font** (Google Fonts), `font-semibold` dla przycisków, `font-extrabold` dla nagłówków
6. **Bordery 1px** - `border` (nie `border-2` czy `border-4`)
7. **Małe uppercase labele** - `text-[10px] font-semibold tracking-[0.8px] uppercase`
8. **Konsystentne odstępy** - `gap-3` dla kart, `gap-2` dla mniejszych elementów

## Font - Inter

Projekt używa fontu **Inter** zamiast DM Sans:
- Import: `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');`
- Zastosowanie: `font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;`
- Wagi dostępne: 300 (Light), 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold), 800 (ExtraBold), 900 (Black)

**Typowe użycie:**
- Nagłówki: `font-extrabold` (800) lub `font-black` (900)
- Przyciski: `font-semibold` (600)
- Tekst podstawowy: `font-normal` (400) lub `font-medium` (500)
- Labels: `font-semibold` (600)

---

## Migracja z poprzednich kolorów

| Stary kolor | Nowy kolor | Użycie |
|-------------|------------|--------|
| Pastele (różne) | `#006FFD` | Główny kolor akcji |
| `#FFF5F7` (tło) | `#F8F9FE` | Tło strony |
| Bordery kolorowe | `#E8E9F1` lub `#C5C6CC` | Bordery |
| `#1A1A1A` (tekst) | `#1F2024` | Tekst główny |
| `#666` (tekst) | `#71727A` | Tekst pomocniczy |
| Gradienty | Pojedyncze kolory | Uproszczenie |

---

**Dokumentacja projektu:**
- `README.md` - Ogólny przegląd
- `INSTRUKCJA_EDYCJI.md` - Jak edytować zawartość
- `INSTRUKCJA_FIGMA.md` - Integracja z Figma
- `PALETA_TRAVEL_APP.md` (ten plik) - Kolory Travel App
