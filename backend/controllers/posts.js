const Post = require('../models/post')

exports.CreatePost = (req, res, next) => {     //router.post to use request of posts   ii) multer(storage).single('image')   this function mean we expect single file with property name image from frontnend
  const url = req.protocol + '://' + req.get("host")   //this is to get address of server so we can put it in our saved image
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    imagePath: url + "/images/" + req.file.filename,
    creator: req.userData.userId
  })
  post.save().then((createdPost) => {   //get results after saving so we can send newly generated post id to frotnend
    res.status(201).json({   //we can send status codes as here we are sending 201 that resource is addedd successfully
      message: 'Post added successfully',
      post: { ...createdPost, id: createdPost._id },
      success: true
    })
  }).catch(err => {
    res.status(500).json({
      message: 'There comes some issues while creating post',
      success: false
    })
  })
}

exports.UpdatePost = (req, res, next) => {     //router.post to use request of posts
  let imagePath = req.body.image
  if (req.file) {
    const url = req.protocol + '://' + req.get("host")   //this is to get address of server so we can put it in our saved image
    imagePath = url + "/images/" + req.file.filename
  }
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
    imagePath: imagePath,
    creator: req.userData.userId
  })
  Post.updateOne({ _id: req.params.id, creator: req.userData.userId }, post).then((createdPost) => {   //get results after saving so we can send newly generated post id to frotnend
    if (createdPost.matchedCount > 0) {    //its shows us if user with creted post id is the user who is editing post. if true it will resturn > 0 result else it will be 0 modified
      res.status(201).json({   //we can send status codes as here we are sending 201 that resource is addedd successfully
        message: 'Post edited successfully',
        success: true
      })
    } else {
      throw {
        message: "There comes some issues while updating post",
        success: false
      }
    }

  }).catch(err => {
    res.status(500).json(err)
  })
}

exports.GetPosts = (req, res, next) => {
  const paginationDetails = { ...req.query }
  const postQuery = Post.find()
  if (+paginationDetails.pageSize && +paginationDetails.pageIndex) {
    postQuery
      .skip(+paginationDetails.pageSize * (+paginationDetails.pageIndex - 1))   //  (paginationDetails.pageIndex - 1) this mean to skip previous pages data
      .limit(+paginationDetails.pageSize)   //   limit means take only pageSize data of page e.g. get only 10 records
  }
  let fetchedPosts
  postQuery.then(posts => {
    fetchedPosts = posts
    return Post.count()
  }).then(count => {
    res.status(200).json({
      message: 'Posts fetched successfully',
      posts: fetchedPosts,
      maxPosts: count,
      success: true
    })
  }).catch(err => {
    res.status(500).json({
      message: "There comes some issues while updating post",
      success: false
    })
  })
}

exports.GetPost = (req, res, next) => {
  Post.findById(req.params.id).then(post => {
    if (post) {
      res.status(200).json({
        message: 'Post fetched successfully',
        post: post,
        success: true
      })
    } else {
      res.status(404).json({
        message: 'Post not found',
        post: null,
        success: false
      })
    }
  }).catch(err => {
    res.status(500).json({
      message: "Post Fetching failed",
      success: false
    })
  })
}

exports.DeletePost = (req, res, next) => {   //we can get this :id in req.params which is an expressJs object which will contain req.params.id in thisf case
  Post.deleteOne({ _id: req.params.id, creator: req.userData.userId }).then(result => {
    if (result.deletedCount > 0) {
      res.status(200).json({
        message: 'Post deleted successfully',
        success: true
      })
    } else {
      res.status(401).json({
        message: "Not Authorized to delete this post",
        success: false
      })
    }

  }).catch(err => {
    res.status(500).json({
      message: "Post Deleting failed",
      success: false
    })
  })
}
