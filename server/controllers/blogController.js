
const fs = require('fs');
const imagekit = require('../configs/imagekit');
const Blog = require('../models/Blog');
const Comment = require('../models/Comment');
const main = require('../configs/gemeni');
const addBlog = async(req,res)=>{
    try {
        const {title,subTitle,description,category,isPublished} = JSON.parse(req.body.blog);
        const imageFile = req.file;
        //check if all filelds are present
        if(!title || !description || !category || !imageFile){
            return res.status(400).json({
                success:false,
                message:"Please fill all the fields"});
        }
        const fileBuffer = fs.readFileSync(imageFile.path);
        const response = await imagekit.upload({
            file:fileBuffer, //required
            fileName: imageFile.originalname, //required
            folder:"/blogs"
        })
        //optimize through imagekit
        const optimizedImageUrl = imagekit.url({
            path:response.filePath,
            transformation:[
                {quality:'auto'},//auto quality
                {format:"webp"},//convert to webp format
                {width:"1280"} //resize to 1280px width
            ]

        })
        const image = optimizedImageUrl;
        //save to database
         await Blog.create({
            title,
            subTitle,
            description,
            category,
            image:optimizedImageUrl,
            isPublished
         })

         return res.status(200).json({
            success:true,
            message:"Blog added successfully"
         })

    } catch (error) {
        res.json({
            success:false,
            message:error.message
        })
        
    }
}
const getAllBlogs = async(req,res)=>{
    try{
        const blogs = await Blog.find({isPublished:true})
        return res.status(200).json({
            success:true,
            blogs
        })
    } catch(error){
        res.json({
            success:false,
            message:error.message
        })

    }

}
const getBlogById = async(req,res) =>{
    try {
        const {blogId} = req.params;
        const blogData = await Blog.findById(blogId);
        if(!blogData){
            return res.status(404).json({
                success:false,
                message:"Blog not found"
            })
        }
        return res.status(200).json({
            success:true,
            blogData
        })
    } catch (error) {
         res.json({
            success:false,
            message:error.message
        })
    }
}
const deleteBlogById = async(req,res) =>{
    try {
        const {id} = req.body;
       await Blog.findByIdAndDelete(id);
       //delete all comments associated with the blog
       await Comment.deleteMany({blog:id});
        return res.status(200).json({
            success:true,
            message:"Blog deleted successfully"
        })
    } catch (error) {
         res.json({
            success:false,
            message:error.message
        })
    }
}
const togglePublish = async(req,res)=>{
    try {
       
        const {id} = req.body;
        const blog = await Blog.findById(id);
        blog.isPublished = !blog.isPublished; //toggle the isPublished field
        await blog.save();
        return res.status(200).json({
            success:true,
            message:"Blog status updated"
        })
        
    } catch (error) {
          res.json({
            success:false,
            message:error.message
        })
    }
}
const addComment = async(req,res)=>{
    try{
        const {blog,name,content} = req.body;
        await Comment.create({
            blog,
            name,
            content
        });
        return res.status(200).json({
            success:true,
            message:"Comment added for review"
        })

    } catch(error){
          res.json({
            success:false,
            message:error.message
        })

    }
}
const getBlogComments = async (req, res) => {
    try {
        const { blogId } = req.body;
        const comments = await Comment.find({
            blog: blogId,
            isApproved: true
        }).sort({ createdAt: -1 }); // ✅ sort chained correctly

        return res.status(200).json({
            success: true,
            comments
        });
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        });
    }
};
const generateContent = async(req,res)=>{
    try{
        const {prompt} = req.body;
       const content = await main(prompt + 'Generate a blog content for this topic in simple text format')
        return res.status(200).json({
            success:true,
            content
        })
    } catch(error){
        res.json({
            success: false,
            message: error.message
        });
    }
}




module.exports = {addBlog,getAllBlogs,getBlogById,deleteBlogById,togglePublish,addComment,getBlogComments,generateContent};