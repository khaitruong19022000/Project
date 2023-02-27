const CategoryModel = require('../models/category_model')
const utilsHelpers = require('../helpers/utils')
const paramsHelpers = require('../helpers/params')

module.exports = {
    getAll: async (req) => {
        let condition = {}
        let keyword   = paramsHelpers.getParam(req.query, 'keyword', '')
        let currentStatus = paramsHelpers.getParam(req.params, 'status', 'all')

        let pagination = {
            totalItem       : 1,
            totalItemPerPage: 2,
            currentPage     : 1,
            pageRange       : 3
        }
        pagination.currentPage = parseInt(paramsHelpers.getParam(req.query, 'page', 1))
        

        if (currentStatus === 'all'){
            if(keyword !== '') condition = {name: {$regex: keyword, $options: 'i'}}
        }else {
            condition = {status: currentStatus, name: {$regex: keyword, $options: 'i'}}
        }

        let count = await CategoryModel.count(condition)
        pagination.totalItem = count

        let data = await CategoryModel
                            .find(condition)
                            .sort({ordering: 'asc'})
                            .skip((pagination.currentPage-1) * pagination.totalItemPerPage)
                            .limit(pagination.totalItemPerPage)

        return{
                data, 
                currentStatus,
                keyword,
                pagination 
              }

    },
    countAll: async (req) => {
        let currentStatus = req.params.status;
        let statusFilter = utilsHelpers.createFilterStatus(currentStatus)
        return statusFilter
    }
}
