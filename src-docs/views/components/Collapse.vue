<template>
    <layout-screen-card>
        <c-card class="elevate-3">
            <c-card-section>
                <c-btn @click="toggle">
                    Toggle
                </c-btn>
            </c-card-section>

            <c-collapse :visible="collapsed">
                <c-card-section>
                    <p style="margin-top: 0;">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium architecto culpa, cumque debitis dolorum ducimus eveniet libero magnam, minus perspiciatis porro possimus quibusdam quisquam recusandae, rerum sapiente soluta tempore voluptatem.</p>
                    <p style="margin-top: 0;">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium architecto culpa, cumque debitis dolorum ducimus eveniet libero magnam, minus perspiciatis porro possimus quibusdam quisquam recusandae, rerum sapiente soluta tempore voluptatem.</p>
                    <p style="margin-top: 0;">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium architecto culpa, cumque debitis dolorum ducimus eveniet libero magnam, minus perspiciatis porro possimus quibusdam quisquam recusandae, rerum sapiente soluta tempore voluptatem.</p>
                    <c-btn color="error"
                           @click="hide">
                        Hide me!
                    </c-btn>
                </c-card-section>
            </c-collapse>

        </c-card>
    </layout-screen-card>
</template>

<script>
    import LayoutScreenCard from "../layouts/ScreenCard";

    export default {
        name: "ScreenCollapse",
        components: {
            LayoutScreenCard
        },
        data() {
            return {
                collapsed: false
            }
        },
        methods: {
            toggle() {
                this.collapsed = !this.collapsed
            },
            hide() {
                this.collapsed = false
            },
            show() {
                this.collapsed = true
            }
        }
    }
</script>

<style scoped>

</style>