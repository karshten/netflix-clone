import React, { useEffect } from "react";
import './banner.css';
import { useDispatch, useSelector } from "react-redux";
import { getBannerMovie } from "../../features/bannerMovie";
import { BASE_IMAGE_URL, PATH } from "../../constants/constants";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { useNavigate } from "react-router-dom";
import { truncateText } from "../../helpers/formaters";

export const Banner = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { movie, status } = useSelector(state => state).bannerMovie;

  const isMobile = useMediaQuery('(max-width: 820px)');

  useEffect(() => {
    dispatch(getBannerMovie());
  }, [dispatch])


  if (status !== 'idle' || status === 'loading' || movie.backdrop_path === undefined || !movie) return (
    <div className="banner"/>
  );

  const title = movie.name ?? movie.original_name ?? movie.title;
  const poster = isMobile ? movie.poster_path : movie.backdrop_path;

  const handleNavigate = (path) => {
    navigate(path)
  }

  return (
    <div 
      key={movie}
      style={{
        backgroundImage: `
          linear-gradient(to bottom, rgba(0, 0, 0, 0.50), rgba(0, 0, 0, 0.50)),
          url(${BASE_IMAGE_URL}/${poster})
        `
      }} 
      className="banner"
    >
      <div className="banner__content container">
        <h1 className="banner__title">
          {truncateText(title, 40)}
        </h1>
        <p className="banner__description">{truncateText(movie.overview)}</p>

        <div className="banner__buttons">
          <button className="banner__btn" onClick={() => handleNavigate(`movies/${movie.id}`)}>Watch</button>
          <button className="banner__btn" onClick={() => handleNavigate(PATH.movies)}>Movie list</button>
        </div>
      </div>
    </div>
  );
};
