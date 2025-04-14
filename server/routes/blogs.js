const express = require('express');
const config = require('../utils/config.js');
const result = require('../utils/result.js')
const db = require('../db/db.js');
// const multer = require('multer')
// const upload = multer({ dest: 'images' })
const router = express.Router();

router.post('/addblog', (request, response) => {
    const { title, contents, category_id } = request.body;
    const statement = `INSERT INTO blogs (title, contents, category_id, user_id) VALUES (?,?,?,?)`;
    const values = [title, contents, category_id, request.user.id];
    db.query(statement, values, (error, data) => {
        response.send(result.createResult(error, data));
    });
})

router.get('/allblogs', (request, response) => {
    const statement = `SELECT id,title,contents,category_id, user_id FROM blogs`;
    db.query(statement, values, (error, data) => {
        console.log(data);
        response.send(result.createResult(error, data));
    })
})

router.post('/myblogs', (request, response) => {
    const statement = `SELECT id,title,contents,category_id,user_id FROM blogs b WHERE user_id = ?`;
    const values = [request.user.id];
    db.query(statement, values, (error, data) => {
        console.log(data);
        response.send(result.createResult(error, data));
    })
})

module.exports = router;
