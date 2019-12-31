<template>
    <c-container class="sandbox">

        <sandbox-section>
            <template v-for="(item, rowIndex) in [...Array(12)]">
                <c-row style="margin-bottom: 1rem;">
                    <c-col v-for="(item, index) in [...Array(++rowIndex)]"
                           :key="index">
                        <c-card class="text-center"
                                :class="`elevate-${rowIndex}`">
                            <b>{{ ++index }}</b>
                        </c-card>
                    </c-col>
                </c-row>
            </template>
        </sandbox-section>

        <sandbox-section>
            <c-card class="elevate-6">
                <c-row>
                    <c-col>
                        <c-form-field label="errorText"
                                      label-for="errorText">
                            <c-text-input v-model="errorText"
                                          id="errorText"
                                          placeholder="errorText"/>
                        </c-form-field>

                        <c-form-field label="helper"
                                      label-for="helper">

                            <c-text-input v-model="helperText"
                                          id="helper"
                                          placeholder="helperText"/>
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
                                      :helper="helperText"
                                      :error="errorText">
                            <c-select v-model="state"
                                      id="states"
                                      placeholder="Select..."
                                      :toggleable="true"
                                      :state="state"
                                      :options="stateList"/>
                        </c-form-field>
                    </c-col>
                    <c-col>
                        <c-form-field>
                            <c-checkbox v-model="checkbox"/>
                            <br>
                            <c-checkbox v-model="checkbox">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae ea eveniet nostrum quasi quo
                                totam veritatis vitae! Debitis dolore dolorem ex id minima, minus rerum. Assumenda est in ullam.
                                Eius!
                            </c-checkbox>
                        </c-form-field>

                        <c-form-field>
                            <c-switch v-model="checkbox"/>
                            <br>
                            <c-switch v-model="checkbox">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae ea eveniet nostrum quasi quo
                                totam veritatis vitae! Debitis dolore dolorem ex id minima, minus rerum. Assumenda est in ullam.
                                Eius!
                            </c-switch>
                        </c-form-field>

                        <c-form-field>
                            <template v-for="item in stateList">
                                <c-radio v-model="state"
                                         name="state"
                                         style="margin-right: 1rem;"
                                         :key="item"
                                         :value="item">
                                    {{ item }}
                                    <br>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus animi aspernatur
                                    consequatur debitis excepturi fugiat, impedit in iure labore, libero minus natus numquam
                                    obcaecati omnis quod quos repudiandae tempore voluptatem.
                                </c-radio>
                                <br>
                            </template>
                        </c-form-field>
                    </c-col>
                </c-row>
            </c-card>
        </sandbox-section>

    </c-container>
</template>

<script>
    import CCard from "../src/components/card/CCard";
    import CTextInput from "../src/components/form-text-input/CTextInput";
    import CFormField from "../src/components/form-field/CFormField";
    import CTextArea from "../src/components/form-text-area/CTextArea";
    import CSelect from "../src/components/form-select/CSelect";
    import CCheckbox from "../src/components/form-checkbox/CCheckbox";
    import CRadio from "../src/components/form-radio/CRadio";
    import CSwitch from "../src/components/form-switch/CSwitch";
    import CContainer from "../src/components/grid/CContainer";
    import CRow from "../src/components/grid/CRow";
    import CCol from "../src/components/grid/CCol";
    import SandboxSection from "./SandboxSection";

    export default {
        name: "App",
        components: {
            SandboxSection,
            CCol,
            CRow,
            CContainer,
            CSwitch,
            CRadio,
            CCheckbox,
            CSelect,
            CTextArea,
            CFormField,
            CTextInput,
            CCard
        },
        data() {
            return {
                checkbox: false,
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
        display: block;
        width: 100%;
        min-height: 100vh;
        background-color: #999;
        padding: 2rem;

        &-card {
            width: 100%;
        }
    }
</style>