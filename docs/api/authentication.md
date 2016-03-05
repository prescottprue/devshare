# Authentication

## signup

Signup with devshare

```javascript
//Signup a new user
import { signup } from 'devshare'

signup({
  username: 'testuser1',
  email: 'test@email.com',
  password: 'testpassword'
}).then(function(signupRes){
  console.log('new user signed up successfully. New user: ', signupRes.user)
}, function(err){
  console.error('error signing up:', err)
})
```

## login

Log into application

```javascript
import { login } from 'devshare'

login('username', 'password').then(function(loginRes){
  console.log('logged in successfully. User: ', loginRes.user)
}, function(err){
  console.error('error logging in:', err)
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
  console.error('error getting current user', err)
})
```

## recover

Recover user by providing username

```javascript
recover('testUser').then(function(updatedUser){
  console.log('Currently logged in user:', updatedUser)
}, function(err){
  console.error('error updating profile:', err)
})
```

## uploadAvatar

Upload an image file as an avatar

```javascript
import { uploadAvatar } from 'devshare'
uploadAvatar(file).then(function(imgUrl){
  console.log('Avatar uploaded:', imgUrl)
}, function(err){
  console.error('error uploading image:', err)
})
```
