import { useState } from "react";
export default function Search() {
  const [query, setQuery] = useState([]);
  const [inputValue, setInputValue] = useState("");
  console.log(query + "Ergebnis");

  const addQuery = () => {
    if (inputValue === "") {
      return;
    }

    const newQuery = () => {
      setQuery(inputValue);
    };
    console.log(newQuery);
    setInputValue("");
  };

  return (
    <div>
      <form>
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          type="text"
          placeholder="Search..."
        />
        <button onClick={addQuery}>Search</button>
      </form>
    </div>
  );
}
