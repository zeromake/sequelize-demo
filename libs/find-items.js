/**
 * 扩展一个分页处理函数
 * @param {{ page_num?: number, page_size?: number }} pageOptions
 * @param {import('sequelize').FindOptions<any>} options
 */
async function findItems(pageOptions, options) {
    const countOptions = Object.assign({}, options);

    // group use COUNT(DISTINCT(`group`))
    if(countOptions.group) {
        const group = countOptions.group;
        delete countOptions.group;
        countOptions.distinct = true;
        let col = Array.isArray(group) ? group[0] : group;
        // col
        if(col.col) {
            col = col.col;
        }

        if(typeof col === 'string') {
            if(col.includes('.')) {
                col = col.split('.')[1];
            }
        }
        else {
            col = null;
        }
        if(col) {
            countOptions.col = col;
        }
    }
    // del page, order, attributes
    delete countOptions.offset;
    delete countOptions.limit;
    delete countOptions.order;
    delete countOptions.attributes;

    const total = await this.count(countOptions);
    // page
    const pageSize = +pageOptions.page_size || 20;
    const pageNum = +pageOptions.page_num || 1;
    options.offset = (pageNum- 1) * pageSize;
    options.limit = pageSize;

    const result = await this.findAll(options);
    return [result, total];
};

module.exports = function(Sequelize) {
    Sequelize.Model.findItems = findItems;
};
