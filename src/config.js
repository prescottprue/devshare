export default {
  paths: {
    files: 'files',
    users: 'users',
    projects: 'projects',
    projectNames: 'projectNames',
    usernames: 'usernames'
  },
  firebase: {
    prod: {
      apiKey: 'AIzaSyBQw-StxUsUhoQwZqaawegUFO7YOyG_HDA',
      authDomain: 'devshare-1.firebaseapp.com',
      databaseURL: 'https://devshare-1.firebaseio.com',
      storageBucket: 'devshare-1.appspot.com'
    },
    dev: {
      apiKey: 'AIzaSyBuwR21cO0lMzMr_T-Dl_jG1dsORXZ1fwY',
      authDomain: 'devshare-stg.firebaseapp.com',
      databaseURL: 'https://devshare-stg.firebaseio.com',
      storageBucket: 'devshare-stg.appspot.com'
    }
  },
  highlightColors: [
    '#FF0000', '#FF00F1', '#F1C40F',
    '#D35400', '#FF08', '#2980B9',
    '#9B59B6'
  ],
  zipSuffix: '-devShare-export'
}
