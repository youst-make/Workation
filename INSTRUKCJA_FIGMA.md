# Instrukcja: Integracja Figma Design ↔ Kod

## 📥 Import designu z Figma do projektu

### Metoda 1: Import całego frame'a z Figma

1. **W Figma:**
   - Otwórz swój design w Figma
   - Zaznacz frame (ekran/sekcję), który chcesz zaimportować
   - Skopiuj link do frame'a (kliknij prawym → "Copy link to selection")

2. **W Figma Make (tutaj):**
   - Użyj narzędzia importu Figma
   - Wklej link do frame'a
   - System automatycznie wygeneruje kod React + Tailwind

3. **Integracja z istniejącym projektem:**
   - Kod pojawi się w folderze `/src/imports/`
   - Komponenty będą w plikach `.tsx`
   - Grafiki w formacie SVG i PNG

4. **Wklejenie do App.tsx:**
   ```tsx
   // Zaimportuj komponent
   import { MojNowyKomponent } from './imports/MojNowyKomponent';
   
   // Użyj w odpowiedniej sekcji
   <div className="...">
     <MojNowyKomponent />
   </div>
   ```

### Metoda 2: Ręczne kopiowanie stylów z Figma

1. **Kopiowanie kolorów:**
   - W Figma zaznacz element
   - W prawym panelu sprawdź kolor (Fill)
   - Skopiuj wartość hex (np. `#FFE0D8`)
   - W kodzie użyj jako `bg-[#FFE0D8]` lub `text-[#FFE0D8]`

2. **Kopiowanie odstępów:**
   - Padding w Figma → `p-[16px]` lub `px-4` (4 = 16px/4)
   - Margin → `m-[16px]` lub `mx-4`
   - Gap → `gap-[16px]` lub `gap-4`

3. **Kopiowanie zaokrągleń:**
   - Border radius w Figma → `rounded-[24px]`

4. **Kopiowanie cieni:**
   - Shadow w Figma: `X=4 Y=4 Blur=0 Color=#000 Opacity=10%`
   - W kodzie: `shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]`

## 📤 Eksport projektu do Figma Design

### Opcja A: Screenshot + odwzorowanie w Figma (ręcznie)

1. **Zrób screenshot aplikacji:**
   - Otwórz aplikację w przeglądarce
   - Zrób screenshot całej strony lub poszczególnych sekcji
   - Zapisz jako PNG/JPG

2. **Import do Figma:**
   - W Figma: File → Place Image
   - Wklej screenshot jako tło (Ctrl/Cmd + V)
   - Zablokuj warstwę ze screenshotem

3. **Odtwórz design:**
   - Na nowym layerze odtwórz elementy (prostokąty, tekst, ikony)
   - Dopasuj kolory, fonty, odstępy zgodnie ze screenshotem
   - Użyj narzędzia "Measure" (Dev Mode) aby sprawdzić wymiary

### Opcja B: Figma Dev Mode (podgląd kodu)

**Uwaga:** Ta opcja wymaga Figma Professional/Dev Mode

1. **Włącz Dev Mode w Figma:**
   - Otwórz plik Figma
   - Kliknij przycisk "Dev Mode" (prawy górny róg)

2. **Wklej kod CSS/Tailwind:**
   - Zaznacz element w Figmie
   - W panelu prawym zobaczysz sugerowany kod CSS
   - Możesz ręcznie dodać klasę Tailwind jako notatki

### Opcja C: Plugin "html.to.design"

1. **Instalacja pluginu:**
   - W Figmie: Menu → Plugins → Browse plugins
   - Szukaj: "html.to.design"
   - Kliknij Install

2. **Import URL:**
   - Opublikuj swoją aplikację online (np. na Vercel, Netlify)
   - W Figmie uruchom plugin "html.to.design"
   - Wklej URL swojej aplikacji
   - Plugin automatycznie odtworzy design w Figmie

3. **Edycja w Figmie:**
   - Otrzymasz edytowalne komponenty Figma
   - Możesz zmieniać kolory, tekst, układy
   - Zachowane będą struktury i style

## 🔄 Workflow: Figma → Kod → Figma → Kod

### Rekomendowany proces pracy:

#### 1. Projektowanie (Figma)
- Stwórz mockup w Figmie
- Użyj Auto Layout dla responsywności
- Nazwij warstwy zgodnie z nazwami komponentów

#### 2. Import do kodu (Make)
- Skopiuj link do frame'a z Figmy
- Wklej w Figma Make
- Otrzymasz gotowy kod React + Tailwind

#### 3. Dostosowanie w kodzie
- Dodaj interakcje (onClick, useState)
- Podłącz do backendu
- Dostosuj responsywność

#### 4. Zmiany designu
- **Małe zmiany:** edytuj bezpośrednio w kodzie
  - Kolory: zmień hex w klasach `bg-[#...]`
  - Tekst: edytuj bezpośrednio w JSX
  - Odstępy: zmień wartości `p-X`, `gap-X`

- **Duże zmiany:** wróć do Figmy
  - Zaktualizuj design w Figmie
  - Zaimportuj ponownie do Make
  - Porównaj z istniejącym kodem
  - Ręcznie przenieś zmiany (lub zastąp komponent)

## 🎨 Mapowanie Figma → Tailwind CSS

| Figma | Tailwind |
|-------|----------|
| Fill (kolor tła) | `bg-[#HEX]` |
| Stroke (obramowanie) | `border-[2px] border-[#HEX]` |
| Corner Radius | `rounded-[24px]` |
| Padding | `p-[16px]` lub `px-4 py-2` |
| Gap (Auto Layout) | `gap-[16px]` lub `gap-4` |
| Font Size | `text-[14px]` |
| Font Weight | `font-bold`, `font-semibold` |
| Opacity | `opacity-50` (50%) |
| Shadow | `shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]` |

## 💡 Wskazówki

### Do czego używać Figmy:
✅ Projektowanie nowych sekcji/ekranów  
✅ Eksperymentowanie z kolorami i layoutem  
✅ Prezentowanie koncepcji klientowi/zespołowi  
✅ Tworzenie design systemu (kolory, komponenty)

### Do czego używać kodu:
✅ Małe zmiany (kolory, tekst, odstępy)  
✅ Dodawanie logiki i interakcji  
✅ Integracja z API/bazą danych  
✅ Optymalizacja wydajności

## 🔧 Narzędzia pomocnicze

### Figma Plugins przydatne w tym projekcie:
- **html.to.design** - import HTML/URL do Figmy
- **Tailwind CSS** - podpowiedzi klas Tailwind w Figmie
- **Color Palettes** - generowanie palet kolorów
- **Lorem Ipsum** - placeholder tekstu
- **Unsplash** - import zdjęć

### Browser Extensions:
- **Figma to Code** - export Figma → HTML/React
- **CSS Scan** - kopiowanie stylów z dowolnej strony

## 🎨 Paleta kolorów projektu

Projekt używa **palety Travel App** - czysty, minimalistyczny design z niebieskim jako głównym kolorem.

Pełna paleta z kodami hex dostępna w:
📖 **`PALETA_TRAVEL_APP.md`**

**Główne kolory do użycia w Figmie:**
- Primary Blue: `#006FFD`
- Background: `#F8F9FE`
- Text: `#1F2024`
- Secondary Text: `#71727A`
- Borders: `#E8E9F1`

Gdy projektujesz w Figmie, użyj tych samych kolorów aby zachować spójność!

## 📚 Przydatne linki

- [Figma Plugin: html.to.design](https://www.figma.com/community/plugin/1159123024924461424)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Figma Dev Mode](https://help.figma.com/hc/en-us/articles/15023124644247-Guide-to-Dev-Mode)

## 📖 Dokumentacja projektu

- `INSTRUKCJA_EDYCJI.md` - jak edytować zawartość i kolory w kodzie
- `INSTRUKCJA_FIGMA.md` (ten plik) - integracja Figma ↔ Kod
- `PALETA_TRAVEL_APP.md` - pełna paleta kolorów Travel App z kodami hex i przykładami

---

**Pytania?** Sprawdź pozostałe pliki instrukcji w głównym folderze projektu.
