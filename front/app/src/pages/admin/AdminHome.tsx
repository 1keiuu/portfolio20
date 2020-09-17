import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import * as H from 'history';
import { withRouter } from 'react-router-dom';
import AdminInner from './AdminInner';
import '../../styles/admin/home.scss';
interface Props extends RouteComponentProps<{}> {
  history: H.History;
}

const AdminHome: React.FC<Props> = (props) => {
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <div className="admin__home">
      {isSignIn ? (
        <AdminInner>
          <p>admin home</p>
        </AdminInner>
      ) : (
        <p> </p>
      )}
    </div>
  );
};
export default withRouter(AdminHome);
