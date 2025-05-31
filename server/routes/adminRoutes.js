
const express = require('express');
const { adminLogin, getAllComments, gatAllBlogAdmin, deleteCommentById, approveCommentById, getDashboard } = require('../controllers/adminController');
const auth = require('../middelewers/auth');

const router = express.Router();

router.post("/login",adminLogin);
router.get("/comments",auth,getAllComments);
router.get("/blogs",auth,gatAllBlogAdmin);
router.post("/delete-comment",auth,deleteCommentById);
router.post("/approve-comment",auth,approveCommentById);
router.get("/dashboard",auth,getDashboard);


module.exports = router;