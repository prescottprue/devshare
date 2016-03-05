# Authentication

## signup

Signup with devshare

```javascript
//Signup a new user
import { signup } from 'devshare'
var signupData =
signup({
  username: 'testuser1',
  email: 'test@email.com',
  password: 'testpassword'
}).then(function(signupRes){
  console.log('New user signed up successfully. New user: ', signupRes.user)
}, function(err){
  console.error('Error signing up:', err)
})
```

## login

Log into application

```javascript
import { login } from 'devshare'
login('username', 'password').then(function(loginRes){
  console.log('Logged in succesfully. User: ', loginRes.user)
}, function(err){
  console.error('Error logging in:', err)
})
```

## logout

Logout of currently logged in user

```javascript
import { logout } from 'devshare'
logout().then(function(loginRes){
  console.log('Logged out successfully')
})
```

## getCurrentUser

Get the account for the currently logged in user

```javascript
import { getCurrentUser } from 'devshare'
getCurrentUser().then(function(currentUser){
  console.log('Currently logged in user:', currentUser)
}, function(err){
  console.error('Error getting current user', err)
})
```

## recover

Recover user by providing username

```javascript
recover('testUser').then(function(updatedUser){
  console.log('Currently logged in user:', updatedUser)
}, function(err){
  console.error('Error updating profile:', err)
})
```

## uploadAvatar

Upload an image file as an avatar

```javascript
import { uploadAvatar } from 'devshare'
uploadAvatar(file).then(function(imgUrl){
  console.log('Avatar uploaded:', imgUrl)
}, function(err){
  console.error('Error uploading image:', err)
})
```
