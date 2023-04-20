import "./App.css";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import Search from "./components/Search";

function App() {
  const [articles, setArticles] = useState([]);
  const [query, setQuery] = useState("javascript");

  useEffect(() => {
    //hier geht der Fetch los
    fetch(
      `http://hn.algolia.com/api/v1/search/?query=${query}&tags=story&hitsPerPage=50`
    )
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
      <div className="App">
        <h1>Hackernews</h1>
        <Search setQuery={setQuery} />
        <ol>
          {articles.length
            ? articles.map((article) => {
                return (
                  <>
                    <li>
                      <h4>{article.story_title || article.title}</h4>
                      <div className="article-info">
                        <p>
                          Blog article date:{" "}
                          {format(new Date(article.created_at), "dd.MM.yy")}
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
                  </>
                );
              })
            : "...loading"}
        </ol>
      </div>
    </>
  );
}

export default App;
