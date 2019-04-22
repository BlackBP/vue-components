export function getList(page = 1, limit = 40, params = {}) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let data = _.map(Array(limit), item => {
                return {
                    id: _.random(999),
                    active: !!_.random(1),
                    sku: `item-${_.random(999)}`,
                    name: `Product-${_.random(999)}`,
                    price: _.random(9999, true),
                }
            });

            resolve({
                data: page > 20 ? [] : data,
                current: (page + 1 > 20) ? 20 : page + 1,
                last_page: 20
            })
        }, 500)
    })
}

export default {
    getList,
}
