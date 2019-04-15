<template>

    <div class="container-fluid u-h100">

        <div class="row u-h100">

            <div class="col-2 u-h100">
                <c-scroll-view>
                    <c-card>

                        <c-btn color="success"
                               icon-left="folder-multiple"
                               :block="true">
                            Все товары
                        </c-btn>

                        <hr>

                        <c-card-section>
                            <h4 class="u-flex u-flex-content-between u-flex-items-center">
                                <b>Категории</b>
                                <c-icon-btn icon="plus"
                                            :dense="true"
                                            :transparent="true"/>
                            </h4>
                        </c-card-section>

                        <hr>

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

            <div class="col-2 u-h100">
                <c-scroll-view>
                    <c-card>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium cumque dicta eius id illo, libero modi mollitia nemo
                            neque nostrum, quas quod ratione rem repellendus, sit soluta voluptate! Dolorum, sint.</p>
                        <p>Ipsa laudantium provident quibusdam rerum voluptate? Aliquid atque cumque distinctio enim explicabo, fuga harum illo
                            incidunt laboriosam minus odio odit officiis, perferendis, quae quia quis soluta. Accusamus iure maiores maxime?</p>
                        <p>Accusamus commodi cumque dignissimos iste itaque labore libero, maiores sapiente vel? Aliquid beatae distinctio, dolor
                            dolores earum eligendi esse excepturi laudantium nemo odit officiis perferendis porro sapiente sint voluptate
                            voluptatem!</p>
                        <p>Hic id illo ipsam nihil non numquam, perferendis provident ut. Eius esse excepturi nobis porro sint sunt tenetur ullam vel
                            voluptatibus voluptatum. Aperiam est eveniet natus pariatur ratione recusandae voluptatibus!</p>
                        <p>Deleniti dolor enim eos illum nemo neque nulla obcaecati reprehenderit. Exercitationem illo, ipsa obcaecati possimus
                            quibusdam quod. Ducimus fuga iure laborum nostrum nulla odio, perspiciatis quis, saepe temporibus unde ut!</p>
                        <p>Amet commodi corporis cumque cupiditate ducimus eaque eum exercitationem expedita facere harum impedit inventore iusto
                            labore laudantium maiores molestias omnis perspiciatis provident qui repellat saepe, sed temporibus totam ut
                            veritatis.</p>
                        <p>Delectus facere ipsa magni natus officia recusandae. Culpa cum debitis dolore, eaque eos error harum natus neque nisi
                            quibusdam quidem suscipit voluptas! Accusamus atque commodi, esse et ipsam molestiae sunt?</p>
                        <p>Alias animi aspernatur at, beatae consectetur doloribus eos, et excepturi in maxime minus non praesentium quia ratione
                            recusandae rem ullam! Assumenda illo maxime minima modi, officia perferendis sed temporibus vel.</p>
                        <p>Consectetur, cupiditate eius ex incidunt natus officiis quasi repellendus saepe sed temporibus ullam veniam, voluptate.
                            Aliquam aliquid amet, architecto eaque et eum explicabo impedit, magni, omnis praesentium tenetur veritatis voluptate!</p>
                        <p>Ad, asperiores dicta dolor ducimus explicabo hic in minima modi molestias nam nihil nostrum nulla pariatur perferendis
                            temporibus, totam voluptatem voluptates? Accusamus amet delectus dolor, ducimus impedit in laborum quam?</p>
                        <p>A architecto asperiores aspernatur blanditiis, corporis deleniti dicta dignissimos doloremque earum explicabo, facilis id
                            laudantium suscipit velit, voluptatum! Consectetur fuga id ipsam, molestias provident quas vel vero? Adipisci, magni
                            ratione.</p>
                        <p>Asperiores atque cupiditate dolorem doloremque eligendi incidunt iure maxime modi nihil non odio omnis quam quibusdam, quos
                            rerum sed tempora vero voluptate? Animi architecto dolorem impedit, qui similique tenetur vitae.</p>
                        <p>Alias aspernatur at dolor dolore necessitatibus quae qui quis quo reiciendis sed! Dolores, iste magnam odit provident quo
                            saepe suscipit totam veritatis. Earum laborum non obcaecati omnis sapiente velit voluptates!</p>
                        <p>Aliquid dolor eius et maxime, molestias nam officia perspiciatis sit? Ad alias corporis cum dolorem eligendi error, iusto
                            magni minus nemo nihil praesentium quis sapiente sed tempore temporibus velit voluptate?</p>
                        <p>Aliquam delectus, distinctio dolor dolorem error et, ex fugiat, in maxime nesciunt nostrum ratione reiciendis repudiandae?
                            Aperiam cumque incidunt repellendus saepe. Aliquid delectus deserunt distinctio eos illo, magnam mollitia temporibus!</p>
                        <p>Adipisci, animi, architecto cumque delectus, doloremque eaque expedita modi officiis placeat praesentium quae quos
                            repellendus voluptatem! Alias amet aspernatur consequuntur esse impedit natus nobis, non quasi recusandae rem sapiente
                            temporibus!</p>
                        <p>Ea, fuga odit! Adipisci, aliquid animi assumenda aut, blanditiis cumque delectus fuga fugiat id illum numquam obcaecati
                            quia quis quod rem sequi voluptas? Aspernatur earum et illum officia reiciendis sunt.</p>
                        <p>Accusantium dolorem dolorum ea eveniet expedita facere illum in ipsam ipsum itaque labore mollitia nihil officia officiis
                            omnis perferendis quis recusandae rem repellendus, rerum, sapiente sequi similique tempore unde voluptate.</p>
                        <p>Accusamus accusantium aliquam consectetur fuga fugiat ipsum mollitia perspiciatis, quia quidem suscipit. Cumque incidunt
                            ipsam laboriosam libero officia repudiandae vero! Aperiam cupiditate doloribus enim, labore porro quam quia ullam
                            voluptas.</p>
                        <p>Aliquid deserunt error esse eveniet itaque iusto officiis quae, quas quia suscipit? Aliquid, asperiores eaque, eius est
                            illo magni, omnis possimus qui quod reiciendis repudiandae sapiente sint vero? Quibusdam, vitae!</p>
                    </c-card>
                </c-scroll-view>
            </div>

        </div>

    </div>

</template>

<script>
    import CCard from "../components/Card";
    import CScrollView from "../components/ScrollView";
    import CBtnGroup from "../components/ButtonGroup";
    import CIconBtn from "../components/IconButton";
    import CIcon from "../components/Icon";
    import CTable from "../components/Table";
    import CTextInput from "../components/TextInput";
    import CPagination from "../components/Pagination";
    import CChip from "../components/Chip";
    import CBtn from "../components/Button";
    import CCardSection from "../components/CardSection";

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
