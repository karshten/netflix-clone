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
          title="Actions movies"
          fetchUrl={request.getActionsMovies}
        />
        <Row
          title="Comedy movies"
          fetchUrl={request.getComedyMovies}
        />
        <Row
          title="romance movies"
          fetchUrl={request.getRomanceMovies}
        />
        <Row
          title="Horror movies"
          fetchUrl={request.getHorrorMovies}
        />
        <Row
          title="Documentations"
          fetchUrl={request.getDocumentaries}
        />
    </div>
  );
}

export default Home;
