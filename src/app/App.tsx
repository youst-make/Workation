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
  cost: number;
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
    who: "Tomek",
    done: false,
    cost: 0,
  },
  { name: "Pieczywo & bułki", who: "Iza", done: false, cost: 0 },
  { name: "Piwo (zgrzewka)", who: "Tomek", done: false, cost: 0 },
  { name: "Wino & napoje", who: "Justyna", done: false, cost: 0 },
  { name: "Warzywa & sałatki", who: "Marta", done: false, cost: 0 },
  { name: "Marshmallows", who: "Iza", done: false, cost: 0 },
  { name: "Podpałka & węgiel", who: "Marcin", done: false, cost: 0 },
  { name: "Papier toaletowy", who: "Krzysztof", done: false, cost: 0 },
];

const DEFAULT_GEAR: GearItem[] = [
  { name: "Catan", who: "Iza", done: false },
  { name: "Wsiąść do pociągu", who: "Piotrek T.", done: false },
  { name: "Codenames", who: "Kasia L.", done: false },
  { name: "Głośnik bluetooth", who: "Bartek N.", done: false },
  { name: "Przedłużacz", who: "Marek K.", done: false },
  {
    name: "Kijki do marshmallows",
    who: "Julia W.",
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
  | "zrzutka";

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
  subtitle: "Wypad integracyjny: piątek–sobota",
  date: "9 maja 2025",
  location: "Żulin",
  venue: "",
  venueAddress: "Żulin 1",
  venuePhone: "+48 602 123 456",
};

export default function App() {
  const [activeTab, setActiveTab] =
    useState<TabType>("plan");

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
    people[0]?.name || "Tomek",
  );
  const [shopCost, setShopCost] = useState("");
  const [gearInput, setGearInput] = useState("");
  const [gearWho, setGearWho] = useState(
    people[0]?.name || "Tomek",
  );

  const [newPersonName, setNewPersonName] = useState("");
  const [newPersonInit, setNewPersonInit] = useState("");
  const [newPersonColor, setNewPersonColor] = useState("av-g");

  const [drivers, setDrivers] = useState<CarDriver[]>(() => {
    const saved = localStorage.getItem('wk2_drivers');
    return saved ? JSON.parse(saved) : [
      { personIndex: 0, departureTime: '09:00', departureLocation: 'Wawer', passengers: [1, 2] },
      { personIndex: 3, departureTime: '09:00', departureLocation: 'Ursynów', passengers: [4, 5] },
    ];
  });

  const [editingDriver, setEditingDriver] = useState<number | null>(null);

  const [personalItems, setPersonalItems] = useState<string[]>(() => {
    const saved = localStorage.getItem('wk2_personal_items');
    return saved ? JSON.parse(saved) : PERSONAL_ITEMS;
  });

  const [newPersonalItem, setNewPersonalItem] = useState('');

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

  useEffect(() => {
    localStorage.setItem('wk2_drivers', JSON.stringify(drivers));
  }, [drivers]);

  useEffect(() => {
    localStorage.setItem('wk2_personal_items', JSON.stringify(personalItems));
  }, [personalItems]);

  const toggleShop = (index: number) => {
    setShopItems((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, done: !item.done } : item,
      ),
    );
  };

  const updateShopPerson = (index: number, who: string) => {
    setShopItems(prev =>
      prev.map((item, i) => (i === index ? { ...item, who } : item))
    );
  };

  const updateDriver = (driverIndex: number, field: keyof CarDriver, value: any) => {
    setDrivers(prev =>
      prev.map((driver, i) =>
        i === driverIndex ? { ...driver, [field]: value } : driver
      )
    );
  };

  const addShopItem = () => {
    if (!shopInput.trim()) return;
    setShopItems((prev) => [
      ...prev,
      { name: shopInput, who: shopWho, done: false, cost: parseFloat(shopCost) || 0 },
    ]);
    setShopInput("");
    setShopCost("");
  };

  const updateShopCost = (index: number, cost: number) => {
    setShopItems(prev =>
      prev.map((item, i) => (i === index ? { ...item, cost } : item))
    );
  };

  const addPassenger = (driverIndex: number, passengerIndex: number) => {
    setDrivers(prev =>
      prev.map((driver, i) =>
        i === driverIndex
          ? { ...driver, passengers: [...driver.passengers, passengerIndex] }
          : driver
      )
    );
  };

  const removePassenger = (driverIndex: number, passengerIndex: number) => {
    setDrivers(prev =>
      prev.map((driver, i) =>
        i === driverIndex
          ? { ...driver, passengers: driver.passengers.filter(p => p !== passengerIndex) }
          : driver
      )
    );
  };

  const removeShopItem = (index: number) => {
    setShopItems(prev => prev.filter((_, i) => i !== index));
  };

  const removeGearItem = (index: number) => {
    setGearItems(prev => prev.filter((_, i) => i !== index));
  };

  const addPersonalItem = () => {
    if (!newPersonalItem.trim()) return;
    setPersonalItems(prev => [...prev, newPersonalItem]);
    setNewPersonalItem('');
  };

  const removePersonalItem = (index: number) => {
    setPersonalItems(prev => prev.filter((_, i) => i !== index));
    setPersonalDone(prev => {
      const updated = { ...prev };
      delete updated[index];
      // Przesunięcie indeksów
      const newDone: Record<number, boolean> = {};
      Object.keys(updated).forEach(key => {
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

  // Oblicz koszty z zakupów - wszystkie koszty, niezależnie od statusu done
  const shoppingCosts = shopItems.reduce((acc, item) => {
    if (item.cost > 0) {
      const personIndex = people.findIndex(p => p.name === item.who);
      if (personIndex >= 0) {
        acc[personIndex] = (acc[personIndex] || 0) + item.cost;
      }
    }
    return acc;
  }, {} as Record<number, number>);

  const totalShoppingCost = Object.values(shoppingCosts).reduce((a, b) => a + b, 0);
  const baseTotal = 820;
  const total = baseTotal + totalShoppingCost;
  const perPerson = Math.ceil(total / people.length);
  const paidCount = payStatus.filter(Boolean).length;
  const collected = paidCount * perPerson;

  const getAvatarClass = (av: string) => {
    const map: Record<string, string> = {
      "av-g": "bg-gradient-to-br from-[#D4F1D4] to-[#B8E6B8] text-[#2E7D32] border-2 border-[#A5D6A7] shadow-sm",
      "av-a": "bg-gradient-to-br from-[#FFF4D6] to-[#FFE9B3] text-[#F57C00] border-2 border-[#FFD54F] shadow-sm",
      "av-b": "bg-gradient-to-br from-[#D1F2F9] to-[#B3E5FC] text-[#0277BD] border-2 border-[#81D4FA] shadow-sm",
      "av-c": "bg-gradient-to-br from-[#FFE0D8] to-[#FFCCBC] text-[#D84315] border-2 border-[#FFAB91] shadow-sm",
      "av-p": "bg-gradient-to-br from-[#EDD7F0] to-[#E1BEE7] text-[#6A1B9A] border-2 border-[#CE93D8] shadow-sm",
      "av-2": "bg-gradient-to-br from-[#ECEFF1] to-[#CFD8DC] text-[#455A64] border-2 border-[#B0BEC5] shadow-sm",
    };
    return map[av] || map["av-2"];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF5F7] via-[#F5F0FF] to-[#FFF9E6] py-8 px-5 pb-20 relative overflow-hidden">
      {/* Doodle decorations */}
      <div className="absolute top-10 right-10 w-32 h-32 opacity-20 pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path d="M20,50 Q30,20 50,30 T80,50" stroke="#9C27B0" strokeWidth="3" fill="none" strokeLinecap="round"/>
          <circle cx="70" cy="30" r="8" fill="#FFB300" opacity="0.6"/>
          <path d="M10,70 L25,85 L15,90" stroke="#E91E63" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        </svg>
      </div>
      <div className="absolute bottom-20 left-10 w-40 h-40 opacity-15 pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="30" cy="30" r="25" stroke="#00BCD4" strokeWidth="2.5" fill="none" strokeDasharray="5,5"/>
          <path d="M60,60 Q70,40 80,60 Q90,80 70,85" stroke="#4CAF50" strokeWidth="3" fill="none" strokeLinecap="round"/>
        </svg>
      </div>

      <div className="max-w-[900px] mx-auto">
        {/* Hero */}
        <div className="relative overflow-hidden bg-white rounded-[28px] border-4 border-[#9C27B0] shadow-[8px_8px_0px_0px_rgba(156,39,176,0.2)] p-7 mb-6">
          {/* Doodle elements */}
          <div className="absolute -top-2 -right-2 w-24 h-24">
            <svg viewBox="0 0 100 100" className="w-full h-full opacity-60">
              <circle cx="50" cy="50" r="40" fill="#FFE082" stroke="#FFB300" strokeWidth="3"/>
              <path d="M30,50 Q50,30 70,50" stroke="#FFB300" strokeWidth="2.5" fill="none"/>
            </svg>
          </div>
          <div className="absolute bottom-4 left-4 opacity-40">
            <svg width="60" height="60" viewBox="0 0 60 60">
              <path d="M10,30 L20,10 L30,30 L50,20 L40,40 L50,50" stroke="#E91E63" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          <div className="relative">
            <div className="inline-block text-[11px] font-bold tracking-[0.1em] uppercase text-white bg-gradient-to-r from-[#E91E63] to-[#9C27B0] px-4 py-2 rounded-full mb-3 shadow-md">
              ✨ WYJAZD SMART'ÓW ✨
            </div>
            <h1 className="text-[32px] font-bold tracking-tight leading-tight mb-2 text-[#1A1A1A]">
              {settings.title}
            </h1>
            <div className="text-base text-[#666] mb-6 font-medium">
              {settings.subtitle}
            </div>
            <div className="flex flex-wrap gap-2.5">
              {[
                { emoji: "📅", text: settings.date, color: "from-[#F3E5F5] to-[#E1BEE7]" },
                { emoji: "📍", text: settings.location, color: "from-[#E0F7FA] to-[#B2EBF2]" },
                settings.venue ? { emoji: "🏡", text: settings.venue, color: "from-[#E8F5E9] to-[#C8E6C9]" } : null,
                { emoji: "👥", text: `${people.length} osób`, color: "from-[#FFF9E6] to-[#FFECB3]" },
              ].filter(Boolean).map((chip) => (
                <div
                  key={chip.text}
                  className={`text-[14px] font-semibold bg-gradient-to-r ${chip.color} rounded-full px-4 py-2 text-[#424242] shadow-sm hover:scale-105 transition-transform`}
                >
                  <span className="mr-1.5">{chip.emoji}</span>
                  {chip.text}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex gap-2.5 flex-wrap mb-6 bg-white rounded-3xl p-3 shadow-lg border-3 border-[#F3E5F5]">
          {[
            {
              id: "plan" as TabType,
              label: "📋 Plan dnia",
              color: "from-[#FFF9E6] to-[#FFECB3]",
            },
            {
              id: "transport" as TabType,
              label: "🚗 Transport",
              color: "from-[#E0F7FA] to-[#B2EBF2]",
            },
            { id: "zrzutka" as TabType, label: "💸 Zrzutka", color: "from-[#E8F5E9] to-[#C8E6C9]" },
            { id: "zakupy" as TabType, label: "🛒 Zakupy", color: "from-[#FFE0D8] to-[#FFCCBC]" },
            { id: "rzeczy" as TabType, label: "🎒 Co zabrać", color: "from-[#F3E5F5] to-[#E1BEE7]" },
            { id: "nocleg" as TabType, label: "🏡 Nocleg", color: "from-[#E8F5E9] to-[#C8E6C9]" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`text-[14px] font-bold px-5 py-3 rounded-2xl transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? `bg-gradient-to-r ${tab.color} text-[#424242] shadow-[4px_4px_0px_0px_rgba(0,0,0,0.05)] scale-105`
                  : "bg-white text-[#666] hover:bg-gray-50 hover:scale-102"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Transport Section */}
        {activeTab === "transport" && (
          <>
            <div className="relative bg-white border-4 border-[#80DEEA] rounded-[24px] shadow-[6px_6px_0px_0px_rgba(128,222,234,0.3)] p-6 mb-5">
              <div className="absolute -top-3 -left-3">
                <svg width="40" height="40" viewBox="0 0 40 40">
                  <path d="M5,20 Q15,5 25,20 T35,20" stroke="#00BCD4" strokeWidth="3" fill="none" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="text-[12px] font-black tracking-[0.08em] uppercase text-[#00838F] mb-4 flex items-center gap-2">
                🚗 Auta i pasażerowie
              </div>

              {drivers.map((driver, driverIdx) => (
                <div key={driverIdx}>
                  {driverIdx > 0 && <div className="h-px bg-[#E2DDD5] my-3"></div>}

                  <div className="flex items-center gap-3 py-2.5 border-b border-[#E2DDD5]">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-semibold tracking-tight flex-shrink-0 ${getAvatarClass(people[driver.personIndex]?.av || 'av-2')}`}
                    >
                      {people[driver.personIndex]?.init || '?'}
                    </div>
                    <div className="flex-1 min-w-0">
                      {editingDriver === driverIdx ? (
                        <div className="space-y-1">
                          <select
                            value={driver.personIndex}
                            onChange={(e) => updateDriver(driverIdx, 'personIndex', Number(e.target.value))}
                            className="text-sm px-2 py-1 border border-[#E2DDD5] rounded bg-white"
                          >
                            {people.map((p, i) => (
                              <option key={i} value={i}>{p.name}</option>
                            ))}
                          </select>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={driver.departureLocation}
                              onChange={(e) => updateDriver(driverIdx, 'departureLocation', e.target.value)}
                              placeholder="Miejsce wyjazdu"
                              className="text-xs px-2 py-1 border border-[#E2DDD5] rounded bg-white flex-1"
                            />
                            <input
                              type="text"
                              value={driver.departureTime}
                              onChange={(e) => updateDriver(driverIdx, 'departureTime', e.target.value)}
                              placeholder="Godz."
                              className="text-xs px-2 py-1 border border-[#E2DDD5] rounded bg-white w-16"
                            />
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="text-sm font-medium">
                            {people[driver.personIndex]?.name || 'Nieznany'}
                          </div>
                          <div className="text-xs text-[#7A7570] mt-0.5">
                            wyjazd {driver.departureLocation} {driver.departureTime}
                          </div>
                        </>
                      )}
                    </div>
                    <button
                      onClick={() => setEditingDriver(editingDriver === driverIdx ? null : driverIdx)}
                      className="text-[12px] font-bold px-3 py-1.5 rounded-full bg-gradient-to-r from-[#E0F7FA] to-[#B2EBF2] text-[#0277BD] border-2 border-[#B2EBF2] flex-shrink-0 shadow-sm hover:scale-105 transition-transform"
                    >
                      {editingDriver === driverIdx ? '✓ Zapisz' : '✎ Kierowca'}
                    </button>
                  </div>

                  {driver.passengers.map((passengerIdx, i) => (
                    <div key={i} className={`flex items-center gap-3 py-2.5 pl-[46px] border-b border-[#E2DDD5]`}>
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-semibold tracking-tight flex-shrink-0 ${getAvatarClass(people[passengerIdx]?.av || 'av-2')}`}
                      >
                        {people[passengerIdx]?.init || '?'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium">
                          {people[passengerIdx]?.name || 'Nieznany'}
                        </div>
                        <div className="text-xs text-[#7A7570] mt-0.5">
                          Pasażer → auto {people[driver.personIndex]?.name?.split(' ')[0] || 'kierowcy'}
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
                        if (passengerIdx >= 0 && !driver.passengers.includes(passengerIdx) && passengerIdx !== driver.personIndex) {
                          addPassenger(driverIdx, passengerIdx);
                          e.target.value = '';
                        }
                      }}
                      className="flex-1 text-xs px-2 py-1 border border-[#E2DDD5] rounded bg-[#F0EDE6]"
                      defaultValue=""
                    >
                      <option value="" disabled>+ Dodaj pasażera</option>
                      {people.map((p, i) => {
                        const isDriver = i === driver.personIndex;
                        const isPassenger = driver.passengers.includes(i);
                        const isInOtherCar = drivers.some((d, di) => di !== driverIdx && (d.personIndex === i || d.passengers.includes(i)));
                        if (isDriver || isPassenger || isInOtherCar) return null;
                        return <option key={i} value={i}>{p.name}</option>;
                      })}
                    </select>
                  </div>
                </div>
              ))}
            </div>

            <div className="relative bg-white border-4 border-[#FFE082] rounded-[24px] shadow-[6px_6px_0px_0px_rgba(255,224,130,0.4)] p-6">
              <div className="absolute -top-2 -right-2">
                <svg width="50" height="50" viewBox="0 0 50 50">
                  <circle cx="25" cy="25" r="20" fill="#FFD54F" opacity="0.6"/>
                  <path d="M15,25 L35,25 M25,15 L25,35" stroke="#FFA000" strokeWidth="3" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="text-[12px] font-black tracking-[0.08em] uppercase text-[#F57C00] mb-4 flex items-center gap-2">
                🗺️ Trasa
              </div>
              {[
                {
                  label: "Start",
                  value: "Warszawa (Wawer / Ursynów / Białołęka / Saska Kępa)",
                },
                { label: "Cel", value: settings.location },
                { label: "Czas jazdy", value: "~65 min" },
                {
                  label: "Szacowany przyjazd",
                  value: "ok. 09:00 - 09:30",
                  bold: true,
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
            <div className="relative bg-white border-4 border-[#A5D6A7] rounded-[24px] shadow-[6px_6px_0px_0px_rgba(165,214,167,0.4)] p-6 mb-5">
              <div className="absolute -top-3 -right-3">
                <svg width="45" height="45" viewBox="0 0 45 45">
                  <rect x="10" y="15" width="25" height="20" stroke="#66BB6A" strokeWidth="3" fill="none" rx="5"/>
                  <path d="M15,10 L22.5,5 L30,10" stroke="#66BB6A" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="text-[12px] font-black tracking-[0.08em] uppercase text-[#2E7D32] mb-4 flex items-center gap-2">
                🏡 Obiekt
              </div>
              {[
                { label: "Check-in", value: "od 16:00 (sobota)" },
                {
                  label: "Check-out",
                  value: "do 12:00 (niedziela)",
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
                  <span className="text-right">
                    {row.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="relative bg-white border-4 border-[#C8E6C9] rounded-[24px] shadow-[6px_6px_0px_0px_rgba(200,230,201,0.4)] p-6">
              <div className="text-[12px] font-black tracking-[0.08em] uppercase text-[#2E7D32] mb-4 flex items-center gap-2">
                ✨ Udogodnienia
              </div>
              <div className="flex flex-wrap gap-2.5">
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
                    className="text-sm font-bold px-4 py-2 rounded-full bg-gradient-to-r from-[#C8E6C9] to-[#A5D6A7] text-[#1B5E20] border-3 border-[#66BB6A] shadow-md hover:scale-105 transition-transform"
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
          <>
            <div className="relative bg-white border-4 border-[#FFAB91] rounded-[24px] shadow-[6px_6px_0px_0px_rgba(255,171,145,0.4)] p-6 mb-5">
              <div className="absolute -top-3 -left-3">
                <svg width="50" height="50" viewBox="0 0 50 50">
                  <path d="M10,20 L15,10 L35,10 L40,20 L35,40 L15,40 Z" stroke="#FF5722" strokeWidth="3" fill="none" strokeLinejoin="round"/>
                  <circle cx="20" cy="25" r="3" fill="#FF5722"/>
                  <circle cx="30" cy="25" r="3" fill="#FF5722"/>
                </svg>
              </div>
              <div className="text-[12px] font-black tracking-[0.08em] uppercase text-[#D84315] mb-4 flex items-center gap-2">
                🛒 Do kupienia
              </div>
              <div>
                {shopItems.filter(item => !item.done).map((item, originalIndex) => {
                  const actualIndex = shopItems.findIndex(x => x === item);
                  return (
                    <div
                      key={actualIndex}
                      className="flex items-center gap-2.5 py-2.5 border-b border-[#E2DDD5] last:border-b-0"
                    >
                      <input
                        type="checkbox"
                        checked={false}
                        onChange={() => toggleShop(actualIndex)}
                        className="w-4 h-4 cursor-pointer accent-[#2D6A4F] flex-shrink-0"
                      />
                      <div className="flex-1">
                        <div className="text-sm">{item.name}</div>
                        {item.cost > 0 && (
                          <div className="text-xs text-[#7A7570] mt-0.5">{item.cost} zł</div>
                        )}
                      </div>
                      <select
                        value={item.who}
                        onChange={(e) => updateShopPerson(actualIndex, e.target.value)}
                        className="text-xs px-2 py-1 border border-[#E2DDD5] rounded bg-[#F0EDE6] text-[#7A7570] flex-shrink-0"
                      >
                        {people.map((p) => (
                          <option key={p.name}>{p.name}</option>
                        ))}
                      </select>
                      <input
                        type="number"
                        value={item.cost || ''}
                        onChange={(e) => updateShopCost(actualIndex, parseFloat(e.target.value) || 0)}
                        placeholder="Koszt"
                        className="w-20 text-xs px-2 py-1 border border-[#E2DDD5] rounded bg-white text-[#1A1814]"
                      />
                      <button
                        onClick={() => removeShopItem(actualIndex)}
                        className="text-lg text-[#FF0000] hover:text-[#CC0000] hover:scale-125 transition-all"
                      >
                        ✕
                      </button>
                    </div>
                  );
                })}
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
                  className="flex-1 min-w-[120px] text-sm px-3 py-2.5 border-2 border-[#E2DDD5] rounded-xl bg-white text-[#1A1814] outline-none focus:border-[#2D6A4F] focus:ring-2 focus:ring-[#2D6A4F]/20 transition-all"
                />
                <input
                  type="number"
                  value={shopCost}
                  onChange={(e) => setShopCost(e.target.value)}
                  onKeyPress={(e) =>
                    e.key === "Enter" && addShopItem()
                  }
                  placeholder="Koszt (zł)"
                  className="w-24 text-sm px-3 py-2.5 border-2 border-[#E2DDD5] rounded-xl bg-white text-[#1A1814] outline-none focus:border-[#2D6A4F] focus:ring-2 focus:ring-[#2D6A4F]/20 transition-all"
                />
                <select
                  value={shopWho}
                  onChange={(e) => setShopWho(e.target.value)}
                  className="text-[13px] px-2.5 py-2.5 border-2 border-[#E2DDD5] rounded-xl bg-white text-[#1A1814] cursor-pointer hover:border-[#2D6A4F] transition-all"
                >
                  {people.map((p) => (
                    <option key={p.name}>{p.name}</option>
                  ))}
                </select>
                <button
                  onClick={addShopItem}
                  className="text-[14px] font-bold px-5 py-3 border-2 border-[#FFCCBC] rounded-2xl bg-gradient-to-r from-[#FFE0D8] to-[#FFCCBC] text-[#D84315] cursor-pointer hover:shadow-md hover:scale-105 transition-all whitespace-nowrap shadow-sm"
                >
                  ➕ Dodaj
                </button>
              </div>
            </div>

            {shopItems.filter(item => item.done).length > 0 && (
              <div className="relative bg-white border-4 border-[#C5E1A5] rounded-[24px] shadow-[6px_6px_0px_0px_rgba(197,225,165,0.4)] p-6">
                <div className="absolute -top-3 -right-3">
                  <svg width="40" height="40" viewBox="0 0 40 40">
                    <circle cx="20" cy="20" r="15" fill="#8BC34A" opacity="0.3"/>
                    <path d="M12,20 L18,26 L28,14" stroke="#689F38" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="text-[12px] font-black tracking-[0.08em] uppercase text-[#558B2F] mb-4 flex items-center gap-2">
                  ✓ Kupione
                </div>
                <div>
                  {shopItems.filter(item => item.done).map((item, originalIndex) => {
                    const actualIndex = shopItems.findIndex(x => x === item);
                    return (
                      <div
                        key={actualIndex}
                        className="flex items-center gap-2.5 py-2.5 border-b border-[#E2DDD5] last:border-b-0"
                      >
                        <input
                          type="checkbox"
                          checked={true}
                          onChange={() => toggleShop(actualIndex)}
                          className="w-4 h-4 cursor-pointer accent-[#2D6A4F] flex-shrink-0"
                        />
                        <div className="flex-1">
                          <div className="text-sm line-through text-[#B0ABA4]">{item.name}</div>
                          {item.cost > 0 && (
                            <div className="text-xs text-[#B0ABA4] mt-0.5">{item.cost} zł</div>
                          )}
                        </div>
                        <select
                          value={item.who}
                          onChange={(e) => updateShopPerson(actualIndex, e.target.value)}
                          className="text-xs px-2 py-1 border border-[#E2DDD5] rounded bg-[#F0EDE6] text-[#B0ABA4] flex-shrink-0"
                        >
                          {people.map((p) => (
                            <option key={p.name}>{p.name}</option>
                          ))}
                        </select>
                        <input
                          type="number"
                          value={item.cost || ''}
                          onChange={(e) => updateShopCost(actualIndex, parseFloat(e.target.value) || 0)}
                          placeholder="Koszt"
                          className="w-20 text-xs px-2 py-1 border border-[#E2DDD5] rounded bg-white text-[#B0ABA4]"
                        />
                        <button
                          onClick={() => removeShopItem(actualIndex)}
                          className="text-lg text-[#FF0000] hover:text-[#CC0000] hover:scale-125 transition-all"
                        >
                          ✕
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </>
        )}

        {/* Rzeczy Section */}
        {activeTab === "rzeczy" && (
          <div className="grid md:grid-cols-2 gap-5">
            <div className="relative bg-white border-4 border-[#CE93D8] rounded-[24px] shadow-[6px_6px_0px_0px_rgba(206,147,216,0.4)] p-6">
              <div className="absolute -top-3 -right-3">
                <svg width="45" height="45" viewBox="0 0 45 45">
                  <rect x="8" y="8" width="30" height="30" rx="5" stroke="#AB47BC" strokeWidth="3" fill="none"/>
                  <circle cx="15" cy="15" r="3" fill="#AB47BC"/>
                  <circle cx="30" cy="30" r="3" fill="#AB47BC"/>
                </svg>
              </div>
              <div className="text-[12px] font-black tracking-[0.08em] uppercase text-[#6A1B9A] mb-4 flex items-center gap-2">
                🎮 Gry & gadżety
              </div>
              <div>
                {gearItems.map((item, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-2.5 py-2.5 ${
                      i < gearItems.length - 1
                        ? "border-b border-[#E2DDD5]"
                        : ""
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
                      <div className="text-[11px] text-[#B0ABA4] mt-0.5">
                        {item.who}
                      </div>
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
                  onKeyPress={(e) =>
                    e.key === "Enter" && addGear()
                  }
                  placeholder="Dodaj item..."
                  className="text-sm px-3 py-2.5 border-2 border-[#E2DDD5] rounded-xl bg-white text-[#1A1814] outline-none focus:border-[#2D6A4F] focus:ring-2 focus:ring-[#2D6A4F]/20 transition-all"
                />
                <div className="flex gap-1.5">
                  <select
                    value={gearWho}
                    onChange={(e) => setGearWho(e.target.value)}
                    className="flex-1 text-[13px] px-2.5 py-2.5 border-2 border-[#E2DDD5] rounded-xl bg-white text-[#1A1814] cursor-pointer hover:border-[#2D6A4F] transition-all"
                  >
                    {people.map((p) => (
                      <option key={p.name}>{p.name}</option>
                    ))}
                  </select>
                  <button
                    onClick={addGear}
                    className="text-[14px] font-bold px-4 py-2.5 border-2 border-[#E1BEE7] rounded-2xl bg-gradient-to-r from-[#F3E5F5] to-[#E1BEE7] text-[#6A1B9A] cursor-pointer hover:shadow-md hover:scale-105 transition-all shadow-sm"
                  >
                    ➕ Dodaj
                  </button>
                </div>
              </div>
            </div>

            <div className="relative bg-white border-4 border-[#E1BEE7] rounded-[24px] shadow-[6px_6px_0px_0px_rgba(225,190,231,0.4)] p-6">
              <div className="absolute -top-3 -left-3">
                <svg width="45" height="45" viewBox="0 0 45 45">
                  <path d="M10,15 L20,10 L35,15 L35,30 L20,35 L10,30 Z" stroke="#9C27B0" strokeWidth="3" fill="none" strokeLinejoin="round"/>
                  <path d="M18,20 L22,24 L28,18" stroke="#9C27B0" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="text-[12px] font-black tracking-[0.08em] uppercase text-[#6A1B9A] mb-4 flex items-center gap-2">
                ✅ Checklista
              </div>
              <div>
                {personalItems.map((item, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-2.5 py-2.5 ${
                      i < personalItems.length - 1
                        ? "border-b border-[#E2DDD5]"
                        : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={personalDone[i] || false}
                      onChange={() => togglePersonal(i)}
                      className="w-4 h-4 cursor-pointer accent-[#2D6A4F] flex-shrink-0"
                    />
                    <span
                      className={`text-sm flex-1 ${personalDone[i] ? "line-through text-[#B0ABA4]" : ""}`}
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
                  onKeyPress={(e) => e.key === 'Enter' && addPersonalItem()}
                  placeholder="Dodaj item..."
                  className="w-full text-sm px-3 py-2 border border-[#E2DDD5] rounded-lg bg-[#F0EDE6] text-[#1A1814] outline-none focus:border-[#2D6A4F] transition-colors mb-2"
                />
                <button
                  onClick={addPersonalItem}
                  className="w-full text-sm font-bold px-4 py-2.5 border-2 border-[#E1BEE7] rounded-2xl bg-gradient-to-r from-[#F3E5F5] to-[#E1BEE7] text-[#6A1B9A] cursor-pointer hover:shadow-md hover:scale-105 transition-all shadow-sm"
                >
                  ➕ Dodaj
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Plan Section */}
        {activeTab === "plan" && (
          <div className="grid md:grid-cols-2 gap-5">
            {/* Piątek */}
            <div className="relative bg-white border-4 border-[#FFE082] rounded-[24px] shadow-[6px_6px_0px_0px_rgba(255,224,130,0.4)] p-6">
              <div className="absolute -top-3 -right-3">
                <svg width="50" height="50" viewBox="0 0 50 50">
                  <rect x="10" y="8" width="30" height="35" rx="3" stroke="#FFA000" strokeWidth="3" fill="none"/>
                  <line x1="15" y1="15" x2="35" y2="15" stroke="#FFA000" strokeWidth="2"/>
                  <line x1="15" y1="22" x2="30" y2="22" stroke="#FFA000" strokeWidth="2"/>
                  <line x1="15" y1="29" x2="32" y2="29" stroke="#FFA000" strokeWidth="2"/>
                </svg>
              </div>
              <div className="text-[12px] font-black tracking-[0.08em] uppercase text-[#F57C00] mb-4 flex items-center gap-2">
                📋 Piątek — plan dnia
              </div>
              <div className="relative pl-5">
                <div className="absolute left-[7px] top-2 bottom-2 w-px bg-[#E2DDD5]"></div>
                {[
                  {
                    time: "09:00",
                    name: "Zbiórka i wyjazd",
                    desc: "Wyjazd z Warszawy",
                    dot: "bg-[#00ACC1]",
                  },
                  {
                    time: "10:00",
                    name: "Praca zdalna",
                    desc: "Skupienie i produktywność",
                    dot: "bg-[#1B4F7A]",
                  },
                  {
                    time: "16:00",
                    name: "Koniec pracy",
                    desc: "Czas na relaks",
                    dot: "bg-[#66BB6A]",
                  },
                  {
                    time: "16:15",
                    name: "Obiad",
                    desc: "Wspólny posiłek",
                    dot: "bg-[#FFA000]",
                  },
                  {
                    time: "18:00",
                    name: "Gry planszowe / Gry terenowe / Spacery",
                    desc: "Aktywności integracyjne",
                    dot: "bg-[#AB47BC]",
                  },
                  {
                    time: "20:00",
                    name: "Ognisko / Grill",
                    desc: "Kolacja przy ognisku",
                    dot: "bg-[#FF5722]",
                  },
                  {
                    time: "22:00",
                    name: "Opowieści o duchach",
                    desc: "Wieczór przy ognisku",
                    dot: "bg-[#78909C]",
                  },
                ].map((event) => (
                  <div
                    key={event.time}
                    className="flex gap-4 py-2.5 relative"
                  >
                    <div
                      className={`absolute -left-5 top-[15px] w-2.5 h-2.5 rounded-full border-2 border-white ${event.dot}`}
                    />
                    <div className="font-['DM_Mono',monospace] text-[13px] font-medium text-[#7A7570] min-w-[44px] pt-0.5">
                      {event.time}
                    </div>
                    <div>
                      <div className="text-sm font-medium">
                        {event.name}
                      </div>
                      {event.desc && (
                        <div className="text-xs text-[#7A7570] mt-0.5">
                          {event.desc}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sobota */}
            <div className="relative bg-white border-4 border-[#AED581] rounded-[24px] shadow-[6px_6px_0px_0px_rgba(174,213,129,0.4)] p-6">
              <div className="absolute -top-3 -left-3">
                <svg width="50" height="50" viewBox="0 0 50 50">
                  <circle cx="25" cy="25" r="18" stroke="#9CCC65" strokeWidth="3" fill="none"/>
                  <path d="M25,10 L25,25 L35,25" stroke="#9CCC65" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="text-[12px] font-black tracking-[0.08em] uppercase text-[#558B2F] mb-4 flex items-center gap-2">
                🌅 Sobota — plan dnia
              </div>
              <div className="relative pl-5">
                <div className="absolute left-[7px] top-2 bottom-2 w-px bg-[#E2DDD5]"></div>
                {[
                  {
                    time: "09:00",
                    name: "Śniadanie",
                    desc: "Wspólny posiłek",
                    dot: "bg-[#FFA000]",
                  },
                  {
                    time: "10:00",
                    name: "Spacer",
                    desc: "Zwiedzanie okolicy",
                    dot: "bg-[#66BB6A]",
                  },
                  {
                    time: "12:00",
                    name: "Wyjazd",
                    desc: "Powrót do Warszawy",
                    dot: "bg-[#00ACC1]",
                  },
                ].map((event) => (
                  <div
                    key={event.time}
                    className="flex gap-4 py-2.5 relative"
                  >
                    <div
                      className={`absolute -left-5 top-[15px] w-2.5 h-2.5 rounded-full border-2 border-white ${event.dot}`}
                    />
                    <div className="font-['DM_Mono',monospace] text-[13px] font-medium text-[#7A7570] min-w-[44px] pt-0.5">
                      {event.time}
                    </div>
                    <div>
                      <div className="text-sm font-medium">
                        {event.name}
                      </div>
                      {event.desc && (
                        <div className="text-xs text-[#7A7570] mt-0.5">
                          {event.desc}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Zrzutka Section */}
        {activeTab === "zrzutka" && (
          <>
            <div className="relative bg-white border-4 border-[#AED581] rounded-[24px] shadow-[6px_6px_0px_0px_rgba(174,213,129,0.4)] p-6 mb-5">
              <div className="absolute -top-3 -right-3">
                <svg width="50" height="50" viewBox="0 0 50 50">
                  <circle cx="25" cy="25" r="18" stroke="#9CCC65" strokeWidth="3" fill="none"/>
                  <text x="25" y="32" fontSize="20" fill="#689F38" textAnchor="middle" fontWeight="bold">💰</text>
                </svg>
              </div>
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="bg-gradient-to-br from-[#E1BEE7] to-[#CE93D8] rounded-2xl p-4 text-center border-3 border-[#AB47BC] shadow-md">
                  <div className="text-[24px] font-black tracking-tight text-[#1A1A1A]">
                    {total}
                  </div>
                  <div className="text-[11px] text-[#4A148C] mt-1 font-bold uppercase">
                    zł łącznie
                  </div>
                </div>
                <div className="bg-gradient-to-br from-[#B2EBF2] to-[#80DEEA] rounded-2xl p-4 text-center border-3 border-[#00ACC1] shadow-md">
                  <div className="text-[24px] font-black tracking-tight text-[#1A1A1A]">
                    {perPerson}
                  </div>
                  <div className="text-[11px] text-[#006064] mt-1 font-bold uppercase">
                    zł / osoba
                  </div>
                </div>
                <div className="bg-gradient-to-br from-[#C5E1A5] to-[#AED581] rounded-2xl p-4 text-center border-3 border-[#9CCC65] shadow-md">
                  <div className="text-[24px] font-black tracking-tight text-[#1A1A1A]">
                    {paidCount} / {people.length}
                  </div>
                  <div className="text-[11px] text-[#33691E] mt-1 font-bold uppercase">
                    opłacone
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

            <div className="relative bg-white border-4 border-[#FFCCBC] rounded-[24px] shadow-[6px_6px_0px_0px_rgba(255,204,188,0.4)] p-6 mb-5">
              <div className="absolute -top-3 -left-3">
                <svg width="40" height="40" viewBox="0 0 40 40">
                  <path d="M8,20 Q20,8 32,20 Q20,32 8,20" stroke="#FF7043" strokeWidth="3" fill="none"/>
                </svg>
              </div>
              <div className="text-[12px] font-black tracking-[0.08em] uppercase text-[#D84315] mb-4 flex items-center gap-2">
                💵 Podział kosztów
              </div>
              {[
                {
                  name: "Nocleg",
                  amount: "480 zł",
                },
                { name: "Grill & mięso", amount: "160 zł" },
                { name: "Alko & napoje", amount: "120 zł" },
                { name: "Paliwo (2 auta)", amount: "60 zł" },
                totalShoppingCost > 0 && {
                  name: "Zakupy",
                  amount: `${totalShoppingCost} zł`,
                },
                {
                  name: "Łącznie",
                  amount: `${total} zł`,
                  total: true,
                },
              ].filter(Boolean).map((row: any, i, arr) => (
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

            {Object.keys(shoppingCosts).length > 0 && (
              <div className="relative bg-white border-4 border-[#FFE082] rounded-[24px] shadow-[6px_6px_0px_0px_rgba(255,224,130,0.4)] p-6 mb-5">
                <div className="text-[12px] font-black tracking-[0.08em] uppercase text-[#F57C00] mb-4 flex items-center gap-2">
                  🛍️ Kto zapłacił za zakupy
                </div>
                {Object.entries(shoppingCosts).map(([personIdx, cost]) => (
                  <div
                    key={personIdx}
                    className="flex justify-between items-center py-2.5 border-b border-[#E2DDD5] last:border-b-0 text-sm"
                  >
                    <span>{people[Number(personIdx)]?.name}</span>
                    <span className="font-['DM_Mono',monospace] text-[13px]">
                      {cost} zł
                    </span>
                  </div>
                ))}
              </div>
            )}

            <div className="relative bg-white border-4 border-[#C5E1A5] rounded-[24px] shadow-[6px_6px_0px_0px_rgba(197,225,165,0.4)] p-6 mb-5">
              <div className="absolute -top-3 -right-3">
                <svg width="45" height="45" viewBox="0 0 45 45">
                  <circle cx="22" cy="22" r="15" stroke="#9CCC65" strokeWidth="3" fill="none" strokeDasharray="3,3"/>
                  <path d="M15,22 L20,27 L30,17" stroke="#689F38" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="text-[12px] font-black tracking-[0.08em] uppercase text-[#558B2F] mb-1">
                💳 Status wpłat — {perPerson} zł / os. &nbsp;
                <span className="text-[11px] text-[#689F38] font-semibold">
                  (kliknij aby zmienić)
                </span>
              </div>
              <div className="mt-4">
                {people.map((person, i) => {
                  const personPaid = shoppingCosts[i] || 0;
                  const shouldPay = perPerson - personPaid;
                  return (
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
                        {personPaid > 0 && (
                          <div className="text-xs text-[#7A7570] mt-0.5">
                            Zapłacono: {personPaid} zł · Do wpłaty: {shouldPay} zł
                          </div>
                        )}
                      </div>
                      <span
                        className={`text-[12px] font-bold px-3 py-1.5 rounded-full border-2 flex-shrink-0 shadow-sm ${
                          payStatus[i]
                            ? "bg-gradient-to-r from-[#E8F5E9] to-[#C8E6C9] text-[#2E7D32] border-[#A5D6A7]"
                            : "bg-gradient-to-r from-[#FFF9E6] to-[#FFECB3] text-[#F57C00] border-[#FFE082]"
                        }`}
                      >
                        {payStatus[i] ? "✓ Opłacone" : "⏳ Do zapłaty"}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="relative bg-white border-4 border-[#B2EBF2] rounded-[24px] shadow-[6px_6px_0px_0px_rgba(178,235,242,0.4)] p-6">
              <div className="absolute -top-3 -left-3">
                <svg width="45" height="45" viewBox="0 0 45 45">
                  <rect x="8" y="15" width="30" height="20" rx="3" stroke="#00ACC1" strokeWidth="3" fill="none"/>
                  <line x1="8" y1="22" x2="38" y2="22" stroke="#00ACC1" strokeWidth="2"/>
                  <circle cx="15" cy="28" r="2" fill="#00ACC1"/>
                </svg>
              </div>
              <div className="text-[12px] font-black tracking-[0.08em] uppercase text-[#00838F] mb-4 flex items-center gap-2">
                🏦 Numer do przelewu
              </div>
              {[
                {
                  label: "Zbiera",
                  value: people[0]?.name || "Tomek",
                  bold: true,
                },
                {
                  label: "Konto",
                  value: "PL 12 3456 7890 1234 5678 9012 3456",
                  mono: true,
                },
                { label: "Tytuł", value: "Workation Żulin 2025" },
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

      </div>
    </div>
  );
}