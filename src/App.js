import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Favourite from "./pages/Favourite";
import NotFound from "./pages/NotFound";
import Nav from "./components/Nav";
import { useEffect, useState } from "react";
import AddShow from "./components/AddShow/AddShow";
import TvShows from "./pages/SearchPage/TvShows/TvShows";
import Movies from "./pages/SearchPage/Movies/Movies";
import Animes from "./pages/SearchPage/anime/Animes";
import EditShow from "./pages/edit-show/EditShow";

function App() {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/favourite">
          <Favourite />
        </Route>
        <Route path="/add-show">
          <AddShow />
        </Route>
        <Route path="/tv-shows">
          <TvShows />
        </Route>
        <Route path="/movies">
          <Movies />
        </Route>
        <Route path="/anime">
          <Animes />
        </Route>
        <Route path="/edit-show/:id/:title/:year">
          <EditShow />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
