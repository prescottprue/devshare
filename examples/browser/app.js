/* global Devshare */
console.log('Devshare', window.Devshare)

function getCurrentUser () {
  console.warn('user', Devshare.user('scott'))
  Devshare.user('scott').get().then(res => console.log('user loaded:', res))
}

function getAUser (username) {
  Devshare.user(username).get()
}


// function getCurrentUser () {
//   Devshare.auth.getCurrentUser()
// }

function getProject () {
  Devshare.project('scott', 'angularExample').get().then(res => console.log('project:', res))
}

function addProject () {
  Devshare.project('scott', 'angularExample').add().then(res => console.log('project:', res))
}
