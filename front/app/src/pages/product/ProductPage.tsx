import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
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
  const product: Product = state.product;
  return (
    <div>
      <p>{product.title}</p>
      <img src={product.images.split(',')[0]}></img>
    </div>
  );
};

export default withRouter(ProductPage);
