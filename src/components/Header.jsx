function Header( {darkMode, setDarkMode}) {
  return (
    <header className="header">
      <div>
      </div>

      <button onClick={() => setDarkMode((preDarkMode) => !preDarkMode)}>
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
    </header>
  );
}

export default Header;