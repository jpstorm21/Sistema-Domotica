import React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import extend from 'smart-extend';
import RemoteControlForm from '../component/RemoteControlForm';
import {requestPost} from './request';

const fields = {
    porton:'',
    persianas:'',
    pieza:'',
    interiores:'',
    intensidad:'',
    brillo:'',
    movimiento:'',
    gas:'',
    exteriores:''
};

@observer class RemoteControlPage extends React.Component {
  @observable pageState = {};

  /**
   * Class constructor.
   */
  constructor (props) {
    super(props);

    // Set the initial component state.
    this.pageState = {
      data: extend.clone(fields),
      errors: extend.clone(fields),
    };
  }

  changeData = event => {
    let { name, value } = event.target;
    this.pageState.data[name] = value;
    console.log(name+":"+value)
  };

  Porton= () =>{
    event.preventDefault();
    requestPost("gate",this.pageState.data.porton)
  }

  Persianas= () =>{
    event.preventDefault();
    console.log('Persianas')
    //requestPost("gate",this.pageState.data.porton)
  }

  AlarmaGas= () =>{
    event.preventDefault();
    console.log('Alarma de gas')
    //requestPost("gate",this.pageState.data.porton)
  }
  AlarmaMovimiento= () =>{
    event.preventDefault();
    console.log('Alarma de movimiento')
    //requestPost("gate",this.pageState.data.porton)
  }
  LucesExteriores= () =>{
    event.preventDefault();
    console.log('Luces Exteriores')
    //requestPost("gate",this.pageState.data.porton)
  }

  lucesInteriores= ()=>{
    event.preventDefault();
    let parametro = this.pageState.data.interiores+","+this.pageState.data.intensidad+","+this.pageState.data.brillo+","+this.pageState.data.pieza;
    console.log(parametro);
    requestPost("hsv",parametro)
  }

  render () {
    return (
      <RemoteControlForm
        onSubmit={this.Porton}
        lucesInteriores={this.lucesInteriores}
        Persianas={this.Persianas}
        AlarmaGas={this.AlarmaGas}
        AlarmaMovimiento={this.AlarmaMovimiento}
        LucesExteriores={this.LucesExteriores}
        onChange={this.changeData}
        {...this.pageState}
      />
    );
  }
}

export default RemoteControlPage;