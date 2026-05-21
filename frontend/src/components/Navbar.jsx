import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar-brand">
        <span className="brand-text">
          Chef<span>GPT</span>
        </span>
      </NavLink>
      <div className="navbar-links">
        <NavLink
          to="/"
          className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
          end
        >
          Generate
        </NavLink>
        <NavLink
          to="/cookbook"
          className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
        >
          My Cookbook
        </NavLink>
      </div>
    </nav>
  );
}
