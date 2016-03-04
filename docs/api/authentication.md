# Authentication

## signup

Signup with devshare

```javascript
//Signup a new user
  var signupData = {username: 'testuser1', email:'test@email.com', password: 'testpassword'}
  devshare.signup(signupData).then(function(signupRes){
    console.log('New user signed up successfully. New user: ', signupRes.user)
  }, function(err){
    console.error('Error signing up:', err)
  })
```

## login

Log into application

```javascript
  var loginData = {username: 'testuser1', password: 'testpassword'}
  devshare.login(loginData).then(function(loginRes){
    console.log('New user logged in succesfully. User: ', loginRes.user)
  }, function(err){
    console.error('Error logging in:', err)
  })
```

## logout

Logout of currently logged in user

```javascript
  devshare.logout().then(function(loginRes){
    console.log('Logged out successfully')
  }, function(err){
    console.error('Error logging out:', err)
  })
```

## getCurrentUser

Get the account for the currently logged in user

```javascript
  devshare.getCurrentUser().then(function(currentUser){
    console.log('Currently logged in user:', currentUser)
  }, function(err){
    console.error('Error logging out:', err)
  })
```

## recover

Recover user by providing username

```javascript
  devshare.recover('testUser').then(function(updatedUser){
    console.log('Currently logged in user:', updatedUser)
  }, function(err){
    console.error('Error updating profile:', err)
  })
```

## uploadAvatar

Upload an image file as an avatar

```javascript
  devshare.uploadAvatar(file).then(function(imgUrl){
    console.log('Avatar uploaded:', imgUrl)
  }, function(err){
    console.error('Error uploading image:', err)
  })
```
