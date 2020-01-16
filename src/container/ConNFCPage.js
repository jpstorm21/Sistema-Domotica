import React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import extend from 'smart-extend';
import ConfNFCForm from '../component/ConfNFCForm';
import {requestPost} from './request';
import { basename, client } from '../routes/routes.json';
import empty from 'is-empty';

const fields = {
  blinds:'',
  securityalarm: '',
  gasalarm: '',
  exteriorlights: '',
  interiorlights: '',
  lucesinterioresintensidad:'',
  lucesinteriorescolor:'',
  test:'',
  riego:'',
  porton:'',
  rut:''
};

@observer class ConfNFCPage extends React.Component {
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
      update: !empty(this.props.params.id),
      state: false,
      options1: [
        {
          label:'Abrir',
          value:true,
        },
        {
          label:'Cerrar',
          value: false
        }
      ],
      options2:[
        {
          label:'Encender',
          value:true,
        },
        {
          label:'Apagar',
          value: false
        }
      ],
      options3:[
        {
          label:'Activar',
          value:true,
        },
        {
          label:'Desactivar',
          value: false
        }
      ]
    };
    this.pageState.data['rut'] = this.props.params.id
    if(this.pageState.update)
      this.getPerfilUser();
  }

  getPerfilUser = () =>{
    let xhr = new XMLHttpRequest();
    xhr.open('get',`/api/perfilUser/${encodeURIComponent(this.props.params.id)}`)
    xhr.responseType = 'json';
    xhr.addEventListener('load',()=>{
      if (xhr.status === 200){
        console.log(xhr.response.data[0])
        if(empty(xhr.response.data[0])){
          console.log("entre")
          this.pageState.state = true;
        }else{
          this.pageState.data.blinds = xhr.response.data[0].blinds;
          this.pageState.data.gasalarm = xhr.response.data[0].gasalarm;
          this.pageState.data.exteriorlights = xhr.response.data[0].exteriorlights;
          this.pageState.data.interiorlights = xhr.response.data[0].interiorlights;
          this.pageState.data.riego = xhr.response.data[0].riego;
          this.pageState.data.porton = xhr.response.data[0].porton;
          this.pageState.data.lucesinteriorescolor = xhr.response.data[0].lucesinteriorescolor;
          this.pageState.data.lucesinterioresintensidad = xhr.response.data[0].lucesinterioresintensidad;
          this.pageState.data.securityalarm = xhr.response.data[0].securityalarm;
        }
      }else{
        this.props.showScreenMessage(xhr.response.message);
      }
    });
    xhr.send();
  }

  changeData = event => {
    let { name, value } = event.target;
    this.pageState.data[name] = value;
    console.log(name+":"+value)
    //requestPost("hsv",this.pageState.data.test)
  };

  registerNFC= () =>{
    event.preventDefault();
    this.props.showLoadingScreen(true);
    let formData = `data=${encodeURIComponent(JSON.stringify(this.pageState.data))}`;
    let xhr = new XMLHttpRequest();
    if (!this.pageState.state)
      xhr.open('put', `${basename}/api/perfil/${encodeURIComponent(this.props.params.id)}`);
    else
      xhr.open('post', `/api/perfil`);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      this.props.showLoadingScreen(false);
      this.props.showScreenMessage(xhr.response.message);
      if(xhr.status === 200)
        this.props.history.push(client.userList);
      else
        this.pageState.errors = extend.keys(fields).clone(fields, xhr.response.errors);
    });
    xhr.send(formData); 
  }

  render () {
    return (
      <ConfNFCForm
        onSubmit={this.registerNFC}
        onChange={this.changeData}
        {...this.pageState}
      />
    );
  }
}

export default ConfNFCPage;