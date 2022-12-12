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
  'post /user/delete': {
    action: 'user/delete-user'
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

  // Custom Log CRUD
  'post /log/list': {
    action: 'custom-log/list-custom-log'
  },

};
