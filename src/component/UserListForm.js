import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { client } from '../routes/routes.json';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import CreateIcon from '@material-ui/icons/Create';
import Vpnkey from '@material-ui/icons/Vpnkey';
import LinkButton from './LinkButton';
import DynamicTable from './DynamicTable';

export const EditButton = ({ rowData }) => (
  <LinkButton
    icon={<CreateIcon />}
    link={`${client.user}/${rowData.rut}`}
    iconButton
  />
);

export const ConfButton = ({ rowData }) => (
  <LinkButton
    icon={<Vpnkey />}
    link={`${client.userNFC}/${rowData.rut}`}
    iconButton
  />
);

const UserListForm = observer(({ userList, tableColumn }) => (
  <Card className="py-3 px-4">
    <CardHeader
      title={
        <Typography
          variant="h5"
          //color="primary"
          gutterBottom
        >
          LISTA DE USUARIOS
        </Typography>
      }
      disableTypography
    />

    <CardContent>
      <DynamicTable
        id="userTable"
        name="userList"
        results={userList}
        columnMetadata={tableColumn}
      />
    </CardContent>

    <CardActions>
      <LinkButton
        className="ml-auto"
        link={`${client.user}`}
        label="Agregar Usuario"
        icon={<AddIcon/>}
      />
    </CardActions>
  </Card>
));

UserListForm.propTypes = {
  userList: PropTypes.array.isRequired
};

export default UserListForm;