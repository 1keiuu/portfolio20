import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import withStyles, { StyleRules } from '@material-ui/core/styles/withStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import '../../styles/admin/layout.scss';

const styles = (): StyleRules =>
  createStyles({
    root: {
      textAlign: 'center',
    },
  });

const Layout: React.FC = (props) => {
  useEffect(() => {
    console.log('layout');
  }, []);
  return <div className="admin__container">{props.children}</div>;
};
export default withStyles(styles)(Layout);
