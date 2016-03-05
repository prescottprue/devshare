# Projects

## Get

Get a project

```javascript
import { projects } from 'devshare'
//Get user's project named 'projectName'
projects('username', 'projectName')
  .get()
  .then(project => {
    console.log('project loaded:', project)
  })
```

## Rename

Rename a project

```javascript
import { projects } from 'devshare'
//Get user's project named 'projectName'
projects('username', 'projectName')
  .rename()
  .then(project => {
    console.log('project loaded:', project)
  })
```

## Remove

Remove/Delete a project

```javascript
import { projects } from 'devshare'
//Get user's project named 'projectName'
projects('username', 'projectName')
  .remove()
  .then(project => {
    console.log('project loaded:', project)
  })
```

## Add Collaborator

Add a collaborator to a project

```javascript
import { projects } from 'devshare'
//Get user's project named 'projectName'
projects('username', 'projectName')
  .addCollaborator('collabUsername')
  .then(project => {
    console.log('collaborator added successfully:', project)
  })
```

## Add Multiple Collaborators

Add an array of collaborators to a project

```javascript
import { projects } from 'devshare'
//Get user's project named 'projectName'
projects('username', 'projectName')
  .addCollaborators(['collabUsername1', 'collabUsername2'])
  .then(project => {
    console.log('collaborator added successfully:', project)
  })
```

## Remove Collaborator

Remove a collaborator from a project

```javascript
import { projects } from 'devshare'
//Get user's project named 'projectName'
projects('username', 'projectName')
  .removeCollaborator('collabUsername')
  .then(project => {
    console.log('project loaded:', project)
  })
```
