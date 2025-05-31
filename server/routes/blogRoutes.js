
const express= require('express');
const { addBlog, getAllBlogs, getBlogById, deleteBlogById, togglePublish, addComment, getBlogComments, generateContent } = require('../controllers/blogController');
const upload = require('../middelewers/multer');
const auth = require('../middelewers/auth');

const router = express.Router();

router.post('/add',upload.single('image'),auth,addBlog)
router.get('/all',getAllBlogs);
router.get('/:blogId',getBlogById);
router.post('/delete',auth,deleteBlogById)
router.post('/toggle-publish',auth,togglePublish)
router.post('/add-comment',addComment);
router.post('/comments',getBlogComments);
router.post('/generate',auth,generateContent);
module.exports = router;