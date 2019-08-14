<template>
    <div v-show="hasNotify"
         class="c-service-notify">
        <transition-group name="transition-notify-list"
                          tag="div"
                          class="c-service-notify__list">

            <c-card v-for="item in list"
                    class="c-notify-item c-elevate-3"
                    :key="item.id"
                    @click="handleClick(item)">

                <div v-if="item.title"
                     class="c-notify-item__title">
                    {{ item.title }}
                </div>

                <div v-if="item.message"
                     class="c-notify-item__message">
                    {{ item.message }}
                </div>

                <c-icon-btn icon="close"
                            class="c-notify-item__close-btn"
                            :transparent="true"
                            @click.stop="handleClose(item)"/>
            </c-card>

        </transition-group>
    </div>
</template>

<script>

    const NOTIFY_MAP = {
        id: 'id'
    };

    /**
     *
     * @param {Object} notify
     * @param {String} [notify.message]
     * @param {String} [notify.title]
     * @param {Number} [notify.duration]
     * @param {Function} [notify.color]
     * @param {Function} [notify.onClick]
     * @param {Function} [notify.onClose]
     * @return {{uniqId: Number, duration: Number, onClick: Function, message: String}}
     */
    function makeNotify(notify = {}) {
        let {
            message = '',
            title = 'Уведомление',
            duration = 10000,
            color = '',
            onClick = () => {
            },
            onClose = () => {
            },
            ...rest
        } = notify;

        return {
            id: `notify-${+new Date()}`,
            message,
            title,
            duration,
            color,
            onClick,
            onClose,
            ...rest
        }
    }

    export default {
        name: "ServiceNotify",
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
            add(notify) {
                notify = makeNotify(notify);

                this.list.push(notify);

                if (notify.duration > 0) {
                    this.$nextTick(() => {
                        setTimeout(() => {
                            this.remove(notify)
                        }, notify.duration);
                    })
                }
            },
            remove(notify) {
                this.list = this.list.filter((value) => {
                    return value[NOTIFY_MAP.id] !== notify[NOTIFY_MAP.id]
                })
            },
            clearAll() {
                this.list = [];
            },
            handleClick(notify = {}) {
                let {
                    onClick = () => {
                    }
                } = notify;

                onClick();
                this.remove(notify);
            },
            handleClose(notify = {}) {
                let {
                    onClose = () => {
                    }
                } = notify;

                onClose();
                this.remove(notify);
            }
        }
    }
</script>

<style lang="scss"
       scoped>
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

    .c-notify-item {
        position: relative;
        display: block;
        width: 320px;
        background: rgba(#03A9F4, 0.9);
        padding-right: 30px;
        margin-bottom: 10px;
        color: #ffffff;
        cursor: pointer;
        transition: 0.3s ease;

        &:last-child {
            margin-bottom: 0;
        }

        &__title {
            display: block;
            margin-bottom: 0.3rem;
            font-size: 1.2rem;
            font-weight: bold;
        }

        &__message {
            display: block;
            width: 100%;
            max-width: 100%;
            word-break: break-word;
        }

        &__close-btn {
            position: absolute;
            z-index: 2;
            top: 5px;
            right: 5px;
            width: 1.2em;
            height: 1.2em;
            font-size: 20px;
        }
    }

    .transition-notify-list {
        $offsetX: 50px;

        &-leave-active {
            position: absolute;
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