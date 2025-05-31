const jwt = require('jsonwebtoken');
const Blog = require('../models/Blog');
const Comment = require('../models/Comment');
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
            return res.status(400).json({ message: "Invalid credentials" })
        }
        const token = jwt.sign({ email }, process.env.JWT_SECRET);
        return res.status(200).json({ success: true, message: "Login successful", token });

    } catch (error) {
        res.json({ success: false, message: error.message });

    }
}
const gatAllBlogAdmin = async (req, res) => {
    try {
        const blogs = await Blog.find({}).sort({ createdAt: -1 });
        return res.status(200).json({
            success: true,
            blogs
        });
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        });
    }
}

const getAllComments = async(req,res)=>{
    try{
        const comments = await Comment.find({}).populate("blog").sort({createdAt:-1});
        return res.status(200).json({
            success: true,
            comments
        });
    } catch(error){
         res.json({
            success: false,
            message: error.message
        });
    }
}
const getDashboard = async(req,res)=>{
    try{
        const recentBlogs = await Blog.find({}).sort({createdAt:-1}).limit(5);
        const blogs = await Blog.countDocuments();
        const comments = await Comment.countDocuments();
        const drafts = await Blog.countDocuments({isPublished:false});
        const dashboardData = {
            blogs,
            comments,
            drafts,
            recentBlogs
        }
        return res.status(200).json({
            success: true,
            dashboard:dashboardData
        });
    } catch(error){
         res.json({
            success: false,
            message: error.message
        });
    }

}
const deleteCommentById = async(req,res)=>{
    try{
        const {id} = req.body;
        await Comment.findByIdAndDelete(id);
        return res.status(200).json({
            success: true,
            message: "Comment deleted successfully"
        });
    } catch(error){
         res.json({
            success: false,
            message: error.message
        });
    }
}
const approveCommentById = async(req,res)=>{
    try{
        const {id} = req.body;
       await Comment.findByIdAndUpdate(id, { isApproved: true });
        return res.status(200).json({
            success: true,
            message: "Comment approved successfully"
        });
    } catch(error){
         res.json({
            success: false,
            message: error.message
        });
    }
}
module.exports = { adminLogin, gatAllBlogAdmin, getAllComments,getDashboard,deleteCommentById,approveCommentById };