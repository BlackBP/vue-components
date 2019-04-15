<template>
    <div class="c-pagination">

        <button class="c-pagination__btn"
                :disabled="isFirst"
                @click="handleChange(current - 1)">
            <c-icon name="arrow-left"/>
        </button>

        <div v-show="hasPages"
             class="c-pagination__list">
            <a v-for="page in list"
               href="#"
               class="c-pagination__item"
               :key="`pagination-item-${page.number}`"
               :class="page.active ? 'is-active' : ''"
               @click.prevent="handleChange(page.number)">
                {{ page.number }}
            </a>
        </div>

        <button class="c-pagination__btn"
                :disabled="isLast"
                @click="handleChange(current + 1)">
            <c-icon name="arrow-right"/>
        </button>

    </div>
</template>

<script>
    import CIcon from "./Icon";

    export default {
        name: "c-pagination",
        components: {CIcon},
        props: {
            value: {
                type: Number,
                default: 1
            },
            last: {
                type: Number,
                default: 1,
                required: true
            },
            limit: {
                type: Number,
                default: 5,
                required: false
            }
        },
        data() {
            return {

            }
        },
        computed: {
            current() {
                return this.value;
            },
            isLast() {
                return Math.abs(this.current) === Math.abs(this.last);
            },
            isFirst() {
                return this.current === 1;
            },
            hasPages() {
                return this.last >= this.current;
            },
            list() {
                let list = [];
                let current = Math.abs(this.current);
                let last = Math.abs(this.last);
                let limit = Math.abs(this.limit);

                // Корректировка текущего индекса
                current = (current <= 0) ? 1 : current;
                current = (current > last) ? last : current;

                // Если количество видимых больше количества страниц, то уравниваем их
                limit = (limit > last) ? last : limit;

                // Вычисление смещение относительно текущего индекса
                let offset = Math.floor(Math.abs(limit / 2));

                // Вычисляем начальный индекс
                let startItem = current - offset;
                startItem = (startItem <= 0) ? 1 : startItem;

                // Вычисляем размер массива видимых страниц
                let size = limit - 1;

                // Находим конечный индекс
                let endItem = startItem + size;
                endItem = (endItem > last) ? last : endItem;

                // Корректируем начальный индекс
                startItem = (size > endItem - startItem) ? endItem - size : startItem;
                startItem = (startItem <= 0) ? 1 : startItem;

                for (let i = startItem; i <= endItem; i++) {
                    list.push({
                        number: i,
                        active: i === current
                    })
                }

                return list;

            }
        },
        methods: {
            handleChange(value) {
                value = Math.abs(value);
                value = (value <= 0) ? 1 : value;
                value = (value >= this.last) ? this.last : value;

                this.$emit('change', value)
            }
        }
    }
</script>

<style lang="scss">
    .c-pagination {
        display: inline-flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
        line-height: 1;
        text-align: center;
        font-size: 1.125rem;

        $hover-background: rgba(#000, 0.15);
        $active-background: rgba(#000, 0.25);

        &__list {
            display: inline-flex;
            flex-flow: row nowrap;
            justify-content: space-between;
            align-items: center;
        }

        &__btn,
        &__item {
            display: inline-block;
            width: 2em;
            height: 2em;
            border-radius: calc(2em / 2);
            line-height: 2em;
            cursor: pointer;
            transition: $g-transition;

            &:hover,
            &:focus {
                text-decoration: none;
                background-color: $hover-background;
            }

            &:active {
                background-color: $active-background;
            }
        }

        &__btn {
            display: inline-block;
            width: 2em;
            height: 2em;
            padding: 0;
            background: transparent;
            border: none;
            appearance: none;

            &[disabled],
            &[disabled="disabled"] {
                color: rgba(#000, 0.3);
                cursor: not-allowed;

                &:hover,
                &:focus {
                    background-color: transparent;
                }
            }
        }

        &__item {
            margin-left: 3px;
            margin-right: 3px;
            text-decoration: none;

            &.is-active {
                background-color: $color-primary;
                color: #fff;
            }
        }
    }
</style>
