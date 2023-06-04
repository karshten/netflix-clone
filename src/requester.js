import axios from "axios";
import { API_KEY, BASE_URL } from "./constants/constants";


const instance = axios.create({
  baseURL: BASE_URL,
})

let randomPage = Math.floor(Math.random() * 10);

if (randomPage < 1) randomPage = 1;

const request = {
  getTending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
  getNetflixOriginals: `/discover/movie?api_key=${API_KEY}&page=${randomPage}&with_network=213`,
  getTopRated: `/movie/top_rated?api_key=${API_KEY}&page=${randomPage}&language=en-US`,
  getActionsMovies: `/discover/movie?api_key=${API_KEY}&page=${randomPage}&with_genres=28`,
  getComedyMovies: `/discover/movie?api_key=${API_KEY}&page=${randomPage}&with_genres=35`,
  getHorrorMovies: `/discover/movie?api_key=${API_KEY}&page=${randomPage}&with_genres=27`,
  getRomanceMovies: `/discover/movie?api_key=${API_KEY}&page=${randomPage}&with_genres=10749`,
  getDocumentaries: `/discover/movie?api_key=${API_KEY}&page=${randomPage}&with_genres=99`,
  getCrimeMovies: `/discover/movie?api_key=${API_KEY}&page=${randomPage}&with_genres=80`,
  getThriller: `/discover/movie?api_key=${API_KEY}&page=${randomPage}&with_genres=53`,
  getAnimation: `/discover/movie?api_key=${API_KEY}&page=${randomPage}&with_genres=16`,
  getAdventure: `/discover/movie?api_key=${API_KEY}&page=${randomPage}&with_genres=12`,
}


export {instance, request};