<template>

    <c-card class="c-elevate-3 u-h100">

        <div class="row u-h100">

            <div class="col-2 u-h100">
                <c-scroll-view>
                    <c-card>

                        <c-card-section>
                            <c-btn color="primary"
                                   icon-left="plus"
                                   :block="true"
                                   @click="addProduct">
                                Новый товар
                            </c-btn>
                            <hr>
                            <c-btn color="success"
                                   icon-left="folder-multiple"
                                   :block="true">
                                Все товары
                            </c-btn>
                        </c-card-section>

                        <c-card-section>
                            <h4 class="u-flex u-flex-content-between u-flex-items-center">
                                <b>Категории</b>
                                <c-icon-btn icon="plus"
                                            :dense="true"
                                            :transparent="true"/>
                            </h4>
                        </c-card-section>

                        <c-card-section>
                            <h4 class="u-flex u-flex-content-between u-flex-items-center">
                                <b>Группы</b>
                                <c-icon-btn icon="plus"
                                            :dense="true"
                                            :transparent="true"/>
                            </h4>
                        </c-card-section>

                    </c-card>
                </c-scroll-view>
            </div>

            <div class="col-10 u-h100">

                <c-table class="u-h100"
                         :data="list"
                         :headers="tableHeaders"
                         :loading="loading"
                         :selectable="true"
                         :draggable="true">

                    <template slot="table-header">
                        <div class="row u-flex-content-between">
                            <div class="col-auto">
                                <c-btn-group>
                                    <c-icon-btn icon="refresh"
                                                :transparent="true"/>
                                </c-btn-group>
                            </div>
                            <div class="col">
                                <c-text-input v-model="query"
                                              placeholder="Поиск"/>
                            </div>
                            <div class="col-auto">
                                <c-pagination v-model="current"
                                              :total="total"
                                              @change="goToPage"/>
                            </div>
                        </div>
                    </template>

                </c-table>
            </div>


        </div>

    </c-card>

</template>

<script>
    import CCard from "../../components/base/Card";
    import CScrollView from "../../components/base/ScrollView";
    import CBtnGroup from "../../components/base/ButtonGroup";
    import CIconBtn from "../../components/base/IconButton";
    import CIcon from "../../components/base/Icon";
    import CTable from "../../components/base/Table";
    import CTextInput from "../../components/base/TextInput";
    import CPagination from "../../components/base/Pagination";
    import CChip from "../../components/base/Chip";
    import CBtn from "../../components/base/Button";
    import CCardSection from "../../components/base/CardSection";

    export default {
        name: "view-products",
        components: {
            CCardSection,
            CBtn,
            CChip,
            CPagination,
            CTextInput,
            CTable,
            CIcon,
            CIconBtn,
            CBtnGroup,
            CScrollView,
            CCard
        },
        data() {
            return {
                loading: false,
                current: 1,
                total: 20,
                list: [],
                query: ''
            }
        },
        computed: {
            tableHeaders() {
                return {
                    id: 'ID',
                    active: 'Активность',
                    sku: 'Артикул',
                    name: 'Наименование',
                    price: 'Цена'
                }
            }
        },
        methods: {
            addProduct() {
                this.$router.push({
                    name: this.$appRoute.productAdd.name
                })
            },
            goToPage(page) {
                this.getData(page);
            },
            api(page = 1, limit = 20, filters = {}) {
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
                            data: data,
                            current: (page + 1 > 20) ? 20 : page + 1,
                            last_page: 20
                        })
                    }, 500)
                })
            },
            async getData(page = 1) {
                try {
                    this.loading = true;

                    let res = await this.api(page + 1);

                    this.list = res.data;
                    this.total = res.last_page;
                    this.loading = false;
                } catch (e) {
                    this.loading = false;
                }
            },
        },
        mounted() {
            this.getData(1)
        }
    }
</script>
