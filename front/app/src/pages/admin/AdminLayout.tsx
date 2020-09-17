import React, { useEffect } from 'react';
import '../../styles/admin/layout.scss';
import store from '../../store/index';
import * as H from 'history';
import { RouteComponentProps, withRouter } from 'react-router-dom';

interface Props extends RouteComponentProps<{}> {
  history: H.History;
}

const Layout: React.FC<Props> = (props) => {
  const signInStatus = store.getState().signInStatus.value;
  useEffect(() => {
    if (!signInStatus) props.history.push('/admin/signIn');
  }, []);
  return <div className="admin__container">{props.children}</div>;
};
export default withRouter(Layout);
