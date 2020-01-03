import React from "react";

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <a className="navbar-brand" href="/">
        Google Books
      </a>
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <a href="/" className="nav-link"> Search </a>
        </li>
        <li className="nav-item">
          <a href="/books" className="nav-link"> Saved </a>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
