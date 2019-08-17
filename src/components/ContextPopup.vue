<template>
    <transition :name="transition">
        <c-card v-show="visible"
                class="c-context-menu"
                :style="styles">
            <slot v-bind="contextData"/>
        </c-card>
    </transition>
</template>

<script>
    import CCard from './Card.vue'

    export default {
        name: "c-context-popup",
        components: {
            CCard
        },
        props: {
            transition: {
                type: String,
                default: ''
            },
            closeOnClick: {
                type: Boolean,
                default: true
            },
        },
        data() {
            return {
                visible: false,
                clientY: 0,
                clientX: 0,
                contextData: {}
            }
        },
        computed: {
            styles() {
                return {
                    top: this.clientY + 'px',
                    left: this.clientX + 'px'
                }
            }
        },
        methods: {
            show(event = {}, data = {}) {
                const element = this.$el;

                const {
                    clientY,
                    clientX
                } = event;

                this.visible = true;
                this.contextData = data;
                this.clientY = clientY;
                this.clientX = clientX;

                this.$nextTick(() => {
                    const {
                        clientHeight: viewportHeight,
                        clientWidth: viewportWidth
                    } = document.documentElement;

                    const {
                        offsetHeight: elHeight,
                        offsetWidth: elWidth,
                    } = element;

                    const totalHeight = clientY + elHeight;
                    const totalWidth = clientX + elWidth;

                    const elOffsetY = totalHeight - viewportHeight;
                    const elOffsetX = totalWidth - viewportWidth;

                    let translateY = elOffsetY > 0 ? elOffsetY : 0;
                    let translateX = elOffsetX > 0 ? elOffsetX : 0;

                    element.style.transform = `translate(-${translateX}px, -${translateY}px)`;

                    this.$emit('show');
                });
            },
            hide() {
                this.visible = false;
                this.$nextTick(() => this.$emit('hide'));
            },
        },
        mounted() {
            let $vm = this;
            let $rootEl = $vm.$el;

            $rootEl.$_contextMenuHandlers = {
                onClick: event => {
                    const target = event.target;
                    const isChild = $rootEl.contains(target);
                    const isSelfClick = target === $rootEl;
                    const closeOnClick = $vm.closeOnClick;

                    if (isChild) {
                        if (closeOnClick) {
                            $vm.hide();
                            return;
                        }
                    }

                    if (!isSelfClick && !isChild) {
                        $vm.hide()
                    }
                },
                onScroll: event => {
                    if ($vm.visible) {
                        $vm.hide()
                    }
                }
            };

            window.addEventListener('click', $rootEl.$_contextMenuHandlers.onClick);
            window.addEventListener('scroll', $rootEl.$_contextMenuHandlers.onScroll);
        },
        beforeDestroy() {
            window.removeEventListener('click', this.$el.$_contextMenuHandlers.onClick);
            window.removeEventListener('scroll', this.$el.$_contextMenuHandlers.onScroll);
        }
    }
</script>

<style lang="scss"
       scoped>
    .c-context-menu {
        position: fixed;
        z-index: 2000;
        top: 0;
        left: 0;
        display: block;
        width: auto;
        height: auto;
        transform: translate(0, 0);
    }
</style>