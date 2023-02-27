const routerName = 'category'
const renderName = `backend/page/${routerName}/`

const CategoryService = require('../services/category_service')

module.exports = {
    list : async (req , res , next) => {
        let getAll          = await CategoryService.getAll(req)
        let statusFilter    = await CategoryService.countAll(req)
 
        res.render(`${renderName}list` , {
            items :        getAll.data,
            currentStatus: getAll.currentStatus,
            keyword:       getAll.keyword,
            pagination:    getAll.pagination,
            statusFilter:  statusFilter
        })
    },
    getForm : async (req , res , next) => { 
        res.render(`${renderName}form` , {})
    }
}
