# 🎨 Paleta kolorów pastelowych - Workation

## Główne kolory projektu

### 🌸 Różowy / Fioletowy
```
Bardzo jasny: #FFF5F7
Jasny:        #F3E5F5
Średni:       #E1BEE7
Ciemny:       #CE93D8
Tekst:        #6A1B9A
```
**Użycie:** Zakładka "Co zabrać", avatary fioletowe, akcenty

### 💛 Żółty / Bursztynowy
```
Bardzo jasny: #FFF9E6
Jasny:        #FFECB3
Średni:       #FFE082
Średni 2:     #FFD54F
Jasny beż:    #FFF4D6
Średni beż:   #FFE9B3
Tekst:        #F57C00
```
**Użycie:** Zakładka "Plan dnia", avatary bursztynowe, akcenty finansowe

### 💙 Niebieski / Cyan
```
Bardzo jasny: #E0F7FA
Jasny:        #B2EBF2
Średni:       #81D4FA
Pastel:       #D1F2F9
Pastel 2:     #B3E5FC
Tekst:        #0277BD
Tekst ciemny: #006064
```
**Użycie:** Zakładka "Transport", avatary niebieskie, informacje o trasie

### 💚 Zielony
```
Bardzo jasny: #E8F5E9
Jasny:        #C8E6C9
Średni:       #A5D6A7
Pastel:       #D4F1D4
Pastel 2:     #B8E6B8
Tekst:        #2E7D32
Tekst ciemny: #1B5E20
```
**Użycie:** Zakładka "Zrzutka", "Nocleg", avatary zielone, statusy "opłacone"

### 🧡 Koralowy / Pomarańczowy
```
Bardzo jasny: #FFE0D8
Jasny:        #FFCCBC
Średni:       #FFAB91
Tekst:        #D84315
Tekst ciemny: #BF360C
```
**Użycie:** Zakładka "Zakupy", avatary koralowe, przyciski dodawania

### 🩶 Szary
```
Bardzo jasny: #ECEFF1
Jasny:        #CFD8DC
Średni:       #B0BEC5
Tekst:        #455A64
Tekst ciemny: #263238
```
**Użycie:** Avatary neutralne, tła pomocnicze

## Kolory funkcjonalne

### ✅ Sukces / Opłacone
```
Tło gradient: from-[#E8F5E9] to-[#C8E6C9]
Border:       #A5D6A7
Tekst:        #2E7D32
```

### ⏳ Oczekujące / Do zapłaty
```
Tło gradient: from-[#FFF9E6] to-[#FFECB3]
Border:       #FFE082
Tekst:        #F57C00
```

### ❌ Usuwanie / Błąd
```
Przycisk:     #FF0000
Hover:        #CC0000
```

## Gradienty tła strony

```css
bg-gradient-to-br from-[#FFF5F7] via-[#F5F0FF] to-[#FFF9E6]
```
Różowy → Fioletowy → Żółty

## Cienie

### Delikatny cień (karty, przyciski)
```
shadow-sm
```

### Offset shadow (główne karty)
```
shadow-[4px_4px_0px_0px_rgba(0,0,0,0.05)]
shadow-[6px_6px_0px_0px_rgba(0,0,0,0.1)]
```

## Bordery

### Delikatne (avatary, chipsy)
```
border-2
```

### Widoczne (karty główne)
```
border-4
border-3
```

## Jak używać w kodzie

### Background gradient
```tsx
className="bg-gradient-to-r from-[#FFF9E6] to-[#FFECB3]"
```

### Tekst
```tsx
className="text-[#6A1B9A]"
```

### Border
```tsx
className="border-2 border-[#E1BEE7]"
```

### Kompletny przykład (pastelowy przycisk)
```tsx
className="
  bg-gradient-to-r from-[#F3E5F5] to-[#E1BEE7]
  text-[#6A1B9A]
  border-2 border-[#E1BEE7]
  rounded-2xl
  px-4 py-2
  shadow-sm
  hover:scale-105
  transition-all
"
```

## Zasady doboru kolorów

1. **Tło:** Bardzo jasne pastele (#FFF...)
2. **Elementy interaktywne:** Jasne/średnie pastele (#XXE... → #XXC...)
3. **Tekst na pastelach:** Ciemne, nasycone odcienie (#XX7..., #XX3...)
4. **Gradienty:** Od jaśniejszego do ciemniejszego
5. **Cienie:** Bardzo delikatne (opacity 5-10%)
6. **Bordery:** O 1-2 kroki ciemniejsze niż tło

---

**Wskazówka:** Zawsze testuj czytelność tekstu na pastelowym tle! Kontrast tekstu powinien być wystarczający.
