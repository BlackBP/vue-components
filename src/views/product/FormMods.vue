<template>
    <form action="#">

        Mods

    </form>
</template>

<script>
    import CTextInput from "../../components/TextInput";
    export default {
        name: "view-product-mods-form",
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
