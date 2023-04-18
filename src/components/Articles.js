import { useEffect, useState } from "react";

export default function Articles () {

    const [articles, setArticles] = useState([]);
  
    //1. Mit Fetch
    useEffect(() => {
      //hier geht der Fetch los
      fetch("http://hn.algolia.com/api/v1/search?query=javascript&tags=story")
        .then((res) => {
          if (!res.ok) throw new Error(`Failed because ${res.status}`);
          console.log(res);
          return res.json();
        })
        .then((data) => {
          //WICHTIG: CONSOLE CHECKEN!
          console.log("inside 2nd then:", data);
          // data.hits: Es wird ein Weg gesucht, auf diese data.hits zuzugreifen, damit es im Objektbaum
          setArticles(data.hits);
        })
        .catch((err) => console.log(err));
    }, []);


    return(
        <div>
            <h1>JS Articles</h1>
            {articles.length 
            ? articles.map((article)=> {
                return <li>{article.title}</li>;
            })
            : "...loading" }
        </div>
    )
}


