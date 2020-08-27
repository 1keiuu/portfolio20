import React, { useEffect, useState } from 'react';
import * as H from 'history';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import '../../styles/contactPage.scss';
import { CSSTransition } from 'react-transition-group';
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
    console.log(email, name, content);
    e.preventDefault();
  };
  return (
    <CSSTransition in={isLoaded} classNames="contact-page" timeout={500}>
      <div className="contact-page">
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></input>
          <input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          ></input>
          <textarea
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          ></textarea>
          <input type="submit" value="Submit" />
        </form>
      </div>
    </CSSTransition>
  );
};
export default withRouter(ContactPage);
