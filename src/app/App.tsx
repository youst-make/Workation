import { useState, useEffect } from "react";

// Types
interface Person {
  init: string;
  name: string;
  av: string;
}

interface ShopItem {
  name: string;
  who: string;
  done: boolean;
}

interface GearItem {
  name: string;
  who: string;
  done: boolean;
}

const PEOPLE: Person[] = [
  { init: "TS", name: "Tomek", av: "av-g" },
  { init: "JW", name: "Justyna", av: "av-p" },
  { init: "MT", name: "Marta", av: "av-b" },
  { init: "ISB", name: "Iza", av: "av-c" },
  { init: "MA", name: "Marcin", av: "av-a" },
  { init: "KW", name: "Krzysztof", av: "av-2" },
];

const DEFAULT_SHOP: ShopItem[] = [
  {
    name: "Kiełbaski & karkówka",
    who: "Tomek.",
    done: false,
  },
  { name: "Pieczywo & bułki", who: "Iza", done: false },
  { name: "Piwo (zgrzewka)", who: "Piotrek", done: false },
  { name: "Wino & napoje", who: "Tomek", done: false },
  { name: "Warzywa & sałatki", who: "Marta", done: false },
  { name: "Marshmallows", who: "Justyna", done: false },
  { name: "Podpałka & węgiel", who: "Krzysztof", done: false },
  { name: "Napoje", who: "Marcin", done: false },
];

const DEFAULT_GEAR: GearItem[] = [
  { name: "Talerzyki", who: "Krzysztof", done: false },
  { name: "Wsiąść do pociągu", who: "Marta", done: false },
  { name: "Codenames", who: "Iza", done: false },
  { name: "Głośnik bluetooth", who: "Marcin", done: false },
  { name: "Przedłużacz", who: "Tomek", done: false },
  {
    name: "Kijki do marshmallows",
    who: "Marta",
    done: false,
  },
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
  | "zakupy"
  | "rzeczy"
  | "plan"
  | "zrzutka"
  | "ustawienia";

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
  title: "Workation — Wieś Mazowiecka",
  subtitle: "Wypad integracyjny zespołu · piątek–sobota",
  date: "10 lipca 2026",
  location: "Żulin",
  venue: 'Stodoła Artystów',
  venueAddress: "Żulin 1, 07-104",
  venuePhone: "null",
};

export default function App() {
  const [activeTab, setActiveTab] =
    useState<TabType>("transport");

  const [settings, setSettings] = useState<EventSettings>(
    () => {
      const saved = localStorage.getItem("wk2_settings");
      return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
    },
  );

  const [people, setPeople] = useState<Person[]>(() => {
    const saved = localStorage.getItem("wk2_people");
    return saved ? JSON.parse(saved) : PEOPLE;
  });

  const [shopItems, setShopItems] = useState<ShopItem[]>(() => {
    const saved = localStorage.getItem("wk2_shop");
    return saved ? JSON.parse(saved) : DEFAULT_SHOP;
  });
  const [gearItems, setGearItems] = useState<GearItem[]>(() => {
    const saved = localStorage.getItem("wk2_gear");
    return saved ? JSON.parse(saved) : DEFAULT_GEAR;
  });
  const [personalDone, setPersonalDone] = useState<
    Record<number, boolean>
  >(() => {
    const saved = localStorage.getItem("wk2_personal");
    return saved ? JSON.parse(saved) : {};
  });
  const [payStatus, setPayStatus] = useState<boolean[]>(() => {
    const saved = localStorage.getItem("wk2_pay");
    return saved
      ? JSON.parse(saved)
      : [true, true, false, false, false, false];
  });

  const [shopInput, setShopInput] = useState("");
  const [shopWho, setShopWho] = useState(
    people[0]?.name || "Marek K.",
  );
  const [gearInput, setGearInput] = useState("");
  const [gearWho, setGearWho] = useState(
    people[0]?.name || "Marek K.",
  );

  const [newPersonName, setNewPersonName] = useState("");
  const [newPersonInit, setNewPersonInit] = useState("");
  const [newPersonColor, setNewPersonColor] = useState("av-g");

  useEffect(() => {
    localStorage.setItem(
      "wk2_settings",
      JSON.stringify(settings),
    );
  }, [settings]);

  useEffect(() => {
    localStorage.setItem("wk2_people", JSON.stringify(people));
  }, [people]);

  useEffect(() => {
    localStorage.setItem("wk2_shop", JSON.stringify(shopItems));
  }, [shopItems]);

  useEffect(() => {
    localStorage.setItem("wk2_gear", JSON.stringify(gearItems));
  }, [gearItems]);

  useEffect(() => {
    localStorage.setItem(
      "wk2_personal",
      JSON.stringify(personalDone),
    );
  }, [personalDone]);

  useEffect(() => {
    localStorage.setItem("wk2_pay", JSON.stringify(payStatus));
  }, [payStatus]);

  const toggleShop = (index: number) => {
    setShopItems((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, done: !item.done } : item,
      ),
    );
  };

  const addShopItem = () => {
    if (!shopInput.trim()) return;
    setShopItems((prev) => [
      ...prev,
      { name: shopInput, who: shopWho, done: false },
    ]);
    setShopInput("");
  };

  const toggleGear = (index: number) => {
    setGearItems((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, done: !item.done } : item,
      ),
    );
  };

  const addGear = () => {
    if (!gearInput.trim()) return;
    setGearItems((prev) => [
      ...prev,
      { name: gearInput, who: gearWho, done: false },
    ]);
    setGearInput("");
  };

  const togglePersonal = (index: number) => {
    setPersonalDone((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const togglePay = (index: number) => {
    setPayStatus((prev) =>
      prev.map((status, i) => (i === index ? !status : status)),
    );
  };

  const addPerson = () => {
    if (!newPersonName.trim() || !newPersonInit.trim()) return;
    setPeople((prev) => [
      ...prev,
      {
        name: newPersonName,
        init: newPersonInit,
        av: newPersonColor,
      },
    ]);
    setPayStatus((prev) => [...prev, false]);
    setNewPersonName("");
    setNewPersonInit("");
  };

  const removePerson = (index: number) => {
    setPeople((prev) => prev.filter((_, i) => i !== index));
    setPayStatus((prev) => prev.filter((_, i) => i !== index));
  };

  const total = 820;
  const perPerson = 137;
  const paidCount = payStatus.filter(Boolean).length;
  const collected = paidCount * perPerson;

  const getAvatarClass = (av: string) => {
    const map: Record<string, string> = {
      "av-g": "bg-[#D8F3DC] text-[#2D6A4F]",
      "av-a": "bg-[#FFF0CC] text-[#7C4A00]",
      "av-b": "bg-[#D6E8F7] text-[#1B4F7A]",
      "av-c": "bg-[#FDDDD7] text-[#8B3A2A]",
      "av-p": "bg-[#E8E4F8] text-[#4A3880]",
      "av-2": "bg-[#F0EDE6] text-[#7A7570]",
    };
    return map[av] || map["av-2"];
  };

  return (
    <div className="min-h-screen bg-[#F5F2EC] py-8 px-5 pb-20">
      <div className="max-w-[780px] mx-auto">
        {/* Hero */}
        <div className="relative overflow-hidden bg-white rounded-[14px] border border-[#E2DDD5] p-7 mb-5">
          <div
            className="absolute -top-10 -right-10 w-[180px] h-[180px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, #D8F3DC 0%, transparent 70%)",
            }}
          />
          <div className="relative">
            <div className="text-[11px] font-semibold tracking-[0.1em] uppercase text-[#2D6A4F] mb-2">
              Wypad firmowy
            </div>
            <h1 className="text-[26px] font-semibold tracking-tight leading-tight mb-1">
              {settings.title}
            </h1>
            <div className="text-sm text-[#7A7570] mb-5">
              {settings.subtitle}
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                `📅 ${settings.date}`,
                `📍 ${settings.location}`,
                `🏡 ${settings.venue}`,
                `👥 ${people.length} osób`,
              ].map((chip) => (
                <div
                  key={chip}
                  className="text-[13px] bg-[#F0EDE6] border border-[#E2DDD5] rounded-full px-3 py-1 text-[#7A7570] flex items-center gap-1.5"
                >
                  {chip}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex gap-1 flex-wrap mb-5">
          {[
            {
              id: "transport" as TabType,
              label: "🚗 Transport",
            },
            { id: "nocleg" as TabType, label: "🏡 Nocleg" },
            { id: "zakupy" as TabType, label: "🛒 Zakupy" },
            { id: "rzeczy" as TabType, label: "🎒 Co zabrać" },
            { id: "plan" as TabType, label: "📋 Plan dnia" },
            { id: "zrzutka" as TabType, label: "💸 Zrzutka" },
            {
              id: "ustawienia" as TabType,
              label: "⚙️ Ustawienia",
            },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`text-[13px] font-medium px-4 py-2 rounded-full border transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-[#1A1814] text-white border-[#1A1814]"
                  : "bg-transparent text-[#7A7570] border-transparent hover:bg-white hover:border-[#E2DDD5] hover:text-[#1A1814]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Transport Section */}
        {activeTab === "transport" && (
          <>
            <div className="bg-white border border-[#E2DDD5] rounded-[14px] p-6 mb-3.5">
              <div className="text-[11px] font-semibold tracking-[0.08em] uppercase text-[#B0ABA4] mb-4">
                Auta i pasażerowie
              </div>

              {/* Car 1 */}
              <div className="flex items-center gap-3 py-2.5 border-b border-[#E2DDD5]">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-semibold tracking-tight flex-shrink-0 ${getAvatarClass("av-g")}`}
                >
                  MK
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium">
                    Marcin
                  </div>
                  <div className="text-xs text-[#7A7570] mt-0.5">
                    · wyjazd 08:00
                  </div>
                </div>
                <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-[#D8F3DC] text-[#2D6A4F] border border-[#B7E4C7] flex-shrink-0">
                  Kierowca
                </span>
              </div>

              <div className="flex items-center gap-3 py-2.5 border-b border-[#E2DDD5] pl-[46px]">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-semibold tracking-tight flex-shrink-0 ${getAvatarClass("av-p")}`}
                >
                  AS
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium">
                    Marta
                  </div>
                  <div className="text-xs text-[#7A7570] mt-0.5">
                    Pasażer → auto Marka
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 py-2.5 border-b border-[#E2DDD5] pl-[46px]">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-semibold tracking-tight flex-shrink-0 ${getAvatarClass("av-b")}`}
                >
                  PT
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium">
                    Piotrek T.
                  </div>
                  <div className="text-xs text-[#7A7570] mt-0.5">
                    Pasażer → auto Marka
                  </div>
                </div>
              </div>

              <div className="h-px bg-[#E2DDD5] my-3"></div>

              {/* Car 2 */}
              <div className="flex items-center gap-3 py-2.5 border-b border-[#E2DDD5]">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-semibold tracking-tight flex-shrink-0 ${getAvatarClass("av-c")}`}
                >
                  JW
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium">
                    Julia W.
                  </div>
                  <div className="text-xs text-[#7A7570] mt-0.5">
                    Toyota RAV4 · wyjazd Mokotów 14:30
                  </div>
                </div>
                <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-[#D8F3DC] text-[#2D6A4F] border border-[#B7E4C7] flex-shrink-0">
                  Kierowca
                </span>
              </div>

              <div className="flex items-center gap-3 py-2.5 border-b border-[#E2DDD5] pl-[46px]">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-semibold tracking-tight flex-shrink-0 ${getAvatarClass("av-a")}`}
                >
                  BN
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium">
                    Bartek N.
                  </div>
                  <div className="text-xs text-[#7A7570] mt-0.5">
                    Pasażer → auto Julii
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 py-2.5 pl-[46px]">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-semibold tracking-tight flex-shrink-0 ${getAvatarClass("av-2")}`}
                >
                  KL
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium">
                    Kasia L.
                  </div>
                  <div className="text-xs text-[#7A7570] mt-0.5">
                    Pasażer → auto Julii
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-[#E2DDD5] rounded-[14px] p-6">
              <div className="text-[11px] font-semibold tracking-[0.08em] uppercase text-[#B0ABA4] mb-4">
                Trasa
              </div>
              {[
                {
                  label: "Start",
                  value: "Warszawa (Wola / Mokotów)",
                },
                { label: "Cel", value: "Radość k. Garwolina" },
                {
                  label: "Droga",
                  value: "S17 → zjazd Garwolin",
                },
                { label: "Czas jazdy", value: "~65 min" },
                {
                  label: "Szacowany przyjazd",
                  value: "ok. 15:30–16:00",
                  bold: true,
                },
                {
                  label: "Adres",
                  value: "ul. Polna 12, Radość",
                  mono: true,
                },
              ].map((row, i, arr) => (
                <div
                  key={row.label}
                  className={`flex justify-between items-center py-2.5 gap-3 text-sm ${
                    i < arr.length - 1
                      ? "border-b border-[#E2DDD5]"
                      : ""
                  }`}
                >
                  <span className="text-[#7A7570] text-[13px] flex-shrink-0">
                    {row.label}
                  </span>
                  <span
                    className={`text-right ${row.bold ? "font-medium" : ""} ${
                      row.mono
                        ? "font-['DM_Mono',monospace] text-[13px]"
                        : ""
                    }`}
                  >
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
            <div className="bg-white border border-[#E2DDD5] rounded-[14px] p-6 mb-3.5">
              <div className="text-[11px] font-semibold tracking-[0.08em] uppercase text-[#B0ABA4] mb-4">
                Obiekt
              </div>
              {[
                {
                  label: "Nazwa",
                  value: settings.venue,
                  bold: true,
                },
                {
                  label: "Adres",
                  value: settings.venueAddress,
                },
                {
                  label: "Kontakt",
                  value: settings.venuePhone,
                  blue: true,
                },
                { label: "Check-in", value: "od 15:00" },
                {
                  label: "Check-out",
                  value: "do 12:00 (sobota)",
                },
              ].map((row, i, arr) => (
                <div
                  key={row.label}
                  className={`flex justify-between items-center py-2.5 gap-3 text-sm ${
                    i < arr.length - 1
                      ? "border-b border-[#E2DDD5]"
                      : ""
                  }`}
                >
                  <span className="text-[#7A7570] text-[13px] flex-shrink-0">
                    {row.label}
                  </span>
                  <span
                    className={`text-right ${row.bold ? "font-medium" : ""} ${
                      row.blue ? "text-[#1B4F7A]" : ""
                    }`}
                  >
                    {row.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="bg-white border border-[#E2DDD5] rounded-[14px] p-6 mb-3.5">
              <div className="text-[11px] font-semibold tracking-[0.08em] uppercase text-[#B0ABA4] mb-4">
                Podział pokoi
              </div>
              {[
                {
                  name: "Pokój 1 — duży (2 łóżka)",
                  detail: "Marek K. · Piotrek T.",
                  badge: "1 piętro",
                  badgeBlue: true,
                },
                {
                  name: "Pokój 2 — średni (2 łóżka)",
                  detail: "Julia W. · Kasia L.",
                  badge: "1 piętro",
                  badgeBlue: true,
                },
                {
                  name: "Pokój 3 — mały (2 łóżka)",
                  detail: "Ania S. · Bartek N.",
                  badge: "parter",
                  badgeBlue: false,
                },
              ].map((room, i, arr) => (
                <div
                  key={room.name}
                  className={`flex justify-between items-center py-2.5 gap-3 ${
                    i < arr.length - 1
                      ? "border-b border-[#E2DDD5]"
                      : ""
                  }`}
                >
                  <div className="flex-1">
                    <div className="text-sm font-medium">
                      {room.name}
                    </div>
                    <div className="text-xs text-[#7A7570] mt-0.5">
                      {room.detail}
                    </div>
                  </div>
                  <span
                    className={`text-[11px] font-medium px-2.5 py-1 rounded-full border flex-shrink-0 ${
                      room.badgeBlue
                        ? "bg-[#D6E8F7] text-[#1B4F7A] border-[#A8CFEA]"
                        : "bg-[#F0EDE6] text-[#7A7570] border-[#E2DDD5]"
                    }`}
                  >
                    {room.badge}
                  </span>
                </div>
              ))}
            </div>

            <div className="bg-white border border-[#E2DDD5] rounded-[14px] p-6">
              <div className="text-[11px] font-semibold tracking-[0.08em] uppercase text-[#B0ABA4] mb-4">
                Udogodnienia
              </div>
              <div className="flex flex-wrap gap-1.5">
                {[
                  "Grill",
                  "Ognisko",
                  "WiFi",
                  "Parking",
                  "Kuchnia wspólna",
                  "Duży ogród",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-medium px-2.5 py-1 rounded-full bg-[#D8F3DC] text-[#2D6A4F] border border-[#B7E4C7]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Zakupy Section */}
        {activeTab === "zakupy" && (
          <div className="bg-white border border-[#E2DDD5] rounded-[14px] p-6">
            <div className="text-[11px] font-semibold tracking-[0.08em] uppercase text-[#B0ABA4] mb-4">
              Wspólna lista zakupów
            </div>
            <div>
              {shopItems.map((item, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-2.5 py-2.5 ${
                    i < shopItems.length - 1
                      ? "border-b border-[#E2DDD5]"
                      : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={item.done}
                    onChange={() => toggleShop(i)}
                    className="w-4 h-4 cursor-pointer accent-[#2D6A4F] flex-shrink-0"
                  />
                  <span
                    className={`text-sm flex-1 ${item.done ? "line-through text-[#B0ABA4]" : ""}`}
                  >
                    {item.name}
                  </span>
                  <span className="text-xs text-[#7A7570] flex-shrink-0">
                    {item.who}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex gap-2 mt-4 flex-wrap">
              <input
                type="text"
                value={shopInput}
                onChange={(e) => setShopInput(e.target.value)}
                onKeyPress={(e) =>
                  e.key === "Enter" && addShopItem()
                }
                placeholder="Dodaj produkt..."
                className="flex-1 min-w-[140px] text-sm px-3 py-2 border border-[#E2DDD5] rounded-lg bg-[#F0EDE6] text-[#1A1814] outline-none focus:border-[#2D6A4F] transition-colors"
              />
              <select
                value={shopWho}
                onChange={(e) => setShopWho(e.target.value)}
                className="text-[13px] px-2.5 py-2 border border-[#E2DDD5] rounded-lg bg-[#F0EDE6] text-[#1A1814] cursor-pointer"
              >
                {people.map((p) => (
                  <option key={p.name}>{p.name}</option>
                ))}
              </select>
              <button
                onClick={addShopItem}
                className="text-[13px] font-medium px-4 py-2 border border-[#E2DDD5] rounded-lg bg-[#1A1814] text-white cursor-pointer hover:opacity-85 transition-opacity whitespace-nowrap"
              >
                + Dodaj
              </button>
            </div>
          </div>
        )}

        {/* Rzeczy Section */}
        {activeTab === "rzeczy" && (
          <div className="grid md:grid-cols-2 gap-3.5">
            <div className="bg-white border border-[#E2DDD5] rounded-[14px] p-6">
              <div className="text-[11px] font-semibold tracking-[0.08em] uppercase text-[#B0ABA4] mb-4">
                Gry & gadżety
              </div>
              <div>
                {gearItems.map((item, i) => (
                  <div
                    key={i}
                    onClick={() => toggleGear(i)}
                    className={`flex items-center gap-2.5 py-2.5 cursor-pointer ${
                      i < gearItems.length - 1
                        ? "border-b border-[#E2DDD5]"
                        : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={item.done}
                      onChange={() => toggleGear(i)}
                      onClick={(e) => e.stopPropagation()}
                      className="w-4 h-4 cursor-pointer accent-[#2D6A4F] flex-shrink-0"
                    />
                    <div className="flex-1">
                      <div
                        className={`text-sm ${item.done ? "line-through text-[#B0ABA4]" : ""}`}
                      >
                        {item.name}
                      </div>
                      <div className="text-[11px] text-[#B0ABA4] mt-0.5">
                        {item.who}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-1.5 mt-4">
                <input
                  type="text"
                  value={gearInput}
                  onChange={(e) => setGearInput(e.target.value)}
                  onKeyPress={(e) =>
                    e.key === "Enter" && addGear()
                  }
                  placeholder="Dodaj item..."
                  className="text-sm px-3 py-2 border border-[#E2DDD5] rounded-lg bg-[#F0EDE6] text-[#1A1814] outline-none focus:border-[#2D6A4F] transition-colors"
                />
                <div className="flex gap-1.5">
                  <select
                    value={gearWho}
                    onChange={(e) => setGearWho(e.target.value)}
                    className="flex-1 text-[13px] px-2.5 py-2 border border-[#E2DDD5] rounded-lg bg-[#F0EDE6] text-[#1A1814] cursor-pointer"
                  >
                    {people.map((p) => (
                      <option key={p.name}>{p.name}</option>
                    ))}
                  </select>
                  <button
                    onClick={addGear}
                    className="text-[13px] font-medium px-4 py-2 border border-[#E2DDD5] rounded-lg bg-[#1A1814] text-white cursor-pointer hover:opacity-85 transition-opacity"
                  >
                    + Dodaj
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white border border-[#E2DDD5] rounded-[14px] p-6">
              <div className="text-[11px] font-semibold tracking-[0.08em] uppercase text-[#B0ABA4] mb-4">
                Moja checklista
              </div>
              <div>
                {PERSONAL_ITEMS.map((item, i) => (
                  <div
                    key={i}
                    onClick={() => togglePersonal(i)}
                    className={`flex items-center gap-2.5 py-2.5 cursor-pointer ${
                      i < PERSONAL_ITEMS.length - 1
                        ? "border-b border-[#E2DDD5]"
                        : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={personalDone[i] || false}
                      onChange={() => togglePersonal(i)}
                      onClick={(e) => e.stopPropagation()}
                      className="w-4 h-4 cursor-pointer accent-[#2D6A4F] flex-shrink-0"
                    />
                    <span
                      className={`text-sm ${personalDone[i] ? "line-through text-[#B0ABA4]" : ""}`}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Plan Section */}
        {activeTab === "plan" && (
          <>
            <div className="bg-white border border-[#E2DDD5] rounded-[14px] p-6 mb-3.5">
              <div className="text-[11px] font-semibold tracking-[0.08em] uppercase text-[#B0ABA4] mb-4">
                Piątek — plan dnia
              </div>
              <div className="relative pl-5">
                <div className="absolute left-[7px] top-2 bottom-2 w-px bg-[#E2DDD5]"></div>
                {[
                  {
                    time: "14:00",
                    name: "Zbiórka i wyjazd",
                    desc: "2 auta wyruszają z Warszawy",
                    dot: "bg-[#2D6A4F]",
                  },
                  {
                    time: "15:30",
                    name: "Przyjazd & check-in",
                    desc: "Rozlokowanie w pokojach, zwiedzanie obiektu",
                    dot: "bg-[#2D6A4F]",
                  },
                  {
                    time: "16:00",
                    name: "Grill & napoje",
                    desc: "Wspólne rozpalanie, kiełbaski, relaks w ogrodzie",
                    dot: "bg-[#E9A800]",
                  },
                  {
                    time: "18:00",
                    name: "Gry planszowe",
                    desc: "Catan, Wsiąść do pociągu, Codenames…",
                    dot: "bg-[#4A3880]",
                  },
                  {
                    time: "20:00",
                    name: "Kolacja & ognisko",
                    desc: "Marshmallows, piwa, rozmowy przy ogniu",
                    dot: "bg-[#E9A800]",
                  },
                  {
                    time: "22:00",
                    name: "Wieczór swobodny",
                    desc: "Kto chce — zostaje przy ognisku",
                    dot: "bg-[#B0ABA4]",
                  },
                ].map((event) => (
                  <div
                    key={event.time}
                    className="flex gap-4 py-2.5 relative"
                  >
                    <div
                      className={`absolute -left-5 top-[15px] w-2.5 h-2.5 rounded-full border-2 border-[#F5F2EC] ${event.dot}`}
                    />
                    <div className="font-['DM_Mono',monospace] text-[13px] font-medium text-[#7A7570] min-w-[44px] pt-0.5">
                      {event.time}
                    </div>
                    <div>
                      <div className="text-sm font-medium">
                        {event.name}
                      </div>
                      <div className="text-xs text-[#7A7570] mt-0.5">
                        {event.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-[#E2DDD5] rounded-[14px] p-6">
              <div className="text-[11px] font-semibold tracking-[0.08em] uppercase text-[#B0ABA4] mb-4">
                Sobota — plan dnia
              </div>
              <div className="relative pl-5">
                <div className="absolute left-[7px] top-2 bottom-2 w-px bg-[#E2DDD5]"></div>
                {[
                  {
                    time: "9:00",
                    name: "Wspólne śniadanie",
                    desc: "Jajecznica, pieczywo, kawa w ogrodzie",
                    dot: "bg-[#2D6A4F]",
                  },
                  {
                    time: "10:30",
                    name: "Spacer / rowery",
                    desc: "Opcjonalnie — okoliczne łąki i las",
                    dot: "bg-[#2D6A4F]",
                  },
                  {
                    time: "12:00",
                    name: "Check-out & powrót",
                    desc: "Pakowanie, sprzątanie, do domu!",
                    dot: "bg-[#B0ABA4]",
                  },
                ].map((event) => (
                  <div
                    key={event.time}
                    className="flex gap-4 py-2.5 relative"
                  >
                    <div
                      className={`absolute -left-5 top-[15px] w-2.5 h-2.5 rounded-full border-2 border-[#F5F2EC] ${event.dot}`}
                    />
                    <div className="font-['DM_Mono',monospace] text-[13px] font-medium text-[#7A7570] min-w-[44px] pt-0.5">
                      {event.time}
                    </div>
                    <div>
                      <div className="text-sm font-medium">
                        {event.name}
                      </div>
                      <div className="text-xs text-[#7A7570] mt-0.5">
                        {event.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Zrzutka Section */}
        {activeTab === "zrzutka" && (
          <>
            <div className="bg-white border border-[#E2DDD5] rounded-[14px] p-6 mb-3.5">
              <div className="grid grid-cols-3 gap-2.5 mb-4">
                <div className="bg-[#F0EDE6] rounded-lg p-3.5 text-center border border-[#E2DDD5]">
                  <div className="text-[22px] font-semibold tracking-tight">
                    820
                  </div>
                  <div className="text-[11px] text-[#7A7570] mt-1">
                    zł łącznie
                  </div>
                </div>
                <div className="bg-[#F0EDE6] rounded-lg p-3.5 text-center border border-[#E2DDD5]">
                  <div className="text-[22px] font-semibold tracking-tight">
                    137
                  </div>
                  <div className="text-[11px] text-[#7A7570] mt-1">
                    zł / osoba
                  </div>
                </div>
                <div className="bg-[#F0EDE6] rounded-lg p-3.5 text-center border border-[#E2DDD5]">
                  <div className="text-[22px] font-semibold tracking-tight">
                    {paidCount} / {people.length}
                  </div>
                  <div className="text-[11px] text-[#7A7570] mt-1">
                    opłaciło
                  </div>
                </div>
              </div>
              <div className="mb-1">
                <div className="text-xs text-[#7A7570] mb-1.5">
                  Zebrano środki
                </div>
                <div className="h-1.5 bg-[#F0EDE6] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#2D6A4F] rounded-full transition-all duration-400"
                    style={{
                      width: `${Math.round((collected / total) * 100)}%`,
                    }}
                  />
                </div>
                <div className="text-xs text-[#7A7570] mt-1.5">
                  {collected} / {total} zł
                </div>
              </div>
            </div>

            <div className="bg-white border border-[#E2DDD5] rounded-[14px] p-6 mb-3.5">
              <div className="text-[11px] font-semibold tracking-[0.08em] uppercase text-[#B0ABA4] mb-4">
                Podział kosztów
              </div>
              {[
                {
                  name: "Nocleg (agroturystyka)",
                  amount: "480 zł",
                },
                { name: "Grill & mięso", amount: "160 zł" },
                { name: "Alko & napoje", amount: "120 zł" },
                { name: "Paliwo (2 auta)", amount: "60 zł" },
                {
                  name: "Łącznie",
                  amount: "820 zł",
                  total: true,
                },
              ].map((row, i, arr) => (
                <div
                  key={row.name}
                  className={`flex justify-between items-center py-2.5 text-sm ${
                    i < arr.length - 1
                      ? "border-b border-[#E2DDD5]"
                      : ""
                  } ${row.total ? "font-semibold" : ""}`}
                >
                  <span>{row.name}</span>
                  <span className="font-['DM_Mono',monospace] text-[13px]">
                    {row.amount}
                  </span>
                </div>
              ))}
            </div>

            <div className="bg-white border border-[#E2DDD5] rounded-[14px] p-6 mb-3.5">
              <div className="text-[11px] font-semibold tracking-[0.08em] uppercase text-[#B0ABA4] mb-1">
                Status wpłat — 137 zł / os. &nbsp;
                <span className="text-[11px] text-[#B0ABA4] font-normal">
                  (kliknij aby zmienić)
                </span>
              </div>
              <div className="mt-4">
                {people.map((person, i) => (
                  <div
                    key={person.name}
                    onClick={() => togglePay(i)}
                    className="flex items-center gap-3 py-2.5 border-b border-[#E2DDD5] last:border-b-0 cursor-pointer"
                  >
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-semibold tracking-tight flex-shrink-0 ${getAvatarClass(person.av)}`}
                    >
                      {person.init}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium">
                        {person.name}
                      </div>
                    </div>
                    <span
                      className={`text-[11px] font-medium px-2.5 py-1 rounded-full border flex-shrink-0 ${
                        payStatus[i]
                          ? "bg-[#D8F3DC] text-[#2D6A4F] border-[#B7E4C7]"
                          : "bg-[#FFF0CC] text-[#7C4A00] border-[#FFE08A]"
                      }`}
                    >
                      {payStatus[i] ? "Opłacone" : "Do zapłaty"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-[#E2DDD5] rounded-[14px] p-6">
              <div className="text-[11px] font-semibold tracking-[0.08em] uppercase text-[#B0ABA4] mb-4">
                Numer do przelewu
              </div>
              {[
                {
                  label: "Zbiera",
                  value: "Marek K.",
                  bold: true,
                },
                {
                  label: "Konto",
                  value: "PL 12 3456 7890 1234 5678 9012 3456",
                  mono: true,
                },
                { label: "Tytuł", value: "Workation maj 2025" },
              ].map((row, i, arr) => (
                <div
                  key={row.label}
                  className={`flex justify-between items-center py-2.5 gap-3 text-sm ${
                    i < arr.length - 1
                      ? "border-b border-[#E2DDD5]"
                      : ""
                  }`}
                >
                  <span className="text-[#7A7570] text-[13px] flex-shrink-0">
                    {row.label}
                  </span>
                  <span
                    className={`text-right ${row.bold ? "font-medium" : ""} ${
                      row.mono
                        ? "font-['DM_Mono',monospace] text-[13px]"
                        : ""
                    }`}
                  >
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Ustawienia Section */}
        {activeTab === "ustawienia" && (
          <>
            <div className="bg-white border border-[#E2DDD5] rounded-[14px] p-6 mb-3.5">
              <div className="text-[11px] font-semibold tracking-[0.08em] uppercase text-[#B0ABA4] mb-4">
                Podstawowe informacje
              </div>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-[#7A7570] mb-1.5">
                    Tytuł wydarzenia
                  </label>
                  <input
                    type="text"
                    value={settings.title}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    className="w-full text-sm px-3 py-2 border border-[#E2DDD5] rounded-lg bg-[#F0EDE6] text-[#1A1814] outline-none focus:border-[#2D6A4F] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#7A7570] mb-1.5">
                    Podtytuł
                  </label>
                  <input
                    type="text"
                    value={settings.subtitle}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        subtitle: e.target.value,
                      }))
                    }
                    className="w-full text-sm px-3 py-2 border border-[#E2DDD5] rounded-lg bg-[#F0EDE6] text-[#1A1814] outline-none focus:border-[#2D6A4F] transition-colors"
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-[#7A7570] mb-1.5">
                      Data
                    </label>
                    <input
                      type="text"
                      value={settings.date}
                      onChange={(e) =>
                        setSettings((prev) => ({
                          ...prev,
                          date: e.target.value,
                        }))
                      }
                      className="w-full text-sm px-3 py-2 border border-[#E2DDD5] rounded-lg bg-[#F0EDE6] text-[#1A1814] outline-none focus:border-[#2D6A4F] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[#7A7570] mb-1.5">
                      Lokalizacja
                    </label>
                    <input
                      type="text"
                      value={settings.location}
                      onChange={(e) =>
                        setSettings((prev) => ({
                          ...prev,
                          location: e.target.value,
                        }))
                      }
                      className="w-full text-sm px-3 py-2 border border-[#E2DDD5] rounded-lg bg-[#F0EDE6] text-[#1A1814] outline-none focus:border-[#2D6A4F] transition-colors"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-[#E2DDD5] rounded-[14px] p-6 mb-3.5">
              <div className="text-[11px] font-semibold tracking-[0.08em] uppercase text-[#B0ABA4] mb-4">
                Obiekt noclegowy
              </div>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-[#7A7570] mb-1.5">
                    Nazwa obiektu
                  </label>
                  <input
                    type="text"
                    value={settings.venue}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        venue: e.target.value,
                      }))
                    }
                    className="w-full text-sm px-3 py-2 border border-[#E2DDD5] rounded-lg bg-[#F0EDE6] text-[#1A1814] outline-none focus:border-[#2D6A4F] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#7A7570] mb-1.5">
                    Adres
                  </label>
                  <input
                    type="text"
                    value={settings.venueAddress}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        venueAddress: e.target.value,
                      }))
                    }
                    className="w-full text-sm px-3 py-2 border border-[#E2DDD5] rounded-lg bg-[#F0EDE6] text-[#1A1814] outline-none focus:border-[#2D6A4F] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#7A7570] mb-1.5">
                    Telefon kontaktowy
                  </label>
                  <input
                    type="text"
                    value={settings.venuePhone}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        venuePhone: e.target.value,
                      }))
                    }
                    className="w-full text-sm px-3 py-2 border border-[#E2DDD5] rounded-lg bg-[#F0EDE6] text-[#1A1814] outline-none focus:border-[#2D6A4F] transition-colors"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white border border-[#E2DDD5] rounded-[14px] p-6">
              <div className="text-[11px] font-semibold tracking-[0.08em] uppercase text-[#B0ABA4] mb-4">
                Lista uczestników
              </div>
              <div className="space-y-2 mb-4">
                {people.map((person, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-3 border border-[#E2DDD5] rounded-lg bg-[#F0EDE6]"
                  >
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-semibold tracking-tight flex-shrink-0 ${getAvatarClass(person.av)}`}
                    >
                      {person.init}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">
                        {person.name}
                      </div>
                      <div className="text-xs text-[#7A7570]">
                        {person.init} · {person.av}
                      </div>
                    </div>
                    <button
                      onClick={() => removePerson(i)}
                      className="text-xs px-3 py-1.5 border border-[#E2DDD5] rounded-lg bg-white text-[#8B3A2A] hover:bg-[#FDDDD7] transition-colors"
                    >
                      Usuń
                    </button>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#E2DDD5] pt-4">
                <div className="text-xs text-[#7A7570] mb-3">
                  Dodaj nową osobę
                </div>
                <div className="space-y-2">
                  <input
                    type="text"
                    value={newPersonName}
                    onChange={(e) =>
                      setNewPersonName(e.target.value)
                    }
                    placeholder="Imię i nazwisko (np. Jan K.)"
                    className="w-full text-sm px-3 py-2 border border-[#E2DDD5] rounded-lg bg-white text-[#1A1814] outline-none focus:border-[#2D6A4F] transition-colors"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={newPersonInit}
                      onChange={(e) =>
                        setNewPersonInit(e.target.value)
                      }
                      placeholder="Inicjały (np. JK)"
                      maxLength={3}
                      className="text-sm px-3 py-2 border border-[#E2DDD5] rounded-lg bg-white text-[#1A1814] outline-none focus:border-[#2D6A4F] transition-colors"
                    />
                    <select
                      value={newPersonColor}
                      onChange={(e) =>
                        setNewPersonColor(e.target.value)
                      }
                      className="text-sm px-3 py-2 border border-[#E2DDD5] rounded-lg bg-white text-[#1A1814] cursor-pointer"
                    >
                      <option value="av-g">Zielony</option>
                      <option value="av-a">Bursztynowy</option>
                      <option value="av-b">Niebieski</option>
                      <option value="av-c">Koralowy</option>
                      <option value="av-p">Fioletowy</option>
                      <option value="av-2">Szary</option>
                    </select>
                  </div>
                  <button
                    onClick={addPerson}
                    className="w-full text-sm font-medium px-4 py-2 border border-[#E2DDD5] rounded-lg bg-[#2D6A4F] text-white hover:opacity-85 transition-opacity"
                  >
                    + Dodaj uczestnika
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
