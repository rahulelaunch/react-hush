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
      to: '/app/calendar',
      active: true
    },
    {
      name: 'Chat',
      icon: 'comments',
      to: '/app/chat',
      active: true
    },

  ]
};





export default [
  dashboardRoutes,
  appRoutes,
];
