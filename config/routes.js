module.exports.routes = {
  'post /': {
    action: 'index/index'
  },

  'post /email/send-email': {
    action: 'email/send-email'
  },

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

  'post /user/forget-username': {
    action: 'user/forgot-username'
  },

  'post /user/forget-password': {
    action: 'user/forgot-password'
  },

  'post /login': {
    action: 'user/delete-user'
  },

  'post /log/list': {
    action: 'user/delete-user'
  },

};
