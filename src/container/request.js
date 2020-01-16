import $ from "jquery";
const deviceID2 = "e00fce68b1cb466736b978b7";
const deviceID    = "560046000351353530373132";
const accessToken = "c70ec45c5de12b386ee502f811b05662c78e4e39";

 export const requestPost = (func, params) => {
  if(func == 'hsv'){
    let pieza = params.split(',')[3];
    if(pieza == 3){
      params = params.split(',')[0]+","+params.split(',')[1]+","+params.split(',')[2]+",1";
      var requestURL = `https://api.particle.io/v1/devices/${deviceID2}/${func}`;
      $.ajax({
        url: requestURL,
        type: 'POST',
        headers: {"Authorization": 'Bearer ' + accessToken},
        data: {arg: params}
      });
    }
    if(pieza== 4){
      params = params.split(',')[0]+","+params.split(',')[1]+","+params.split(',')[2]+",2";
      var requestURL = `https://api.particle.io/v1/devices/${deviceID2}/${func}`;
      $.ajax({
        url: requestURL,
        type: 'POST',
        headers: {"Authorization": 'Bearer ' + accessToken},
        data: {arg: params}
      });
    }else{
      console.log('aqui',deviceID,func,params)
      params = params.split(',')[0]+","+params.split(',')[1]+","+params.split(',')[2]+","+pieza;
      var requestURL = `https://api.particle.io/v1/devices/${deviceID}/${func}`;
      $.ajax({
        url: requestURL,
        type: 'POST',
        headers: {"Authorization": 'Bearer ' + accessToken},
        data: {arg: params}
      });
    }
  }else{
    console.log('porton')
    var requestURL = `https://api.particle.io/v1/devices/${deviceID}/${func}`;
      $.ajax({
        url: requestURL,
        type: 'POST',
        headers: {"Authorization": 'Bearer ' + accessToken},
        data: {arg: params}
      });
  }
}
  