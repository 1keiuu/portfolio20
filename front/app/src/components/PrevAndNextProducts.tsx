import React from 'react';
import '../styles/PrevAndNextProducts.scss';
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
    <a href={'/product/' + props.product.id.Int64}>
      <div className="other-product">
        {props.type === 'next' ? (
          <p>next</p>
        ) : (
          <span style={{ display: 'none' }}></span>
        )}
        <img
          src={props.product.image_url.String}
          className="other-product__image"
        ></img>
        {props.type === 'prev' ? (
          <p>prev</p>
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
        <Item product={next} type="next"></Item>
        <Item product={prev} type="prev"></Item>
      </div>
    );
  }
  return <span style={{ display: 'none' }}></span>;
};

export default PrevAndNextProducts;
