<template>
    <c-loading-overlay :loading="loading">
        <c-form-row style="margin-top: 15px;">
            <c-switch v-model="data.active">
                Активен
            </c-switch>
        </c-form-row>

        <c-form-row>
            <c-text-input v-model="data.name"
                          leading="pencil"
                          placeholder="Наименование товара"
                          :errors="errors.name"/>
        </c-form-row>

        <c-form-row>
            <c-text-input v-model="data.code"
                          leading="link-variant"
                          placeholder="Символьный код"
                          :errors="errors.code"/>
        </c-form-row>

        <c-form-row>
            <c-text-input v-model="data.sku"
                          leading="barcode"
                          placeholder="Артикул"
                          :errors="errors.sku"/>
        </c-form-row>

        <c-form-row>
            <c-text-input v-model="data.price"
                          leading="cash"
                          trailing="currency-rub"
                          placeholder="Цена"
                          :errors="errors.price"/>
        </c-form-row>

        <c-form-row>
            <c-select v-model="data.categories"
                      option-label="name"
                      track-by="id"
                      group-label="name"
                      group-values="children"
                      placeholder="Категории"
                      :options="categories"
                      :multiple="true"
                      :searchable="true"
                      :show-counter="true"
                      :errors="errors.categories"/>
        </c-form-row>

        <c-form-row>
            <c-select v-model="data.groups"
                      option-label="name"
                      track-by="id"
                      placeholder="Группы"
                      :options="groups"
                      :multiple="true"
                      :searchable="true"
                      :toggleable="true"
                      :max-items="1"
                      :errors="errors.groups"/>
        </c-form-row>

        <c-form-row>
            <c-select v-model="data.stickers"
                      option-label="name"
                      track-by="id"
                      placeholder="Наклейки"
                      :options="stickers"
                      :toggleable="true"
                      :searchable="false"
                      :errors="errors.stickers"/>
        </c-form-row>

        <c-form-row>
            <c-select v-model="data.schema_id"
                      option-label="name"
                      track-by="id"
                      placeholder="Схема характеристик"
                      :options="propsSchemas"
                      :searchable="true"
                      :errors="errors.schema_id"/>
        </c-form-row>

        <c-form-row>
            <c-textarea v-model="data.text"
                        placeholder="Краткое описание"
                        :errors="errors.text"/>
        </c-form-row>

        <service-form-validate v-model="errors"
                               :data="data"
                               :rules="validateRules"/>
    </c-loading-overlay>
</template>

<script>
    import CTextInput from "../../components/base/TextInput";
    import CFormRow from "../../components/base/FormRow";
    import CTextarea from "../../components/base/TextArea";
    import CSwitch from "../../components/base/Switch";
    import CLoadingOverlay from "../../components/base/LoadingOverlay";
    import CSelect from "../../components/base/Select";
    import CIconBtn from "../../components/base/IconButton";

    import ServiceFormValidate from "../../components/ServiceFormValidate";

    export default {
        name: "view-product-main-form",
        components: {
            CIconBtn,
            CSelect,
            CLoadingOverlay,
            CSwitch,
            CTextarea,
            CFormRow,
            ServiceFormValidate,
            CTextInput
        },
        data() {
            return {
                loading: true,
                data: {
                    active: true,
                    name: '',
                    code: '',
                    sku: '',
                    price: '',
                    text: '',
                    categories: [],
                    groups: [],
                    stickers: [],
                    schema_id: {},
                },
                errors: {}
            }
        },
        computed: {
            validateRules() {
                return {
                    name: {
                        required: true
                    },
                    code: {
                        required: true
                    },
                    sku: {
                        required: true
                    },
                    price: {
                        required: true
                    },
                    categories: {
                        required: true
                    },
                    groups: {
                        required: true
                    },
                    schema_id: {
                        required: true
                    },
                }
            },
            categories() {
                return [
                    {
                        "id": 1,
                        "name": "Китайское меню",
                        "code": "kitayskoe-menu",
                        "children": [
                            {
                                "id": 2,
                                "name": "Салаты",
                                "code": "salaty",
                                "children": []
                            },
                            {
                                "id": 3,
                                "name": "Блюда из риса и лапши",
                                "code": "bluda-iz-risa-i-lapshi",
                                "children": []
                            },
                            {
                                "id": 4,
                                "name": "Первые блюда, супы",
                                "code": "pervye-bluda-supy",
                                "children": []
                            },
                            {
                                "id": 5,
                                "name": "Блюда из свинины",
                                "code": "bluda-iz-svininy",
                                "children": []
                            },
                            {
                                "id": 6,
                                "name": "Блюда из говядины",
                                "code": "bluda-iz-govyadiny",
                                "children": []
                            },
                            {
                                "id": 7,
                                "name": "Блюда из мяса птицы",
                                "code": "bluda-iz-myasa-pticy",
                                "children": []
                            },
                            {
                                "id": 8,
                                "name": "Блюда из рыбы и морепродуктов",
                                "code": "bluda-iz-ryby-i-moreproduktov",
                                "children": []
                            },
                            {
                                "id": 9,
                                "name": "Десерты",
                                "code": "deserty",
                                "children": []
                            },
                            {
                                "id": 10,
                                "name": "Пельмени",
                                "code": "pelmeni",
                                "children": []
                            },
                            {
                                "id": 11,
                                "name": "Овощные блюда",
                                "code": "ovoshchnye-bluda",
                                "children": []
                            },
                            {
                                "id": 12,
                                "name": "Соуса и заправки",
                                "code": "sousa-i-zapravki",
                                "children": []
                            },
                            {
                                "id": 13,
                                "name": "Полуфабрикаты",
                                "code": "polufabrikaty",
                                "children": []
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
                                "children": []
                            },
                            {
                                "id": 16,
                                "name": "Наборы",
                                "code": "nabory",
                                "children": []
                            },
                            {
                                "id": 17,
                                "name": "Горячие и запечённые роллы",
                                "code": "goryachie-i-zapechyonnye-rolly",
                                "children": []
                            },
                            {
                                "id": 18,
                                "name": "Японские супы",
                                "code": "yaponskie-supy",
                                "children": []
                            }
                        ]
                    }
                ]
            },
            groups() {
                return [
                    {
                        "id": 1,
                        "name": "Хиты продаж",
                        "code": "hity-prodazh"
                    },
                    {
                        "id": 2,
                        "name": "Хиты продаж 2",
                        "code": "hity-prodazh 2"
                    }
                ]
            },
            stickers() {
                return [
                    {
                        "id": 1,
                        "name": "Новинка",
                        "code": "new"
                    }
                ]
            },
            propsSchemas() {
                return []
            }
        },
        methods: {},
        mounted() {
            this.loading = true;

            setTimeout(() => {
                this.loading = false;
            }, 0);
        }
    }
</script>
