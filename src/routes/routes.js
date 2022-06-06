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
export const userRoutes = {
  label: 'User Option',
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
          name: 'Hair Color',
          to: '/admin/hair/list',
          active: true
        },
        {
          name: 'Eye Color',
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
          name: 'Annual Income',
          to: '/admin/income/list',
          active: true
        },
      ]
    }, 
  ]
};

export const appRoutes = {
  label: 'App',
  children: [
    {
      name: 'Location',
      icon: 'map',
      active: true,
      children: [
        {
          name: 'Country',
          to: '/admin/country/list',
          active: true
        },
        {
          name: 'State',
          to: '/admin/state/list',
          active: true
        },
      ]
    },
 
    {
      name: 'Mobile Plan',
      icon: ['fab', 'trello'],
      to: '/admin/plan/list',
      active: true
    },
    {
      name: 'Terms & Conditions',
      icon: 'question-circle',
      to: '/admin/terms_conditions/list',
      active: true
    },
 
  ]
};


export default [
  dashboardRoutes,
  userRoutes,
  appRoutes,
];
