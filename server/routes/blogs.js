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
    const statement = `SELECT u.id user_id,b.id as id,b.title title,b.contents contents,c.title category_title,b.user_id user_id,b.updated_at updated_at,b.created_at created_at FROM blogs b, categories c,users u where c.id = b.category_id and u.id = b.user_id`;
    db.query(statement, (error, data) => {
        console.log(data);
        response.send(result.createResult(error, data));
    })
})

router.get('/myblogs', (request, response) => {
    const statement = `SELECT u.first_name first_name,u.last_name last_name,b.id as id,b.title title,b.contents contents,c.title category_title,b.user_id user_id,b.updated_at updated_at,b.created_at created_at FROM blogs b, categories c,users u where c.id = b.category_id and u.id = b.user_id and user_id = ?`;
    const values = [request.user.id];
    db.query(statement, values, (error, data) => {
        console.log(data);
        response.send(result.createResult(error, data));
    })
})

router.delete('/allblogs/:id', (request, response) => {
    const statement = `delete from blogs where id = ?`;
    const value = [request.params.id]
    db.query(statement, value, (error, data) => {
        console.log(data);
        response.send(result.createResult(error, data));
    })
})

module.exports = router;
