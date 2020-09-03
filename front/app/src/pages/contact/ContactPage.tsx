import React, { useEffect, useState } from 'react';
import * as H from 'history';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import '../../styles/contactPage.scss';
import { CSSTransition } from 'react-transition-group';
import axios from 'axios';
import Lottie from 'react-lottie';
import animationData from '../../lottie/email.json';
const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

const Fade = require('react-reveal/Fade');

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const Contact_URL = `${process.env.REACT_APP_API_URL}/api/contacts`;
    const params = {
      email: email,
      name: name,
      content: content,
    };
    axios
      .post(Contact_URL, params)
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
    e.preventDefault();
  };
  return (
    <CSSTransition in={isLoaded} classNames="contact-page" timeout={500}>
      <div className="contact-page">
        <Lottie options={defaultOptions} height={350} width={350} />
        <div className="contact-page__text">
          <p>訪問していただきありがとうございます</p>
          <p>仕事依頼等あればお気軽にご連絡ください！</p>
        </div>

        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
          className="contact-form"
        >
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
          <input type="submit" value="Submit" className="submit__button" />
        </form>
      </div>
    </CSSTransition>
  );
};
export default withRouter(ContactPage);
