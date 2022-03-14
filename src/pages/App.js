import "../styles/styles.css";
import { useState } from "react";
import Header from "../components/Header";
import Landing from "./Landing";

export default function App() {
  const [query, setQuery] = useState("");
  return (
    <div className="App">
      <Header setQuery={setQuery} query={query} />
      <Landing query={query} />
    </div>
  );
}
