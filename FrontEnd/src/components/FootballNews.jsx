import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";

const FootballNews = ({ source }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const options = {
      method: "GET",
      url: `https://football-news-aggregator-live.p.rapidapi.com/news/${source}`,
      headers: {
        "X-RapidAPI-Key": "1c1aed7217msh4b41ffa2b1db663p18bcbejsnd77f47f61438",
        "X-RapidAPI-Host": "football-news-aggregator-live.p.rapidapi.com",
      },
    };

    const fetchNews = async () => {
      try {
      const response = await axios.request(options);
       setNews(response.data.slice(0, 3));
        setLoading(false);
      } catch (error) {
        setError(error.message);
        console.log(error);
        setLoading(false);
      }
    };
    setTimeout(() => {
      fetchNews();
    }, 2000);
  }, []);

  if (loading) {
    return (
      <div className="latest-news bg-[#0D0F12] p-20">
        <Loader />
      </div>
    ); // Show loading state
  }

  if (error) {
    return (
      <div className="latest-news bg-[#0D0F12] p-20 py-50 text-center">
        Error: {error}
      </div>
    ); // Handle error state
  }

  return (
    <div className="latest-news bg-[#0D0F12]">
      <div className="container">
        <div className="row">
          <div className="col-12 title-section">
            <h2 className="heading">Latest News</h2>
          </div>
        </div>
        <div className="row no-gutters">
          <a
            href={news[0]?.url}
            className="col-md-4"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="post-entry">
              <img
                src={news[0]?.img}
                alt="Image"
                className="img-fluid h-96 cover"
              />
              <div className="caption">
                <div className="caption-inner">
                  <h3 className="mb-3">{news[0]?.title}</h3>
                  <div className="author d-flex align-items-center"></div>
                </div>
              </div>
            </div>
          </a>

          <a
            href={news[1]?.url}
            target="_blank"
            rel="noopener noreferrer"
            className="col-md-4"
          >
            <div className="post-entry">
              <img
                src={news[1]?.img}
                alt="Image"
                className="img-fluid h-96 cover"
              />

              <div className="caption">
                <div className="caption-inner">
                  <h3 className="mb-3">{news[1]?.title}</h3>
                </div>
              </div>
            </div>
          </a>
          <a
            href={news[2]?.url}
            className="col-md-4 "
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="post-entry ">
              <img
                src={news[2]?.img}
                alt="Image"
                className="img-fluid h-96 cover"
              />

              <div className="caption">
                <div className="caption-inner">
                  <h3 className="mb-3">{news[2]?.title}</h3>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default FootballNews;
