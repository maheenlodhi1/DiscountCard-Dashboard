import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function Searchbar({placeholder, search, setSearch, handleSearch }) {
  return (
    <form
      className="relative flex flex-1"
      onSubmit={(e) => {
        e.preventDefault();
        handleSearch();
      }}
      method="GET"
    >
      <label htmlFor="search-field" className="sr-only">
        Search
      </label>
      <MagnifyingGlassIcon
        className="pointer-events-none absolute inset-y-0 left-2 h-full w-5 text-gray-400"
        aria-hidden="true"
      />
      <input
        id="search-field"
        className="block w-full rounded-md border-0 py-1.5 pl-8 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary text-sm sm:leading-6 "
        placeholder={placeholder ? placeholder : "Search..."}
        type="search"
        name="search"
        value={search}
        onChange={(e) => {
          e.preventDefault();
          setSearch(e.target.value);
        }}
      />
      {search && (
        <button
          type="button"
          onClick={handleSearch}
          className="rounded-md ml-2 font-medium text-white py-1.5 px-2 bg-primary-light hover:bg-primary"
        >
          Search
        </button>
      )}
    </form>
  );
}
