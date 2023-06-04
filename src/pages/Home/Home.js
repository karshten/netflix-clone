import React from "react";
import './home.css'
import { Banner } from "../../components/Banner/Banner";
import { Row } from "../../components/Row/Row";
import { request } from "../../requester";

function Home() {
  return (
    <div className="home">
        <Banner/>

        <Row
          title="Netflix originals"
          fetchUrl={request.getNetflixOriginals}
          isLargeRow={true}
        />
        <Row
          title="Actions"
          fetchUrl={request.getActionsMovies}
        />
        <Row
          title="Comedy"
          fetchUrl={request.getComedyMovies}
        />
        <Row
          title="Romance"
          fetchUrl={request.getRomanceMovies}
        />
        <Row
          title="Horror"
          fetchUrl={request.getHorrorMovies}
        />
        <Row
          title="Animation"
          fetchUrl={request.getAnimation}
        />
        <Row
          title="Adventure"
          fetchUrl={request.getAdventure}
        />
        <Row
          title="Crime"
          fetchUrl={request.getCrimeMovies}
        />
        <Row
          title="Documentations"
          fetchUrl={request.getDocumentaries}
        />
    </div>
  );
}

export default Home;
