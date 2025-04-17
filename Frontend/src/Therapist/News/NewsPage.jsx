import { React } from "react";
import { useState } from "react";
import { useEffect } from "react";
import "./NewsPage.css";

function NewsPage() {
  const [news, setNews] = useState([]);

  const fetchNews = async () => {
    try {
      const cachedNews = localStorage.getItem("cachedNews");
      if (cachedNews) {
        const parsedNews = JSON.parse(cachedNews);
        const fiveHoursAgo = Date.now() - 5 * 60 * 60 * 1000; 
        if (parsedNews.timestamp > fiveHoursAgo) {
          setNews(parsedNews.data);
          return; 
        }
      }

      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/NewsApi`
      );
      if (response.ok) {
        const newNews = await response.json();
        const timestamp = Date.now(); 
        localStorage.setItem(
          "cachedNews",
          JSON.stringify({ data: newNews, timestamp })
        );
        setNews(newNews);
      } else {
        console.error("Failed to fetch news");
      }
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div className="news-page-container">
      <div className="news-page-title">
        <h1>News</h1>
        <p className="news-page-description">
          Here you can find the latest articles related to psychotherapy and
          mental health.
        </p>
      </div>
      <div className="news-page-content">
        <ul>
          {news
            .filter((article) => !article.title.includes("[Removed]") && !article.title.includes("FKA") && !article.title.includes("mushrooms"))
            .map((article, index) => (
              <li key={index} className="news-article-container">
                <div className="image-news-page">
                  <img
                    src={
                      article.urlToImage
                        ? article.urlToImage
                        : "images/Therapist/default-image.png"
                    }
                    alt={article.title}
                    onError={(e) => {
                      e.target.src = "images/Therapist/default-image.png";
                    }}
                  />
                </div>
                <div className="news-article-info">
                  <h2 className="article-title">{article.title}</h2>
                  <p className="article-date">
                    {new Date(article.publishedAt).toLocaleDateString()}
                  </p>
                  <p className="article-description">{article.description}</p>
                  <a
                    className="article-read-more"
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Read more
                  </a>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default NewsPage;
