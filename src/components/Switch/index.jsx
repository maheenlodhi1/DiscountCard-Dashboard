import { Switch } from "@headlessui/react";
import { useState } from "react";

export default function ToggleButton({ value, disabled, onToggle }) {
  const [enabled, setEnabled] = useState(value);
  return (
    <Switch
      checked={enabled}
      disabled={disabled}
      onChange={(value) => {
        setEnabled(value);
        onToggle(value);
      }}
      className={`${
        enabled
          ? "bg-primary disabled:bg-gray-300"
          : "disabled:bg-gray-300 bg-gray-500"
      }
    relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
    >
      <span
        aria-hidden="true"
        className={`${enabled ? "translate-x-5" : "translate-x-0"}
      pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
      />
    </Switch>
  );
}
