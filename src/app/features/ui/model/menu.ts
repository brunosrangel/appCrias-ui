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
    displayName: 'User',
    iconName: 'face',
    route: 'user',
    children: [
      {
        displayName: 'Informações do Usuário',
        iconName: 'account_box',
        route: 'user/account-info',
        profile : 1
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
      displayName: 'Sign Out',
      iconName: 'highlight_off'
  }
];
