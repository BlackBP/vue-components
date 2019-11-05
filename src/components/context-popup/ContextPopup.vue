<template>
    <transition :name="transition">
        <div v-show="visible"
             class="c-context-popup c-elevate-6"
             :style="styles">
            <slot v-bind="contextData"/>
        </div>
    </transition>
</template>

<script>
    import {CCard} from '../card'

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
            pointerOffset: {
                type: Number,
                default: 3
            },
            sideOffset: {
                type: Number,
                default: 10
            }
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
                    top: this.clientY + this.pointerOffset + 'px',
                    left: this.clientX + this.pointerOffset + 'px'
                }
            }
        },
        methods: {
            show(event = {}, data = {}) {
                if(event instanceof MouseEvent) {
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

                        let translateY = elOffsetY > 0 ? elOffsetY + this.sideOffset : 0;
                        let translateX = elOffsetX > 0 ? elOffsetX + this.sideOffset : 0;

                        element.style.transform = `translate(-${translateX}px, -${translateY}px)`;

                        this.$emit('show');
                    });
                } else {
                    throw TypeError(`event must be instanceof MouseEvent`);
                }
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
                onScroll: () => {
                    if ($vm.visible) {
                        $vm.hide()
                    }
                }
            };

            window.addEventListener('click', $rootEl.$_contextMenuHandlers.onClick);
            window.addEventListener('scroll', $rootEl.$_contextMenuHandlers.onScroll, true);
        },
        beforeDestroy() {
            window.removeEventListener('click', this.$el.$_contextMenuHandlers.onClick);
            window.removeEventListener('scroll', this.$el.$_contextMenuHandlers.onScroll, true);
        }
    }
</script>