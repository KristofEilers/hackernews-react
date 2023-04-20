import "./App.css";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import Search from "./components/Search";

function App() {
  const [articles, setArticles] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    //hier geht der Fetch los
    fetch(`http://hn.algolia.com/api/v1/search/?query=${query}&hitsPerPage=50`)
      .then((res) => {
        if (!res.ok) throw new Error(`Failed because ${res.status}`);
        // console.log(res);
        return res.json();
      })
      .then((data) => {
        //WICHTIG: CONSOLE CHECKEN!
        console.log("inside 2nd then:", data);
        setArticles(data.hits);
      })
      .catch((err) => console.log(err));
  }, [query]);
  return (
    <>
      <div>
        <h1>Hackernews</h1>
        <Search setQuery={setQuery} />
        {articles.length
          ? articles.map((article) => {
              return (
                <ol>
                  <li>
                    <h4>{article.story_title || article.title}</h4>
                    <div>
                      <p>
                        Blog article date:{" "}
                        {format(article.created_at_i, "dd.mm.yyyy")}
                      </p>
                      <a
                        href={article.url || article.story_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Read Full Article
                      </a>
                    </div>
                  </li>
                </ol>
              );
            })
          : "...loading"}
      </div>
    </>
  );
}

export default App;
