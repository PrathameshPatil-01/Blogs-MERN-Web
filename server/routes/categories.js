const express = require('express');
const config = require('../utils/config.js');
const result = require('../utils/result.js')
const db = require('../db/db.js');
// const multer = require('multer')
// const upload = multer({ dest: 'images' })
const router = express.Router();

router.post('/addcategory', (request, response) => {
    const { title, description } = request.body;
    const statement = `INSERT INTO categories (title, description) VALUES (?,?)`;
    const values = [title, description];
    db.query(statement, values, (error, data) => {
        response.send(result.createResult(error, data));
    });
})

router.get('/showcategory', (request, response) => {
    const statement = `SELECT id,title,description FROM categories`;
    db.query(statement, (error, data) => {
        console.log(data);
        response.send(result.createResult(error, data));
    })
})


module.exports = router;
