<template>
    <div id="app">
        <div class="container">
            <c-loading :visible="true"
                       :text="false" />
        </div>
    </div>
</template>

<script>
    export default {
        name: "App"
    }
</script>

<style lang="scss">
    $g-font-family: 'Lato', sans-serif;
    @import url('https://fonts.googleapis.com/css?family=Lato:400,700');
    @import "../styles/bundle";

    * {
        font-family: inherit;
        font-size: inherit;
        line-height: inherit;
        color: inherit;
    }

    html {
        font-family: $g-font-family;
    }
</style>
