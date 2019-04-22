export function getList() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                data: {
                    "data": [
                        {
                            "id": 1,
                            "name": "Хиты продаж",
                            "code": "hity-prodazh"
                        },
                        {
                            "id": 2,
                            "name": "Хиты продаж",
                            "code": "hity-prodazh"
                        },
                        {
                            "id": 3,
                            "name": "Хиты продаж",
                            "code": "hity-prodazh"
                        }
                    ]
                }
            })
        }, 3000)
    })
}

export default {
    getList
}
