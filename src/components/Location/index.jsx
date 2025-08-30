import { useEffect, useRef } from "react";
import Map from "../Map";

export default function Location({ disabled, name, onChange, value }) {
  const DEFAULT_CENTER = [25.19703, 55.2727229];
  let inputRef = useRef();
  const mapRef = useRef();
  let autoCompleteRef = useRef();

  const onChangeAddress = async () => {
    const place = await autoCompleteRef.current.getPlace();
    const newCenter = [
      place.geometry.location.lat(),
      place.geometry.location.lng(),
    ];
    onChange({
      target: {
        name: name,
        value: [
          {
            address: place.address_components[0].long_name || "",
            coordinates: {
              coordinates: newCenter,
            },
          },
        ],
      },
    });
    mapRef.current.setView(newCenter);
  };

  const options = {
    componentRestrictions: {
      country: "ae",
    },
    fields: ["address_components", "geometry", "icon", "name"],
    types: ["address"],
  };

  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;
    onChange({
      target: {
        name: name,
        value: [
          {
            address: "",
            coordinates: {
              coordinates: [lat, lng],
            },
          },
        ],
      },
    });
  };

  const AddMarkerToMap = ({ position, useMapEvents, Marker }) => {
    useMapEvents({
      click: (e) => handleMapClick(e),
    });
    return position ? <Marker position={position} /> : null;
  };

  useEffect(() => {
    autoCompleteRef.current = new window.google.maps.places.Autocomplete(
      inputRef.current,
      options
    );
    autoCompleteRef.current.addListener("place_changed", () =>
      onChangeAddress()
    );
  }, []);

  return (
    <div>
      <div className="my-2">
        <input
          className="text-field"
          id="search"
          name="search"
          disabled={disabled}
          ref={inputRef}
        />
      </div>
      <Map
        width="1200"
        height={"400"}
        center={value?.[0]?.coordinates?.coordinates || DEFAULT_CENTER}
        zoom={12}
        className="z-0 relative"
        reference={mapRef}
      >
        {({ TileLayer, Marker, Popup, useMapEvents }) => (
          <>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" // attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <AddMarkerToMap
              useMapEvents={useMapEvents}
              Marker={Marker}
              position={value?.[0]?.coordinates?.coordinates || DEFAULT_CENTER}
            >
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </AddMarkerToMap>
          </>
        )}
      </Map>
    </div>
  );
}
