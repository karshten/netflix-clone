import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearMovies, getMovies, getTopRatedMovies } from "../../features/movies";
import InfiniteScroll from "react-infinite-scroll-component";
import { BASE_IMAGE_URL, genres } from "../../constants/constants";
import { Link } from "react-router-dom";
import { Select } from "../../components/Select/Select";
import { truncateText } from "../../helpers/formaters";
import { format } from "date-fns";
import './movies.css'


const genresOptions = Object.entries(genres).map(([value, key]) => ({value, title: key}));

export const Movies = () => {
  const dispatch = useDispatch();
  const {movies} = useSelector(state => state.movies);

  const [currentGenre, setCurrentGenre] = useState('top_rated');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchMovies = useCallback(async () => {
    const params = {
      genreId: currentGenre,
      page: page,
    }

    let response = null;

    if (currentGenre === 'top_rated') {
      response = await dispatch(getTopRatedMovies(params))
    } else {
      response = await dispatch(getMovies(params));
    }

    if (page === response.payload.total_pages) {
      setHasMore(false)
    }
    
    setPage(prev => prev + 1);
  }, [ page, currentGenre ])

  const changeOption = (option) => {
    setCurrentGenre(option.value);
    setPage(1);
  }

  useEffect(() => {
    fetchMovies();

    return () => {
      dispatch(clearMovies());
    }
  }, [ currentGenre ]);

  return (
    <div className="container">
      <div className="top_content">
        <Select options={genresOptions} label='Top rated' changeOption={changeOption}/>
      </div>

      <InfiniteScroll
        className="movies"
        dataLength={movies.length}
        next={fetchMovies}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
      >
        {movies.length > 0 && movies.map(movie => {
          if (!movie.poster_path) return null;
          const title = movie.name ?? movie.original_name ?? movie.title;

          return (
            <Link key={movie.id} className="movies__item" to={`/movies/${movie.id}`}>
              <img 
                  className="movies__poster"
                  src={`
                    ${BASE_IMAGE_URL}/${movie.poster_path}
                  `} 
                  alt={movie.name}
                  loading="lazy"
              />
              <div className="movies__item_details">
                <h3 className="movies__item_title">{title}</h3>
                {!!movie.release_date && <p>{format(new Date(movie.release_date), 'dd-MM-yyyy')}</p>}
                {!!movie.overview?.length && <p>{truncateText(movie.overview)}</p>}
              </div>
            </Link>
          );
        })}
      </InfiniteScroll>
    </div>
  );
};
