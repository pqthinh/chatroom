import { storage } from 'boot/firebase'

const uploadImage = (bucket, file) => {
  const uploadPromise = new Promise((resolve, reject) => {
    var uploadTask = storage.ref().child(bucket).put(file)
    uploadTask.on(
      'state_changed',
      snapshot => {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log('Upload is ' + progress + '% done')
      },
      error => {
        console.log(error)
        reject(error)
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
          console.log('File available at', downloadURL)
          resolve(downloadURL)
        })
      }
    )
  })
  return uploadPromise
}

export { uploadImage }
