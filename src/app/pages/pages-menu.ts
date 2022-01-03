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
    icon: 'phone-call-outline',
    link: '/pages/phones/preaching',
  },
  {
    title: 'Revisitas',
    icon: 'calendar-outline',
    link: '/pages/phones/revisits',
  },
  {
    title: 'Gerar...',
    icon: 'plus-circle-outline',
    link: '/pages/phones/new',
  },
];
