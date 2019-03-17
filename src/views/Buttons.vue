<template>
    <div>

        <c-section title="Normal">
            <c-btn v-for="button in buttons"
                   class="ml10px"
                   :key="`normal-${button.text}`"
                   :color="button.color"
                   :text="button.text"/>

            <template slot="subsections">
                <c-section>
                    <c-btn v-for="button in buttons"
                           class="ml10px"
                           :key="`normal-w-icons-${button.text}`"
                           :color="button.color"
                           :text="button.text"
                           :icon="button.icon"
                           :icon-left="true"/>
                </c-section>

                <c-section>
                    <c-icon-btn v-for="button in buttons"
                                class="ml10px"
                                :key="`icon-btn-normal-${button.text}`"
                                :color="button.color"
                                :icon="button.icon"/>
                </c-section>

                <c-section>
                    <c-icon-btn v-for="button in buttons"
                                class="ml10px"
                                :key="`icon-btn-normal-dense-${button.text}`"
                                :dense="true"
                                :color="button.color"
                                :icon="button.icon"/>
                </c-section>
            </template>
        </c-section>

        <c-section title="Elevated">
            <c-btn v-for="button in buttons"
                   class="ml10px"
                   :key="`elevated-${button.text}`"
                   :color="button.color"
                   :text="button.text"
                   :elevated="true"/>

            <template slot="subsections">
                <c-section>
                    <c-btn v-for="button in buttons"
                           class="ml10px"
                           :key="`elevated-w-icon-${button.text}`"
                           :color="button.color"
                           :text="button.text"
                           :elevated="true"
                           :icon="button.icon"
                           :icon-left="true"/>
                </c-section>

                <c-section>
                    <c-icon-btn v-for="button in buttons"
                                class="ml10px"
                                :key="`icon-btn-normal-${button.text}`"
                                :elevated="true"
                                :color="button.color"
                                :icon="button.icon"/>
                </c-section>

                <c-section>
                    <c-icon-btn v-for="button in buttons"
                                class="ml10px"
                                :key="`icon-btn-normal-${button.text}`"
                                :dense="true"
                                :elevated="true"
                                :color="button.color"
                                :icon="button.icon"/>
                </c-section>
            </template>
        </c-section>

        <c-section title="Transparent">
            <c-btn v-for="button in buttons"
                   class="ml10px"
                   :key="`transparent-${button.text}`"
                   :color="button.color"
                   :text="button.text"
                   :transparent="true"/>

            <template slot="subsections">
                <c-section>
                    <c-btn v-for="button in buttons"
                           class="ml10px"
                           :key="`transparent-${button.text}`"
                           :color="button.color"
                           :text="button.text"
                           :transparent="true"
                           :icon="button.icon"
                           :icon-left="true"/>
                </c-section>

                <c-section>
                    <c-icon-btn v-for="button in buttons"
                                class="ml10px"
                                :key="`icon-btn-normal-${button.text}`"
                                :transparent="true"
                                :color="button.color"
                                :icon="button.icon"/>
                </c-section>

                <c-section>
                    <c-icon-btn v-for="button in buttons"
                                class="ml10px"
                                :key="`icon-btn-normal-${button.text}`"
                                :dense="true"
                                :transparent="true"
                                :color="button.color"
                                :icon="button.icon"/>
                </c-section>
            </template>
        </c-section>

        <c-section title="Disabled">
            <c-btn v-for="button in buttons"
                   class="ml10px"
                   :key="`transparent-${button.text}`"
                   :color="button.color"
                   :text="button.text"
                   :disabled="true"/>

            <template slot="subsections">
                <c-section>
                    <c-btn v-for="button in buttons"
                           class="ml10px"
                           :key="`transparent-${button.text}`"
                           :color="button.color"
                           :text="button.text"
                           :disabled="true"
                           :icon="button.icon"
                           :icon-left="true"/>
                </c-section>

                <c-section>
                    <c-icon-btn v-for="button in buttons"
                                class="ml10px"
                                :key="`icon-btn-normal-${button.text}`"
                                :disabled="true"
                                :color="button.color"
                                :icon="button.icon"/>
                </c-section>

                <c-section>
                    <c-icon-btn v-for="button in buttons"
                                class="ml10px"
                                :key="`icon-btn-normal-${button.text}`"
                                :disabled="true"
                                :dense="true"
                                :color="button.color"
                                :icon="button.icon"/>
                </c-section>
            </template>
        </c-section>

    </div>
</template>

<script>
    import CBtn from "../components/base/Button";
    import CSection from "../components/Section";
    import CIconBtn from "../components/base/IconButton";

    export default {
        name: 'screen-buttons',
        components: {
            CIconBtn,
            CSection,
            CBtn
        },
        data() {
            return {
                buttons: [
                    {
                        text: 'NORMAL',
                        color: '',
                        icon: 'settings',
                    },
                    {
                        text: 'PRIMARY',
                        color: 'primary',
                        icon: 'phone',
                    },
                    {
                        text: 'SECONDARY',
                        color: 'secondary',
                        icon: 'magnify',
                    },
                    {
                        text: 'SUCCESS',
                        color: 'success',
                        icon: 'check-circle',
                    },
                    {
                        text: 'ERROR',
                        color: 'error',
                        icon: 'close',
                    },
                    {
                        text: 'WARN',
                        color: 'warn',
                        icon: 'alert-circle',
                    },
                    {
                        text: 'INFO',
                        color: 'info',
                        icon: 'information',
                    },
                ]
            }
        },
        methods: {
            alert(e) {
                alert('Pressed!');
                console.info(e);
            }
        }
    }
</script>

<style lang="scss"
       scoped>
    .ml10px {
        margin-left: 10px;
    }
</style>
