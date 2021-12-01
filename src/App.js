import React, { useEffect, useState } from "react";
import './App.css';
import Tmdb from './Tmdb';
import Header from './components/Header/Header';
import FeatureMovie from "./components/FeaturedMovie/FeatureMovie";
import MovieRow from "./components/MovieRow/MovieRow";
import Footer from "./components/Footer/Footer"

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {

  const [ movieList, setMovieList ] = useState([]);
  const [ featureData, setFeatureData ] = useState(null);

  useEffect(() => {
    const loadAll = async () => {
      // Pegando todos os itens de lista
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      // Pegando o Filme em Destaque
      let originals = list.filter(i => i.slug === 'originals');
      let ramdomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      let chosen = originals[0].items.results[ramdomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
      setFeatureData(chosenInfo);
    }

    loadAll();
  }, [])

  return (
    <div className='page'>
      <Header />

      {featureData &&
        <FeatureMovie item={featureData}/>
      }
      
      <section className='lists'>
        {movieList.map((item, key ) => (
          <MovieRow key={key} title={item.title} items={item.items}/>
        ))}
      </section>

      <section>
        <Footer />
      </section>
    </div>
  )
}