import React, { useEffect, useState } from "react"
import './row.css';
import { instance } from "../../requester";
import { BASE_IMAGE_URL } from "../../constants/constants";
import { motion } from 'framer-motion'

export const Row = ({title, fetchUrl, isLargeRow}) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      const response = await instance.get(fetchUrl);
      if (!response.data || response.data.results.length === 0) return;

      setMovies(response.data.results)
    }

    getMovies();
  }, [fetchUrl]);

  return (
    <div className="row">
      <div className="container">
        <h2 className="row__title">{title}</h2>
      </div>

      <ul className="row__list">
        {movies.length > 0 && movies.map(movie => (
          !!(movie.poster_path && movie.backdrop_path) && 
          <motion.li 
            initial={{
              translateX: 30,
              opacity: 0,
            }}
            whileInView={{
              translateX: 0,
              opacity: 1,
            }}
            transition={{ duration: 1 }}
            className="row__item" key={movie.id}
          >
            <img
              className={`row__poster ${isLargeRow && "row__posterLarge"}`}
              src={`
                ${BASE_IMAGE_URL}/${isLargeRow ? movie.poster_path : movie.backdrop_path}
              `} 
              alt={movie.name}
            />
          </motion.li>
        ))}
      </ul>
    </div>
  );
};
