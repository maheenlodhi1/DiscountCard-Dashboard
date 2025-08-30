import { useMemo } from "react";
import Selectbox from "../Selectbox";

export default function SelectInput({
  name,
  value,
  items,
  disabled,
  onChange,
  ...props
}) {
  const defaultIndex = useMemo(
    () =>
      items.findIndex(
        (item) => item.value.toLowerCase() === value?.value?.toLowerCase()
      ) || 0,
    [items, value]
  );

  return (
    <Selectbox
      {...props}
      defaultIndex={defaultIndex}
      items={items}
      disabled={disabled}
      onSelect={(selected) =>
        onChange({ target: { name: name, value: selected } })
      }
    />
  );
}
