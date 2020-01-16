import { client } from './routes.json';
import withAuthCheck from '../container/withAuthCheck';
import Root from '../component/Root';
import Base from '../component/Base';
import LoginPage from '../container/LoginPage';
import HomePage from '../component/HomePage';
import NotFoundPage from '../component/NotFoundPage';
import UserPage from '../container/UserPage';
import UserListPage from '../container/UserListPage';
import ConfNFCPage from '../container/ConNFCPage';
import RemoteControlPage from '../container/RemoteControlPage';

const routes = [{
  component: Root,
  routes: [
    {
      path: client.login,
      component: LoginPage
    },
    {
      component: Base,
      routes: [
        {
          path: client.home,
          exact: true,
          component: HomePage
        },
        {
          path: client.userList,
          exact: true,
          component: UserListPage
        },
        {
          path: client.user,
          exact: true,
          component: UserPage
        },
        {
          path: `${client.user}/:id`,
          exact: true,
          component: UserPage
        },
        {
          path: `${client.userNFC}/:id`,
          exact: true,
          component: ConfNFCPage
        },
        {
          path: client.remoteControl,
          exact: true,
          component: RemoteControlPage
        },
        {
          path: '*',
          component: NotFoundPage
        }
      ]
    }
  ]
}];

const addAuthCheck = routes => {
  routes.map(route => {
    if (route.routes !== undefined)
      addAuthCheck(route.routes);
    else
      route.component = withAuthCheck(route.component);
  });

  return routes;
};

export default addAuthCheck(routes);