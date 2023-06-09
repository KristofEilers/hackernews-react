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
        <header className="header">
        <h1>Hacker News</h1>
        <Search setQuery={setQuery} />
        </header>
        <ol>
          {articles.length
            ? articles.map((article) => {
                return (
                  <>
                    <li className="list-article">
                      <h4>{article.story_title || article.title}</h4>
                      <div className="article-info">
                        <p className="article-info-author">
                          Author: {article.author}
                        </p>
                        <p className="article-info-date">
                          Article Date:{" "}
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
            : //"...test"} 
            <span class="loader"></span>}
        </ol>
      </div>
    </>
  );
}


export default App;
