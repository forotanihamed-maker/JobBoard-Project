function SearchBox({ value, onChange }) {
  return (
    <input
      type="search"
      className="search-box"
      placeholder="Search jobs..."
      aria-label="Search jobs"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export default SearchBox;
