const menuItems = {
  items: [
    {
      id: 'navigation',
      title: 'Main',
      type: 'group',
      icon: 'icon-navigation',
      children: [
        {
          id: 'dashboard',
          title: 'Dashboard',
          type: 'item',
          icon: 'feather icon-home',
          url: '/dashboard'
        },
        {
          id: 'device',
          title: 'Device',
          type: 'collapse',
          icon: 'feather icon-box',
          children: [
            {
              id: 'device1',
              title: 'Device 1',
              type: 'item',
              url: '/device/1'
            },
            {
              id: 'device2',
              title: 'Device 2',
              type: 'item',
              url: '/device/2'
            }
          ]
        }
      ]
    },
    {
      id: 'ui-forms',
      title: 'Admin',
      type: 'group',
      icon: 'icon-group',
      children: [
        // {
        //   id: 'forms',
        //   title: 'Form Elements',
        //   type: 'item',
        //   icon: 'feather icon-file-text',
        //   url: '/forms/form-basic'
        // },
        {
          id: 'table',
          title: 'User Management',
          type: 'item',
          icon: 'feather icon-server',
          url: '/users'
        }
      ]
    }
    // {
    //   id: 'pages',
    //   title: 'Pages',
    //   type: 'group',
    //   icon: 'icon-pages',
    //   children: [
    //     {
    //       id: 'auth',
    //       title: 'Authentication',
    //       type: 'collapse',
    //       icon: 'feather icon-lock',
    //       badge: {
    //         title: 'New',
    //         type: 'label-danger'
    //       },
    //       children: [
    //         {
    //           id: 'signup-1',
    //           title: 'Sign up',
    //           type: 'item',
    //           url: '/auth/signup-1',
    //           target: true,
    //           breadcrumbs: false
    //         },
    //         {
    //           id: 'signin-1',
    //           title: 'Sign in',
    //           type: 'item',
    //           url: '/auth/signin-1',
    //           target: true,
    //           breadcrumbs: false
    //         }
    //       ]
    //     }
    //   ]
    // }
  ]
};

export default menuItems;
