<template>

    <div>
        <c-card class="c-elevate-3">

            <div style="cursor: pointer;"
                 @click="toggleCollapse">

                <c-stack-group justify="start"
                               align-items="center">
                    <c-stack-item>
                        <c-chip color="success">
                            <b>Collapse</b>
                        </c-chip>
                    </c-stack-item>

                    <c-stack-item style="align-self: start">
                        <c-icon :name="collapse.visible ? 'menu-up' : 'menu-down'"
                                size="1.5rem"/>
                    </c-stack-item>

                    <c-stack-item>
                        <c-switch v-model="collapse.loading"
                                  @click.native.stop>
                            Loading
                        </c-switch>
                    </c-stack-item>

                </c-stack-group>
            </div>

            <c-collapse :visible="collapse.visible"
                        style="padding: 15px 0 0">

                <c-loading-overlay loading-text=""
                                   :loading="collapse.loading">

                    <c-card-section>
                        <c-switch v-model="buttons.transparent">
                            Transparent buttons
                        </c-switch>

                        <c-switch v-model="buttons.elevated">
                            Elevated buttons
                        </c-switch>

                        <c-switch v-model="buttons.bordered">
                            Bordered buttons
                        </c-switch>
                    </c-card-section>

                    <c-card-section class="c-btn-group">
                        <c-btn v-for="color in buttons.colors"
                               icon-left="send"
                               :key="color"
                               :elevated="buttons.elevated"
                               :bordered="buttons.bordered"
                               :transparent="buttons.transparent"
                               :color="color"
                               @contextmenu.native.prevent="$refs.contextMenu.show($event, {data: color})">
                            Click me!
                        </c-btn>

                        <c-context-popup ref="contextMenu">
                            <template v-if="contextData"
                                      slot-scope="contextData">

                                <c-btn @click="addNotify(contextData.data)">
                                    Hello world! {{ contextData }}
                                </c-btn>

                            </template>
                        </c-context-popup>
                    </c-card-section>

                    <c-card-section class="c-btn-group">
                        <c-icon-btn
                                v-for="color in buttons.colors"
                                icon="plus"
                                :key="color"
                                :elevated="buttons.elevated"
                                :transparent="buttons.transparent"
                                :color="color"/>
                    </c-card-section>

                    <c-card-section class="c-btn-group">
                        <c-icon-btn
                                v-for="color in buttons.colors"
                                icon="plus"
                                :key="color"
                                :dense="true"
                                :elevated="buttons.elevated"
                                :transparent="buttons.transparent"
                                :color="color"/>
                    </c-card-section>

                    <c-card-section class="c-btn-group">
                        <c-badge :value="badge">
                            <c-icon-btn icon="filter"
                                        @click="badge = badge + 1"/>
                        </c-badge>

                        <c-badge icon="alert">
                            <c-icon-btn icon="bell"
                                        @click="addNotify(notify.message)"/>
                        </c-badge>
                    </c-card-section>

                    <c-card-section>
                        <c-btn icon-left="bell"
                               @click="addNotify(notify.message)">
                            Show notification
                        </c-btn>
                        <c-text-area v-model="notify.message"
                                     placeholder="Введите текст"/>
                    </c-card-section>

                    <c-card-section>

                        <c-form-row>
                            <c-form-row>
                                <c-text-input v-model="form.data.firstName"
                                              :errors="form.errors.firstName"/>
                            </c-form-row>

                            <c-form-row>
                                <c-text-input v-model="form.data.lastName"
                                              :errors="form.errors.lastName"/>
                            </c-form-row>

                            <c-form-row>
                                <c-text-input v-model="form.data.date"
                                              mask="+7 (999) 999-99-99"
                                              placeholder="date"
                                              :errors="form.errors.date"/>
                            </c-form-row>
                        </c-form-row>

                        <c-service-form-validate v-model="form.errors"
                                                 :data="form.data"
                                                 :rules="validateRules"/>
                    </c-card-section>

                    <c-card-section>
                        <c-scroll-view ref="scrollView"
                                       style="height: 200px;"
                                       :loading-delay="500"
                                       @loading="onLoading">

                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque culpa delectus eos explicabo facilis fugiat fugit illo, incidunt, minima molestiae odit officia placeat quia quidem sapiente suscipit tenetur vel velit.</p>

                            <c-btn @click="$refs.scrollView.scrollToEnd()"
                                   style="position: sticky;top: 0;">
                                scrollToEnd()
                            </c-btn>

                            <c-btn @click="$refs.scrollView.scrollToTop()"
                                   style="position: sticky;top: 0;">
                                scrollToTop()
                            </c-btn>

                            <p v-for="(lorem, index) in infiniteLoad.data"
                               :key="`lorem-${index}`">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores at cum cumque
                                dolorum eligendi ex exercitationem, fugit ipsum iste iure maxime numquam placeat
                                quibusdam quo ratione rem sed ullam voluptate.
                            </p>
                        </c-scroll-view>
                    </c-card-section>
                </c-loading-overlay>

            </c-collapse>
        </c-card>
    </div>

</template>

<script>
    import CContextPopup from "../../components/ContextPopup";
    import CScrollView from "../../components/ScrollView";

    const DATA_MAP = {
        firstName: 'firstName',
        lastName: 'lastName',
        date: 'date',
    };

    export default {
        name: "view-home",
        components: {
            CScrollView,
            CContextPopup
        },
        data() {
            return {
                buttons: {
                    bordered: false,
                    elevated: false,
                    transparent: false,
                    colors: ['', 'primary', 'secondary', 'success', 'error', 'warn', 'info', 'light', 'dark']
                },
                collapse: {
                    visible: true,
                    loading: false,
                },
                badge: 10,
                notify: {
                    message: 'Hello world!',
                },
                form: {
                    visible: false,
                    data: _.mapValues(DATA_MAP, item => ''),
                    errors: _.mapValues(DATA_MAP, item => ([]))
                },
                infiniteLoad: {
                    data: [...Array(10)]
                }
            }
        },
        computed: {
            validateRules() {
                return _.mapValues(DATA_MAP, item => ({
                    required: true
                }))
            }
        },
        methods: {
            addNotify(message = '') {
                this.$notify.add(message !== '' ? message : this.notify.message, {
                    duration: 0,
                })
            },
            toggleCollapse(state) {
                if (_.isBoolean(state)) {
                    this.collapse.visible = state
                } else {
                    this.collapse.visible = !this.collapse.visible
                }
            },
            onLoading(load) {
                this.addNotify('loading');
                setTimeout(() => {
                    load.loaded();
                    this.addNotify('loaded');
                    this.infiniteLoad.data = [...this.infiniteLoad.data, ...Array(10)]
                }, 1000)
            }
        },
    }
</script>

<style lang="scss"
       scoped>
    .c-btn-group {
        display: flex;
        flex-flow: row wrap;
        justify-content: flex-start;

        & > * {
            margin-right: 10px;
        }
    }
</style>
