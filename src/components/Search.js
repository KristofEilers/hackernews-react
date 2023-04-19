import { useState } from "react";

export default function Search() {
    const [query, setQuery] = useState([])
    const [inputValue, setInputValue] = useState("");

    console.log(inputValue);

    return (
        <div>
            <form>
                <input type="text" placeholder="Search..." />
                <button>Search...</button>
            </form>
        </div>
    )
}