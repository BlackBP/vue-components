<template>

    <c-card class="u-h100">

        <div class="row u-h100">

            <div class="col-8 u-h100">

                <c-table class="u-h100"
                         :data="list"
                         :headers="tableHeaders"
                         :loading="loading">

                    <template slot="header">
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
                                              @change="getData"/>
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

            </div>

            <div class="col-4 u-h100">
                <c-scroll-view>
                    <h3 class="u-text-bold">
                        <c-icon name="chart-bar"/>
                        Статистика
                    </h3>
                    <div v-for="(item, index) in Array(10)"
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
                    </div>
                </c-scroll-view>
            </div>

        </div>
    </c-card>

</template>

<script>
    import CCard from "../components/base/Card";
    import CIcon from "../components/base/Icon";
    import CChip from "../components/base/Chip";
    import CScrollView from "../components/base/ScrollView";
    import CCardSection from "../components/base/CardSection";
    import CIconBtn from "../components/base/IconButton";
    import CBtnGroup from "../components/base/ButtonGroup";
    import CTable from "../components/base/Table";
    import CTextInput from "../components/base/TextInput";
    import CPagination from "../components/base/Pagination";

    export default {
        name: "view-logs",
        components: {
            CPagination,
            CTextInput,
            CTable,
            CBtnGroup,
            CIconBtn,
            CCardSection,
            CScrollView,
            CChip,
            CIcon,
            CCard
        },
        data() {
            return {
                loading: false,
                current: 1,
                total: 2,
                list: [],
                query: '',
                params: {}
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
                            last_page: 2
                        })
                    }, 500)
                })
            },
            async getData(page = 1, params = {}) {
                params = _.defaultsDeep(params, this.params);

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
