<script>
    import Notification from "./Notification.vue";
    import {notificationFactory} from "./utils";

    const ClassName = 'c-service-notify';

    export default {
        name: "NotificationList",
        components: {Notification},
        props: {
            position: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                list: []
            }
        },
        computed: {
            hasNotify() {
                return this.list.length > 0
            }
        },
        methods: {
            add(options) {
                const notify = notificationFactory(options);
                const {
                    id,
                    duration = 0
                } = notify;

                this.list.push(notify);

                if (duration > 0) {
                    this.$nextTick(() => {
                        setTimeout(() => {
                            this.remove(id)
                        }, duration);
                    })
                }
            },
            remove(id) {
                this.list = this.list.filter((item) => {
                    return item['id'] !== id
                })
            },
            clearAll() {
                this.list = [];
            },
            handleClick(event, item) {
                const {
                    onClick = () => {}
                } = item;

                onClick(event, item)
            },
            handleClose(event, item) {
                const {
                    id,
                    onClose = () => {}
                } = item;

                onClose(event, item);
                this.remove(id)
            }
        },
        render(createElement) {
            const Root = (children) => createElement('div', {
                class: ClassName,
                style: {
                    display: this.hasNotify ? 'block' : 'none'
                }
            }, [
                createElement('transition-group', {
                    class: `${ClassName}__list`,
                    props: {
                        tag: 'div',
                        name: 'transition-notify-list'
                    }
                }, children)
            ]);

            const Items = this.list.map(item => {
                const {
                    id,
                    title,
                    message,
                    color,
                } = item;

                return createElement(Notification, {
                    key: id,
                    props: {
                        id,
                        title,
                        message,
                        color
                    },
                    on: {
                        click: event => this.handleClick(event, item),
                        close: event => this.handleClose(event, item)
                    }
                })
            });

            return Root(Items)
        }
    }
</script>

<style lang="scss">
    .c-service-notify {
        position: fixed;
        top: 15px;
        right: 15px;
        z-index: 9999;
        width: auto;
        height: auto;

        &__list {
            display: block;
            width: 100%;
            max-width: 100%;
        }
    }

    .transition-notify-list {
        $offsetX: 50px;

        &-leave-active {
            position: absolute !important;
        }

        &-enter {
            transform: translate($offsetX, 0);
            opacity: 0;
        }

        &-enter-to,
        &-leave {
            transform: translate(0, 0);
            opacity: 1;
        }

        &-leave-to {
            transform: translate($offsetX, 0);
            opacity: 0;
        }
    }
</style>