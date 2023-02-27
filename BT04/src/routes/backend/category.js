const express = require('express')

const router = express.Router()
const categoryController = require('../../controllers/category_controller')

router
    .route('(/:status)?')
    .get(categoryController.list)

router
    .route('/form')
    .get(categoryController.getForm)

module.exports = router;