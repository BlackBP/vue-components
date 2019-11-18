<template>
    <div class="c-clock">
        <div class="c-clock__time">
            <span class="c-clock__time-numbers">{{ hours }}</span>
            <span class="c-clock__time-divider">{{ divider }}</span>
            <span class="c-clock__time-numbers">{{ minutes }}</span>

            <template v-if="showSeconds">
                <span class="c-clock__time-divider">{{ divider }}</span>
                <span class="c-clock__time-numbers">{{ seconds }}</span>
            </template>
        </div>

        <template v-if="showDate">
            <div class="c-clock__date">
                {{ date }}
            </div>
        </template>
    </div>
</template>

<script>
    import moment from 'moment';

    export default {
        name: "Clock",
        props: {
            divider: {
                type: String,
                default: ':'
            },
            showSeconds: {
                type: Boolean,
                default: true
            },
            showDate: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                hours: '--',
                minutes: '--',
                seconds: '--',
                date: ''
            }
        },
        mounted() {
            moment.locale('en');

            setInterval(() => {
                this.hours = moment().format('HH');
                this.minutes = moment().format('mm');
                this.seconds = moment().format('ss');
                this.date = moment().format('LL');
            }, 1000)
        }
    }
</script>

<style lang="scss" scoped>
    .c-clock {
        display: inline-block;
        line-height: 1;
        font-size: 1.5rem;
        font-weight: 600;

        &__time {
            display: flex;
            flex-flow: row nowrap;
            justify-content: center;
            align-items: center;
            width: 100%;

            &-numbers {
                line-height: 1;
                font-size: 1em;
            }

            &-divider {
                display: inline-block;
                margin: auto 0.1em auto;
                line-height: 1;
                font-size: 1em;
            }
        }

        &__date {
            display: block;
            margin-top: 0.1em;
            font-size: 0.55em;
        }
    }
</style>