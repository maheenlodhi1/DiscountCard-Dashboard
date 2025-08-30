import {
  APIProvider,
  AdvancedMarker,
  Map,
  useMap,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";
import { useCallback, useEffect, useRef, useState } from "react";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
// London
const DEFAULT_CENTER = { lat: 51.507351, lng: -0.127758 };

export function GoogleMaps({
  disabled,
  onSelect,
  defaultPosition,
  defaultAddress,
}) {
  const [position, setPosition] = useState(defaultPosition || DEFAULT_CENTER);
  const [address, setAddress] = useState(defaultAddress || "");
  const [selectedPlace, setSelectedPlace] = useState(null);

  const isUKPlace = (place) => {
    const comps = place?.address_components || [];
    const country = comps.find((c) => c.types.includes("country"));
    return country?.short_name === "GB";
  };

  const handleMapClick = (e) => {
    if (disabled) return;
    // We'll let ReverseGeocode validate GB before finalizing selection
    const { latLng } = e.detail;
    setPosition(latLng);
  };

  const handlePlaceMarker = useCallback(
    (place) => {
      if (!place?.formatted_address) return;
      // enforce UK only
      if (!isUKPlace(place)) return;
      setAddress(place.formatted_address);
      setSelectedPlace(place);
      onSelect?.(place);
    },
    [onSelect]
  );

  const handlePlaceSelect = useCallback(
    (place) => {
      if (!place?.formatted_address) return;
      if (!isUKPlace(place)) return;
      const latLng = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };
      if (latLng.lat === position.lat && latLng.lng === position.lng) return;
      setPosition(latLng);
      handlePlaceMarker(place);
    },
    [position, handlePlaceMarker]
  );

  return (
    <APIProvider
      apiKey={API_KEY}
      region="GB" // bias to UK
      language="en-GB" // UK English
    >
      <Map
        mapId="offer-location-map"
        defaultCenter={position}
        defaultZoom={10}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
        className="w-full h-96"
        onClick={handleMapClick}
      >
        <AdvancedMarker position={position} />
      </Map>
      <ReverseGeocode position={position} onPlaceMarker={handlePlaceMarker} />
      <AutoComplete
        defaultAddress={address}
        onInputChange={setAddress}
        disabled={disabled}
        onPlaceSelect={handlePlaceSelect}
      />
      <MapHandler place={selectedPlace} />
    </APIProvider>
  );
}

function AutoComplete({
  disabled,
  onPlaceSelect,
  defaultAddress,
  onInputChange,
}) {
  const [placeAutoComplete, setPlaceAutoComplete] = useState(null);
  const inputRef = useRef(null);
  const places = useMapsLibrary("places");

  useEffect(() => {
    if (!places || !inputRef.current) return;
    const options = {
      fields: ["geometry", "name", "formatted_address", "address_components"],
      componentRestrictions: { country: ["gb"] }, // UK only
    };
    setPlaceAutoComplete(new places.Autocomplete(inputRef.current, options));
  }, [places]);

  useEffect(() => {
    if (!placeAutoComplete) return;
    placeAutoComplete.addListener("place_changed", () => {
      onPlaceSelect(placeAutoComplete.getPlace());
    });
  }, [placeAutoComplete, onPlaceSelect]);

  return (
    <div className="autocomplete-container absolute top-10 left-1/2 w-1/2 -translate-x-1/2 ">
      <input
        value={defaultAddress}
        onChange={(e) => onInputChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") e.preventDefault();
        }}
        disabled={disabled}
        className="bg-white w-full z-10 px-4 py-1.5 rounded focus:outline-primary shadow"
        ref={inputRef}
        placeholder="Search UK addresses"
      />
    </div>
  );
}

function ReverseGeocode({ position, onPlaceMarker }) {
  const geocoderLib = useMapsLibrary("geocoding");

  useEffect(() => {
    if (!geocoderLib || !position) return;

    const run = async () => {
      try {
        const geocoder = new geocoderLib.Geocoder();
        // region bias to UK; results still validated in onPlaceMarker
        const res = await geocoder.geocode({
          location: position,
          region: "uk",
        });
        if (res.results?.[0]) onPlaceMarker(res.results[0]);
      } catch (err) {
        console.log(err);
      }
    };
    run();
  }, [geocoderLib, position, onPlaceMarker]);

  return null;
}

const MapHandler = ({ place }) => {
  const map = useMap();

  useEffect(() => {
    if (!map || !place) return;
    if (place.geometry?.viewport) {
      map.fitBounds(place.geometry.viewport);
    }
  }, [map, place]);

  return null;
};
