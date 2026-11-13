import SearchBox from "./SearchBox";

function Header({ searchTerm, onSearchChange }) {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <h1 className="site-logo">JobBoard</h1>
        <SearchBox value={searchTerm} onChange={onSearchChange} />
      </div>
    </header>
  );
}

export default Header;
