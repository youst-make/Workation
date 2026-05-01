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

interface Expense {
  name: string;
  amount: number;
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
  date: "10 lipca 2026",
  location: "Żulin",
  venue: "",
  venueAddress: "Żulin 1",
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

  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const saved = localStorage.getItem('wk2_expenses');
    return saved ? JSON.parse(saved) : [
      { name: "Nocleg", amount: 480 },
      { name: "Grill & mięso", amount: 160 },
      { name: "Alko & napoje", amount: 120 },
      { name: "Paliwo (2 auta)", amount: 60 },
    ];
  });

  const [newExpenseName, setNewExpenseName] = useState('');
  const [newExpenseAmount, setNewExpenseAmount] = useState('');
  const [editingExpense, setEditingExpense] = useState<number | null>(null);

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

  useEffect(() => {
    localStorage.setItem('wk2_expenses', JSON.stringify(expenses));
  }, [expenses]);

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

  const addExpense = () => {
    if (!newExpenseName.trim() || !newExpenseAmount) return;
    setExpenses((prev) => [
      ...prev,
      { name: newExpenseName, amount: parseFloat(newExpenseAmount) || 0 },
    ]);
    setNewExpenseName('');
    setNewExpenseAmount('');
  };

  const updateExpense = (index: number, field: keyof Expense, value: string | number) => {
    setExpenses(prev =>
      prev.map((expense, i) =>
        i === index ? { ...expense, [field]: value } : expense
      )
    );
  };

  const removeExpense = (index: number) => {
    setExpenses(prev => prev.filter((_, i) => i !== index));
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
  const baseTotal = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const total = baseTotal + totalShoppingCost;
  const perPerson = Math.ceil(total / people.length);
  const paidCount = payStatus.filter(Boolean).length;
  const collected = paidCount * perPerson;

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
            ].filter(Boolean).map((chip) => (
              <div
                key={chip.text}
                className="text-[12px] font-medium bg-[#F8F9FE] border border-[#E8E9F1] rounded-[8px] px-3 py-1.5 text-[#1F2024]"
              >
                <span className="mr-1.5">{chip.emoji}</span>
                {chip.text}
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex gap-2 flex-wrap mb-4">
          {[
            { id: "plan" as TabType, label: "📋 Plan dnia" },
            { id: "transport" as TabType, label: "🚗 Transport" },
            { id: "zrzutka" as TabType, label: "💸 Zrzutka" },
            { id: "zakupy" as TabType, label: "🛒 Zakupy" },
            { id: "rzeczy" as TabType, label: "🎒 Co zabrać" },
            { id: "nocleg" as TabType, label: "🏡 Nocleg" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`text-[12px] font-semibold px-4 py-2.5 rounded-[12px] transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-[#006FFD] text-white shadow-sm"
                  : "bg-white text-[#71727A] border border-[#E8E9F1] hover:border-[#006FFD] hover:text-[#006FFD]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

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
                            className="text-sm px-2 py-1 border border-[#E8E9F1] rounded bg-white"
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
                              className="text-xs px-2 py-1 border border-[#C5C6CC] rounded-[8px] bg-white flex-1"
                            />
                            <input
                              type="text"
                              value={driver.departureTime}
                              onChange={(e) => updateDriver(driverIdx, 'departureTime', e.target.value)}
                              placeholder="Godz."
                              className="text-xs px-2 py-1 border border-[#C5C6CC] rounded-[8px] bg-white w-16"
                            />
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="text-sm font-medium">
                            {people[driver.personIndex]?.name || 'Nieznany'}
                          </div>
                          <div className="text-xs text-[#71727A] mt-0.5">
                            wyjazd {driver.departureLocation} {driver.departureTime}
                          </div>
                        </>
                      )}
                    </div>
                    <button
                      onClick={() => setEditingDriver(editingDriver === driverIdx ? null : driverIdx)}
                      className="text-[12px] font-semibold px-3 py-2 rounded-[8px] bg-[#006FFD] text-white flex-shrink-0 hover:bg-[#2897FF] transition-colors"
                    >
                      {editingDriver === driverIdx ? 'Zapisz' : 'Edytuj'}
                    </button>
                  </div>

                  {driver.passengers.map((passengerIdx, i) => (
                    <div key={i} className={`flex items-center gap-3 py-2.5 pl-[46px] border-b border-[#E8E9F1]`}>
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-semibold tracking-tight flex-shrink-0 ${getAvatarClass(people[passengerIdx]?.av || 'av-2')}`}
                      >
                        {people[passengerIdx]?.init || '?'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium">
                          {people[passengerIdx]?.name || 'Nieznany'}
                        </div>
                        <div className="text-xs text-[#71727A] mt-0.5">
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
                      className="flex-1 text-xs px-2 py-1 border border-[#C5C6CC] rounded-[8px] bg-[#F8F9FE]"
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
                      ? "border-b border-[#E8E9F1]"
                      : ""
                  }`}
                >
                  <span className="text-[#71727A] text-[13px] flex-shrink-0">
                    {row.label}
                  </span>
                  <span
                    className={`text-right ${row.bold ? "font-medium" : ""} ${
                      row.mono
                        ? "font-['Inter',sans-serif] font-medium text-[13px]"
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
            <div className="bg-white rounded-[12px] shadow-sm p-5 mb-3">
              <div className="text-[10px] font-semibold tracking-[0.8px] uppercase text-[#8F9098] mb-4">
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
                      ? "border-b border-[#E8E9F1]"
                      : ""
                  }`}
                >
                  <span className="text-[#71727A] text-[13px] flex-shrink-0">
                    {row.label}
                  </span>
                  <span className="text-right">
                    {row.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-[12px] shadow-sm p-5">
              <div className="text-[10px] font-semibold tracking-[0.8px] uppercase text-[#8F9098] mb-4">
                ✨ Udogodnienia
              </div>
              <div className="flex flex-wrap gap-2">
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
                    className="text-[12px] font-medium px-3 py-1.5 rounded-[8px] bg-[#EAF2FF] text-[#006FFD] border border-[#B4DBFF]"
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
            <div className="bg-white rounded-[12px] shadow-sm p-5 mb-3">
              <div className="text-[10px] font-semibold tracking-[0.8px] uppercase text-[#8F9098] mb-4">
                🛒 Do kupienia
              </div>
              <div>
                {shopItems.filter(item => !item.done).map((item, originalIndex) => {
                  const actualIndex = shopItems.findIndex(x => x === item);
                  return (
                    <div
                      key={actualIndex}
                      className="flex items-center gap-2.5 py-2.5 border-b border-[#E8E9F1] last:border-b-0"
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
                          <div className="text-xs text-[#71727A] mt-0.5">{item.cost} zł</div>
                        )}
                      </div>
                      <select
                        value={item.who}
                        onChange={(e) => updateShopPerson(actualIndex, e.target.value)}
                        className="text-xs px-2 py-1 border border-[#C5C6CC] rounded-[8px] bg-[#F8F9FE] text-[#71727A] flex-shrink-0"
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
                        className="w-20 text-xs px-2 py-1 border border-[#C5C6CC] rounded-[8px] bg-white text-[#1F2024]"
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
                  className="flex-1 min-w-[120px] text-sm px-3 py-2.5 border border-[#C5C6CC] rounded-[12px] bg-white text-[#1F2024] outline-none focus:border-[#006FFD] transition-all"
                />
                <input
                  type="number"
                  value={shopCost}
                  onChange={(e) => setShopCost(e.target.value)}
                  onKeyPress={(e) =>
                    e.key === "Enter" && addShopItem()
                  }
                  placeholder="Koszt (zł)"
                  className="w-24 text-sm px-3 py-2.5 border border-[#C5C6CC] rounded-[12px] bg-white text-[#1F2024] outline-none focus:border-[#006FFD] transition-all"
                />
                <select
                  value={shopWho}
                  onChange={(e) => setShopWho(e.target.value)}
                  className="text-[13px] px-2.5 py-2.5 border border-[#C5C6CC] rounded-[12px] bg-white text-[#1F2024] cursor-pointer hover:border-[#006FFD] transition-all"
                >
                  {people.map((p) => (
                    <option key={p.name}>{p.name}</option>
                  ))}
                </select>
                <button
                  onClick={addShopItem}
                  className="text-[12px] font-semibold px-4 py-2.5 rounded-[12px] bg-[#006FFD] text-white cursor-pointer hover:bg-[#2897FF] transition-colors whitespace-nowrap"
                >
                  Dodaj
                </button>
              </div>
            </div>

            {shopItems.filter(item => item.done).length > 0 && (
              <div className="bg-white rounded-[12px] shadow-sm p-5">
                <div className="text-[10px] font-semibold tracking-[0.8px] uppercase text-[#8F9098] mb-4">
                  ✓ Kupione
                </div>
                <div>
                  {shopItems.filter(item => item.done).map((item, originalIndex) => {
                    const actualIndex = shopItems.findIndex(x => x === item);
                    return (
                      <div
                        key={actualIndex}
                        className="flex items-center gap-2.5 py-2.5 border-b border-[#E8E9F1] last:border-b-0"
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
                          className="text-xs px-2 py-1 border border-[#E8E9F1] rounded bg-[#F8F9FE] text-[#B0ABA4] flex-shrink-0"
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
                          className="w-20 text-xs px-2 py-1 border border-[#C5C6CC] rounded-[8px] bg-white text-[#B0ABA4]"
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
          <div className="grid md:grid-cols-2 gap-3">
            <div className="bg-white rounded-[12px] shadow-sm p-5">
              <div className="text-[10px] font-semibold tracking-[0.8px] uppercase text-[#8F9098] mb-4">
                🎮 Gry & gadżety
              </div>
              <div>
                {gearItems.map((item, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-2.5 py-2.5 ${
                      i < gearItems.length - 1
                        ? "border-b border-[#E8E9F1]"
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
                    className={`flex items-center gap-2.5 py-2.5 ${
                      i < personalItems.length - 1
                        ? "border-b border-[#E8E9F1]"
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
                  {
                    time: "08:30",
                    name: "Zbiórka i wyjazd",
                    desc: "Wyjazd z Warszawy",
                    dot: "bg-[#006FFD]",
                  },
                  {
                    time: "10:00",
                    name: "Praca zdalna",
                    desc: "Skupienie i produktywność",
                    dot: "bg-[#2897FF]",
                  },
                  {
                    time: "16:00",
                    name: "Koniec pracy",
                    desc: "Czas na relaks",
                    dot: "bg-[#3AC0A0]",
                  },
                  {
                    time: "16:15",
                    name: "Obiad",
                    desc: "Wspólny posiłek",
                    dot: "bg-[#FFB37C]",
                  },
                  {
                    time: "18:00",
                    name: "Gry planszowe / Gry terenowe / Spacery",
                    desc: "Aktywności integracyjne",
                    dot: "bg-[#6FBAFF]",
                  },
                  {
                    time: "20:00",
                    name: "Ognisko / Grill",
                    desc: "Kolacja przy ognisku",
                    dot: "bg-[#FF616D]",
                  },
                  {
                    time: "22:00",
                    name: "Opowieści o duchach",
                    desc: "Straszne historie",
                    dot: "bg-[#71727A]",
                  },
                ].map((event) => (
                  <div
                    key={event.time}
                    className="flex gap-4 py-2.5 relative"
                  >
                    <div
                      className={`absolute -left-5 top-[15px] w-2.5 h-2.5 rounded-full border-2 border-white ${event.dot}`}
                    />
                    <div className="font-['Inter',sans-serif] font-medium text-[13px] font-medium text-[#71727A] min-w-[44px] pt-0.5">
                      {event.time}
                    </div>
                    <div>
                      <div className="text-sm font-medium">
                        {event.name}
                      </div>
                      {event.desc && (
                        <div className="text-xs text-[#71727A] mt-0.5">
                          {event.desc}
                        </div>
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
                  {
                    time: "09:00",
                    name: "Śniadanie",
                    desc: "Wspólny posiłek",
                    dot: "bg-[#FFB37C]",
                  },
                  {
                    time: "10:00",
                    name: "Spacer",
                    desc: "Zwiedzanie okolicy",
                    dot: "bg-[#3AC0A0]",
                  },
                  {
                    time: "12:00",
                    name: "Wyjazd",
                    desc: "Powrót do Warszawy",
                    dot: "bg-[#006FFD]",
                  },
                ].map((event) => (
                  <div
                    key={event.time}
                    className="flex gap-4 py-2.5 relative"
                  >
                    <div
                      className={`absolute -left-5 top-[15px] w-2.5 h-2.5 rounded-full border-2 border-white ${event.dot}`}
                    />
                    <div className="font-['Inter',sans-serif] font-medium text-[13px] font-medium text-[#71727A] min-w-[44px] pt-0.5">
                      {event.time}
                    </div>
                    <div>
                      <div className="text-sm font-medium">
                        {event.name}
                      </div>
                      {event.desc && (
                        <div className="text-xs text-[#71727A] mt-0.5">
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
            <div className="bg-white rounded-[12px] shadow-sm p-5 mb-3">
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="bg-[#EAF2FF] rounded-[12px] p-4 text-center border border-[#B4DBFF]">
                  <div className="text-[20px] font-extrabold tracking-[0.2px] text-[#1F2024]">
                    {total}
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
                <div className="text-[12px] text-[#71727A] mb-2 font-normal">
                  Zebrano środki
                </div>
                <div className="h-[8px] bg-[#E8E9F1] rounded-[4px] overflow-hidden">
                  <div
                    className="h-full bg-[#006FFD] rounded-[4px] transition-all duration-400"
                    style={{
                      width: `${Math.round((collected / total) * 100)}%`,
                    }}
                  />
                </div>
                <div className="text-[12px] text-[#71727A] mt-2 font-normal">
                  {collected} / {total} zł
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[12px] shadow-sm p-5 mb-3">
              <div className="text-[10px] font-semibold tracking-[0.8px] uppercase text-[#8F9098] mb-4">
                💵 Podział kosztów
              </div>
              <div>
                {expenses.map((expense, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 py-2.5 border-b border-[#E8E9F1]"
                  >
                    {editingExpense === i ? (
                      <>
                        <input
                          type="text"
                          value={expense.name}
                          onChange={(e) => updateExpense(i, 'name', e.target.value)}
                          className="flex-1 text-sm px-2 py-1 border border-[#C5C6CC] rounded-[8px] bg-white text-[#1F2024]"
                        />
                        <input
                          type="number"
                          value={expense.amount}
                          onChange={(e) => updateExpense(i, 'amount', parseFloat(e.target.value) || 0)}
                          className="w-20 text-sm px-2 py-1 border border-[#C5C6CC] rounded-[8px] bg-white text-[#1F2024]"
                        />
                        <button
                          onClick={() => setEditingExpense(null)}
                          className="text-[12px] font-semibold px-3 py-1.5 rounded-[8px] bg-[#006FFD] text-white hover:bg-[#2897FF] transition-colors"
                        >
                          Zapisz
                        </button>
                      </>
                    ) : (
                      <>
                        <span className="flex-1 text-sm text-[#1F2024]">{expense.name}</span>
                        <span className="text-sm font-semibold text-[#1F2024] min-w-[60px] text-right">{expense.amount} zł</span>
                        <button
                          onClick={() => setEditingExpense(i)}
                          className="text-xs px-2 py-1 border border-[#C5C6CC] rounded-[8px] bg-white text-[#71727A] hover:border-[#006FFD] hover:text-[#006FFD] transition-colors"
                        >
                          Edytuj
                        </button>
                        <button
                          onClick={() => removeExpense(i)}
                          className="text-lg text-[#FF0000] hover:text-[#CC0000] hover:scale-125 transition-all"
                        >
                          ✕
                        </button>
                      </>
                    )}
                  </div>
                ))}

                {/* Dodaj nowy wydatek */}
                <div className="flex gap-2 mt-3">
                  <input
                    type="text"
                    value={newExpenseName}
                    onChange={(e) => setNewExpenseName(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addExpense()}
                    placeholder="Nazwa wydatku..."
                    className="flex-1 text-sm px-3 py-2 border border-[#C5C6CC] rounded-[12px] bg-white text-[#1F2024] outline-none focus:border-[#006FFD] transition-all"
                  />
                  <input
                    type="number"
                    value={newExpenseAmount}
                    onChange={(e) => setNewExpenseAmount(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addExpense()}
                    placeholder="Kwota (zł)"
                    className="w-24 text-sm px-3 py-2 border border-[#C5C6CC] rounded-[12px] bg-white text-[#1F2024] outline-none focus:border-[#006FFD] transition-all"
                  />
                  <button
                    onClick={addExpense}
                    className="text-[12px] font-semibold px-4 py-2.5 rounded-[12px] bg-[#006FFD] text-white hover:bg-[#2897FF] transition-colors whitespace-nowrap"
                  >
                    Dodaj
                  </button>
                </div>

                {/* Zakupy (jeśli są) */}
                {totalShoppingCost > 0 && (
                  <div className="flex justify-between items-center py-2.5 border-t border-[#E8E9F1] mt-3">
                    <span className="text-sm text-[#1F2024]">Zakupy</span>
                    <span className="text-sm font-semibold text-[#1F2024]">{totalShoppingCost} zł</span>
                  </div>
                )}

                {/* Suma całkowita */}
                <div className="flex justify-between items-center py-3 border-t-2 border-[#1F2024] mt-3">
                  <span className="text-base font-extrabold text-[#1F2024]">Łącznie</span>
                  <span className="text-base font-extrabold text-[#1F2024]">{total} zł</span>
                </div>
              </div>
            </div>

            {Object.keys(shoppingCosts).length > 0 && (
              <div className="bg-white rounded-[12px] shadow-sm p-5 mb-3">
                <div className="text-[10px] font-semibold tracking-[0.8px] uppercase text-[#8F9098] mb-4">
                  🛍️ Kto zapłacił za zakupy
                </div>
                {Object.entries(shoppingCosts).map(([personIdx, cost]) => (
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
              <div className="text-[12px] text-[#71727A] mb-3">
                (kliknij aby zmienić)
              </div>
              <div className="mt-4">
                {people.map((person, i) => {
                  const personPaid = shoppingCosts[i] || 0;
                  const shouldPay = perPerson - personPaid;
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
                        <div className="text-sm font-medium">
                          {person.name}
                        </div>
                        {personPaid > 0 && (
                          <div className="text-xs text-[#71727A] mt-0.5">
                            Zapłacono: {personPaid} zł · Do wpłaty: {shouldPay} zł
                          </div>
                        )}
                      </div>
                      <span
                        className={`text-[12px] font-medium px-3 py-1.5 rounded-[8px] flex-shrink-0 ${
                          payStatus[i]
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
                { label: "Tytuł", value: "Workation Żulin 2026" },
              ].map((row, i, arr) => (
                <div
                  key={row.label}
                  className={`flex justify-between items-center py-2.5 gap-3 text-sm ${
                    i < arr.length - 1
                      ? "border-b border-[#E8E9F1]"
                      : ""
                  }`}
                >
                  <span className="text-[#71727A] text-[13px] flex-shrink-0">
                    {row.label}
                  </span>
                  <span
                    className={`text-right ${row.bold ? "font-medium" : ""} ${
                      row.mono
                        ? "font-['Inter',sans-serif] font-medium text-[13px]"
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
