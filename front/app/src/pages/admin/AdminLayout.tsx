import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import withStyles, { StyleRules } from '@material-ui/core/styles/withStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import '../../styles/admin/layout.scss';
import axios from '../../plugin/axios/index';

const styles = (): StyleRules =>
  createStyles({
    root: {
      textAlign: 'center',
    },
  });

const Layout: React.FC = (props) => {
  useEffect(() => {
    const checkSignIn = async () => {};
    const URL = '/admin/signIn';
  }, []);
  return <div className="admin__container">{props.children}</div>;
};
export default withStyles(styles)(Layout);
