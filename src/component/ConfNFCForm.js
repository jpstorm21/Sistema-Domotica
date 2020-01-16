import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import empty from 'is-empty';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IntegrationReactSelect from './ReactSelect';

const ConfNFCForm = observer (({
  data,
  errors,
  onSubmit,
  onChange,
  options1,
  options2,
  options3,
  state  
}) =>(
  <Card className="py-3 px-4">
    <CardHeader
      title={
        <Typography
          variant="h5"
          color="primary"
          gutterBottom
        >
          CONFIGURACION DE LLAVE
        </Typography>
      }
      disableTypography
    />

    <form onSubmit={onSubmit} autoComplete="off" noValidate>
      <CardContent>
      <div className="row mb-3">
          <div className="col-12 col-md-6">
            <IntegrationReactSelect
              id="blinds" 
              name="blinds"
              label="Persianas"
              helperText={errors.blinds}
              error={!empty(errors.blinds)}
              value={data.blinds}
              options={options1}
              onChange={onChange}
              required
            />
          </div>
          <div className="col-12 col-md-6">
            <IntegrationReactSelect
              id="securityalarm" 
              name="securityalarm"
              label="Alarma de Seguridad "
              helperText={errors.securityalarm}
              error={!empty(errors.securityalarm)}
              value={data.securityalarm}
              options={options3}
              onChange={onChange}
              required
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-12 col-md-6">
              <IntegrationReactSelect
                id="gasalarm" 
                name="gasalarm"
                label="Alarma de gas"
                helperText={errors.gasalarm}
                error={!empty(errors.gasalarm)}
                value={data.gasalarm}
                options={options3}
                onChange={onChange}
                required
              />
            </div>
            
            <div className="col-12 col-md-6">
              <IntegrationReactSelect
                id="exteriorlights" 
                name="exteriorlights"
                label="Luces exteriores"
                helperText={errors.exteriorlights}
                error={!empty(errors.exteriorlights)}
                value={data.exteriorlights}
                options={options2}
                onChange={onChange}
                required
              />
            </div>
        </div>

        <div className="row mb-3">
          <div className="col-12 col-md-6">
              <IntegrationReactSelect
                id="riego" 
                name="riego"
                label="Sistema de riego"
                helperText={errors.riego}
                error={!empty(errors.riego)}
                value={data.riego}
                options={options3}
                onChange={onChange}
                required
              />
            </div>
            
            <div className="col-12 col-md-6">
              <IntegrationReactSelect
                id="porton" 
                name="porton"
                label="Porton"
                helperText={errors.porton}
                error={!empty(errors.porton)}
                value={data.porton}
                options={options1}
                onChange={onChange}
                required
              />
            </div>
        </div>

        <div className="row mb-3">
          <div className="col-12 col-md-4">
            <IntegrationReactSelect
              id="interiorlights" 
              name="interiorlights"
              label="Luces interiores"
              helperText={errors.interiorlights}
              error={!empty(errors.interiorlights)}
              value={data.interiorlights}
              options={options2}
              onChange={onChange}
              required
            />
          </div>
          <div className="col-12 col-md-4">
            <IntegrationReactSelect
              id="lucesinterioresintensidad" 
              name="lucesinterioresintensidad"
              label="Intensidad luces interiores"
              helperText={errors.lucesinterioresintensidad}
              error={!empty(errors.lucesinterioresintensidad)}
              value={data.lucesinterioresintensidad}
              options={options2}
              onChange={onChange}
              required
            />
          </div>
          <div className="col-12 col-md-4">
            <IntegrationReactSelect
              id="lucesinteriorescolor" 
              name="lucesinteriorescolor"
              label="Color luces interiores"
              helperText={errors.lucesinteriorescolor}
              error={!empty(errors.lucesinteriorescolor)}
              value={data.lucesinteriorescolor}
              options={options2}
              onChange={onChange}
              required
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-12">
              <TextField 
                id="test"
                name = "test"
                label="test"
                margin="dense"
                value={data.test}
                onChange={onChange}
                fullWidth
                required
              />
          </div>       
        </div>

      </CardContent>

      <CardActions>
        <Button
          className="ml-auto"
          variant="contained"
          color="primary"
          type="submit"
        >
          { state ? 'GUARDAR':'ACTUALIZAR'}
        </Button>
      </CardActions>
    </form>
  </Card>
));

ConfNFCForm.propTypes = {
  data: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default ConfNFCForm;