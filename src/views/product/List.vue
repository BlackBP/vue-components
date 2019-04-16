<template>

    <div class="container-fluid u-h100">

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
                <c-card class="c-elevate-3 u-h100">
                    <c-table class="u-h100"
                             :data="list"
                             :headers="tableHeaders"
                             :loading="loading">

                        <template slot="table-header">
                            <div class="row u-flex-content-between">
                                <div class="col-auto">
                                    <c-btn-group>

                                        <c-icon-btn icon="checkbox-blank-outline"
                                                    :transparent="true"
                                                    style="margin-right: 5px;"/>
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

                        <template slot="col-date"
                                  slot-scope="colDate">
                            <c-chip color="info">
                                {{ colDate.value }}
                            </c-chip>
                        </template>

                    </c-table>

                </c-card>
            </div>

        </div>

    </div>

</template>

<script>
    import CCard from "../../components/Card";
    import CScrollView from "../../components/ScrollView";
    import CBtnGroup from "../../components/ButtonGroup";
    import CIconBtn from "../../components/IconButton";
    import CIcon from "../../components/Icon";
    import CTable from "../../components/Table";
    import CTextInput from "../../components/TextInput";
    import CPagination from "../../components/Pagination";
    import CChip from "../../components/Chip";
    import CBtn from "../../components/Button";
    import CCardSection from "../../components/CardSection";

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
            logLevels() {
                return {
                    emergency: 'Аварийная',
                    alert: 'Оповещение',
                    critical: 'Критический',
                    error: 'Ошибка',
                    warning: 'Предупреждение',
                    notice: 'Уведомление',
                    info: 'Информация',
                    debug: 'Отладка',
                }
            },
            tableHeaders() {
                return {
                    date: 'Дата',
                    all: 'Всего',
                    emergency: this.logLevels.emergency,
                    alert: this.logLevels.alert,
                    critical: this.logLevels.critical,
                    error: this.logLevels.error,
                    warning: this.logLevels.warning,
                    notice: this.logLevels.notice,
                    info: this.logLevels.info,
                    debug: this.logLevels.debug,
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
                                date: `2019-${_.random(1, 31)}-${_.random(1, 12)}`,
                                all: _.random(100, 999),
                                emergency: _.random(0, 999),
                                alert: _.random(0, 999),
                                critical: _.random(0, 999),
                                error: _.random(0, 999),
                                warning: _.random(0, 999),
                                notice: _.random(0, 999),
                                info: _.random(0, 999),
                                debug: _.random(0, 999),
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

                    console.log(res);

                    this.list = res.data;
                    this.total = res.last_page;
                    this.loading = false;
                } catch (e) {
                    this.loading = false;
                }
            },
        },
        mounted() {
            // this.getData(1)
        }
    }
</script>
