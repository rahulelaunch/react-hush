export const dashboardRoutes = {
  label: 'Dashboard',
  labelDisable: true,
  children: [
    {
      name: 'Dashboard',
      active: true,
      icon: 'chart-pie',
      to: '/admin/dashboard',
      exact: true,
      active: true
    }
  ]
};
export const appRoutes = {
  label: 'app',
  children: [
    {
      name: 'Users',
      icon: 'users',
      to: '/admin/users',
      active: true
    },

    {
      name: 'Body Type',
      icon: 'user',
      to: '/admin/body/list',
      active: true
    },
    {
      name: 'Fashion Type',
      icon: 'users',
      to: '/admin/fashion/list',
      active: true
    },
    {
      name: 'Desire',
      icon: 'comments',
      to: '/admin/desire/list',
      active: true
    },
    {
      name: 'Education',
      icon: 'comments',
      to: '/admin/education/list',
      active: true
    },
    {
      name: 'Annul Income',
      icon: 'comments',
      to: '/admin/income/list',
      active: true
    },
  ]
};


export default [
  dashboardRoutes,
  appRoutes,
];
