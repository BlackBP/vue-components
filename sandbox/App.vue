<template>
    <div class="sandbox elevate-6">
        <c-form-field>
            <c-switch v-model="switcher">
                Switch me!
            </c-switch>
        </c-form-field>

        <c-form-field>
            <c-text-input v-model="text"
                          :helper="'helper: ' + text" />
        </c-form-field>

        <c-form-field>
            <c-text-input v-model="text"
                          :multiline="true"
                          :helper="'helper: ' + text" />
        </c-form-field>
    </div>
</template>

<script>


    import CTextInput from "../src/components/form-text-input/CTextInput";
    import CFormField from "../src/components/form-field/CFormField";
    import CSwitch from "../src/components/form-switch/CSwitch";
    export default {
        name: "App",
        components: {
            CSwitch,
            CFormField,
            CTextInput
        },
        data() {
            return {
                text: 'Hello world!',
                switcher: false
            }
        }
    }
</script>

<style lang="scss">
    @import "../src/styles/index";
    
    body {
        background-color: #999;
    }

    .sandbox {
        display: block;
        width: 100%;
        max-width: 1000px;
        margin: 2rem auto 0;
        padding: 1rem;
        border-radius: .5rem;
        background-color: #fff;
    }
</style>