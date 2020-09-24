import React, { useState } from 'react';
import MenuIcon from './_MenuIcon';
import ArrowIcon from './ArrowIcon';
import '../styles/header.scss';
import { CSSTransition } from 'react-transition-group';
import * as H from 'history';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';

interface Props extends RouteComponentProps<{}> {
  history: H.History;
  is_product_page: boolean;
}
const MenuButton = (props: any) => {
  if (!props.isMenuOpen) {
    return (
      <div
        className={
          'menu-icon__wrapper' +
          ' ' +
          (props.is_product_page ? '--product-page' : '')
        }
        onClick={() => {
          props.click();
        }}
      >
        <MenuIcon />
      </div>
    );
  } else {
    return (
      <div
        className="close-button"
        onClick={() => {
          props.click();
        }}
      >
        <div className="close-button__inner">
          <p>Close</p>
          <div className="close-icon__wrapper">
            <ArrowIcon isLeft={false} fill="#f8f2ee" />
          </div>
        </div>
      </div>
    );
  }
};
const Header: React.FC<Props> = (props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const changeMenuStatus = (type: string) => {
    if (type === 'open') {
      setIsMenuOpen(true);
    } else {
      setIsMenuOpen(false);
    }
  };

  const handleItemClick = (params: string) => {
    setIsMenuOpen(false);
    props.history.push(params);
  };

  return (
    <header className={'header' + ' ' + (isMenuOpen ? '--is-menu-open' : '')}>
      <div
        onClick={() => {
          handleItemClick('/gallery');
        }}
        className="gallery__link"
      >
        Photo Gallery
      </div>
      <CSSTransition
        in={isMenuOpen}
        classNames="menu-items__back-ground"
        timeout={0}
      >
        <div className="menu-items__back-ground">
          <div className="menu-items__inner">
            <div className="menu-items">
              <div
                onClick={() => {
                  handleItemClick('/');
                }}
                className="menu-item"
              >
                Home
              </div>
              <div
                onClick={() => {
                  handleItemClick('/profile');
                }}
                className="menu-item"
              >
                Profile
              </div>
              <div
                onClick={() => {
                  handleItemClick('/product');
                }}
                className="menu-item"
              >
                Product
              </div>
              <div
                onClick={() => {
                  handleItemClick('/contact');
                }}
                className="menu-item"
              >
                Contact
              </div>
            </div>
            <CSSTransition
              in={isMenuOpen}
              classNames="menu-items__underline"
              timeout={0}
            >
              <div className="menu-items__underline"></div>
            </CSSTransition>
          </div>
        </div>
      </CSSTransition>

      <CSSTransition in={isMenuOpen} classNames="close-button" timeout={0}>
        <MenuButton
          isMenuOpen={isMenuOpen}
          is_product_page={props.is_product_page}
          click={() => {
            if (!isMenuOpen) {
              changeMenuStatus('open');
            } else {
              changeMenuStatus('close');
            }
          }}
        />
      </CSSTransition>
    </header>
  );
};

export default withRouter(Header);
