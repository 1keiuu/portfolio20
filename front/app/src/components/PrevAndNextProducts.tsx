import React from 'react';
import '../styles/PrevAndNextProducts.scss';
import ArrowPonterIcon from '../components/ArrowPointerIcon';
interface ProductContent {
  id: { Int64: number; Valid: boolean };
  image_url: { String: string; Valid: boolean };
}

interface Props {
  next_product: ProductContent | undefined;
  prev_product: ProductContent | undefined;
}

interface ItemProps {
  product: ProductContent;
  type: string;
}

const Item: React.FC<ItemProps> = (props) => {
  if (!props.product.id.Valid) return <div></div>;
  return (
    <a
      href={'/product/' + props.product.id.Int64}
      className="other-product__link"
    >
      <div
        className={
          'other-product' + ' ' + (props.type === 'prev' ? '--prev' : '--next')
        }
      >
        {props.type === 'prev' ? (
          <div className="other-product__arrow-wrapper">
            <p className="other-product__arrow-text">PREV</p>
            <div className="other-product__arrow">
              <ArrowPonterIcon isLeft></ArrowPonterIcon>
            </div>
          </div>
        ) : (
          <span style={{ display: 'none' }}></span>
        )}
        <div className="other-product__image-wrapper">
          <img
            src={props.product.image_url.String}
            className="other-product__image"
          ></img>
        </div>
        {props.type === 'next' ? (
          <div className="other-product__arrow-wrapper">
            <p className="other-product__arrow-text">NEXT</p>
            <div className="other-product__arrow">
              <ArrowPonterIcon></ArrowPonterIcon>
            </div>
          </div>
        ) : (
          <span style={{ display: 'none' }}></span>
        )}
      </div>
    </a>
  );
};

const PrevAndNextProducts: React.FC<Props> = (props) => {
  if (props.prev_product && props.next_product) {
    const prev = props.prev_product;
    const next = props.next_product;
    return (
      <div className="other-products__inner">
        <Item product={prev} type="prev"></Item>
        <Item product={next} type="next"></Item>
      </div>
    );
  }
  return <span style={{ display: 'none' }}></span>;
};

export default PrevAndNextProducts;
