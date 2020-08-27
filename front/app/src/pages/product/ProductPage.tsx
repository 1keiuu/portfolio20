import React, { useEffect, useState, useRef } from 'react';
import '../../styles/productPage.scss';
import { withRouter, RouteComponentProps } from 'react-router';
import { CSSTransition } from 'react-transition-group';
const VisibilitySensor = require('react-visibility-sensor').default;
interface Product {
  id: number;
  title: string;
  span: string;
  background_color: string;
  images: string;
  descriptions: string;
  skill_ids: string;
}

interface Props extends RouteComponentProps<{}> {}

const Section = (
  image: string,
  description: string,
  index: number,
  isVisible: boolean
) => {
  console.log(isVisible);
  return (
    <CSSTransition
      in={isVisible}
      classNames="section"
      timeout={2000 + 500 * index}
    >
      <div className={'section ' + 'section' + index}>
        <img src={image}></img>
        <p>{description}</p>
      </div>
    </CSSTransition>
  );
};

const ProductPage: React.FC<Props> = (props) => {
  const state: any = props.location.state;
  const product: Product = state!.product;
  const images = product.images.split(',');
  const descriptions = product.descriptions.split(',');

  const [isLoaded, setIsloaded] = useState(false);
  const isFirstLoad = useRef(true);
  useEffect(() => {
    setIsloaded(true);
    console.log(product);
    setTimeout(() => {
      isFirstLoad.current = false;
    }, 1000);
  }, [props]);
  return (
    <div className="product-page">
      <CSSTransition
        in={isLoaded}
        classNames="product-page__curtain"
        timeout={0}
      >
        <div className="product-page__curtain"> </div>
      </CSSTransition>

      <div className="product-page__content">
        <div className="title__wrapper">
          <CSSTransition in={isLoaded} classNames="title" timeout={1500}>
            <p className="title">{product.title}</p>
          </CSSTransition>
          <div className="title__cover"></div>
        </div>
        {images.map((image, i) => {
          return (
            <VisibilitySensor partialVisibility>
              {({ isVisible }: any) => (
                <div
                  className={
                    'section' +
                    ' ' +
                    'section' +
                    i +
                    ' ' +
                    (isVisible ? 'section-enter-done' : '') +
                    ' ' +
                    (isFirstLoad.current ? '--first-load' : '')
                  }
                >
                  <img src={image}></img>
                  <p>{descriptions[i]}</p>
                </div>
              )}
            </VisibilitySensor>
          );
        })}
      </div>
    </div>
  );
};

export default withRouter(ProductPage);
