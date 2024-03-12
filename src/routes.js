import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import Users from './pages/Users/Users';
import { Signin } from './pages';
import Home from './pages/Home/Home';

export default {
  items: [
    {
      path: '/',
      name: 'Home',
      type: 'external',
      access: null,
      icon: PeopleAltIcon,
      component: Home
    },
    {
      path: '/users',
      name: 'Users',
      type: 'link',
      access: 'View User',
      icon: PeopleAltIcon,
      component: Users
    },
    // {
    //   path: '/profile',
    //   name: 'Profile',
    //   type: 'external',
    //   access: null,
    //   icon: PeopleIcon,
    //   component: Profile
    // },
  ]
};
