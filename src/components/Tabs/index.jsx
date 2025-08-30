import { classNames } from "@/utils/generics";
import { useState } from "react";

export default function Tabs({ tabs, onSelect }) {
  const [selected, setSelected] = useState(tabs[0]);

  const handleChange = (tab) => {
    setSelected(tab);
    onSelect(tab);
  };

  return (
    <div className="flex items-center gap-x-1 bg-white rounded shadow p-1">
      {tabs.map((tab, index) => (
        <button
          key={index}
          onClick={() => handleChange(tab)}
          type="button"
          className={classNames(
            "px-4 py-1 rounded",
            selected.value === tab.value
              ? "bg-primary shadow text-white"
              : "bg-transparent hover:bg-gray-100"
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
