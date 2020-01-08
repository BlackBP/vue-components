<template>
    <transition :name="transition">
        <div v-show="visible"
             class="c-overlay"
             :class="className"
             :style="styles"
             @click="outsideDismiss && hide()">

            <transition :name="contentTransition">
                <div v-show="visible"
                     class="c-overlay__content"
                     :class="contentClass"
                     @click.stop>
                    <slot />
                </div>
            </transition>

        </div>
    </transition>
</template>

<script>
    const MODEL = {
        prop: 'visible',
        event: 'change'
    };

    export default {
        name: "c-overlay",
        model: MODEL,
        props: {
            visible: {
                type: Boolean,
                default: false
            },
            transition: {
                type: String,
                default: 'c-overlay'
            },
            absolute: {
                type: Boolean,
                default: false
            },
            outsideDismiss: {
                type: Boolean,
                default: false
            },
            zIndex: {
                type: [String, Number],
                default: 9999
            },
            contentClass: {
                type: String,
                default: ''
            },
            contentTransition: {
                type: String,
                default: 'c-overlay'
            },
        },
        computed: {
            className() {
                return {
                    'is-absolute': this.absolute
                }
            },
            styles() {
                return {
                    zIndex: this.zIndex
                }
            }
        },
        methods: {
            show() {
                this.$emit(MODEL.event, true)
            },
            hide() {
                this.$emit(MODEL.event, false)
            }
        }
    }
</script>