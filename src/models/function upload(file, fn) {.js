function upload(file, fn) {
  // fake upload file, just return file as id
  setTimeout(() => fn(null, {
    public_id: file
  }), Math.floor(Math.random() * 500))
}

// fake req.files
let files = [1, 2, 3, 4, 5, 6]

let upload_image = () => {
  let upload_res = files.map(file => new Promise((resolve, reject) => {
    upload(file, (error, result) => {
      if (error) reject(error)
      else resolve(result.public_id);
    })
  }))

  Promise.all(upload_res)
    .then(result => console.log({
      'response': result
    }))
    .catch(error => error)

}
upload_image()

exports.upload_image = async(req, res) =>{
    // res_promises will be an array of promises
    let res_promises = req.files.map(file => new Promise((resolve, reject) => {
        cloudinary.v2.uploader.upload(file.path, { use_filename: true, unique_filename: false }, function (error, result) {
            if(error) reject(error)
            else resolve(result.public_id)
        })
    })
    )
    // Promise.all will fire when all promises are resolved 
    Promise.all(res_promises)
    .then(result =>  res.json({'response':upload}))
    .catch((error) => {/*  handle error */ })
}