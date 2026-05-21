import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cookbook from "./pages/Cookbook";
import RecipeDetail from "./pages/RecipeDetail";

export default function App() {
  return (
    <div className="app-wrapper">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cookbook" element={<Cookbook />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
        </Routes>
      </main>
      <footer className="footer">
        Made with ❤️ by <span>ChefGPT</span> — powered by Gemini AI &amp; MERN Stack
      </footer>
    </div>
  );
}
