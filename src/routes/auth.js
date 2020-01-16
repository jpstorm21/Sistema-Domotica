import Express from 'express';
import { python, scriptFolder, loginUCNScript } from '../config.json';
import { basename, client } from './routes.json';
import { exec } from 'child_process';
import Rut from 'rutjs';
import Passport from 'passport';
import User from '../models/user';

const router = new Express.Router();

router.post('/loginUCN', (req, res) => {
  const command = `${python} ${scriptFolder}/${loginUCNScript} ${req.body.userId} ${req.body.password}`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Error al verificar login UCN.',
        error: error || stderr
      });
    }

    if (stdout.indexOf('True') != -1) {
      let rut = new Rut(`${req.body.userId}`);
      let userId = rut.isValid ? rut.getNiceRut() : req.body.userId;

      User.register(
        { user_id: userId, user_type_id: 'USR', campus_id: 'CQ' },
        req.body.password.trim(),
        err => {
          if (err) {
            if (err.message.indexOf('User already exists') !== -1) {
              User.update(userId, req.body.password.trim(), error => {
                if (error) {
                  return res.status(400).json({
                    success: false,
                    message: 'Error al actualizar la información del usuario.',
                    error: error
                  });
                } else {
                  return res.status(200).json({
                    success: true,
                    message: 'Usuario UCN actualizado con éxito.'
                  });
                }
              });
            } else {
              return res.status(400).json({
                success: false,
                message: 'No se pudo procesar el formulario.',
                error: err.message
              });
            }
          } else {
            return res.status(200).json({
              success: true,
              message: 'Usuario UCN registrado con éxito!'
            });
          }
        }
      );
    } else {
      res.status(200).json({
        success: false,
        message: 'No se pudo identificar al usuario con el login UCN.'
      });
    }
  });
});

router.post('/login', Passport.authenticate('local'), (req, res) => {
  return res.json({
    success: true,
    message: 'Ha logrado ingresar al sistema con éxito!',
    user: req.user
  });
});

router.get('/checkLogin', (req, res) => {
  res.status(200).json({
    logged: req.isAuthenticated()
  });
});

router.get('/logout', (req, res) => {
  req.logOut();
  res.redirect(basename + client.login);
});

export default router;