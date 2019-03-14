<template>

    <transition name="modal-container-fade">
        <div v-show="visible"
             class="c-modal-container"
             tabindex="-1"
             role="dialog"
             @click="backdropClick">

            <div class="c-modal-container__wrap">

                <transition :name="modalTransition">

                    <template v-if="customContent">
                        <div v-show="visible"
                             class="c-modal">
                            <slot></slot>
                        </div>
                    </template>

                    <template v-else>
                        <div v-show="visible"
                             :class="modalClassName"
                             :style="modalStyle"
                             @click.stop>

                            <header v-if="hasTitle || hasIcon"
                                    class="c-modal__header">

                                <c-icon v-if="hasIcon"
                                        :name="icon"
                                        class="c-modal__header-icon"/>

                                <div v-if="hasTitle"
                                     class="c-modal__header-title">
                                    {{ title }}
                                </div>


                                <div class="c-modal__close-icon">
                                    <c-icon-btn v-show="allowDismiss"
                                                icon="close"
                                                :dense="true"
                                                :transparent="true"
                                                @click="close" />
                                </div>

                            </header>

                            <div class="c-modal__body">
                                <slot></slot>
                            </div>

                            <footer v-show="showFooter"
                                    class="c-modal__footer">
                                <slot name="footer"></slot>
                            </footer>

                        </div>
                    </template>

                </transition>

            </div>

        </div>
    </transition>

</template>

<script>
    import CIcon from "./Icon";
    import CIconBtn from "./IconButton";

    export default {
        name: "c-modal",
        components: {CIconBtn, CIcon},
        props: {
            title: {
                type: String,
                default: '',
                required: false
            },
            icon: {
                type: String,
                default: '',
                required: false
            },
            allowDismiss: {
                type: Boolean,
                default: true,
                required: false
            },
            outsideDismiss: {
                type: Boolean,
                default: true,
                required: false
            },
            modalTransition: {
                type: String,
                default: 'modal-scale',
                required: false
            },
            customContent: {
                type: Boolean,
                default: false,
                required: false
            },
            showFooter: {
                type: Boolean,
                default: true,
                required: false
            },
            flex: {
                type: Boolean,
                default: false,
                required: false
            },
            styleType: {
                type: String,
                default: 'default',
                required: false
            },
            maxWidth: {
                type: String,
                default: '400px',
                required: false
            }
        },
        data() {
            return {
                visible: false
            };
        },
        computed: {
            hasTitle() {
                return !_.isEmpty(this.title);
            },
            hasIcon() {
                return !_.isEmpty(this.icon);
            },
            modalClassName() {
                let base = 'c-modal';
                let mods = {};

                mods[`${base}--${this.styleType}`] = !!this.styleType;
                mods[`${base}--flex`] = this.flex;

                return [base, mods];
            },
            modalStyle() {
                return {
                    maxWidth: this.maxWidth
                }
            }
        },
        methods: {
            open() {
                document.querySelector('html').classList.add('modal-open');

                this.visible = true;
                this.$emit('open');
            },
            close() {
                document.querySelector('html').classList.remove('modal-open');

                this.visible = false;
                this.$emit('close');
            },
            toggle() {
                this.visible = !this.visible;
            },
            backdropClick(event) {
                event.preventDefault();
                event.stopPropagation();

                if (!this.allowDismiss) return;
                if (!this.outsideDismiss) return;

                this.close();
            }
        }
    }
</script>
