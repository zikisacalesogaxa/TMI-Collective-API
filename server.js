const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();

// Connection Config
const DBconnect = require('./config/connection');
DBconnect();

// use express middleware
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 * 30 }, resave: true, saveUninitialized: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// cors
app.use( (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
    next();
});

// import files in routes folder
const loginRoute = require('./routes/auth/login.route');
const registerRoute = require('./routes/auth/register.route');
const postBlogRoute = require('./routes/createBlog.route');
const updateBlogRoute = require('./routes/updateBlog.route');
const deleteBlogRoute = require('./routes/deleteBlog.route');
const getBlogsRoute = require('./routes/getBlogs.route');

// define a simple route
app.get('/', (req, res) => {
    res.json({
        "message": "Welcome to my blog page api",
        loginRoute: "/api/v1/auth/login",
        registerRoute: "/api/v1/auth/register",
        postBlogRoute: "/api/v1/blog/post",
        updateBlogRoute: "/api/v1/blog/:_blogId/update",
        deleteBlogRoute: "/api/v1/blog/:_blogId/delete",
        getBlogsRoute: "/api/v1/blogs"
    });
});

app.use('/api/v1/auth/login', loginRoute);
app.use('/api/v1/auth/register', registerRoute);
app.use('/api/v1/blog/post', postBlogRoute);
app.use('/api/v1/blog/:_blogId/update', updateBlogRoute);
app.use('/api/v1/blog/:_blogId/delete', deleteBlogRoute);
app.use('/api/v1/blogs', getBlogsRoute);

// port config
const port = process.env.PORT || 9000;
app.listen(port, (err) => {
    (err) ? console.error(err) : console.log('listening' + port);
});