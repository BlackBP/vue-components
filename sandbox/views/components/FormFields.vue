<template>
    <layout-screen-card :header="$route.meta.title"
                        :icon="$route.meta.icon">

        <!-- Text input -->
        <c-card-section>
            <h3>
                Text Input
            </h3>

            <c-divider/>

            <c-card-section>

                <c-grid-row>

                    <c-grid-col xl="3">
                        <c-form-row>
                            <h4>Regular</h4>
                        </c-form-row>
                        <c-form-row>
                            <c-text-input v-model="data[fieldsConfig.textInput.key]"
                                          :helper="fieldsConfig.textInput.helper"
                                          :type="fieldsConfig.textInput.type"
                                          :mask="fieldsConfig.textInput.mask"
                                          :placeholder="fieldsConfig.textInput.placeholder"/>
                        </c-form-row>
                    </c-grid-col>

                    <c-grid-col xl="3">
                        <c-form-row>
                            <h4>With leading icon</h4>
                        </c-form-row>
                        <c-form-row>
                            <c-text-input v-model="data[fieldsConfig.textInput.key]"
                                          :helper="fieldsConfig.textInput.helper"
                                          :type="fieldsConfig.textInput.type"
                                          :mask="fieldsConfig.textInput.mask"
                                          :leading="fieldsConfig.textInput.leading"
                                          :placeholder="fieldsConfig.textInput.placeholder"/>
                        </c-form-row>
                    </c-grid-col>

                    <c-grid-col xl="3">
                        <c-form-row>
                            <h4>With trailing icon</h4>
                        </c-form-row>
                        <c-form-row>
                            <c-text-input v-model="data[fieldsConfig.textInput.key]"
                                          :helper="fieldsConfig.textInput.helper"
                                          :type="fieldsConfig.textInput.type"
                                          :mask="fieldsConfig.textInput.mask"
                                          :trailing="fieldsConfig.textInput.trailing"
                                          :placeholder="fieldsConfig.textInput.placeholder"/>
                        </c-form-row>
                    </c-grid-col>

                    <c-grid-col xl="3">
                        <c-form-row>
                            <h4>With leading and trailing icons</h4>
                        </c-form-row>
                        <c-form-row>
                            <c-text-input v-model="data[fieldsConfig.textInput.key]"
                                          :helper="fieldsConfig.textInput.helper"
                                          :type="fieldsConfig.textInput.type"
                                          :mask="fieldsConfig.textInput.mask"
                                          :leading="fieldsConfig.textInput.leading"
                                          :trailing="fieldsConfig.textInput.trailing"
                                          :placeholder="fieldsConfig.textInput.placeholder"
                                          :errors="errors[fieldsConfig.textInput.key]"/>
                        </c-form-row>
                    </c-grid-col>

                </c-grid-row>

            </c-card-section>

        </c-card-section>

        <!-- Text area -->
        <c-card-section>
            <h3>
                Text Area
            </h3>

            <c-divider/>

            <c-card-section>
                <c-text-area v-model="data[fieldsConfig.textArea.key]"
                             :placeholder="fieldsConfig.textArea.placeholder"
                             :helper="fieldsConfig.textArea.helper"/>
            </c-card-section>

        </c-card-section>

        <!-- Select -->
        <c-card-section>
            <h3>
                Select
            </h3>

            <c-divider/>

            <c-card-section>

                <c-grid-row>

                    <c-grid-col xl="3">
                        <c-select v-model="selected"
                                  track-by="id"
                                  option-label="name"
                                  placeholder="Select"
                                  :options="selectList"
                                  :searchable="true"
                                  :multiple="false">
                            <template slot="selected-single"
                                      slot-scope="selected">
                                <c-icon :name="selected.value.name"/>
                                {{ selected.value.name }}
                            </template>
                            <template slot="option"
                                      slot-scope="option">
                                <c-icon :name="option.value.name"/>
                                {{ option.value.name }}
                            </template>
                        </c-select>
                    </c-grid-col>

                </c-grid-row>

            </c-card-section>

        </c-card-section>

        <!-- Switches -->
        <c-card-section>
            <h3>
                Switch & Checkbox & Radio
            </h3>

            <c-divider/>

            <c-card-section>

                <c-grid-row>

                    <c-grid-col xl="3">
                        <c-form-row>
                            <h4>Switch</h4>
                        </c-form-row>
                        <c-form-row>
                            <c-switch v-model="data[fieldsConfig.switch.key]"
                                      value="1">
                                Switch
                            </c-switch>
                            <br>
                            <c-switch v-model="data[fieldsConfig.switch.key]"
                                      value="2">
                                Switch
                            </c-switch>
                        </c-form-row>
                    </c-grid-col>

                    <c-grid-col xl="3">
                        <c-form-row>
                            <h4>Checkbox</h4>
                        </c-form-row>
                        <c-form-row>
                            <c-checkbox v-model="data[fieldsConfig.checkbox.key]"
                                        value="1">
                                Checkbox
                            </c-checkbox>
                            <br>
                            <c-checkbox v-model="data[fieldsConfig.checkbox.key]"
                                        value="2">
                                Checkbox
                            </c-checkbox>
                        </c-form-row>
                    </c-grid-col>

                    <c-grid-col xl="3">
                        <c-form-row>
                            <h4>Radio</h4>
                        </c-form-row>
                        <c-form-row>
                            <c-radio v-model="data[fieldsConfig.radio.key]"
                                     value="1">
                                Radio 1
                            </c-radio>
                            <br>
                            <c-radio v-model="data[fieldsConfig.radio.key]"
                                     value="2">
                                Radio 2
                            </c-radio>
                        </c-form-row>
                    </c-grid-col>


                </c-grid-row>

            </c-card-section>

        </c-card-section>

    </layout-screen-card>
</template>

<script>
    import LayoutScreenCard from "../layouts/ScreenCard";
    import CTextArea from "../../../src/components/form-text-area/TextArea";
    import CFormRow from "../../../src/components/form-row/FormRow";
    import CSwitch from "../../../src/components/form-switch/Switch";
    import CGridCol from "../../../src/components/grid/GridCol";
    import CCheckbox from "../../../src/components/form-checkbox/Checkbox";
    import CRadio from "../../../src/components/form-radio/Radio";

    const FIELDS_MAP = {
        textInput: {
            key: 'textInput',
            type: 'text',
            default: '',
            required: true,
            mask: false,
            leading: 'text',
            trailing: 'information',
            placeholder: 'Введите что-нибудь...',
            helper: 'Вспомогательный текст'
        },
        textArea: {
            key: 'textArea',
            default: '',
            placeholder: 'Введите что-нибудь...',
            helper: 'Вспомогательный текст',
            rows: 8
        },
        switch: {
            key: 'switch',
            default: []
        },
        checkbox: {
            key: 'checkbox',
            default: []
        },
        radio: {
            key: 'radio',
            default: []
        }
    };

    export default {
        name: "ScreenFormFields",
        components: {
            CRadio,
            CCheckbox,
            CGridCol,
            CSwitch,
            CFormRow,
            CTextArea,
            LayoutScreenCard
        },
        data() {
            return {
                data: _.mapValues(FIELDS_MAP, item => item.default),
                errors: _.mapValues(FIELDS_MAP, item => []),
                selected: [],
                selectList: [],
                formData: {}
            }
        },
        computed: {
            fieldsConfig() {
                return FIELDS_MAP
            },
            validateRules() {
                return _.mapValues(FIELDS_MAP, item => {
                    return {
                        required: item.required
                    }
                })
            }
        },
    }
</script>