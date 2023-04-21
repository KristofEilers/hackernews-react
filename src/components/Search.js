import { useState } from "react";

export default function Search(props) {
  const [inputValue, setInputValue] = useState("");

  // console.log(query + " Ergebnis");

  const addQuery = (event) => {
    event.preventDefault();
    if (inputValue.trim() === "") {
      alert("Your search field is empty!");
      // return;
    }

    props.setQuery(inputValue.trim());
    setInputValue("");
  };

  return (
    <div>
      <form onSubmit={addQuery}>
        <input className ="searchBar"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          type="text"
          placeholder="Search..."
        />
        <button>Search</button>
      </form>
    </div>
  );
}
