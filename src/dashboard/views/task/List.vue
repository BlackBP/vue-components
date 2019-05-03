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

                        <c-icon-btn icon="file-excel"
                                    :transparent="true"/>
                    </div>

                    <div class="col-auto">
                        <c-pagination v-model="query.page"
                                      :last="meta.last_page"
                                      @change="handlePageChange"/>
                    </div>
                </div>

                <c-divider />

                <div class="row u-flex-items-center">
                    <div class="col-2">
                        <c-text-input v-model="query.customer_phone"
                                      leading="phone"
                                      placeholder="Телефон"
                                      :mask="{mask: '+7 (999) 999-99-99'}"/>
                    </div>
                    <div class="col-2">
                        <c-text-input v-model="query.customer_id"
                                      leading="account"
                                      placeholder="ID заказчика" />
                    </div>
                    <div class="col-2">
                        <c-text-input v-model="query.performer_id"
                                      leading="account"
                                      placeholder="ID мастера" />
                    </div>
                    <div class="col-2">
                        <c-text-input v-model="query.created_at"
                                      leading="calendar"
                                      placeholder="Дата создания"
                                      :mask="{mask: '99.99.9999 - 99.99.9999'}" />
                    </div>
                    <div class="col-auto">
                        <c-checkbox v-model="query.active">
                            Активность
                        </c-checkbox>
                    </div>

                    <div class="col-auto">
                        <c-btn color="primary"
                               style="margin-right: 5px;"
                               @click="applyFilters">
                            Применить
                        </c-btn>
                        <c-btn color="warn"
                               @click="resetFilters">
                            Сбросить
                        </c-btn>
                    </div>
                </div>

                <c-divider/>

                <div>
                    <b>query: </b>{{ query }}
                    <br>
                    <b>$route.query: </b>{{ $route.query }}
                </div>

                <c-divider/>

            </template>

            <template slot="footer">
                <c-divider/>
                <div class="row u-flex-content-between">
                    <div class="col-auto">
                        <b>Страница: </b>{{ query.page }} из {{ meta.last_page }}
                    </div>
                    <div class="col-auto">
                        <b>Показано: </b>{{ meta.per_page }} из {{ meta.total }}
                    </div>
                </div>
            </template>

        </c-table>

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
    import CTextInput from "../../components/TextInput";
    import CCheckbox from "../../components/Checkbox";
    import CBtn from "../../components/Button";

    function LOG(...rest) {
        console.log('[Tasks]', ...rest)
    }

    export default {
        name: "view-orders",
        components: {
            CBtn,
            CCheckbox,
            CTextInput,
            CModal,
            CTable,
            CPagination,
            CDivider,
            CIconBtn,
            CScrollView,
            CCard
        },
        data() {
            return {
                loading: true,
                list: [],
                meta: {
                    last_page: 20,
                    per_page: 40,
                    total: 875
                },
                query: {
                    page: 1,
                    customer_phone: '',
                    customer_id: '',
                    performer_id: '',
                    created_at: '',
                    active: false,
                }
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
            }
        },
        watch: {
            $route(data) {
                this.syncQuery();
                this.getData();
            }
        },
        methods: {
            syncQuery() {
                let query = _.get(this.$route, 'query', {});
                query = _.defaultsDeep(query, {...this.query});

                _.each(query, (value, key) => {

                    if(key === 'active') {
                        value = _.toLower(value) === 'true'
                    }

                    if(key === 'page') {
                        value = parseInt(value);
                        value = _.isNumber(value) && !_.isNaN(value) ? value : 1;
                    }

                    this.query[key] = value
                });
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
            getParams() {
                return _.pickBy(this.query, value => value !== '')
            },
            applyFilters() {
                this.$router.push({
                    path: '',
                    query: this.getParams()
                })
            },
            resetFilters() {
                this.$router.push({
                    path: '',
                    query: {}
                })
            },
            handleReload() {
                this.getData()
            },
            handlePageChange() {
                this.$router.push({
                    path: '',
                    query: this.getParams()
                })
            }
        },
        mounted() {
            _.each(this.$route.query, (value, key) => {

                if(key === 'active') {
                    value = _.toLower(value) === 'true'
                }

                this.query[key] = value
            });

            this.getData()
        }
    }
</script>
