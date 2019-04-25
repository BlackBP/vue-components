<template>

    <c-card class="u-flex u-flex-column u-h100">
        <c-table ref="table"
                 :loading="loading"
                 :data="list"
                 :headers="tableHeaders">

            <template slot="colgroup">
                <col width="80">
                <col width="10%">
                <col width="10%">
                <col width="10%">
                <col width="15%">
                <col width="10%">
                <col width="10%">
                <col>
            </template>

            <template slot="header">
                <div class="row u-flex-content-between">
                    <div class="col-auto">
                        <c-icon-btn icon="refresh"
                                    style="margin-right: 5px;"
                                    :transparent="true"
                                    @click="handleReload"/>

                        <c-icon-btn icon="filter"
                                    style="margin-right: 5px;"
                                    :transparent="true"
                                    @click="viewFilters"/>

                        <c-icon-btn icon="file-excel"
                                    :transparent="true"/>
                    </div>

                    <div class="col-auto">
                        <c-pagination v-model="meta.current_page"
                                      :last="meta.last_page"
                                      @change="handlePageChange"/>
                    </div>
                </div>
                <c-divider/>
            </template>

            <template slot="footer">
                <c-divider/>
                <div class="row u-flex-content-between">
                    <div class="col-auto">
                        <b>Страница: </b>{{ meta.current_page }} из {{ meta.last_page }}
                    </div>
                    <div class="col-auto">
                        <b>Показано: </b>{{ meta.per_page }} из {{ meta.total }}
                    </div>
                </div>
            </template>

        </c-table>

        <c-modal ref="filters"
                 title="Фильтры"
                 icon="filter"
                 :allow-dismiss="true"
                 :outside-dismiss="false">
            <c-filters-form v-model="filters"
                            :config="filtersConfig"
                            @change="handleFilters"/>
        </c-modal>

    </c-card>

</template>

<script>
    import CCard from "../../components/Card";
    import CScrollView from "../../components/ScrollView";
    import CBtnGroup from "../../components/ButtonGroup";
    import CIconBtn from "../../components/IconButton";
    import CDivider from "../components/Divider";
    import CPagination from "../../components/Pagination";
    import CTable from "../../components/Table";
    import CModal from "../../components/Modal";
    import CFiltersForm from "../components/Filters";

    function LOG(...rest) {
        console.log('[Tasks] ', ...rest)
    }

    export default {
        name: "view-orders",
        components: {
            CFiltersForm,
            CModal,
            CTable,
            CPagination,
            CDivider,
            CIconBtn,
            CBtnGroup,
            CScrollView,
            CCard
        },
        data() {
            return {
                loading: true,
                list: [],
                filters: {
                    customer_phone: '',
                    customer_id: '',
                    performer_id: '',
                    created_at: '',
                    active: false,
                },
                meta: {
                    current_page: 1,
                    last_page: 20,
                    per_page: 40,
                    total: 875
                }
            }
        },
        watch: {
            $route(data) {
                let query = _.get(data, 'query', {});
                this.getData(query);
            }
        },
        computed: {
            tableHeaders() {
                return {
                    id: 'ID',
                    created_at: 'Дата создания',
                    customer: 'Заказчик',
                    performer: 'Мастер',
                    name: 'Наименование',
                    status: 'Статус',
                    city: 'Город',
                    comment: 'Комментарий'
                }
            },
            filtersConfig() {
                return {
                    customer_phone: {
                        type: 'input',
                        props: {
                            placeholder: 'Номер телефона',
                            mask: {
                                mask: '+7 (999) 999-99-99',
                            }
                        }
                    },
                    customer_id: {
                        type: 'input',
                        props: {
                            placeholder: 'ID заказчика'
                        }
                    },
                    active: {
                        type: 'checkbox',
                        label: 'Активность'
                    }
                }
            }
        },
        methods: {
            updateQuery() {
                this.$router.push({
                    path: '',
                    query: this.getParams()
                })
            },
            getParams() {
                let query = _.reduce(this.filters, (total, value, key) => {

                    if (!_.isEmpty(value)) {
                        total[key] = value
                    }

                    return total
                }, {});

                return _.defaultsDeep({
                    page: this.meta.current_page
                }, query);
            },
            getData(params = {}) {
                this.loading = true;

                setTimeout(() => {
                    this.list = _.map(Array(this.meta.per_page), item => {
                        return {
                            id: _.random(100, 999),
                            created_at: new Date().getUTCDate(),
                            customer: `Заказчик №${_.random(100, 999)}`,
                            performer: `Мастер №${_.random(100, 999)}`,
                            name: `Заявка №${_.random(100, 999)}`,
                            status: _.random(0, 1) ? 'Открыта' : 'Закрыта',
                            city: _.random(0, 1) ? 'Хабаровск' : 'Владивосток',
                            comment: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, ad, animi, assumenda culpa cupiditate debitis delectus earum minima omnis praesentium quidem quo reiciendis reprehenderit soluta tenetur totam veritatis? Ad, eius!'
                        }
                    });

                    if (this.$refs.table) {
                        if (this.$refs.table.resetScroll) {
                            this.$refs.table.resetScroll()
                        }
                    }

                    this.loading = false;
                }, 1000)
            },
            handleReload() {
                let queryPage = _.get(this.$route, 'query.page', 1);
                let currentPage = this.meta.current_page;
                let params = this.getParams();

                queryPage = _.isNumber(queryPage) && !_.isNaN(queryPage) ? queryPage : 1;

                let isSamePage = queryPage === currentPage;

                if (isSamePage) {
                    this.getData(params);
                } else {
                    this.handlePageChange(1)
                }
            },
            handlePageChange(page) {
                this.meta.current_page = page;
                this.$nextTick(() => {
                    this.updateQuery()
                })
            },
            viewFilters() {
                this.$refs.filters.open();
            },
            handleFilters() {
                this.$refs.filters.close();
                this.handlePageChange(1);
            }
        },
        mounted() {
            let query = _.get(this.$route, 'query', {});
            this.getData(query);
        }
    }
</script>
