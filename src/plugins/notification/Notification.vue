<template>
    <c-card class="c-notify-item elevate-3"
            :class="className"
            @click="handleClick">

        <div v-if="title"
             class="c-notify-item__title">
            {{ title }}
        </div>

        <div v-if="message"
             class="c-notify-item__message">
            {{ message }}
        </div>

        <c-icon-btn icon="close"
                    class="c-notify-item__close-btn"
                    color="light"
                    :transparent="true"
                    @click.stop="handleClose"/>
    </c-card>
</template>

<script>
    import {CCard} from "../../components/card";
    import {CIconBtn} from "../../components/icon-button";

    export default {
        name: "Notification",
        props: {
            id: {
                type: [String, Number],
                default: '',
                required: true
            },
            title: {
                type: String,
                default: ''
            },
            message: {
                type: String,
                default: ''
            },
            color: {
                type: String,
                default: ''
            }
        },
        components: {
            CIconBtn,
            CCard
        },
        computed: {
            className() {
                return `is-${this.color}`
            }
        },
        methods: {
            handleClick(event) {
                this.$emit('click', event)
            },
            handleClose(event) {
                this.$emit('close', event)
            }
        },
    }
</script>

<style lang="scss" scoped>
    $opacity: 0.95;

    .c-notify-item {
        position: relative;
        display: block;
        width: 320px;
        background: rgba(#37474f, $opacity);
        padding-right: 30px;
        margin-bottom: 10px;
        color: #ffffff;
        cursor: pointer;
        transition: transform .3s ease, opacity .3s ease;

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

        &.is-error {
            background: rgba(#F44336, $opacity);
        }
        &.is-warn {
            background: rgba(#FF9800, $opacity);
        }
        &.is-success {
            background: rgba(#4CAF50, $opacity);
        }
        &.is-info {
            background: rgba(#03A9F4, $opacity);
        }
    }
</style>