import React, { useEffect, useState } from 'react';
import * as H from 'history';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import '../../styles/contactPage.scss';
import { CSSTransition } from 'react-transition-group';
import axios from 'axios';
import Lottie from 'react-lottie';

import Img from '../../images/contact.jpeg';
let animationData = require('../../lottie/check.json');
const defaultOptions = {
  loop: false,
  autoplay: true,
  animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};
animationData = require('../../lottie/loading.json');
const loadingOptions = {
  loop: true,
  autoplay: true,
  animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

interface Props extends RouteComponentProps<{}> {
  history: H.History;
}
const ContactPage: React.FC<Props> = (props) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const handleWheel = (e: any) => {
    // 縦スクロールイベント
    var current_pos = e.deltaY;
    var start_pos = 0;
    if (current_pos < start_pos) {
      if (start_pos - current_pos <= 0) return;
      setIsLoaded(false);
      setTimeout(() => {
        props.history.push('/product');
      }, 500);
    }
    start_pos = current_pos;
  };
  useEffect(() => {
    setIsLoaded(true);
    window.addEventListener('wheel', handleWheel);
    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, []);

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const SubmitButton = (props: {
    callback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  }) => {
    if (isSubmitted) {
      return (
        <button
          className="submit__button --done"
          onClick={(e) => {
            props.callback(e);
          }}
        >
          <div className="lottie__wrapper">
            <Lottie options={defaultOptions}></Lottie>
          </div>
          <p>Thanks!</p>
        </button>
      );
    } else {
      if (isLoading) {
        return (
          <button className="submit__button">
            <div className="lottie__wrapper">
              <Lottie options={loadingOptions}></Lottie>
            </div>
          </button>
        );
      } else {
        return (
          <button
            className="submit__button"
            onClick={(e) => {
              props.callback(e);
            }}
          >
            <p>Submit</p>
          </button>
        );
      }
    }
  };
  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (isSubmitted) return;
    setIsLoading(true);
    const Contact_URL = `${process.env.REACT_APP_API_URL}/api/contacts`;
    const params = {
      email: email,
      name: name,
      content: content,
    };
    await axios
      .post(Contact_URL, params)
      .then((res) => {
        // console.log(res);
      })
      .catch((e) => {
        console.log(e);
        alert(`送信に失敗しました\n再度お試しください`);
      });
    setIsLoading(false);
    setIsSubmitted(true);
    e.preventDefault();
  };
  return (
    <div className="contact-page__wrapper">
      <CSSTransition in={isLoaded} classNames="contact-page" timeout={500}>
        <div className="contact-page">
          <div className="contact-page__text">
            <h2>Thank you for visiting</h2>
            <p>訪問していただきありがとうございます</p>
            <p>お気軽にご連絡ください！</p>
          </div>

          <div className="contact-form">
            <input
              value={email}
              placeholder="メールアドレス"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="email__input"
            ></input>
            <input
              value={name}
              placeholder="お名前"
              onChange={(e) => {
                setName(e.target.value);
              }}
              className="name__input"
            ></input>
            <textarea
              value={content}
              placeholder="内容"
              onChange={(e) => {
                setContent(e.target.value);
              }}
              className="content__input"
            ></textarea>
            <SubmitButton callback={(e) => handleSubmit(e)}></SubmitButton>
          </div>
        </div>
      </CSSTransition>
      <img src={Img} className="bg-image" />
    </div>
  );
};
export default withRouter(ContactPage);
