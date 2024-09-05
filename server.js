const express = require('express');
const mongoose = require('mongoose');
const Article = require('./models/article');
const articleRoute = require('./routes/article');
const methodOverride = require('method-override');
const app = express();
const port = 3000
require('dotenv').config();



const mongoURI = process.env.mongo_URI;

// Connect to MongoDB
mongoose.connect(mongoURI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

app.set("view engine", "ejs");
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: false }));
app.get('/',async (req, res) => {
    const articles =await Article.find().sort({createdAt: 'desc'})
    // Pass the articles data to the view
    res.render('articles/index', { articles: articles });
});
app.use("/articles", articleRoute);


app.listen(port, () => console.log(`app listening on port ${port}!`))