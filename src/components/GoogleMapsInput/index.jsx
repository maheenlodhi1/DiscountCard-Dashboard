import { useCallback } from "react";
import { GoogleMaps } from "../GoogleMaps";

export function GoogleMapsInput({ disabled, onChange, name, value }) {
  const defaultPosition = !value.length
    ? null
    : {
        lat: value[0].coordinates.coordinates[0],
        lng: value[0].coordinates.coordinates[1],
      };

  const address = !value.length ? null : value[0].address;

  const handleChange = useCallback(
    (place) => {
      const latLng = [
        place.geometry.location.lat(),
        place.geometry.location.lng(),
      ];
      onChange({
        target: {
          name: name,
          value: [
            {
              address: place.formatted_address || "",
              coordinates: {
                coordinates: latLng,
              },
            },
          ],
        },
      });
    },
    [name, onChange]
  );

  return (
    <GoogleMaps
      disabled={disabled}
      defaultAddress={address}
      defaultPosition={defaultPosition}
      onSelect={handleChange}
    />
  );
}
