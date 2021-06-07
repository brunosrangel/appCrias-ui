import { NavItem } from './nav-item';

export let menu: NavItem[] = [
  {
    displayName: 'Dashboard',
    iconName: 'dashboard',
    route: 'dashboard',
    profile : 1
  },
  {
    displayName: 'Produtos',
    iconName: 'dashboard',
    route: 'product-mode/products',
    profile : 1
  },
  {
    displayName: 'Contacts',
    iconName: 'group',
    route: 'contacts',
    profile : 1,
    children: [
      {
        displayName: 'View Contacts',
        iconName: 'list',
        route: 'contacts/view-contacts',
        profile : 1
      },
      {
        displayName: 'Add Contact',
        iconName: 'add_box',
        route: 'contacts/add-contact',
        profile : 1
      }
    ]
  },
  {
    displayName: 'Dados Usuário',
    iconName: 'face',
    route: 'user',
    profile : 0,
    children: [
      {
        displayName: 'Informações do Usuário',
        iconName: 'account_box',
        route: 'user/account-info',
        profile : 0
      },
      {
        displayName: 'Profile Image',
        iconName: 'image',
        route: 'user/profile-image',
        profile : 1
      }
    ]
  },
  {
      displayName: 'Sair',
      iconName: 'highlight_off',
      profile : 0
  }
];
