import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BiSolidUpArrow, BiSolidDownArrow } from "react-icons/bi";
import './home.css';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCompanyDetails, setShowCompanyDetails] = useState(false);
  const companyDetails = {
    Company: 'GeekSynergy',
    Address:'Sanjaynagar,Bengaluru',
    Phone:'XXXXXXX09',
    Email:'xxxxx@gmail.com',
  };
  const toggleCompanyDetails = () => {
    setShowCompanyDetails(!showCompanyDetails);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          'https://hoblist.com/api/movieList',
          {
            category: 'movies',
            language: 'kannada',
            genre: 'all',
            sort: 'voting',
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        const movie_data = response.data.result;
        setMovies(movie_data);
        setLoading(false);
        console.log(movie_data);
      } catch(error) {
        setLoading(false);
        console.error('error:',error);
      }
    };

    fetchData();
  }, []); // The empty dependency array ensures useEffect runs only once (on component mount)

  function formatDate(timestamp) {
    const date = new Date(timestamp * 1000);
    date.setHours(date.getHours() + 5);
    date.setMinutes(date.getMinutes() + 30);

    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" });

    const formattedDay = day < 10 ? `0${day}` : day;

    return `${formattedDay} ${month}`;
  }

  return (
    <div className="movie-list-container">
         <h1 onClick={toggleCompanyDetails} className="company-title">GeekSynergy</h1>
      {showCompanyDetails && (
        <div className="company-details">
          <h3>{companyDetails.Company}</h3>
          <p>{companyDetails.Address}</p>
          <p>{companyDetails.Phone}</p>
          <p>{companyDetails.Email}</p>

          
        </div>
      )}
      <h2 className="movie-list-title">Movie List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="movies-container">
          {movies && movies.length === 0 ? (
            <p>No movies available</p>
          ) : (
            movies.map((movie, index) => (
              <div key={movie.id} className="movie-card">
                <div className="votes-section">
                  <BiSolidUpArrow size={40} color="gray" />
                  <p className="vote-count text-2xl font-bold">{movie.totalVoted} votes</p>
                  <BiSolidDownArrow size={40} color="gray" />
                </div>
                <div className="movie-details">
                  <img src={movie.poster} alt={movie.title} className="movie-poster" />
                  <div className="details-text">
                    <p className="movie-title text-2xl font-bold">{movie.title}</p>
                    <p className="movie-info text-xl font-bold">Genre: {movie.genre}</p>
                    <p className="movie-info text-xl font-bold">Director: {movie.director}</p>
                    <p className="movie-info text-xl font-bold">Starring: {movie.stars}</p>
                    <div className="additional-info">
                      <p className="movie-info text-xl font-bold">{movie.runTime} Mins <span>  </span> <span> </span>
                      {movie.language} <span> </span>
                      {formatDate(movie.releasedDate)}</p>
                    </div>
                    <div className="vote-views">
                      <p className="vote-text text-lg font-bold text-blue-500">{movie.pageViews} views</p>
                      <p className="vote-text text-lg font-bold text-blue-500">
                        Voted by {movie.totalVoted} people
                      </p>
                    </div>
                  </div>
                </div>
                <div className="button-container">
                  <button className="watch-button bg-blue-500 p-4 rounded-md text-white font-bold text-xl">
                    Watch Trailer
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default MovieList;
