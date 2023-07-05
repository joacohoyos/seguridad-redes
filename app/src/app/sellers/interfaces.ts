export interface ISeller {
  id: string;
  name: string;
  email: string;
  role: 0 | 1;
}

export interface IRoute {
  path: string;
  name: string; 
}

export const SELLER_ROUTES: IRoute[] = []

export const ADMIN_ROUTES: IRoute[] = [{
  path: '/notifications',
  name: 'Notifications'
}, {
  path: '/sellers',
  name: 'Sellers'
}]
