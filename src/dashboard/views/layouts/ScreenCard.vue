<template functional>
    <c-card class="c-elevate-3">
        <h2 class="h2"
            style="display: flex; justify-content: center; align-items: center;">
            <c-icon v-if="props.icon"
                    style="margin-right: 10px;"
                    :name="props.icon"/>
            {{ props.header }}
        </h2>

        <c-divider />

        <slot/>
    </c-card>
</template>

<script>
    export default {
        name: "LayoutScreenCard",
        props: {
            header: String,
            icon: String
        }
    }
</script>