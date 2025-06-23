import "./styles.css";
import React, { useState, useEffect } from "react";

// Build a Debounced Search Input

// Problem:
// Create a React component that includes a search input.
// When the user types, it should only trigger a "search" (console log)
// after the user stops typing for 500ms.

// Example Behavior:
// Typing hello quickly should only trigger one log after 500ms of
//inactivity.
// If the user pauses mid-typing, it triggers earlier.

async function getData(query: string) {
  const url = `https://openlibrary.org/search.json?q=${query}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const data = await response.json();
    const list = data.docs.map((doc: Object) => {
      return doc;
    });

    return list;
  } catch (error) {
    console.error(error.message);
  }
}

const DebouncedSearchInput = () => {
  const [value, setValue] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!value.trim()) return;

    setLoading(true);
    const timeOutId = setTimeout(async () => {
      const result = await getData(value);

      setResults(result);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timeOutId);
  }, [value]);

  return (
    <div className="input-container">
      <input
        type="search"
        aria-label="Search"
        placeholder="Start typing here"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {loading && "Loading..."}
      <ul>
        {results.map((result, index) => {
          return <li key={index}>{result.title}</li>;
        })}
      </ul>
    </div>
  );
};

const App = () => {
  return (
    <div className="App">
      <DebouncedSearchInput />
    </div>
  );
};

export default App;
