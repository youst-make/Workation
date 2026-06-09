import { useState, useEffect, useRef, useMemo } from "react";
import { storageGet, storageSet } from "./storage";

// Types
interface Person {
  init: string;
  name: string;
  av: string;
}

interface CostItem {
  id: string; // FIX #6: stabilne id zamiast indeksu
  name: string;
  who: string;
  cost: number;
  category: "transport_zakwaterowanie" | "zakupy";
  done: boolean;
}

interface CarDriver {
  personIndex: number;
  departureTime: string;
  departureLocation: string;
  passengers: number[];
}

interface GearItem {
  name: string;
  who: string;
  done: boolean;
}

interface PlaylistItem {
  id: string;
  url: string;
  title: string;
  thumbnail: string | null;
  platform: "youtube" | "spotify" | "other";
  who: string;
  addedAt: number;
}

const PEOPLE: Person[] = [
  { init: "TS", name: "Tomek", av: "av-g" },
  { init: "JW", name: "Justyna", av: "av-p" },
  { init: "MT", name: "Marta", av: "av-b" },
  { init: "ISB", name: "Iza", av: "av-c" },
  { init: "MA", name: "Marcin", av: "av-a" },
  { init: "KW", name: "Krzysztof", av: "av-2" },
  { init: "PM", name: "Piotr", av: "av-3" },
  { init: "BK", name: "Bartek", av: "av-4" },
];

const DEFAULT_COSTS: CostItem[] = [
  // Transport & Zakwaterowanie
  { id: "c1", name: "Nocleg", who: "Tomek", cost: 480, category: "transport_zakwaterowanie", done: false },
  { id: "c2", name: "Paliwo (2 auta)", who: "Marcin", cost: 60, category: "transport_zakwaterowanie", done: false },

  // Zakupy
  { id: "c3", name: "Kiełbaski & karkówka", who: "Tomek", cost: 0, category: "zakupy", done: false },
  { id: "c4", name: "Pieczywo & bułki", who: "Iza", cost: 0, category: "zakupy", done: false },
  { id: "c5", name: "Piwo (zgrzewka)", who: "Tomek", cost: 0, category: "zakupy", done: false },
  { id: "c6", name: "Wino & napoje", who: "Justyna", cost: 0, category: "zakupy", done: false },
  { id: "c7", name: "Warzywa & sałatki", who: "Marta", cost: 0, category: "zakupy", done: false },
  { id: "c8", name: "Marshmallows", who: "Iza", cost: 0, category: "zakupy", done: false },
  { id: "c9", name: "Podpałka & węgiel", who: "Marcin", cost: 0, category: "zakupy", done: false },
  { id: "c10", name: "Papier toaletowy", who: "Krzysztof", cost: 0, category: "zakupy", done: false },
];

const DEFAULT_GEAR: GearItem[] = [
  { name: "Kubki", who: "Iza", done: false },
  { name: "Karty", who: "Tomek", done: false },
  { name: "Codenames", who: "Marcin", done: false },
  { name: "Głośnik bluetooth", who: "Krzysztof", done: false },
  { name: "Przedłużacz", who: "Justyna", done: false },
  { name: "Balony", who: "Marta", done: false },
];

const PERSONAL_ITEMS = [
  "Ładowarka telefonu",
  "Śpiwór / poduszka",
  "Klapki",
  "Dres / piżama",
  "Leki osobiste",
  "Gotówka",
  "Dowód osobisty",
  "Krem z filtrem",
];

type TabType =
  | "transport"
  | "nocleg"
  | "koszty"
  | "rzeczy"
  | "plan"
  | "zrzutka"
  | "start"
  | "muzyka";

interface EventSettings {
  title: string;
  subtitle: string;
  date: string;
  location: string;
  venue: string;
  venueAddress: string;
  venuePhone: string;
}

const DEFAULT_SETTINGS: EventSettings = {
  title: "Workation — Żulin",
  subtitle: "Wyjazd integracyjny: piątek–sobota",
  date: "10 lipca 2026",
  location: "Żulin",
  venue: "",
  venueAddress: "Żulin 1",
  venuePhone: "",
};

const mergePeople = (saved: Person[], defaults: Person[]) => {
  const savedNames = new Set(saved.map((person) => person.name));
  return [...saved, ...defaults.filter((person) => !savedNames.has(person.name))];
};

function StartSection() {
  const [content, setContent] = useState("");

  useEffect(() => {
    setContent(`
      <h1>Workation 🌿</h1><br>
      <h2>Podstawowe informacje</h2>
      <p>
         Jedziemy na jeden dzień poza biuro — do miejsca, gdzie pracuje się lepiej, oddycha głębiej i myśli jaśniej.<br>
         Wyruszamy na jednodniowe workation do Stodoły Artystów — przestrzeni stworzonej do kreatywnej pracy, rozmów i złapania nowej perspektywy.<br>
         To nie tylko wyjazd integracyjny. To dzień, w którym łączymy pracę, współpracę i reset w jednym miejscu.<br>
         Wyjedziemy w piątek rano, powrót wg preferencji.<br>
      </p>
      <br>
      <h2>Co nas czeka?</h2>
      <p><ul>
        <li>• wspólna podróż i luźny start dnia</li>
        <li>• czas na pracę w spokojnym, inspirującym otoczeniu</li>
        <li>• przerwy na kawę, spacery i rozmowy bez teamsów</li>
        <li>• przestrzeń na pomysły, które nie mieszczą się w biurze</li>
        <li>• trochę chaosu, trochę słońca i dużo świeżego powietrza</li></ul></p>
<br>
      <div className="my-10 w-full">
        <hr className="w-full border-0 border-t border-white/20" />
      </div>

      <br>
      <h2>Garść informacji pratycznych od Piotra</h2>
      <p><ul>
      <br>
      <h3>Noclegi</h3>
      <li>• Noclegi będą raczej w formule „integracyjnej”.
      <li>• Część osób może spać na jednej pryczy, więc warto wcześniej ustalić to ze swoimi partnerami życiowymi 😉<br>
      <br>
      <h3>Dojazd</h3>
      <li>• Dojazd rekomendowany głównie autem.<br>
      <li>• Istnieją pojedyncze autokary z Wileńskiego, ale logistycznie może być ciężko.<br>
      <li>• Powrót w trakcie imprezy raczej nieprzewidziany — obowiązuje opcja „do rana”.<br>
      <li>• Najbliższy sensowny pociąg w Łochowie, więc i tak potrzebny byłby transport autem.<br>
      <li>• Alternatywna forma powrotu: pieszo Drogą św. Jakuba do Santiago de Compostela (szacowany czas marszu: 3,5–4 miesiące), więc warto zawczasu zaplanować urlopy.<br>
      <br>
      <h3>Wyżywienie</h3>
      <li>• Wyżywienie we własnym zakresie — zalecane kosze piknikowe i suchy prowiant, bo przemysłowej lodówki od lat brak.<br>
      <li>• Po negocjacjach organizator dopuścił luksusy w postaci czajnika i mikrofalówki.<br>
      <li>• Status papieru toaletowego pozostaje niepotwierdzony.<br>
      <li>• Ogólny klimat wyjazdu określono roboczo jako: „ruja i poróbstwo”, ale w granicach budżetu administracji publicznej.<br></ul>  
<br>
<p><h3>Najważniejsze punkty organizacyjne:</h3>
1. Auto praktycznie obowiązkowe.<br>
2. Zabrać własne jedzenie i napoje.<br>
3. Nie planować wcześniejszego powrotu.<br>
4. Ustalić kwestie noclegowe. Mieć pisemne pozwolenie.<br>
5. Humor organizatorów pozostaje stabilnie niebezpieczny.<br>
</p>
    `);
  }, []);

  return (
    <div className="bg-white rounded-[12px] shadow-sm p-5 mb-3">
      <div className="text-[10px] font-semibold tracking-[0.8px] uppercase text-[#8F9098] mb-4">
        🌿 Workation
      </div>

      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>("start");

  const [settings, setSettings] = useState<EventSettings>(DEFAULT_SETTINGS);
  const [people, setPeople] = useState<Person[]>(PEOPLE);
  const [costItems, setCostItems] = useState<CostItem[]>(DEFAULT_COSTS);
  const [gearItems, setGearItems] = useState<GearItem[]>(DEFAULT_GEAR);
  const [personalDone, setPersonalDone] = useState<Record<number, boolean>>({});
  const [payStatus, setPayStatus] = useState<boolean[]>([true, true, false, false, false, false]);
  const [drivers, setDrivers] = useState<CarDriver[]>([
    { personIndex: 0, departureTime: "09:00", departureLocation: "Wawer", passengers: [1, 2] },
    { personIndex: 3, departureTime: "09:00", departureLocation: "Ursynów", passengers: [4, 5] },
  ]);
  const [personalItems, setPersonalItems] = useState<string[]>(PERSONAL_ITEMS);
  const [playlistItems, setPlaylistItems] = useState<PlaylistItem[]>([]);

  // FIX #2: useState zamiast useRef dla flagi loaded — eliminuje race condition
  const [loaded, setLoaded] = useState(false);
  const loadStarted = useRef(false);

  // Załaduj dane przy starcie
  useEffect(() => {
    if (loadStarted.current) return;
    loadStarted.current = true;

    const load = async () => {
      const [s, p, c, g, pd, ps, d, pi, pl] = await Promise.all([
        storageGet("wk2_settings", DEFAULT_SETTINGS),
        storageGet("wk2_people", PEOPLE),
        storageGet("wk2_costs", DEFAULT_COSTS),
        storageGet("wk2_gear", DEFAULT_GEAR),
        storageGet("wk2_personal", {} as Record<number, boolean>),
        storageGet("wk2_pay", [true, true, false, false, false, false] as boolean[]),
        storageGet(
          "wk2_drivers",
          [
            { personIndex: 0, departureTime: "09:00", departureLocation: "Wawer", passengers: [1, 2] },
            { personIndex: 3, departureTime: "09:00", departureLocation: "Ursynów", passengers: [4, 5] },
          ] as CarDriver[]
        ),
        storageGet("wk2_personal_items", PERSONAL_ITEMS),
        storageGet("wk2_playlist", [] as PlaylistItem[]),
      ]);

      // MIGRACJA: stare dane ze storage mogą nie mieć pola id
      const migratedCosts = (c as CostItem[]).map((item, idx) =>
        item.id ? item : { ...item, id: `migrated_${idx}_${Date.now()}` }
      );
      
      const mergedPeople = mergePeople(p as Person[], PEOPLE);
      const normalizedPayStatus = ((ps as boolean[]).slice(0, mergedPeople.length) ?? []).concat(
        Array(Math.max(0, mergedPeople.length - (ps as boolean[]).length)).fill(false)
      );
      
      setSettings(s);
      setPeople(mergedPeople);
      setCostItems(migratedCosts);
      setGearItems(g);
      setPersonalDone(pd);
      setPayStatus(normalizedPayStatus);
      setDrivers(d);
      setPersonalItems(pi);
      setPlaylistItems(pl);
      setLoaded(true); // FIX #2: setState zamiast ref.current = true
    };
    load();
  }, []);

  // FIX #2: loaded jako dependency — zapis do storage tylko po załadowaniu
  useEffect(() => { if (loaded) storageSet("wk2_settings", settings); }, [settings, loaded]);
  useEffect(() => { if (loaded) storageSet("wk2_people", people); }, [people, loaded]);
  useEffect(() => { if (loaded) storageSet("wk2_costs", costItems); }, [costItems, loaded]);
  useEffect(() => { if (loaded) storageSet("wk2_gear", gearItems); }, [gearItems, loaded]);
  useEffect(() => { if (loaded) storageSet("wk2_personal", personalDone); }, [personalDone, loaded]);
  useEffect(() => { if (loaded) storageSet("wk2_pay", payStatus); }, [payStatus, loaded]);
  useEffect(() => { if (loaded) storageSet("wk2_drivers", drivers); }, [drivers, loaded]);
  useEffect(() => { if (loaded) storageSet("wk2_personal_items", personalItems); }, [personalItems, loaded]);
  useEffect(() => { if (loaded) storageSet("wk2_playlist", playlistItems); }, [playlistItems, loaded]);

  // Stan UI (nie synchronizowany)
  const [costInput, setCostInput] = useState("");
  const [costWho, setCostWho] = useState(people[0]?.name || "Tomek");
  const [costAmount, setCostAmount] = useState("");
  const [costCategory, setCostCategory] = useState<"transport_zakwaterowanie" | "zakupy">("zakupy");
  const [gearInput, setGearInput] = useState("");
  const [gearWho, setGearWho] = useState(people[0]?.name || "Tomek");
  const [newPersonName, setNewPersonName] = useState("");
  const [newPersonInit, setNewPersonInit] = useState("");
  const [newPersonColor, setNewPersonColor] = useState("av-g");
  const [editingDriver, setEditingDriver] = useState<number | null>(null);
  const [newPersonalItem, setNewPersonalItem] = useState("");
  const [editingCostId, setEditingCostId] = useState<string | null>(null); // FIX #6: id zamiast indeksu

  // Playlista — stan UI
  const [playlistUrl, setPlaylistUrl] = useState("");
  const [playlistTitle, setPlaylistTitle] = useState("");
  const [playlistWho, setPlaylistWho] = useState(people[0]?.name || "Tomek");
  const [playlistFetching, setPlaylistFetching] = useState(false);
  const [playlistError, setPlaylistError] = useState("");

  // Playlista — funkcje
  const detectPlatform = (url: string): PlaylistItem["platform"] => {
    if (/youtu\.be|youtube\.com/i.test(url)) return "youtube";
    if (/open\.spotify\.com/i.test(url)) return "spotify";
    return "other";
  };

  const extractYouTubeId = (url: string): string | null => {
    const m = url.match(/(?:v=|youtu\.be\/|embed\/)([A-Za-z0-9_-]{11})/);
    return m ? m[1] : null;
  };

  const fetchTrackMeta = async (url: string): Promise<{ title: string; thumbnail: string | null }> => {
    const platform = detectPlatform(url);
    if (platform === "youtube") {
      try {
        const res = await fetch(`https://noembed.com/embed?url=${encodeURIComponent(url)}`);
        const data = await res.json();
        const ytId = extractYouTubeId(url);
        return {
          title: data.title || url,
          thumbnail: ytId ? `https://img.youtube.com/vi/${ytId}/mqdefault.jpg` : null,
        };
      } catch {
        return { title: url, thumbnail: null };
      }
    }
    if (platform === "spotify") {
      const m = url.match(/spotify\.com\/(track|album|playlist)\/[^?]+/);
      const label = m ? m[0].replace("spotify.com/", "").replace(/\//g, " › ") : url;
      return { title: label, thumbnail: null };
    }
    return { title: url, thumbnail: null };
  };

  const addPlaylistItem = async () => {
    if (!playlistUrl.trim()) return;
    setPlaylistFetching(true);
    setPlaylistError("");
    try {
      const platform = detectPlatform(playlistUrl);
      const ytId = extractYouTubeId(playlistUrl);
      const meta = playlistTitle.trim()
        ? {
          title: playlistTitle.trim(),
          thumbnail:
            platform === "youtube" && ytId
              ? `https://img.youtube.com/vi/${ytId}/mqdefault.jpg`
              : null,
        }
        : await fetchTrackMeta(playlistUrl);
      const newItem: PlaylistItem = {
        id: Date.now().toString(),
        url: playlistUrl.trim(),
        title: meta.title,
        thumbnail: meta.thumbnail,
        platform,
        who: playlistWho,
        addedAt: Date.now(),
      };
      setPlaylistItems((prev) => [newItem, ...prev]);
      setPlaylistUrl("");
      setPlaylistTitle("");
    } catch {
      setPlaylistError("Mordeczko nic z tego. Nie udało się pobrać informacji o utworze");
    } finally {
      setPlaylistFetching(false);
    }
  };

  const removePlaylistItem = (id: string) => {
    setPlaylistItems((prev) => prev.filter((item) => item.id !== id));
  };

  const toggleCostDone = (id: string) => {
    setCostItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, done: !item.done } : item))
    );
  };

  const updateCostPerson = (id: string, who: string) => {
    setCostItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, who } : item))
    );
  };

  const updateCostAmount = (id: string, cost: number) => {
    setCostItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, cost } : item))
    );
  };

  const updateCostName = (id: string, name: string) => {
    setCostItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, name } : item))
    );
  };

  const updateDriver = (driverIndex: number, field: keyof CarDriver, value: any) => {
    setDrivers((prev) =>
      prev.map((driver, i) =>
        i === driverIndex ? { ...driver, [field]: value } : driver
      )
    );
  };

  const addCostItem = () => {
    if (!costInput.trim()) return;
    setCostItems((prev) => [
      ...prev,
      {
        id: Date.now().toString(), // FIX #6: generuj unikalne id
        name: costInput,
        who: costWho,
        cost: parseFloat(costAmount) || 0,
        category: costCategory,
        done: false,
      },
    ]);
    setCostInput("");
    setCostAmount("");
  };

  const addPassenger = (driverIndex: number, passengerIndex: number) => {
    setDrivers((prev) =>
      prev.map((driver, i) =>
        i === driverIndex
          ? { ...driver, passengers: [...driver.passengers, passengerIndex] }
          : driver
      )
    );
  };

  const removePassenger = (driverIndex: number, passengerIndex: number) => {
    setDrivers((prev) =>
      prev.map((driver, i) =>
        i === driverIndex
          ? { ...driver, passengers: driver.passengers.filter((p) => p !== passengerIndex) }
          : driver
      )
    );
  };

  const removeCostItem = (id: string) => {
    setCostItems((prev) => prev.filter((item) => item.id !== id));
  };

  const removeGearItem = (index: number) => {
    setGearItems((prev) => prev.filter((_, i) => i !== index));
  };

  const addPersonalItem = () => {
    if (!newPersonalItem.trim()) return;
    setPersonalItems((prev) => [...prev, newPersonalItem]);
    setNewPersonalItem("");
  };

  const removePersonalItem = (index: number) => {
    setPersonalItems((prev) => prev.filter((_, i) => i !== index));
    setPersonalDone((prev) => {
      const updated = { ...prev };
      delete updated[index];
      const newDone: Record<number, boolean> = {};
      Object.keys(updated).forEach((key) => {
        const k = parseInt(key);
        if (k > index) {
          newDone[k - 1] = updated[k];
        } else {
          newDone[k] = updated[k];
        }
      });
      return newDone;
    });
  };

  const toggleGear = (index: number) => {
    setGearItems((prev) =>
      prev.map((item, i) => (i === index ? { ...item, done: !item.done } : item))
    );
  };

  const addGear = () => {
    if (!gearInput.trim()) return;
    setGearItems((prev) => [...prev, { name: gearInput, who: gearWho, done: false }]);
    setGearInput("");
  };

  const togglePersonal = (index: number) => {
    setPersonalDone((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const togglePay = (index: number) => {
    setPayStatus((prev) => prev.map((status, i) => (i === index ? !status : status)));
  };

  const addPerson = () => {
    if (!newPersonName.trim() || !newPersonInit.trim()) return;
    setPeople((prev) => [...prev, { name: newPersonName, init: newPersonInit, av: newPersonColor }]);
    setPayStatus((prev) => [...prev, false]);
    setNewPersonName("");
    setNewPersonInit("");
  };

  const removePerson = (index: number) => {
    setPeople((prev) => prev.filter((_, i) => i !== index));
    setPayStatus((prev) => prev.filter((_, i) => i !== index));
  };

  // FIX #5: useMemo na kalkulacjach kosztów
  const { costsByPerson, totalCost } = useMemo(() => {
    const byPerson: Record<number, number> = {};
    let total = 0;
    for (const item of costItems) {
      if (item.cost > 0) {
        const idx = people.findIndex((p) => p.name === item.who);
        if (idx >= 0) byPerson[idx] = (byPerson[idx] || 0) + item.cost;
        total += item.cost;
      }
    }
    return { costsByPerson: byPerson, totalCost: total };
  }, [costItems, people]);

  // FIX #4: Math.round zamiast Math.ceil — poprawne saldo shouldPay
  const perPerson = people.length > 0
    ? Math.round((totalCost / people.length) * 100) / 100
    : 0;

  const paidCount = payStatus.filter(Boolean).length;
  const collected = Math.min(paidCount * perPerson, totalCost);

  const getAvatarClass = (av: string) => {
    const map: Record<string, string> = {
      "av-g": "bg-[#E7F4E8] text-[#3AC0A0] border border-[#3AC0A0]",
      "av-a": "bg-[#FFF4E4] text-[#FFB37C] border border-[#FFB37C]",
      "av-b": "bg-[#EAF2FF] text-[#006FFD] border border-[#006FFD]",
      "av-c": "bg-[#FFE2E5] text-[#FF616D] border border-[#FF616D]",
      "av-p": "bg-[#EAF2FF] text-[#6FBAFF] border border-[#6FBAFF]",
      "av-2": "bg-[#F8F9FE] text-[#71727A] border border-[#C5C6CC]",
    };
    return map[av] || map["av-2"];
  };

  return (
    <div className="min-h-screen bg-[#F8F9FE] py-6 px-4 pb-20">
      <div className="max-w-[900px] mx-auto">
        {/* Hero */}
        <div className="bg-white rounded-[16px] shadow-sm p-6 mb-4">
          <div className="inline-block text-[10px] font-semibold tracking-[0.8px] uppercase text-[#006FFD] bg-[#EAF2FF] px-3 py-1.5 rounded-[8px] mb-3">
            WYJAZD SMART'ÓW
          </div>
          <h1 className="text-[28px] font-extrabold tracking-[0.28px] leading-tight mb-2 text-[#1F2024]">
            {settings.title}
          </h1>
          <div className="text-[14px] text-[#71727A] mb-5 font-normal leading-[20px]">
            {settings.subtitle}
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { emoji: "📅", text: settings.date },
              { emoji: "📍", text: settings.location },
              settings.venue ? { emoji: "🏡", text: settings.venue } : null,
              { emoji: "👥", text: `${people.length} osób` },
            ]
              .filter(Boolean)
              .map((chip) => (
                <div
                  key={chip!.text}
                  className="text-[12px] font-medium bg-[#F8F9FE] border border-[#E8E9F1] rounded-[8px] px-3 py-1.5 text-[#1F2024]"
                >
                  <span className="mr-1.5">{chip!.emoji}</span>
                  {chip!.text}
                </div>
              ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex gap-2 flex-wrap mb-4">
          {[
            { id: "start" as TabType, label: "🌿 Start" },
            { id: "plan" as TabType, label: "📋 Plan dnia" },
            { id: "transport" as TabType, label: "🚗 Transport" },
            { id: "zrzutka" as TabType, label: "💸 Zrzutka" },
            { id: "koszty" as TabType, label: "💰 Koszty" },
            { id: "rzeczy" as TabType, label: "🎒 Co zabrać" },
            { id: "nocleg" as TabType, label: "🏡 Nocleg" },
            { id: "muzyka" as TabType, label: "🎵 Muzyka" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`text-[12px] font-semibold px-4 py-2.5 rounded-[12px] transition-all whitespace-nowrap ${activeTab === tab.id
                ? "bg-[#006FFD] text-white shadow-sm"
                : "bg-white text-[#71727A] border border-[#E8E9F1] hover:border-[#006FFD] hover:text-[#006FFD]"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "start" && <StartSection />}
        
        {/* Transport Section */}
        {activeTab === "transport" && (
          <>
            <div className="bg-white rounded-[12px] shadow-sm p-5 mb-3">
              <div className="text-[10px] font-semibold tracking-[0.8px] uppercase text-[#8F9098] mb-4">
                🚗 Auta i pasażerowie
              </div>

              {drivers.map((driver, driverIdx) => (
                <div key={driverIdx}>
                  {driverIdx > 0 && <div className="h-px bg-[#E2DDD5] my-3"></div>}

                  <div className="flex items-center gap-3 py-2.5 border-b border-[#E8E9F1]">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-semibold tracking-tight flex-shrink-0 ${getAvatarClass(people[driver.personIndex]?.av || "av-2")}`}
                    >
                      {people[driver.personIndex]?.init || "?"}
                    </div>
                    <div className="flex-1 min-w-0">
                      {editingDriver === driverIdx ? (
                        <div className="space-y-1">
                          <select
                            value={driver.personIndex}
                            onChange={(e) =>
                              updateDriver(driverIdx, "personIndex", Number(e.target.value))
                            }
                            className="text-sm px-2 py-1 border border-[#E8E9F1] rounded bg-white"
                          >
                            {people.map((p, i) => (
                              <option key={i} value={i}>
                                {p.name}
                              </option>
                            ))}
                          </select>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={driver.departureLocation}
                              onChange={(e) =>
                                updateDriver(driverIdx, "departureLocation", e.target.value)
                              }
                              placeholder="Miejsce wyjazdu"
                              className="text-xs px-2 py-1 border border-[#C5C6CC] rounded-[8px] bg-white flex-1"
                            />
                            <input
                              type="text"
                              value={driver.departureTime}
                              onChange={(e) =>
                                updateDriver(driverIdx, "departureTime", e.target.value)
                              }
                              placeholder="Godz."
                              className="text-xs px-2 py-1 border border-[#C5C6CC] rounded-[8px] bg-white w-16"
                            />
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="text-sm font-medium">
                            {people[driver.personIndex]?.name || "Nieznany"}
                          </div>
                          <div className="text-xs text-[#71727A] mt-0.5">
                            wyjazd {driver.departureLocation} {driver.departureTime}
                          </div>
                        </>
                      )}
                    </div>
                    <button
                      onClick={() =>
                        setEditingDriver(editingDriver === driverIdx ? null : driverIdx)
                      }
                      className="text-[12px] font-semibold px-3 py-2 rounded-[8px] bg-[#006FFD] text-white flex-shrink-0 hover:bg-[#2897FF] transition-colors"
                    >
                      {editingDriver === driverIdx ? "Zapisz" : "Edytuj"}
                    </button>
                  </div>

                  {driver.passengers.map((passengerIdx, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 py-2.5 pl-[46px] border-b border-[#E8E9F1]"
                    >
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-semibold tracking-tight flex-shrink-0 ${getAvatarClass(people[passengerIdx]?.av || "av-2")}`}
                      >
                        {people[passengerIdx]?.init || "?"}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium">
                          {people[passengerIdx]?.name || "Nieznany"}
                        </div>
                        <div className="text-xs text-[#71727A] mt-0.5">
                          Pasażer → auto{" "}
                          {people[driver.personIndex]?.name?.split(" ")[0] || "kierowcy"}
                        </div>
                      </div>
                      <button
                        onClick={() => removePassenger(driverIdx, passengerIdx)}
                        className="text-lg text-[#FF0000] hover:text-[#CC0000] hover:scale-125 transition-all"
                      >
                        ✕
                      </button>
                    </div>
                  ))}

                  {/* Dodaj pasażera */}
                  <div className="flex items-center gap-2 py-2.5 pl-[46px]">
                    <select
                      onChange={(e) => {
                        const passengerIdx = Number(e.target.value);
                        if (
                          passengerIdx >= 0 &&
                          !driver.passengers.includes(passengerIdx) &&
                          passengerIdx !== driver.personIndex
                        ) {
                          addPassenger(driverIdx, passengerIdx);
                          e.target.value = "";
                        }
                      }}
                      className="flex-1 text-xs px-2 py-1 border border-[#C5C6CC] rounded-[8px] bg-[#F8F9FE]"
                      defaultValue=""
                    >
                      <option value="" disabled>
                        + Dodaj pasażera
                      </option>
                      {people.map((p, i) => {
                        const isDriver = i === driver.personIndex;
                        const isPassenger = driver.passengers.includes(i);
                        const isInOtherCar = drivers.some(
                          (d, di) =>
                            di !== driverIdx &&
                            (d.personIndex === i || d.passengers.includes(i))
                        );
                        if (isDriver || isPassenger || isInOtherCar) return null;
                        return (
                          <option key={i} value={i}>
                            {p.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-[12px] shadow-sm p-5">
              <div className="text-[10px] font-semibold tracking-[0.8px] uppercase text-[#8F9098] mb-4">
                🗺️ Trasa
              </div>
              {[
                {
                  label: "Start",
                  value: "Warszawa (Wawer / Ursynów / Białołęka / Saska Kępa)",
                },
                { label: "Cel", value: settings.location },
                { label: "Czas jazdy", value: "~65 min" },
                { label: "Szacowany przyjazd", value: "ok. 09:00 - 09:30", bold: true },
              ].map((row, i, arr) => (
                <div
                  key={row.label}
                  className={`flex justify-between items-center py-2.5 gap-3 text-sm ${i < arr.length - 1 ? "border-b border-[#E8E9F1]" : ""
                    }`}
                >
                  <span className="text-[#71727A] text-[13px] flex-shrink-0">{row.label}</span>
                  <span className={`text-right ${row.bold ? "font-medium" : ""}`}>
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Nocleg Section */}
        {activeTab === "nocleg" && (
          <>
            <div className="bg-white rounded-[12px] shadow-sm p-5 mb-3">
              <div className="text-[10px] font-semibold tracking-[0.8px] uppercase text-[#8F9098] mb-4">
                🏡 Obiekt
              </div>
              {[
                { label: "Check-in", value: "od 16:00 (sobota)" },
                { label: "Check-out", value: "do 12:00 (niedziela)" },
              ].map((row, i, arr) => (
                <div
                  key={row.label}
                  className={`flex justify-between items-center py-2.5 gap-3 text-sm ${i < arr.length - 1 ? "border-b border-[#E8E9F1]" : ""
                    }`}
                >
                  <span className="text-[#71727A] text-[13px] flex-shrink-0">{row.label}</span>
                  <span className="text-right">{row.value}</span>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-[12px] shadow-sm p-5 mb-3">
              <div className="text-[10px] font-semibold tracking-[0.8px] uppercase text-[#8F9098] mb-4">
                ✨ Udogodnienia
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  "Grill",
                  "Ognisko",
                  "WiFi",
                  "Czyste powietrze",
                  "Doznania artystyczne",
                  "Duży ogród",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="text-[12px] font-medium px-3 py-1.5 rounded-[8px] bg-[#EAF2FF] text-[#006FFD] border border-[#B4DBFF]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-[12px] shadow-sm overflow-hidden" id="rejestr-noclegow">
              <div className="p-5 border-b border-[#E8E9F1] bg-[#F8F9FE]">
                <div className="text-[10px] font-semibold tracking-[0.8px] uppercase text-[#8F9098] mb-2">
                  📋 Rejestr ofert
                </div>
                <h2 className="text-lg font-bold text-[#1F2024]">
                  Szczegółowy rejestr: Żulin i okolice
                </h2>
                <p className="text-[#71727A] mt-1 text-[13px] italic">
                  Analiza na termin 10–11 lipca 2026 (8 osób, budżet max 200 zł)
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[640px]">
                  <thead>
                    <tr className="text-[10px] font-semibold text-[#8F9098] uppercase tracking-[0.8px] border-b border-[#E8E9F1]">
                      <th className="p-4 bg-[#F8F9FE]">Obiekt & lokalizacja</th>
                      <th className="p-4 bg-[#F8F9FE]">Typ zakwaterowania</th>
                      <th className="p-4 bg-[#F8F9FE]">Odległość</th>
                      <th className="p-4 bg-[#F8F9FE]">Koszt (8 os.)</th>
                      <th className="p-4 bg-[#F8F9FE] text-right">Akcja</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm divide-y divide-[#F8F9FE]">
                    {[
                      {
                        name: "Agroturystyka U Sołtysa",
                        location: "Żulin",
                        type: "Poddasze wieloosobowe",
                        distance: "1.5 km",
                        cost: "180 zł",
                        url: "https://www.olx.pl/oferty/q-agroturystyka-zulin/",
                      },
                      {
                        name: "Pole Namiotowe Nad Wieprzem",
                        location: "Krupe",
                        type: "Kemping / Własne namioty",
                        distance: "8.2 km",
                        cost: "120 zł",
                        url: "https://meteor-turystyka.pl/noclegi,krupe,0.html",
                      },
                      {
                        name: "Schronisko PTSM Rejowiec",
                        location: "Rejowiec Fabryczny",
                        type: "Sale wieloosobowe",
                        distance: "14.5 km",
                        cost: "160 zł",
                        url: "https://www.nocowanie.pl/noclegi/rejowiec_fabryczny/",
                      },
                      {
                        name: "Stodoła U Sąsiada",
                        location: "Żulin",
                        type: "Materace / Prywatnie",
                        distance: "2.0 km",
                        cost: "150 zł",
                        url: "https://www.airbnb.pl/s/Żulin--Polska/",
                      },
                      {
                        name: "Kwatera Pod Klonem",
                        location: "Krasnystaw",
                        type: "Pokoje gościnne (tanie)",
                        distance: "11.0 km",
                        cost: "200 zł",
                        url: "https://www.booking.com/searchresults.pl.html?ss=Krasnystaw",
                      },
                    ].map((offer) => (
                      <tr
                        key={offer.name}
                        className="hover:bg-[#EAF2FF]/40 transition-colors"
                      >
                        <td className="p-4">
                          <div className="font-medium text-[#1F2024]">{offer.name}</div>
                          <div className="text-xs text-[#71727A] flex items-center gap-1">
                            📍 {offer.location}
                          </div>
                        </td>
                        <td className="p-4 text-[#71727A]">{offer.type}</td>
                        <td className="p-4 text-[#71727A]">{offer.distance}</td>
                        <td className="p-4 font-semibold text-[#006FFD]">{offer.cost}</td>
                        <td className="p-4 text-right">
                          <a
                            href={offer.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block px-4 py-2 bg-[#006FFD] text-white rounded-[8px] text-xs font-semibold hover:bg-[#0056CC] transition-all shadow-sm"
                          >
                            Sprawdź
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-4 bg-[#F8F9FE] text-[10px] text-[#8F9098] italic text-center border-t border-[#E8E9F1]">
                * Ceny i dostępność wymagają potwierdzenia bezpośrednio u gospodarzy na noc z 10 na 11 lipca 2026.
              </div>
            </div>
          </>
        )}

        
        {/* Koszty Section */}
        {activeTab === "koszty" && (
          <>
            {/* Transport & Zakwaterowanie */}
            <div className="bg-white rounded-[12px] shadow-sm p-5 mb-3">
              <div className="text-[10px] font-semibold tracking-[0.8px] uppercase text-[#8F9098] mb-4">
                🚗🏡 Transport & Zakwaterowanie
              </div>
              <div>
                {costItems
                  .filter((item) => item.category === "transport_zakwaterowanie")
                  .map((item) => (
                    // FIX #6: key={item.id} — stabilny klucz
                    <div
                      key={item.id}
                      className="flex items-center gap-2.5 py-2.5 border-b border-[#E8E9F1] last:border-b-0"
                    >
                      <div className="flex-1">
                        {editingCostId === item.id ? (
                          <input
                            type="text"
                            value={item.name}
                            onChange={(e) => updateCostName(item.id, e.target.value)}
                            className="text-sm px-2 py-1 border border-[#C5C6CC] rounded-[8px] bg-white w-full"
                          />
                        ) : (
                          <div className="text-sm">{item.name}</div>
                        )}
                      </div>
                      <select
                        value={item.who}
                        onChange={(e) => updateCostPerson(item.id, e.target.value)}
                        className="text-xs px-2 py-1 border border-[#C5C6CC] rounded-[8px] bg-[#F8F9FE] text-[#71727A] flex-shrink-0"
                      >
                        {people.map((p) => (
                          <option key={p.name}>{p.name}</option>
                        ))}
                      </select>
                      {editingCostId === item.id ? (
                        <input
                          type="number"
                          value={item.cost || ""}
                          onChange={(e) =>
                            updateCostAmount(item.id, parseFloat(e.target.value) || 0)
                          }
                          placeholder="Koszt"
                          className="w-20 text-xs px-2 py-1 border border-[#C5C6CC] rounded-[8px] bg-white text-[#1F2024]"
                        />
                      ) : (
                        <div className="w-20 text-xs px-2 py-1 text-right font-medium">
                          {item.cost} zł
                        </div>
                      )}
                      <button
                        onClick={() =>
                          setEditingCostId(editingCostId === item.id ? null : item.id)
                        }
                        className="text-xs px-2 py-1 border border-[#C5C6CC] rounded-[8px] bg-white text-[#71727A] hover:border-[#006FFD] hover:text-[#006FFD] transition-colors"
                      >
                        {editingCostId === item.id ? "Zapisz" : "Edytuj"}
                      </button>
                      <button
                        onClick={() => removeCostItem(item.id)}
                        className="text-lg text-[#FF0000] hover:text-[#CC0000] hover:scale-125 transition-all"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
              </div>
              <div className="flex gap-2 mt-4 flex-wrap">
                <input
                  type="text"
                  value={costInput}
                  onChange={(e) => setCostInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addCostItem()}
                  placeholder="Dodaj koszt..."
                  className="flex-1 min-w-[120px] text-sm px-3 py-2.5 border border-[#C5C6CC] rounded-[12px] bg-white text-[#1F2024] outline-none focus:border-[#006FFD] transition-all"
                />
                <input
                  type="number"
                  value={costAmount}
                  onChange={(e) => setCostAmount(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addCostItem()}
                  placeholder="Kwota (zł)"
                  className="w-24 text-sm px-3 py-2.5 border border-[#C5C6CC] rounded-[12px] bg-white text-[#1F2024] outline-none focus:border-[#006FFD] transition-all"
                />
                <select
                  value={costWho}
                  onChange={(e) => setCostWho(e.target.value)}
                  className="text-[13px] px-2.5 py-2.5 border border-[#C5C6CC] rounded-[12px] bg-white text-[#1F2024] cursor-pointer hover:border-[#006FFD] transition-all"
                >
                  {people.map((p) => (
                    <option key={p.name}>{p.name}</option>
                  ))}
                </select>
                <select
                  value={costCategory}
                  onChange={(e) =>
                    setCostCategory(
                      e.target.value as "transport_zakwaterowanie" | "zakupy"
                    )
                  }
                  className="text-[13px] px-2.5 py-2.5 border border-[#C5C6CC] rounded-[12px] bg-white text-[#1F2024] cursor-pointer hover:border-[#006FFD] transition-all"
                >
                  <option value="transport_zakwaterowanie">Transport & Zakwaterowanie</option>
                  <option value="zakupy">Zakupy</option>
                </select>
                <button
                  onClick={addCostItem}
                  className="text-[12px] font-semibold px-4 py-2.5 rounded-[12px] bg-[#006FFD] text-white cursor-pointer hover:bg-[#2897FF] transition-colors whitespace-nowrap"
                >
                  Dodaj
                </button>
              </div>
            </div>

            {/* Zakupy - Do kupienia */}
            <div className="bg-white rounded-[12px] shadow-sm p-5 mb-3">
              <div className="text-[10px] font-semibold tracking-[0.8px] uppercase text-[#8F9098] mb-4">
                🛒 Zakupy — Do kupienia
              </div>
              <div>
                {costItems
                  .filter((item) => item.category === "zakupy" && !item.done)
                  .map((item) => (
                    // FIX #6: key={item.id}
                    <div
                      key={item.id}
                      className="flex items-center gap-2.5 py-2.5 border-b border-[#E8E9F1] last:border-b-0"
                    >
                      <input
                        type="checkbox"
                        checked={false}
                        onChange={() => toggleCostDone(item.id)}
                        className="w-4 h-4 cursor-pointer accent-[#2D6A4F] flex-shrink-0"
                      />
                      <div className="flex-1">
                        {editingCostId === item.id ? (
                          <input
                            type="text"
                            value={item.name}
                            onChange={(e) => updateCostName(item.id, e.target.value)}
                            className="text-sm px-2 py-1 border border-[#C5C6CC] rounded-[8px] bg-white w-full"
                          />
                        ) : (
                          <div className="text-sm">{item.name}</div>
                        )}
                      </div>
                      <select
                        value={item.who}
                        onChange={(e) => updateCostPerson(item.id, e.target.value)}
                        className="text-xs px-2 py-1 border border-[#C5C6CC] rounded-[8px] bg-[#F8F9FE] text-[#71727A] flex-shrink-0"
                      >
                        {people.map((p) => (
                          <option key={p.name}>{p.name}</option>
                        ))}
                      </select>
                      {editingCostId === item.id ? (
                        <input
                          type="number"
                          value={item.cost || ""}
                          onChange={(e) =>
                            updateCostAmount(item.id, parseFloat(e.target.value) || 0)
                          }
                          placeholder="Koszt"
                          className="w-20 text-xs px-2 py-1 border border-[#C5C6CC] rounded-[8px] bg-white text-[#1F2024]"
                        />
                      ) : (
                        <div className="w-20 text-xs px-2 py-1 text-right font-medium">
                          {item.cost} zł
                        </div>
                      )}
                      <button
                        onClick={() =>
                          setEditingCostId(editingCostId === item.id ? null : item.id)
                        }
                        className="text-xs px-2 py-1 border border-[#C5C6CC] rounded-[8px] bg-white text-[#71727A] hover:border-[#006FFD] hover:text-[#006FFD] transition-colors"
                      >
                        {editingCostId === item.id ? "Zapisz" : "Edytuj"}
                      </button>
                      <button
                        onClick={() => removeCostItem(item.id)}
                        className="text-lg text-[#FF0000] hover:text-[#CC0000] hover:scale-125 transition-all"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
              </div>
            </div>

            {/* Zakupy - Kupione */}
            {costItems.filter((item) => item.category === "zakupy" && item.done).length > 0 && (
              <div className="bg-white rounded-[12px] shadow-sm p-5">
                <div className="text-[10px] font-semibold tracking-[0.8px] uppercase text-[#8F9098] mb-4">
                  ✓ Zakupy — Kupione
                </div>
                <div>
                  {costItems
                    .filter((item) => item.category === "zakupy" && item.done)
                    .map((item) => (
                      // FIX #6: key={item.id}
                      <div
                        key={item.id}
                        className="flex items-center gap-2.5 py-2.5 border-b border-[#E8E9F1] last:border-b-0"
                      >
                        <input
                          type="checkbox"
                          checked={true}
                          onChange={() => toggleCostDone(item.id)}
                          className="w-4 h-4 cursor-pointer accent-[#2D6A4F] flex-shrink-0"
                        />
                        <div className="flex-1">
                          <div className="text-sm line-through text-[#B0ABA4]">{item.name}</div>
                        </div>
                        <select
                          value={item.who}
                          onChange={(e) => updateCostPerson(item.id, e.target.value)}
                          className="text-xs px-2 py-1 border border-[#E8E9F1] rounded bg-[#F8F9FE] text-[#B0ABA4] flex-shrink-0"
                        >
                          {people.map((p) => (
                            <option key={p.name}>{p.name}</option>
                          ))}
                        </select>
                        <div className="w-20 text-xs px-2 py-1 text-right text-[#B0ABA4]">
                          {item.cost} zł
                        </div>
                        <button
                          onClick={() => removeCostItem(item.id)}
                          className="text-lg text-[#FF0000] hover:text-[#CC0000] hover:scale-125 transition-all"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* Rzeczy Section */}
        {activeTab === "rzeczy" && (
          <div className="grid md:grid-cols-2 gap-3">
            <div className="bg-white rounded-[12px] shadow-sm p-5">
              <div className="text-[10px] font-semibold tracking-[0.8px] uppercase text-[#8F9098] mb-4">
                🎮 Gry & gadżety
              </div>
              <div>
                {gearItems.map((item, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-2.5 py-2.5 ${i < gearItems.length - 1 ? "border-b border-[#E8E9F1]" : ""
                      }`}
                  >
                    <input
                      type="checkbox"
                      checked={item.done}
                      onChange={() => toggleGear(i)}
                      className="w-4 h-4 cursor-pointer accent-[#2D6A4F] flex-shrink-0"
                    />
                    <div className="flex-1">
                      <div
                        className={`text-sm ${item.done ? "line-through text-[#B0ABA4]" : ""}`}
                      >
                        {item.name}
                      </div>
                      <div className="text-[11px] text-[#B0ABA4] mt-0.5">{item.who}</div>
                    </div>
                    <button
                      onClick={() => removeGearItem(i)}
                      className="text-lg text-[#FF0000] hover:text-[#CC0000] hover:scale-125 transition-all"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-1.5 mt-4">
                <input
                  type="text"
                  value={gearInput}
                  onChange={(e) => setGearInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addGear()}
                  placeholder="Dodaj item..."
                  className="text-sm px-3 py-2.5 border border-[#C5C6CC] rounded-[12px] bg-white text-[#1F2024] outline-none focus:border-[#006FFD] transition-all"
                />
                <div className="flex gap-1.5">
                  <select
                    value={gearWho}
                    onChange={(e) => setGearWho(e.target.value)}
                    className="flex-1 text-[13px] px-2.5 py-2.5 border border-[#C5C6CC] rounded-[12px] bg-white text-[#1F2024] cursor-pointer hover:border-[#006FFD] transition-all"
                  >
                    {people.map((p) => (
                      <option key={p.name}>{p.name}</option>
                    ))}
                  </select>
                  <button
                    onClick={addGear}
                    className="text-[12px] font-semibold px-4 py-2.5 rounded-[12px] bg-[#006FFD] text-white cursor-pointer hover:bg-[#2897FF] transition-colors"
                  >
                    Dodaj
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[12px] shadow-sm p-5">
              <div className="text-[10px] font-semibold tracking-[0.8px] uppercase text-[#8F9098] mb-4">
                ✅ Checklista
              </div>
              <div>
                {personalItems.map((item, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-2.5 py-2.5 ${i < personalItems.length - 1 ? "border-b border-[#E8E9F1]" : ""
                      }`}
                  >
                    <input
                      type="checkbox"
                      checked={personalDone[i] || false}
                      onChange={() => togglePersonal(i)}
                      className="w-4 h-4 cursor-pointer accent-[#2D6A4F] flex-shrink-0"
                    />
                    <span
                      className={`text-sm flex-1 ${personalDone[i] ? "line-through text-[#B0ABA4]" : ""
                        }`}
                    >
                      {item}
                    </span>
                    <button
                      onClick={() => removePersonalItem(i)}
                      className="text-lg text-[#FF0000] hover:text-[#CC0000] hover:scale-125 transition-all"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <input
                  type="text"
                  value={newPersonalItem}
                  onChange={(e) => setNewPersonalItem(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addPersonalItem()}
                  placeholder="Dodaj item..."
                  className="w-full text-sm px-3 py-2 border border-[#C5C6CC] rounded-[12px] bg-[#F8F9FE] text-[#1F2024] outline-none focus:border-[#006FFD] transition-colors mb-2"
                />
                <button
                  onClick={addPersonalItem}
                  className="w-full text-[12px] font-semibold px-4 py-2.5 rounded-[12px] bg-[#006FFD] text-white cursor-pointer hover:bg-[#2897FF] transition-colors"
                >
                  Dodaj
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Plan Section */}
        {activeTab === "plan" && (
          <div className="grid md:grid-cols-2 gap-3">
            {/* Piątek */}
            <div className="bg-white rounded-[12px] shadow-sm p-5">
              <div className="text-[10px] font-semibold tracking-[0.8px] uppercase text-[#8F9098] mb-4">
                📋 Piątek — plan dnia
              </div>
              <div className="relative pl-5">
                <div className="absolute left-[7px] top-2 bottom-2 w-px bg-[#E2DDD5]"></div>
                {[
                  { time: "08:30", name: "Zbiórka i wyjazd", desc: "Wyjazd z Warszawy", dot: "bg-[#006FFD]" },
                  { time: "10:00", name: "Praca zdalna", desc: "Skupienie i produktywność", dot: "bg-[#2897FF]" },
                  { time: "13:00", name: "Warsztaty Empowering", desc: "Co nas nie zabije, to nas wzmocni albo i nie", dot: "bg-[#31B0CF]" },
                  { time: "16:00", name: "Koniec pracy", desc: "Czas na relaks", dot: "bg-[#3AC0A0]" },
                  { time: "16:30", name: "Obiad", desc: "Wspólny posiłek", dot: "bg-[#FFB37C]" },
                  { time: "18:00", name: "Gry planszowe / Gry terenowe / Spacery", desc: "Aktywności integracyjne", dot: "bg-[#6FBAFF]" },
                  { time: "20:00", name: "Ognisko / Grill", desc: "Kolacja przy ognisku", dot: "bg-[#FF616D]" },
                  { time: "22:00", name: "Opowieści o duchach", desc: "Straszne historie", dot: "bg-[#71727A]" },
                ].map((event) => (
                  <div key={event.time} className="flex gap-4 py-2.5 relative">
                    <div
                      className={`absolute -left-5 top-[15px] w-2.5 h-2.5 rounded-full border-2 border-white ${event.dot}`}
                    />
                    <div className="font-['Inter',sans-serif] font-medium text-[13px] text-[#71727A] min-w-[44px] pt-0.5">
                      {event.time}
                    </div>
                    <div>
                      <div className="text-sm font-medium">{event.name}</div>
                      {event.desc && (
                        <div className="text-xs text-[#71727A] mt-0.5">{event.desc}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sobota */}
            <div className="bg-white rounded-[12px] shadow-sm p-5">
              <div className="text-[10px] font-semibold tracking-[0.8px] uppercase text-[#8F9098] mb-4">
                🌅 Sobota — plan dnia
              </div>
              <div className="relative pl-5">
                <div className="absolute left-[7px] top-2 bottom-2 w-px bg-[#E2DDD5]"></div>
                {[
                  { time: "09:00", name: "Śniadanie", desc: "Wspólny posiłek", dot: "bg-[#FFB37C]" },
                  { time: "10:00", name: "Spacer", desc: "Zwiedzanie okolicy", dot: "bg-[#3AC0A0]" },
                  { time: "12:00", name: "Wyjazd", desc: "Powrót do Warszawy", dot: "bg-[#006FFD]" },
                  { time: "13:00", name: "Warszawa", desc: "Powitanie cywilizacji", dot: "bg-[#71727A]" },
                ].map((event) => (
                  <div key={event.time} className="flex gap-4 py-2.5 relative">
                    <div
                      className={`absolute -left-5 top-[15px] w-2.5 h-2.5 rounded-full border-2 border-white ${event.dot}`}
                    />
                    <div className="font-['Inter',sans-serif] font-medium text-[13px] text-[#71727A] min-w-[44px] pt-0.5">
                      {event.time}
                    </div>
                    <div>
                      <div className="text-sm font-medium">{event.name}</div>
                      {event.desc && (
                        <div className="text-xs text-[#71727A] mt-0.5">{event.desc}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Muzyka Section */}
        {activeTab === "muzyka" && (
          <>
            {/* Formularz dodawania */}
            <div className="bg-white rounded-[12px] shadow-sm p-5 mb-3">
              <div className="text-[10px] font-semibold tracking-[0.8px] uppercase text-[#8F9098] mb-4">
                🎵 Zaproponuj utwór do playlisty
              </div>
              <div className="flex flex-col gap-2">
                <input
                  type="url"
                  value={playlistUrl}
                  onChange={(e) => setPlaylistUrl(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addPlaylistItem()}
                  placeholder="Wklej link YouTube lub Spotify..."
                  className="w-full text-sm px-3 py-2.5 border border-[#C5C6CC] rounded-[12px] bg-white text-[#1F2024] outline-none focus:border-[#006FFD] transition-all"
                />
                <input
                  type="text"
                  value={playlistTitle}
                  onChange={(e) => setPlaylistTitle(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addPlaylistItem()}
                  placeholder="Tytuł (opcjonalnie — pobierzemy automatycznie)"
                  className="w-full text-sm px-3 py-2.5 border border-[#C5C6CC] rounded-[12px] bg-white text-[#1F2024] outline-none focus:border-[#006FFD] transition-all"
                />
                <div className="flex gap-2">
                  <select
                    value={playlistWho}
                    onChange={(e) => setPlaylistWho(e.target.value)}
                    className="flex-1 text-[13px] px-2.5 py-2.5 border border-[#C5C6CC] rounded-[12px] bg-white text-[#1F2024] cursor-pointer hover:border-[#006FFD] transition-all"
                  >
                    {people.map((p) => (
                      <option key={p.name}>{p.name}</option>
                    ))}
                  </select>
                  <button
                    onClick={addPlaylistItem}
                    disabled={playlistFetching || !playlistUrl.trim()}
                    className="text-[12px] font-semibold px-5 py-2.5 rounded-[12px] bg-[#006FFD] text-white hover:bg-[#2897FF] transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                  >
                    {playlistFetching ? "Pobieranie..." : "Dodaj"}
                  </button>
                </div>
                {playlistError && (
                  <div className="text-xs text-[#FF616D] mt-1">{playlistError}</div>
                )}
              </div>
            </div>

            {/* Lista utworów */}
            {playlistItems.length === 0 ? (
              <div className="bg-white rounded-[12px] shadow-sm p-8 text-center">
                <div className="text-4xl mb-3">🎶</div>
                <div className="text-sm font-medium text-[#1F2024] mb-1">Playlista jest pusta</div>
                <div className="text-xs text-[#71727A]">
                  Wklej link do ulubionego utworu i zacznij listę na wieczór!
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-[12px] shadow-sm p-5">
                <div className="text-[10px] font-semibold tracking-[0.8px] uppercase text-[#8F9098] mb-4">
                  🎧 Playlista —{" "}
                  {playlistItems.length}{" "}
                  {playlistItems.length === 1
                    ? "utwór"
                    : playlistItems.length < 5
                      ? "utwory"
                      : "utworów"}
                </div>
                <div className="flex flex-col gap-3">
                  {playlistItems.map((item) => {
                    const platformColor =
                      item.platform === "youtube"
                        ? { bg: "bg-[#FFE2E5]", text: "text-[#FF616D]", border: "border-[#FF616D]", label: "YT" }
                        : item.platform === "spotify"
                          ? { bg: "bg-[#E7F4E8]", text: "text-[#3AC0A0]", border: "border-[#3AC0A0]", label: "SP" }
                          : { bg: "bg-[#F8F9FE]", text: "text-[#71727A]", border: "border-[#C5C6CC]", label: "🔗" };
                    const person = people.find((p) => p.name === item.who);
                    return (
                      <div
                        key={item.id}
                        className="flex gap-3 p-3 rounded-[12px] border border-[#E8E9F1] bg-[#FAFBFF]"
                      >
                        {/* Thumbnail */}
                        {item.thumbnail ? (
                          <img
                            src={item.thumbnail}
                            alt=""
                            className="w-16 h-12 rounded-[8px] object-cover flex-shrink-0 bg-[#E8E9F1]"
                          />
                        ) : (
                          <div
                            className={`w-16 h-12 rounded-[8px] flex-shrink-0 flex items-center justify-center text-xl ${platformColor.bg} border ${platformColor.border}`}
                          >
                            {item.platform === "spotify"
                              ? "🎧"
                              : item.platform === "youtube"
                                ? "▶"
                                : "🎵"}
                          </div>
                        )}
                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start gap-2 mb-1">
                            <span
                              className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-[4px] flex-shrink-0 border ${platformColor.bg} ${platformColor.text} ${platformColor.border}`}
                            >
                              {platformColor.label}
                            </span>
                            <div className="text-sm font-medium text-[#1F2024] leading-snug line-clamp-2 min-w-0">
                              {item.title}
                            </div>
                          </div>
                          <div className="flex items-center gap-2 mt-1.5">
                            {person && (
                              <div
                                className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-semibold flex-shrink-0 ${getAvatarClass(person.av)}`}
                              >
                                {person.init}
                              </div>
                            )}
                            <span className="text-[11px] text-[#71727A]">{item.who}</span>
                          </div>
                        </div>
                        {/* FIX #1: Przywrócony poprawny tag <a> */}
                        <div className="flex flex-col gap-1.5 flex-shrink-0 items-end">
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[12px] font-semibold px-3 py-1.5 rounded-[8px] bg-[#006FFD] text-white hover:bg-[#2897FF] transition-colors whitespace-nowrap"
                          >
                            ▶ Otwórz
                          </a>
                          <button
                            onClick={() => removePlaylistItem(item.id)}
                            className="text-lg text-[#FF0000] hover:text-[#CC0000] hover:scale-125 transition-all"
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </>
        )}

        {/* Zrzutka Section */}
        {activeTab === "zrzutka" && (
          <>
            <div className="bg-white rounded-[12px] shadow-sm p-5 mb-3">
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="bg-[#EAF2FF] rounded-[12px] p-4 text-center border border-[#B4DBFF]">
                  <div className="text-[20px] font-extrabold tracking-[0.2px] text-[#1F2024]">
                    {totalCost}
                  </div>
                  <div className="text-[10px] text-[#71727A] mt-1 font-semibold tracking-[0.8px] uppercase">
                    zł łącznie
                  </div>
                </div>
                <div className="bg-[#EAF2FF] rounded-[12px] p-4 text-center border border-[#B4DBFF]">
                  <div className="text-[20px] font-extrabold tracking-[0.2px] text-[#1F2024]">
                    {perPerson}
                  </div>
                  <div className="text-[10px] text-[#71727A] mt-1 font-semibold tracking-[0.8px] uppercase">
                    zł / osoba
                  </div>
                </div>
                <div className="bg-[#EAF2FF] rounded-[12px] p-4 text-center border border-[#B4DBFF]">
                  <div className="text-[20px] font-extrabold tracking-[0.2px] text-[#1F2024]">
                    {paidCount} / {people.length}
                  </div>
                  <div className="text-[10px] text-[#71727A] mt-1 font-semibold tracking-[0.8px] uppercase">
                    opłacone
                  </div>
                </div>
              </div>
              <div className="mb-1">
                <div className="text-[12px] text-[#71727A] mb-2 font-normal">Zebrano środki</div>
                <div className="h-[8px] bg-[#E8E9F1] rounded-[4px] overflow-hidden">
                  <div
                    className="h-full bg-[#006FFD] rounded-[4px] transition-all duration-400"
                    style={{
                      width: `${totalCost > 0
                        ? Math.min(100, Math.round((collected / totalCost) * 100))
                        : 0
                        }%`,
                    }}
                  />
                </div>
                <div className="text-[12px] text-[#71727A] mt-2 font-normal">
                  {collected} / {totalCost} zł
                </div>
              </div>
            </div>

            {/* Kto ile zapłacił */}
            {Object.keys(costsByPerson).length > 0 && (
              <div className="bg-white rounded-[12px] shadow-sm p-5 mb-3">
                <div className="text-[10px] font-semibold tracking-[0.8px] uppercase text-[#8F9098] mb-4">
                  💰 Kto zapłacił za koszty
                </div>
                {Object.entries(costsByPerson).map(([personIdx, cost]) => (
                  <div
                    key={personIdx}
                    className="flex justify-between items-center py-2.5 border-b border-[#E8E9F1] last:border-b-0 text-sm"
                  >
                    <span>{people[Number(personIdx)]?.name}</span>
                    <span className="font-['Inter',sans-serif] font-medium text-[13px]">
                      {cost} zł
                    </span>
                  </div>
                ))}
              </div>
            )}

            <div className="bg-white rounded-[12px] shadow-sm p-5 mb-3">
              <div className="text-[10px] font-semibold tracking-[0.8px] uppercase text-[#8F9098] mb-1">
                💳 Status wpłat — {perPerson} zł / os.
              </div>
              <div className="text-[12px] text-[#71727A] mb-3">(kliknij aby zmienić)</div>
              <div className="mt-4">
                {people.map((person, i) => {
                  const personPaid = costsByPerson[i] || 0;
                  // FIX #4: poprawne saldo z Math.round
                  const shouldPay = Math.round((perPerson - personPaid) * 100) / 100;
                  return (
                    <div
                      key={person.name}
                      onClick={() => togglePay(i)}
                      className="flex items-center gap-3 py-2.5 border-b border-[#E8E9F1] last:border-b-0 cursor-pointer"
                    >
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-semibold tracking-tight flex-shrink-0 ${getAvatarClass(person.av)}`}
                      >
                        {person.init}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium">{person.name}</div>
                        {personPaid > 0 && (
                          <div className="text-xs text-[#71727A] mt-0.5">
                            Zapłacono: {personPaid} zł
                            {shouldPay > 0
                              ? ` · Do wpłaty: ${shouldPay} zł`
                              : shouldPay < 0
                                ? ` · Do zwrotu: ${Math.abs(shouldPay)} zł`
                                : ` · Wyrównane ✓`}
                          </div>
                        )}
                      </div>
                      <span
                        className={`text-[12px] font-medium px-3 py-1.5 rounded-[8px] flex-shrink-0 ${payStatus[i]
                          ? "bg-[#E7F4E8] text-[#3AC0A0] border border-[#3AC0A0]"
                          : "bg-[#FFF4E4] text-[#FFB37C] border border-[#FFB37C]"
                          }`}
                      >
                        {payStatus[i] ? "Opłacone" : "Do zapłaty"}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-white rounded-[12px] shadow-sm p-5">
              <div className="text-[10px] font-semibold tracking-[0.8px] uppercase text-[#8F9098] mb-4">
                🏦 Numer do przelewu
              </div>
              {[
                { label: "Zbiera", value: people[0]?.name || "Tomek", bold: true },
                { label: "Konto", value: "PL 12 3456 7890 1234 5678 9012 3456", mono: true },
                { label: "Tytuł", value: "Workation - Żulin 2026" },
              ].map((row, i, arr) => (
                <div
                  key={row.label}
                  className={`flex justify-between items-center py-2.5 gap-3 text-sm ${i < arr.length - 1 ? "border-b border-[#E8E9F1]" : ""
                    }`}
                >
                  <span className="text-[#71727A] text-[13px] flex-shrink-0">{row.label}</span>
                  <span
                    className={`text-right ${row.bold ? "font-medium" : ""} ${row.mono ? "font-['Inter',sans-serif] font-medium text-[13px]" : ""
                      }`}
                  >
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
