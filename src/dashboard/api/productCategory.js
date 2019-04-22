export function getList() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                data: {
                    "data": [
                        {
                            "id": 1,
                            "name": "Китайское меню",
                            "code": "kitayskoe-menu",
                            "children": [
                                {
                                    "id": 2,
                                    "name": "Салаты",
                                    "code": "salaty",
                                    "children": [

                                    ]
                                },
                                {
                                    "id": 3,
                                    "name": "Блюда из риса и лапши",
                                    "code": "bluda-iz-risa-i-lapshi",
                                    "children": [

                                    ]
                                },
                                {
                                    "id": 4,
                                    "name": "Первые блюда, супы",
                                    "code": "pervye-bluda-supy",
                                    "children": [

                                    ]
                                },
                                {
                                    "id": 5,
                                    "name": "Блюда из свинины",
                                    "code": "bluda-iz-svininy",
                                    "children": [

                                    ]
                                },
                                {
                                    "id": 6,
                                    "name": "Блюда из говядины",
                                    "code": "bluda-iz-govyadiny",
                                    "children": [

                                    ]
                                },
                                {
                                    "id": 7,
                                    "name": "Блюда из мяса птицы",
                                    "code": "bluda-iz-myasa-pticy",
                                    "children": [

                                    ]
                                },
                                {
                                    "id": 8,
                                    "name": "Блюда из рыбы и морепродуктов",
                                    "code": "bluda-iz-ryby-i-moreproduktov",
                                    "children": [

                                    ]
                                },
                                {
                                    "id": 9,
                                    "name": "Десерты",
                                    "code": "deserty",
                                    "children": [

                                    ]
                                },
                                {
                                    "id": 10,
                                    "name": "Пельмени",
                                    "code": "pelmeni",
                                    "children": [

                                    ]
                                },
                                {
                                    "id": 11,
                                    "name": "Овощные блюда",
                                    "code": "ovoshchnye-bluda",
                                    "children": [

                                    ]
                                },
                                {
                                    "id": 12,
                                    "name": "Соуса и заправки",
                                    "code": "sousa-i-zapravki",
                                    "children": [

                                    ]
                                },
                                {
                                    "id": 13,
                                    "name": "Полуфабрикаты",
                                    "code": "polufabrikaty",
                                    "children": [

                                    ]
                                }
                            ]
                        },
                        {
                            "id": 14,
                            "name": "Японское меню",
                            "code": "yaponskoe-menu",
                            "children": [
                                {
                                    "id": 15,
                                    "name": "Классические роллы",
                                    "code": "klassicheskie-rolly",
                                    "children": [

                                    ]
                                },
                                {
                                    "id": 16,
                                    "name": "Наборы",
                                    "code": "nabory",
                                    "children": [

                                    ]
                                },
                                {
                                    "id": 17,
                                    "name": "Горячие и запечённые роллы",
                                    "code": "goryachie-i-zapechyonnye-rolly",
                                    "children": [

                                    ]
                                },
                                {
                                    "id": 18,
                                    "name": "Японские супы",
                                    "code": "yaponskie-supy",
                                    "children": [

                                    ]
                                }
                            ]
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
