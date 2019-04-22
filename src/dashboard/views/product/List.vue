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
                            <c-btn color="secondary"
                                   icon-left="folder-multiple"
                                   :block="true">
                                Все товары
                            </c-btn>
                        </c-card-section>

                        <c-card-section>
                            <widget-categories-tree :active="params.category_id"
                                                    @change="onCategoryChange"/>
                        </c-card-section>

                        <c-card-section>
                            <widget-groups-tree :active="params.group_id"
                                                @change="onGroupChange"/>
                        </c-card-section>
                    </c-card>
                </c-scroll-view>
            </div>

            <div class="col-10 u-h100">

                <c-table class="u-h100"
                         :data="list"
                         :headers="tableHeaders"
                         :loading="loading"
                         :selectable="false"
                         :draggable="false"
                         :infinite-scroll="true"
                         @loading="infScroll">

                    <template slot="header">
                        <div class="row u-flex-content-between u-flex-items-center">
                            <div class="col-auto">
                                <c-btn-group>
                                    <c-icon-btn icon="refresh"
                                                :transparent="true"/>
                                </c-btn-group>
                            </div>
                            <div class="col">
                                <c-text-input v-model="params.query"
                                              leading="magnify"
                                              placeholder="Поиск"
                                              @input="handleSearch"/>
                            </div>
                            <div class="col-auto">
                                <c-chip>Страница {{ params.page }} из {{ total }} ({{ list.length }})</c-chip>
                            </div>
                        </div>
                    </template>

                </c-table>

            </div>


        </div>

    </c-card>

</template>

<script>
    import CCard from "../../../components/Card";
    import CScrollView from "../../../components/ScrollView";
    import CBtnGroup from "../../../components/ButtonGroup";
    import CIconBtn from "../../../components/IconButton";
    import CIcon from "../../../components/Icon";
    import CTable from "../../../components/Table";
    import CTextInput from "../../../components/TextInput";
    import CPagination from "../../../components/Pagination";
    import CChip from "../../../components/Chip";
    import CBtn from "../../../components/Button";
    import CCardSection from "../../../components/CardSection";

    // Widgets
    import WidgetCategoriesTree from "./CategoriesTree";
    import WidgetGroupsTree from "./GroupsTree";

    export default {
        name: "view-products",
        components: {
            WidgetCategoriesTree,
            WidgetGroupsTree,
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
                total: 20,
                list: [],
                infLoadCounter: +new Date(),
                params: {
                    page: 1,
                    query: '',
                    category_id: '',
                    group_id: '',
                }
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
            setQuery() {
                let query = _.reduce(this.params, (total, value, name) => {

                    if (_.isNumber(value) && !_.isNaN(value)) {
                        total[name] = value;
                    } else {
                        if (!_.isEmpty(value)) {
                            total[name] = value;
                        }
                    }

                    return total;
                }, {});

                this.$router.push({
                    path: '',
                    query: query
                })
            },
            addProduct() {
                this.$router.push({
                    name: this.$appRoute.productAdd.name
                })
            },
            goToPage(page) {
                this.getData(page);
            },
            getData(page, reset = false) {
                page = +page;
                page = _.isNaN(page) ? this.params.page : page;

                return new Promise((resolve, reject) => {
                    this.loading = true;
                    this.params.page = page;

                    this.$nextTick(async () => {
                        try {
                            this.setQuery();

                            let res = await this.$api.product.getList(page);

                            if(reset) {
                                this.list = [...res.data];
                            } else {
                                this.list = _.concat(this.list, res.data);
                            }
                            this.total = res.last_page;
                            this.loading = false;

                            resolve(res.data)
                        } catch (e) {
                            this.loading = false;
                            reject(e);
                        }
                    })
                })
            },
            infScroll($state) {
                let nextPage = this.params.page + 1;

                if (nextPage <= this.total) {
                    this.params.page = nextPage;

                    this.getData()
                        .then(data => {
                            if (this.params.page <= this.total) {
                                $state.loaded();
                            } else {
                                $state.completed()
                            }
                        })
                } else {
                    $state.completed()
                }
            },
            onCategoryChange(category_id) {
                this.params.category_id = category_id;
                this.params.group_id = '';
                this.getData(1, true);
            },
            onGroupChange(group_id) {
                this.params.group_id = group_id;
                this.params.category_id = '';
                this.getData(1, true);
            },
            handleSearch: _.debounce(function (query = '') {
                this.params.group_id = '';
                this.params.category_id = '';
                this.getData(1, true);
            }, 400)
        },
        mounted() {
            _.each(this.$route.query, (value, name) => {
                if (_.has(this.params, name)) {
                    this.params[name] = _.isNumber(parseInt(value)) ? parseInt(value) : value;
                }
            });

            this.getData();
        }
    }
</script>
