<template>
    <div class="c-context-popup-item">
        <c-icon v-if="leading"
                class="c-context-popup-item__leading"
                :name="leading" />

        <span class="c-context-popup-item__text">{{ text }}</span>

        <c-icon v-if="trailing"
                class="c-context-popup-item__trailing"
                :name="trailing" />
    </div>
</template>

<script>
    export default {
        name: "c-context-popup-item",
        props: {
            leading: {
                type: String
            },
            text: {
                type: String,
            },
            trailing: {
                type: String
            },
        }
    }
</script>

<style lang="scss"
       scoped>
    .c-context-popup-item {
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-start;
        align-items: center;
        padding: 5px 10px;
        line-height: 1;
        font-size: 1rem;
        cursor: pointer;

        &:hover,
        &:focus {
            background-color: rgba(#000, 0.1);
        }

        & + & {
            margin-top: 5px;
        }

        &__text {
            display: inline-block;
            margin: auto auto auto 0;
            white-space: nowrap;
        }

        &__leading,
        &__trailing {
            flex: 0 0 auto;
            display: inline-flex;
            align-items: center;
            font-size: 1.125em;
        }

        &__leading {
            margin: auto 10px auto 0;
        }

        &__trailing {
            margin: auto 0 auto 10px;
        }
    }
</style>