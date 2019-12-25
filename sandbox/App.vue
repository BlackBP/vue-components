<template>
    <div class="sandbox">
        <c-card class="sandbox-card">
            <c-form-field label="errorText"
                          label-for="errorText"
                          :helper="helperText"
                          :error="errorText">
                <template slot-scope="field">
                    <c-text-input v-model="errorText"
                                  id="errorText"
                                  placeholder="errorText"
                                  :state="field.state"/>
                </template>
            </c-form-field>

            <c-form-field label="helper"
                          label-for="helper"
                          :helper="helperText"
                          :error="errorText">
                <template slot-scope="field">
                    <c-text-input v-model="helperText"
                                  id="helper"
                                  placeholder="helperText"
                                  :state="field.state"/>
                </template>
            </c-form-field>

            <c-form-field label="textArea"
                          label-for="textArea"
                          :helper="helperText"
                          :error="errorText">
                <template slot-scope="field">
                    <c-text-area v-model="textArea"
                                 id="textArea"
                                 placeholder="Placeholder"
                                 :state="field.state"/>
                </template>
            </c-form-field>

            <c-form-field label="states"
                          label-for="states"
                          :helper="`selected -> ${state}`"
                          :error="errorText">
                <template slot-scope="field">
                    <c-select v-model="state"
                              id="states"
                              placeholder="Select..."
                              :toggleable="true"
                              :state="field.state"
                              :options="stateList"/>
                </template>
            </c-form-field>
        </c-card>
    </div>
</template>

<script>
    import CCard from "../src/components/card/CCard";
    import CTextInput from "../src/components/form-text-input/CTextInput";
    import CFormField from "../src/components/form-field/CFormField";
    import CTextArea from "../src/components/form-text-area/CTextArea";
    import CSelect from "../src/components/form-select/CSelect";

    export default {
        name: "App",
        components: {CSelect, CTextArea, CFormField, CTextInput, CCard},
        data() {
            return {
                textArea: '',
                errorText: '',
                helperText: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad alias asperiores commodi consectetur facere incidunt iste itaque, iure laborum magni molestiae nesciunt nisi officia optio perferendis porro praesentium repellat suscipit!',
                state: '',
                stateList: ['has-error', 'has-success', 'is-disabled', 'is-readonly']
            }
        }
    }
</script>

<style lang="scss">
    @import "~@mdi/font/css/materialdesignicons.min.css";
    @import "../src/styles/index";

    html,
    body {
        display: block;
        background-color: #fff;
    }

    .sandbox {
        display: flex;
        flex-flow: column nowrap;
        justify-content: flex-start;
        align-items: center;
        width: 100%;
        min-height: 100vh;
        padding: 2rem;
        background-color: #999;

        &-card {
            width: 100%;
            max-width: 400px;
            margin: auto;
        }
    }
</style>