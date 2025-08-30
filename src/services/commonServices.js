export const fetchNationalitiesList = async () => {
  try {
    const res = await fetch(
      "https://restcountries.com/v3.1/all?fields=name,flags",
      {
        cache: "force-cache",
      }
    );

    const countries = await res.json();
    const countriesList =
      countries && countries?.length
        ? countries.map((country) => ({
            value: country.name.common,
            label: country.name.common,
          }))
        : [];
    return countriesList;
  } catch (error) {}
};
