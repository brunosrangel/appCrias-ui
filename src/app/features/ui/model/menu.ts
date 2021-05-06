import { NavItem } from './nav-item';

export let menu: NavItem[] = [
  {
    displayName: 'Dashboard',
    iconName: 'dashboard',
    route: 'dashboard'
  },
  {
    displayName: 'Produtos',
    iconName: 'dashboard',
    route: 'product-mode/products'
  },
  {
    displayName: 'Contacts',
    iconName: 'group',
    route: 'contacts',
    children: [
      {
        displayName: 'View Contacts',
        iconName: 'list',
        route: 'contacts/view-contacts'
      },
      {
        displayName: 'Add Contact',
        iconName: 'add_box',
        route: 'contacts/add-contact'
      }
    ]
  },
  {
    displayName: 'User',
    iconName: 'face',
    route: 'user',
    children: [
      {
        displayName: 'Account Info',
        iconName: 'account_box',
        route: 'user/account-info'
      },
      {
        displayName: 'Profile Image',
        iconName: 'image',
        route: 'user/profile-image'
      }
    ]
  },
  {
      displayName: 'Sign Out',
      iconName: 'highlight_off'
  }
];
