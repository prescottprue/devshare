/* eslint-disable no-unused-vars */
/* global devshare */
let devshare = window.Devshare.default
console.log('Devshare', devshare)

setStatus()

function login () {
  var username = document.getElementById('login-username').value
  var password = document.getElementById('login-password').value
  return devshare.login(username, password)
    .then(res => setStatus())
}
function logout () {
  return devshare.logout()
    .then(res => setStatus())
}

function signup () {
  var username = document.getElementById('signup-username').value
  var password = document.getElementById('signup-password').value
  var name = document.getElementById('signup-name').value
  var email = document.getElementById('signup-email').value
  return devshare.signup(
    {
      username: username,
      email: email,
      password: password,
      name: name
    }
  )
  .then(res => setStatus())
}

function authWithProvider (provider) {
  return devshare.authWithProvider({ provider: provider })
    .then(res => setStatus())
}

function getUser (username) {
  return devshare.user(username)
    .get()
    .then(res => console.log('user loaded:', res))
}

function currentUser () {
  return devshare.currentUser()
}

function getProject () {
  devshare.project('scott', 'angularExample')
    .get()
    .then(res => console.log('project:', res))
}

function addProject () {
  devshare.project('scott', 'angularExample')
    .add()
    .then(res => console.log('project:', res))
}

// Set status styles
function setStatus () {
  var statusEl = document.getElementById('status')
  var logoutButton = document.getElementById('logout-btn')

  if (devshare.getCurrentUser()) {
    statusEl.innerHTML = 'True'
    statusEl.style.color = 'green'
    // statusEl.className = statusEl.className ? ' status-loggedIn' : 'status-loggedIn'
    logoutButton.style.display = 'inline'
  } else {
    statusEl.innerHTML = 'False'
    statusEl.style.color = 'red'
    logoutButton.style.display = 'none'
  }
}
