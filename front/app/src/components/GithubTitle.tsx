import React from 'react';
import iconSrc from '../images/GitHub_Logo.png';
import logoSrc from '../images/git-icon-black.png';
import '../styles/GithubTitle.scss';
const GithubTitle: React.FC = () => {
  return (
    <div>
      <div className="github-title__wrapper">
        <p>ikkei12's contributions on</p>
        <img src={iconSrc} alt="logo" className="github-title__logo" />
        <img src={logoSrc} alt="icon" className="github-title__icon" />
      </div>
      <a
        href="https://github.com/ikkei12"
        target="_blank"
        rel="noopener noreferrer"
        className="github__link"
      >
        <p>https://github.com/ikkei12</p>
      </a>
    </div>
  );
};

export default GithubTitle;
