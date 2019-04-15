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
        model: {
            event: 'change'
        },
        components: {CIcon},
        props: {
            value: {
                type: Number,
                default: 1
            },
            total: {
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
                return Math.abs(this.current) === Math.abs(this.total);
            },
            isFirst() {
                return this.current === 1;
            },
            hasPages() {
                return this.total >= this.current;
            },
            list() {
                let list = [];
                let current = Math.abs(this.current);
                let total = Math.abs(this.total);
                let limit = Math.abs(this.limit);

                // Корректировка текущего индекса
                current = (current <= 0) ? 1 : current;
                current = (current > total) ? total : current;

                // Если количество видимых больше количества страниц, то уравниваем их
                limit = (limit > total) ? total : limit;

                // Вычисление смещение относительно текущего индекса
                let offset = Math.floor(Math.abs(limit / 2));

                // Вычисляем начальный индекс
                let startItem = current - offset;
                startItem = (startItem <= 0) ? 1 : startItem;

                // Вычисляем размер массива видимых страниц
                let size = limit - 1;

                // Находим конечный индекс
                let endItem = startItem + size;
                endItem = (endItem > total) ? total : endItem;

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
                value = (value >= this.total) ? this.total : value;

                this.$emit('change', value);
            }
        }
    }
</script>
