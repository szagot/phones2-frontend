import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Usuários',
    icon: 'people-outline',
    link: '/pages/users/list',
  },
  {
    title: '',
    group: true,
  },
  {
    title: 'Campo',
    home: true,
    icon: 'email-outline',
    link: '/pages/phones/preaching',
  },
  {
    title: 'Revisitas',
    icon: 'bar-chart-outline',
    link: '/pages/phones/revisits',
  },
];
