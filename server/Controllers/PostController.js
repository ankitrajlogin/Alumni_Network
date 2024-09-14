const Post = require('../Models/Post');



const AllpostData = async (req , res) => {
    
    try{
        const userData = await Post.find() ; 

        res.status(200)
        .json({
            message : "Fetch expenses Successfully" , 
            success : true , 
            data : userData
        })
    }
    catch(err){
        return res.status(500).json({
            message : "something went wrong" , 
            error : err , 
            success : false 
        })
    }
}

const AddPost = async (req, res) => {
    try {
        const { header, description, tags, details } = req.body; // Get post data from request body
 
        const userId = req.body.userid; // Assuming user ID is available via authentication middleware (ensureAuthenticated)

        // Create a new post
        const newPost = new Post({
            header,
            description,
            tags,
            details,
            userId
        });

        // Save the post to the database
        const response = await newPost.save();


        res.status(201).json({ message: 'Post created successfully', post: newPost });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const EditPost = async (req , res) =>{
    try{
        const {postId } = req.params ; 

        const {header , description , tags , details} = req.body ; 

        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            { header, description, tags , details }, // Update the fields
            { new: true } // Return the updated post
        );

        if (!updatedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }

        res.status(200).json({ message: 'Post updated successfully', post: updatedPost });
    }
    catch(error){
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

const DeletePost = async (req, res) => {
    try {
        const { postId} = req.params; // Post ID from route parameter

        // Find the post by ID and delete it
        const deletedPost = await Post.findByIdAndDelete(postId);

        if (!deletedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }

        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    AllpostData , 
    AddPost , 
    EditPost , 
    DeletePost
}