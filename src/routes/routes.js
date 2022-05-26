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
      name: 'User Profile',
      icon: 'users',
      active: true,
      children: [
        {
          name: 'Users',
          to: '/admin/users',
          active: true
        },
    
        {
          name: 'Body Type',
          to: '/admin/body/list',
          active: true
        },
        {
          name: 'Hair',
          to: '/admin/hair/list',
          active: true
        },
        {
          name: 'Eye',
          to: '/admin/eye/list',
          active: true
        },
        {
          name: 'Fashion Type',
          to: '/admin/fashion/list',
          active: true
        },
        {
          name: 'Desire',
          to: '/admin/desire/list',
          active: true
        },
        {
          name: 'Education',
          to: '/admin/education/list',
          active: true
        },
        {
          name: 'Annul Income',
          to: '/admin/income/list',
          active: true
        },
      ]
    },
    {
      name: 'Location',
      icon: 'map',
      active: true,
      children: [
        {
          name: 'Country',
          icon: 'comments',
          to: '/admin/country/list',
          active: true
        },
        {
          name: 'State',
          icon: 'comments',
          to: '/admin/state/list',
          active: true
        },
      ]
    },
 
    {
      name: 'Mobile Plan',
      icon: 'comments',
      to: '/admin/plan/list',
      active: true
    },
    {
      name: 'Terms & Conditions',
      icon: 'comments',
      to: '/admin/terms_conditions/list',
      active: true
    },
 
  ]
};


export default [
  dashboardRoutes,
  appRoutes,
];
