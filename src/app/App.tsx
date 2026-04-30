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
  { name: "Kiełbaski & karkówka", who: "Tomek", done: false },
  { name: "Pieczywo & bułki", who: "Iza", done: false },
  { name: "Piwo (zgrzewka)", who: "Tomek", done: false },
  { name: "Wino & napoje", who: "Tomek", done: false },
  { name: "Warzywa & sałatki", who: "Marta", done: false },
  { name: "Marshmallows", who: "Justyna", done: false },
  { name: "Podpałka & węgiel", who: "Krzysztof", done: false },
  { name: "Napoje", who: "Marcin", done: false },
];

const DEFAULT_GEAR: GearItem[] = [
  { name: "Talerzyki", who: "Krzysztof", done: false },
  { name: "Warzywa i owoce", who: "Marta", done: false },
  { name: "Codenames", who: "Iza", done: false },
  { name: "Głośnik bluetooth", who: "Marcin", done: false },
  { name: "Przedłużacz", who: "Tomek", done: false },
  { name: "Kijki do marshmallows", who: "Marta", done: false },
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

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>("transport");

  const [people, setPeople] = useState<Person[]>(() => {
    const saved = localStorage.getItem("wk_people");
    return saved ? JSON.parse(saved) : PEOPLE;
  });

  const [shopItems, setShopItems] = useState<ShopItem[]>(() => {
    const saved = localStorage.getItem("wk_shop");
    return saved ? JSON.parse(saved) : DEFAULT_SHOP;
  });

  const [gearItems, setGearItems] = useState<GearItem[]>(() => {
    const saved = localStorage.getItem("wk_gear");
    return saved ? JSON.parse(saved) : DEFAULT_GEAR;
  });

  const [shopInput, setShopInput] = useState("");
  const [shopWho, setShopWho] = useState(people[0]?.name || "");

  useEffect(() => {
    localStorage.setItem("wk_shop", JSON.stringify(shopItems));
  }, [shopItems]);

  const toggleShop = (index: number) => {
    setShopItems((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, done: !item.done } : item
      )
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

  const total = 820;
  const perPerson = 137;
  const paidCount = 3;
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
    <div className="min-h-screen bg-[#F5F2EC] py-6 px-4 pb-20">
      <div className="max-w-[780px] mx-auto">

        {/* NAV */}
        <div className="sticky top-0 z-10 backdrop-blur bg-[#F5F2EC]/80 py-2 mb-4">
          <div className="flex gap-1 flex-wrap">
            {[
              { id: "zakupy" as TabType, label: "🛒 Zakupy" },
              { id: "rzeczy" as TabType, label: "🎒 Rzeczy" },
              { id: "zrzutka" as TabType, label: "💸 Zrzutka" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`text-[13px] px-4 py-2 rounded-full border ${
                  activeTab === tab.id
                    ? "bg-black text-white"
                    : "bg-white border-[#E2DDD5]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* ZAKUPY */}
        {activeTab === "zakupy" && (
          <div className="bg-white p-5 rounded-xl border">
            {shopItems.length === 0 && (
              <div className="text-center text-gray-400 py-6">
                Brak produktów
              </div>
            )}

            {shopItems.map((item, i) => {
              const person = people.find((p) => p.name === item.who);

              return (
                <div
                  key={i}
                  onClick={() => toggleShop(i)}
                  className="flex items-center gap-3 py-2 border-b cursor-pointer hover:bg-[#F9F7F2]"
                >
                  <input
                    type="checkbox"
                    checked={item.done}
                    onChange={() => toggleShop(i)}
                    onClick={(e) => e.stopPropagation()}
                  />

                  <span className={item.done ? "line-through" : ""}>
                    {item.name}
                  </span>

                  {person && (
                    <div
                      className={`ml-auto w-6 h-6 rounded-full flex items-center justify-center text-[10px] ${getAvatarClass(
                        person.av
                      )}`}
                    >
                      {person.init}
                    </div>
                  )}
                </div>
              );
            })}

            <div className="flex gap-2 mt-4">
              <input
                value={shopInput}
                onChange={(e) => setShopInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addShopItem()}
                className="border px-3 py-2 flex-1"
              />
              <button
                onClick={addShopItem}
                className="bg-black text-white px-4"
              >
                Dodaj
              </button>
            </div>
          </div>
        )}

        {/* ZRZUTKA */}
        {activeTab === "zrzutka" && (
          <div className="bg-white p-5 rounded-xl border">
            <div className="mb-3 text-sm">
              {collected >= total
                ? "🎉 Zebrano całość!"
                : `Brakuje ${total - collected} zł`}
            </div>

            <div className="h-2 bg-gray-200 rounded">
              <div
                className="h-full bg-green-600 rounded"
                style={{
                  width: `${Math.min(
                    100,
                    Math.round((collected / total) * 100)
                  )}%`,
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}