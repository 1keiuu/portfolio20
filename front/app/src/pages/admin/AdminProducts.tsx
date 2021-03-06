import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import * as H from 'history';
import { withRouter } from 'react-router-dom';
import AdminInner from './AdminInner';
import {
  TextField,
  FormControl,
  FormLabel,
  FormControlLabel,
  Checkbox,
  FormGroup,
} from '@material-ui/core';

import '../../styles/admin/product.scss';
interface Props extends RouteComponentProps<{}> {
  history: H.History;
}

const AdminProduct: React.FC<Props> = (props) => {
  const skills: { name: string; checked?: boolean }[] = [
    { name: 'test1' },
    { name: 'test2' },
  ];
  const SKILLS = skills.map((skill) => {
    return { name: skill.name, checked: false };
  });

  useEffect(() => {});

  return (
    <div className="admin__product">
      <AdminInner>
        <TextField label="name" variant="outlined"></TextField>
        <FormControl
          required
          // error={error}
          component="fieldset"
          // className={classes.formControl}
        >
          <FormLabel>使用したスキル</FormLabel>
          <FormGroup>
            {SKILLS.map((skill) => {
              return (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={skill.checked}
                      onChange={() => {
                        console.log(SKILLS);
                      }}
                      name={skill.name}
                    />
                  }
                  label={skill.name}
                />
              );
            })}
          </FormGroup>
        </FormControl>
        <p>admin product</p>
      </AdminInner>
      ) : (<p> </p>
    </div>
  );
};
export default withRouter(AdminProduct);
