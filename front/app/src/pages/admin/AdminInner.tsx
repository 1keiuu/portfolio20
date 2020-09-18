import React from 'react';
import Header from '../../components/admin/Header';
import SideBar from '../../components/admin/SideBar';
import '../../styles/admin/inner.scss';
const AdminInner: React.FC = (props) => {
  return (
    <div className="admin__inner">
      <Header />
      <div className="side-bar__wrapper">
        <SideBar />
      </div>
      <div>{props.children}</div>
    </div>
  );
};
export default AdminInner;
