import React, { useEffect, useState, useRef } from 'react';
import '../../styles/githubSlide.scss';
import Graph from './Graph';
import GithubTitle from '../../components/GithubTitle';
import { CSSTransition } from 'react-transition-group';

interface Props {
  contributions: any;
  isLoaded: boolean;
}

const GithubSlide: React.FC<Props> = (props) => {
  const [status, setStatus] = useState(false);
  const [contributions, setContributions] = useState<any>();

  const isFirstRender = useRef(false);
  useEffect(() => {
    //
    if (isFirstRender.current) {
      if (status) {
        setStatus(false);
      } else {
        setStatus(true);
      }
    }
    isFirstRender.current = true;
  }, [props.isLoaded]);
  useEffect(() => {
    setContributions(props.contributions);
  }, [props.contributions]);
  return (
    <div className="slide github__slide">
      <div className="slide__inner">
        <div className="github__stats">
          <a
            className="stats__link1"
            href="https://github.com/anuraghazra/github-readme-stats"
          >
            <img src="https://github-readme-stats.vercel.app/api?username=ikkei12&count_private=true&show_icons=true" />
          </a>
          <a
            className="stats__link2"
            href="https://github.com/anuraghazra/github-readme-stats"
          >
            <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=ikkei12" />
          </a>
        </div>
        <div className="graph__wrapper">
          <Graph contributions={contributions}></Graph>
        </div>
        <GithubTitle />
      </div>
    </div>
  );
};

export default GithubSlide;
