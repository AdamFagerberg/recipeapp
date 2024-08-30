export default function Header() {
  return (
    <header className="header">
      <img src="/CP-Logo 1.png" alt="Logo" className="logo" />
      <nav className="menu">
        <ul>
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#recipes">Recipes</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
