export interface NavItem {
  displayName: string;
  disabled?: boolean;
  iconName: string;
  route?: string;
  profile?: number;
  children?: NavItem[];
}
