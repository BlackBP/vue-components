<template>
    <div>
        <c-btn>
            Hello world!
        </c-btn>
    </div>
</template>

<script>
    import CBtn from "../src/components/button/CBtn";

    export default {
        name: "App",
        components: {CBtn}
    }
</script>

<style lang="scss">
    @import "../src/styles/index";
</style>