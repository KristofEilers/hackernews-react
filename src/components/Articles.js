import { useEffect, useState } from "react";
import { format } from "date-fns"

export default function Articles () {

    const [articles, setArticles] = useState([]);

    

//IDEE ZUGRIFF AUF QUERY:
    // const [query, setQuery] = useState("")
        // setQuery in die URL nach "query= " einbauen, um nach einem neuen Wort zu suchen
        // setQuery sollte gleich dem e.target.value vom Inputfeld sein
            // Inputfeld sowie Seachbutton auf extra Component? 
            // Dabei darauf achten, dass die jeweiligen Props weitergegeben werden
                // onClick sollte Funktion enthalten, die den Value auf die Query setzt o.ä.




    //1. Mit Fetch
    useEffect(() => {
      //hier geht der Fetch los
      fetch("http://hn.algolia.com/api/v1/search?query=javascript&hitsPerPage=50")
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

    // Checken, welcher Datentyp zurückgegeben wird in der Konsole

    return(
        <div>
            <h1>JS Articles</h1>
            {articles.length 
            ? articles.map((article)=> {
                return <li><a href ={article.url} target="_blank">{article.title}</a></li>;
            })
            : "...loading" }
        </div>
    )
}


