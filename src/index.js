export default function(config) {
  // Logic for auth

  return {
    storage: storage(auth),
    cloud: cloud(auth),
    fileSystem: fileSystem(auth)
  }

}
