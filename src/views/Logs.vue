<template>

    <div class="container-fluid u-h100">
        <div class="row u-h100">

            <div class="col-8 u-h100">

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

            <div class="col-4 u-h100">
                <c-scroll-view>
                    <c-card>
                        <h3 class="u-text-bold">
                            <c-icon name="chart-bar"/>
                            Статистика
                        </h3>

                        <c-card-section v-for="(item, index) in Array(10)"
                                        :key="`item-${index}`">
                            <div class="u-flex u-flex-row u-flex-nowrap u-flex-content-between u-flex-items-end">
                                <h4 class="u-text-bold u-m0">
                                    <c-icon name="calendar"/>
                                    По дням
                                </h4>
                                <c-icon-btn icon="plus"
                                            :dense="true"
                                            :transparent="true"/>
                            </div>

                            <hr>

                            <p style="margin: 0;">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam delectus laborum maxime quaerat vel. Cum delectus
                                harum nostrum ratione. Cumque ducimus est natus sed. Culpa doloribus officiis sequi voluptas! Molestiae.
                            </p>
                        </c-card-section>

                    </c-card>
                </c-scroll-view>
            </div>

        </div>
    </div>

</template>

<script>
    import CCard from "../components/Card";
    import CPagination from "../components/Pagination";
    import CIcon from "../components/Icon";
    import CTable from "../components/Table";
    import CChip from "../components/Chip";
    import CScrollView from "../components/ScrollView";
    import CCardSection from "../components/CardSection";
    import CIconBtn from "../components/IconButton";
    import CCheckbox from "../components/Checkbox";
    import CTextInput from "../components/TextInput";
    import CBtnGroup from "../components/ButtonGroup";

    export default {
        name: "view-logs",
        components: {
            CBtnGroup,
            CTextInput,
            CCheckbox,
            CIconBtn,
            CCardSection,
            CScrollView,
            CChip,
            CTable,
            CIcon,
            CPagination,
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
