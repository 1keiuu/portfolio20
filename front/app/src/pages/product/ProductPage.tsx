import React, { useEffect, useState } from 'react';
import '../../styles/productPage.scss';
import { withRouter, RouteComponentProps } from 'react-router';
import { CSSTransition } from 'react-transition-group';
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
const ProductPage: React.FC<Props> = (props) => {
  const state: any = props.location.state;
  const product: Product = state!.product;
  const images = product.images.split(',');
  const descriptions = product.descriptions.split(',');

  const [isLoaded, setIsloaded] = useState(false);
  useEffect(() => {
    setIsloaded(true);
    console.log(product);
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
            <CSSTransition
              in={isLoaded}
              classNames="section"
              timeout={2000 + 500 * i}
            >
              <div className={'section ' + 'section' + i}>
                <img src={image}></img>
                <p>{descriptions[i]}</p>
              </div>
            </CSSTransition>
          );
        })}
      </div>
    </div>
  );
};

export default withRouter(ProductPage);
