import connection from './postgresConnection';
import { client } from '../routes/routes.json';
import User from '../models/user';

const functionQueries = {};

functionQueries.getAuthenticatedUserData = (req, res) => {
  let user = {
    id: req.user.id,
    userId: req.user['user_id'],
    campus: req.user['campus_id'],
    name: req.user.name,
    type: req.user['user_type_id'],
  };
  let data = { type: user.type, pathname: req.body.pathname || '' };

  connection.tx(t => {
    let queries = [];

    let query = 'SELECT COUNT(*)\
                FROM user_permission INNER JOIN system_page ON user_permission.system_page_id = system_page.id\
                WHERE user_permission.user_type_id = ${type} AND system_page.link = ${pathname}';
    queries.push(t.one(query, data));

    query = 'SELECT menu_group.text, CASE WHEN menu_group.menu_order IS NULL THEN 0 ELSE menu_group.menu_order END AS menu_order,\
              json_agg(json_build_object(\'text\', system_page.text, \'link\', system_page.link, \'icon\', system_page.icon) ORDER BY user_permission.menu_order) AS link\
            FROM user_permission\
              INNER JOIN system_page ON user_permission.system_page_id = system_page.id\
              LEFT JOIN menu_group ON user_permission.menu_group_id = menu_group.id\
            WHERE user_type_id = ${type} AND in_menu\
            GROUP BY menu_group.menu_order, menu_group.text\
            ORDER BY menu_order';
    queries.push(t.any(query, data));

    return t.batch(queries);
  })
    .then(result => {
      let menu = [];

      result[1].map(row => {
        if (!row.text)
          row.link.map(menuItem => menu.push(menuItem));
        else
          menu.push(row);
      });

      let permission = [client.login, client.home, '*'].indexOf(data.pathname) != -1 || result[0].count > 0;

      res.status(permission ? 200 : 403).json({
        logged: true,
        hasPermission: permission,
        user,
        menu
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err, message: 'Error al obtener los datos del usuario.' });
    });
};


/**
 * 
 */
functionQueries.getUserById = (req, res) =>{
  let query = 'SELECT user_id as rut, user_type_id as user_type, name, email, phone FROM public.user WHERE user_id = $1';

  connection.oneOrNone(query, req.params.id)
    .then(data => {
      res.status(200).json({ data });
    })
    .catch(err => {
      res.status(400).json({
        error:err,
        message:'Error al obtener los datos del usuario.'
      });
    });
};

/**
 * 
 */
functionQueries.getUserList = (req, res) =>{
  let query = 'SELECT user_id AS rut, user_type_id AS user_type, name, email, phone FROM "user"';

  connection.any(query)
    .then(data => {
      res.status(200).json({ data });
    })
    .catch(err => {
      res.status(500).json({
        error: err,
        message: 'Error al obtener la lista de usuarios.'
      });
    });
};

/**
 * 
 */
functionQueries.getUserTypeList = (req, res) =>{
  connection.any('SELECT * FROM user_type')
    .then(data => {
      res.status(200).json({ data });
    })
    .catch(err => {
      res.status(500).json({
        error: err,
        message: 'Error al obtener la lista de tipos de usuario.'
      });
    });
};

functionQueries.getOptionList = (req, res) =>{
  console.log("dsgs")
  connection.any('SELECT * FROM options')
    .then(data => {
      res.status(200).json({ data });
    })
    .catch(err => {
      res.status(500).json({
        error: err,
        message: 'Error al obtener la lista de opciones.'
      });
    });
};


functionQueries.getPerfilUser = (req,res) =>{
  connection.any('SELECT alarmagas as gasalarm, alarmaseguridad as securityalarm,lucesexteriores as exteriorlights, \
                  lucesinteriores as interiorlights, lucesinterioresintensidad as lucesinterioresintensidad,\
                  lucesinteriorescolor as lucesinteriorescolor,persianas as blinds,riego, porton \
                  FROM perfil WHERE user_id = $1',req.params.id)
  .then(data => {
    res.status(200).json({ data });
  })
  .catch(err => {
    res.status(500).json({
      error: err,
      message: 'Error al obtener la configuración del usuario.'
    });
  });
}

/**
 * 
 */
functionQueries.insertUser = (req, res) =>{
  User.register(
    {
      user_id: req.body.rut,
      user_type_id: req.body.userType,
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone
    },
    req.body.password,
    err => {
      if (err) {
        let error = 'No se pudo procesar el formulario.';
        if (err.message.indexOf('User already exists') !== -1) {
          error = 'El usuario ingresado ya existe.'
        }

        return res.status(400).json({
          success: false,
          message: error,
          error: err.message
        });
      } else {
        return res.status(200).json({
          success: true,
          message: 'Usuario ingresado con correctamente.'
        });
      }
    }
  );
};

functionQueries.insertPerfil = (req,res) =>{
  req.body = JSON.parse(req.body.data)
  connection.tx(t=>{
    let queryData ={
      user_id:req.body.rut,
      persianas:req.body.blinds == '' ? false:req.body.blinds,
      alarmaseguridad:req.body.securityalarm == '' ? false:req.body.securityalarm,
      alarmagas:req.body.gasalarm == '' ? false:req.body.gasalarm,
      lucesexteriores:req.body.exteriorlights == '' ? false:req.body.exteriorlights,
      lucesinteriores:req.body.interiorlights == '' ? false:req.body.interiorlights,
      lucesinterioresintensidad:req.body.lucesinterioresintensidad == '' ? false:req.body.lucesinterioresintensidad,//ver que mandar
      lucesinteriorescolor:req.body.lucesinteriorescolor == '' ? false:req.body.lucesinteriorescolor,//ver que mandar
      porton:req.body.porton  == '' ? false:req.body.porton,
      riego:req.body.riego == '' ? false:req.body.riego
    };
    let query = 'INSERT INTO perfil(${this~}) VALUES (${user_id},${persianas},${alarmaseguridad},${alarmagas},${lucesexteriores},\
                 ${lucesinteriores},${lucesinterioresintensidad},${lucesinteriorescolor},${porton},${riego})';
    return t.none(query,queryData);
  })
  .then(() => {
    res.status(200).json({ message:'Perfil guardado exitosamente'});
  })
  .catch(err => {
    console.log(err)
    res.status(400).json({
      error:err,
      message:'Error al guardar los datos del perfil.'
    });
  });
}

/**
 * 
 */
functionQueries.updateUser = (req, res) =>{
  connection.tx(t => {
    let queryData = {
      user_id: req.params.id,
      name: req.body.name,
      user_type_id: req.body.userType,
      email: req.body.email,
      phone: req.body.phone
    };
    let query = 'UPDATE "user"\
                SET user_type_id = ${user_type_id}, name = ${name}, email = ${email}, phone = ${phone}\
                WHERE user_id = ${user_id}';

    return t.none(query, queryData);
  })
    .then(data => {
      res.status(200).json({ data });
    })
    .catch(err => {
      res.status(400).json({
        error:err,
        message:'Error al actualizar los datos del usuario.'
      });
    });
};


functionQueries.updatePerfil = (req,res) =>{
  req.body = JSON.parse(req.body.data)
  connection.tx(t=>{
    let queryData ={
      user_id:req.params.id,
      persianas:req.body.blinds == '' ? false:req.body.blinds,
      alarmaseguridad:req.body.securityalarm == '' ? false:req.body.securityalarm,
      alarmagas:req.body.gasalarm == '' ? false:req.body.gasalarm,
      lucesexteriores:req.body.exteriorlights == '' ? false:req.body.exteriorlights,
      lucesinteriores:req.body.interiorlights == '' ? false:req.body.interiorlights,
      lucesinterioresintensidad:req.body.lucesinterioresintensidad == '' ? false:req.body.lucesinterioresintensidad,//ver que mandar
      lucesinteriorescolor:req.body.lucesinteriorescolor == '' ? false:req.body.lucesinteriorescolor,//ver que mandar
      porton:req.body.porton  == '' ? false:req.body.porton,
      riego:req.body.riego == '' ? false:req.body.riego
    };
    console.log(queryData)
    let query = 'UPDATE perfil SET persianas = ${persianas}, alarmaseguridad =${alarmaseguridad},alarmagas =${alarmagas},lucesexteriores=${lucesexteriores},\
                 lucesinteriores =${lucesinteriores},lucesinterioresintensidad=${lucesinterioresintensidad},lucesinteriorescolor=${lucesinteriorescolor},\
                 porton=${porton},riego=${riego} WHERE user_id =${user_id}';
    return t.none(query, queryData);
  })
  .then(data => {
    res.status(200).json({ data });
  })
  .catch(err => {
    console.log(err)
    res.status(400).json({
      error:err,
      message:'Error al actualizar el perfil.'
    });
  });
};

export default functionQueries;