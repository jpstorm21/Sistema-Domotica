import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import empty from 'is-empty';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IntegrationReactSelect from './ReactSelect';

const RemoteControlForm = observer (({
    data,
    errors,
    onSubmit,
    onChange,
    lucesInteriores,
    Persianas,
    AlarmaMovimiento,
    AlarmaGas,
    LucesExteriores
}) =>(
  <Card className="py-3 px-4">
    <CardHeader
      title={
        <Typography
          variant="h5"
          color="primary"
          gutterBottom
        >
          CONTROL REMOTO
        </Typography>
      }
      disableTypography
    />
    <div className="row">
        <div className="col-12 col-md-6">
            <IntegrationReactSelect
                id="porton" 
                name="porton"
                label="Porton"
                helperText={errors.porton}
                error={!empty(errors.porton)}
                value={data.porton}
                options={[{label:'Abrir',value:'open'}]}
                onChange={onChange}
                required
            />
        </div>
        <div className="col-12 col-md-6">
            <IntegrationReactSelect
                id="persioanas" 
                name="persianas"
                label="Persianas"
                helperText={errors.persianas}
                error={!empty(errors.persianas)}
                value={data.persianas}
                options={[{label:'Subir',value:'open'},{label:'Bajar',value:'close'}]}
                onChange={onChange}
                required
            />
        </div>
    </div>

      <CardActions>
        <Button
          className="ml-auto"
          variant="contained"
          color="primary"
          type="submit"
          onClick={onSubmit}
        >
          PORTON
        </Button>
        <Button
          className="ml-auto"
          variant="contained"
          color="primary"
          type="submit"
          onClick={Persianas}
        >
          PERSIANAS
        </Button>
      </CardActions>

    <div className="row">
        <div className="col-12 col-md-3">
            <IntegrationReactSelect
                id="interiores" 
                name="interiores"
                label="Luces interiores"
                helperText={errors.interiores}
                error={!empty(errors.interiores)}
                value={data.interiores}
                options={[{label:'Rojo',value:'10'},{label:'Violeta',value:'25'},{label:'Azul',value:'18'}]}
                onChange={onChange}
                required
            />
        </div>
        <div className="col-12 col-md-3">
            <IntegrationReactSelect
                id="intensidad" 
                name="intensidad"
                label="Intensidad"
                helperText={errors.intensidad}
                error={!empty(errors.intensidad)}
                value={data.intensidad}
                options={[{label:'Mayor',value:'1.0'},{label:'Menor',value:'0.0'}]}
                onChange={onChange}
                required
            />
        </div>
        <div className="col-12 col-md-3">
            <IntegrationReactSelect
                id="brillo" 
                name="brillo"
                label="Brillo"
                helperText={errors.brillo}
                error={!empty(errors.brillo)}
                value={data.brillo}
                options={[{label:'Mayor',value:'1.0'},{label:'Menor',value:'0.0'}]}
                onChange={onChange}
                required
            />
        </div>
        <div className="col-12 col-md-3">
            <IntegrationReactSelect
                id="pieza" 
                name="pieza"
                label="Pieza"
                helperText={errors.pieza}
                error={!empty(errors.pieza)}
                value={data.pieza}
                options={[{label:'Pieza 1',value:'1'},{label:'Pieza 2',value:'2'},{label:'Pieza 3',value:'3'},{label:'Pieza 4',value:'4'}]}
                onChange={onChange}
                required
            />
        </div>
    </div>

      <CardActions>
        <Button
          className="ml-auto"
          variant="contained"
          color="primary"
          type="submit"
          onClick={lucesInteriores}
        >
          Luces interiores
        </Button>
      </CardActions>
      <div className="row">
        <div className="col-12 col-md-6">
            <IntegrationReactSelect
                id="gas" 
                name="gas"
                label="Alarma de gas"
                helperText={errors.gas}
                error={!empty(errors.gas)}
                value={data.gas}
                options={[{label:'Activar',value:'open'},{label:'Desactivar',value:'close'}]}
                onChange={onChange}
                required
            />
        </div>
        <div className="col-12 col-md-6">
            <IntegrationReactSelect
                id="movimiento" 
                name="movimiento"
                label="Alarma de movimiento"
                helperText={errors.movimiento}
                error={!empty(errors.movimiento)}
                value={data.movimiento}
                options={[{label:'Activar',value:'open'},{label:'Desactivar',value:'close'}]}
                onChange={onChange}
                required
            />
        </div>
    </div>

      <CardActions>
        <Button
          className="ml-auto"
          variant="contained"
          color="primary"
          type="submit"
          onClick={AlarmaGas}
        >
          ALARMA DE GAS
        </Button>
        <Button
          className="ml-auto"
          variant="contained"
          color="primary"
          type="submit"
          onClick={AlarmaMovimiento}
        >
          ALARMA DE MOVIMIENTO
        </Button>
      </CardActions>

      <div className="row">
        <div className="col-12">
            <IntegrationReactSelect
                id="exteriores" 
                name="exteriores"
                label="Luces exteriores"
                helperText={errors.exteriores}
                error={!empty(errors.exteriores)}
                value={data.exteriores}
                options={[{label:'Prender',value:'open'},{label:'Apgar',value:'close'}]}
                onChange={onChange}
                required
            />
        </div>
    </div>

      <CardActions>
        <Button
          className="ml-auto"
          variant="contained"
          color="primary"
          type="submit"
          onClick={LucesExteriores}
        >
          LUCES EXTERIORES
        </Button>
      </CardActions>
  </Card>
));

RemoteControlForm.propTypes = {
  data: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  lucesInteriores: PropTypes.func.isRequired,
  Persianas: PropTypes.func.isRequired,
  AlarmaGas: PropTypes.func.isRequired,
  AlarmaMovimiento: PropTypes.func.isRequired,
  LucesExteriores: PropTypes.func.isRequired,
};

export default RemoteControlForm;