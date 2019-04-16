<template>
    <form action="#">

        <c-text-input v-model="data.name"
                      placeholder="Наименование товара"/>

    </form>
</template>

<script>
    import CTextInput from "../../components/TextInput";
    export default {
        name: "view-product-main-form",
        components: {
            CTextInput
        },
        data() {
            return {
                data: {
                    name: ''
                }
            }
        }
    }
</script>
