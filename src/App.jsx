import { useState } from "react";
import Jobs from "./components/Jobs";
import Header from "./components/Header";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <Header searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <Jobs searchTerm={searchTerm} />
    </>
  );
}

export default App;
