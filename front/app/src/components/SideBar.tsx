import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/sidebar.scss';
import { CSSTransition } from 'react-transition-group';
import igIconWhite from '../images/ig-icon-white.png';
import igIconBlack from '../images/ig-icon-black.png';
import wantedlyIcon from '../images/wantedly_mark.png';
import gitIconWhite from '../images/git-icon-white.png';
import gitIconBlack from '../images/git-icon-black.png';
type Props = {
  current_page: string;
  is_product_page: boolean;
};

const Sidebar: React.FC<Props> = (props) => {
  const [selectedItem, setSelectedItem] = useState('');

  return (
    <nav>
      <a className="top__link" href="/">
        <h3
          className={
            'sidebar__title' + ' ' + (props.is_product_page ? '--black' : '')
          }
        >
          Ikkei Harashima
        </h3>
      </a>
      <div className="menu-items">
        <div className="menu-item__wrapper">
          <Link
            to="/"
            className={
              'menu-item' +
              (selectedItem === 'home' ? ' --hover' : '') +
              (props.current_page === '/' ? ' --active' : '')
            }
            onMouseEnter={() => {
              setSelectedItem('home');
            }}
            onMouseLeave={() => {
              setSelectedItem('');
            }}
          >
            <p
              className={
                'menu-item__text' +
                ' ' +
                (props.is_product_page ? '--black' : '')
              }
            >
              Home
            </p>
          </Link>
        </div>

        <div className="menu-item__wrapper">
          <Link
            to="/profile"
            className={
              'menu-item' +
              (selectedItem === 'profile' ? ' --hover' : '') +
              (props.current_page.includes('/profile') ? ' --active' : '')
            }
            onMouseEnter={() => {
              setSelectedItem('profile');
            }}
            onMouseLeave={() => {
              setSelectedItem('');
            }}
          >
            <p
              className={
                'menu-item__text' +
                ' ' +
                (props.is_product_page ? '--black' : '')
              }
            >
              Profile
            </p>
          </Link>
        </div>

        <div className="menu-item__wrapper">
          <Link
            to="/product"
            className={
              'menu-item' +
              (selectedItem === 'product' ? ' --hover' : '') +
              (props.current_page.includes('/product') ? ' --active' : '')
            }
            onMouseEnter={() => {
              setSelectedItem('product');
            }}
            onMouseLeave={() => {
              setSelectedItem('');
            }}
          >
            <p
              className={
                'menu-item__text' +
                ' ' +
                (props.is_product_page ? '--black' : '')
              }
            >
              Product
            </p>
          </Link>
        </div>

        <div className="menu-item__wrapper">
          <Link
            to="/contact"
            className={
              'menu-item' +
              (selectedItem === 'contact' ? ' --hover' : '') +
              (props.current_page.includes('/contact') ? ' --active' : '')
            }
            onMouseEnter={() => {
              setSelectedItem('contact');
            }}
            onMouseLeave={() => {
              setSelectedItem('');
            }}
          >
            <p
              className={
                'menu-item__text' +
                ' ' +
                (props.is_product_page ? '--black' : '')
              }
            >
              Contact
            </p>
          </Link>
        </div>
      </div>
      <div className="icon__group">
        <div
          className={
            'icon__wrapper' + ' ' + (props.is_product_page ? '--white' : '')
          }
        >
          <a
            className="icon__link"
            href="https://github.com/ikkei12"
            target="_blank"
            rel="noopener noreferrer"
          >
            {props.is_product_page ? (
              <img src={gitIconBlack} className="git-icon" />
            ) : (
              <img src={gitIconWhite} className="git-icon" />
            )}
          </a>
        </div>
        <div
          className={
            'icon__wrapper' + ' ' + (props.is_product_page ? '--white' : '')
          }
        >
          <a
            className="icon__link"
            href="https://www.instagram.com/1keiuu/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {props.is_product_page ? (
              <img src={igIconBlack} className="ig-icon" />
            ) : (
              <img src={igIconWhite} className="ig-icon" />
            )}
          </a>
        </div>
        <div
          className={
            'icon__wrapper' + ' ' + (props.is_product_page ? '--white' : '')
          }
        >
          <a
            className="icon__link"
            href="https://www.wantedly.com/users/103088073"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={wantedlyIcon} className="wantedly-icon" />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
