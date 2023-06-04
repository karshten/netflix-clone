import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getMovieDetails } from "../../features/movieDetails";
import { BASE_IMAGE_URL } from "../../constants/constants";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import './movie.css'
import { Row } from "../../components/Row/Row";
import { request } from "../../requester";
import { formatBudget, formatRuntime } from "../../helpers/formaters";
import { format } from "date-fns";

export const MovieDetail = () => {
  const { id }  = useParams();
  const dispatch = useDispatch();

  const { movie, status } = useSelector(state => state.movieDetails);

  const isMobile = useMediaQuery('(max-width: 820px)');

  useEffect(() => {
    dispatch(getMovieDetails(id));
  }, [dispatch, id]);

  if (!movie || movie.id === undefined || status === 'rejected' || status === 'loading') return null;

  const title = movie.name ?? movie.original_name ?? movie.title;
  const poster = isMobile ? movie.poster_path : movie.backdrop_path;

  const rating = Math.round(movie.rating);

  return (
    <>
      <div 
        style={{
            backgroundImage: `
              linear-gradient(to bottom, rgba(0, 0, 0, 0.50), rgba(0, 0, 0, 0.50)),
              url(${BASE_IMAGE_URL}/${poster})
            `
        }} 
        className="movie"
      >
        <div className="container">
            <div className="movie__content">
              <h1 className="movie__title">{title}</h1>
              {movie.release_date && <p className="movie__release-date">{format(new Date(movie.release_date), 'dd-MM-yyyy')}</p>}
              {!!movie.tagline && <p className="movie__tagline">{movie.tagline}</p>}
              <p className="movie__description">{movie.overview}</p>
              {movie.runtime > 0 && <p className="movie__runtime">{formatRuntime(movie.runtime)}</p>}  
              <p className="movie__status">Status: {movie.status}</p>
              {!!rating && <p>Rating: {rating}</p>}
              {movie.budget > 0 && <p className="movie__budget">Budget: {formatBudget(movie.budget)}</p>}
              {movie.revenue > 0 && <p className="movie__revenue">Revenue: {formatBudget(movie.revenue)}</p>}
            </div>
        </div>
      </div>
      {movie.genres?.length > 0 && <div className="container">
          <h2 className="movie__sameGenres">With so genres</h2>
      </div>}
      {movie.genres?.length > 0 && movie.genres.map(genre => {
        const matchedKey = Object.keys(request).find(r => r.toLowerCase().includes(genre?.name?.toLowerCase()))
        const genreFetchUrl = request[matchedKey];

        if (genreFetchUrl === undefined) return null;

         return <Row
          key={genre.name}
          title={genre.name}
          fetchUrl={genreFetchUrl}
          excludedId={movie.id}
        />
      })}
    </>
  );
};
