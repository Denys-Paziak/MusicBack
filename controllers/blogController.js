const { ObjectId } = require('mongodb');
const { connectToDatabase } = require('../config/db');

let collection;
connectToDatabase().then(db => {
    collection = db.collection('blogs'); // Вказати ім'я колекції
}).catch(err => console.error('Failed to connect to database', err));

async function createBlog(req, res) {
    try {
        const blog = req.body;
        const result = await collection.insertOne(blog);
        res.status(201).send(result);
    } catch (error) {
        console.error('Failed to create a new blog:', error);
        res.status(500).json({ error: 'Failed to create a new blog' });
    }
}

async function getAllBlogs(req, res) {
    try {
        const blogs = await collection.find({}).toArray();
        res.status(200).send(blogs);
    } catch (error) {
        console.error('Failed to fetch blogs:', error);
        res.status(500).json({ error: 'Failed to fetch blogs' });
    }
}

async function getBlogById(req, res) {
    try {
        const id = req.params.id;
        const blog = await collection.findOne({ _id: new ObjectId(id) });
        if (blog) {
            res.status(200).send(blog);
        } else {
            res.status(404).json({ error: 'Blog not found' });
        }
    } catch (error) {
        console.error('Failed to fetch the blog:', error);
        res.status(500).json({ error: 'Failed to fetch the blog' });
    }
}

async function updateBlog(req, res) {
    try {
        const id = req.params.id;
        const updatedBlog = req.body;
        const result = await collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: updatedBlog }
        );
        if (result.matchedCount > 0) {
            res.status(200).send(result);
        } else {
            res.status(404).json({ error: 'Blog not found' });
        }
    } catch (error) {
        console.error('Failed to update the blog:', error);
        res.status(500).json({ error: 'Failed to update the blog' });
    }
}

async function deleteBlog(req, res) {
    try {
        const id = req.params.id;
        const result = await collection.deleteOne({ _id: new ObjectId(id) });
        if (result.deletedCount > 0) {
            res.status(200).json({ message: 'Blog deleted successfully' });
        } else {
            res.status(404).json({ error: 'Blog not found' });
        }
    } catch (error) {
        console.error('Failed to delete the blog:', error);
        res.status(500).json({ error: 'Failed to delete the blog' });
    }
}

module.exports = {
    createBlog,
    getAllBlogs,
    getBlogById,
    updateBlog,
    deleteBlog
};
