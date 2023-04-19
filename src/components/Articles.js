import { useState, useEffect } from "react";
import { format } from "date-fns";
export default function Articles() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    //hier geht der Fetch los
    fetch("http://hn.algolia.com/api/v1/search/?query={query}&hitsPerPage=50")
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
  }, []);

  return (
    <div>
      <h1>Hackernews</h1>
      {articles.length
        ? articles.map((article) => {
            return (
              <li>
                <h4>{article.story_title || article.title}</h4>
                <div>
                  <p>{format(article.created_at_i, "dd.mm.yyyy")}</p>
                  <a
                    href={article.url || article.story_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Read Full Article
                  </a>
                </div>
              </li>
            );
          })
        : "...loading"}
    </div>
  );
}
