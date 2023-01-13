module.exports.routes = {
  'post /': {
    action: 'index/index'
  },

  'post /email/send-email': {
    action: 'email/send-email'
  },

  // User CRUD
  'post /user/create': {
    action: 'user/create-user'
  },
  'post /user/list': {
    action: 'user/list-user'
  },
  'post /user/update': {
    action: 'user/update-user'
  },
  // No user delete for now
  // 'post /user/delete': {
  //   action: 'user/delete-user'
  // },
  'post /user/list-access-rights': {
    action: 'user/list-access-rights'
  },

  //User Actions
  'post /user/forget-username': {
    action: 'user/forgot-username'
  },
  'post /user/forget-password': {
    action: 'user/forgot-password'
  },
  'post /login': {
    action: 'user/login'
  },

  // Event CRUD
  'post /event/create': {
    action: 'event/create-event'
  },
  'post /event/list': {
    action: 'event/list-event'
  },
  'post /event/update': {
    action: 'event/update-event'
  },
  // 'post /event/delete': {
  //   action: 'event/delete-event'
  // },

  // Form CRUD
  'post /form/create': {
    action: 'form/create-form'
  },
  'post /form/list': {
    action: 'form/list-form'
  },
  'post /form/update': {
    action: 'form/update-form'
  },

  // Form CRUD
  'post /response/create': {
    action: 'response/create-response'
  },
  'post /response/list': {
    action: 'response/list-response'
  },
  'post /response/update': {
    action: 'response/update-response'
  },

  // Custom Log CRUD
  'post /log/list': {
    action: 'custom-log/list-custom-log'
  },

};
