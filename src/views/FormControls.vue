<template>
    <div class="screen-form-controls">

        <c-section title="TextInput & TextArea">

            <c-section title="Normal">
                <c-text-input v-model="name"
                              placeholder="Введите имя"
                              :helper="`name: ${name}`"/>

                <c-textarea v-model="about"
                            class="mt10px"
                            placeholder="Напишите о себе"
                            :helper="`about: ${about}`"/>
            </c-section>

            <c-section title="Error">
                <c-text-input v-model="name"
                              placeholder="Введите имя"
                              :errors="['Обязательное поле']"
                              :helper="`name: ${name}`"/>


                <c-textarea v-model="about"
                            class="mt10px"
                            placeholder="Напишите о себе"
                            :errors="['Обязательное поле']"
                            :helper="`about: ${about}`"/>
            </c-section>

            <c-section title="Disabled">
                <c-text-input v-model="name"
                              placeholder="Введите имя"
                              :disabled="true"
                              :helper="`name: ${name}`"/>

                <c-textarea v-model="about"
                            class="mt10px"
                            placeholder="Напишите о себе"
                            :disabled="true"
                            :helper="`about: ${about}`"/>
            </c-section>

            <c-section title="Readonly">
                <c-text-input v-model="name"
                              placeholder="Введите имя"
                              :readonly="true"
                              :helper="`name: ${name}`"/>

                <c-textarea v-model="about"
                            class="mt10px"
                            placeholder="Напишите о себе"
                            :readonly="true"
                            :helper="`about: ${about}`"/>
            </c-section>

        </c-section>

        <c-section title="Select">
            <c-select v-model="selectedOption"
                      option-label="name"
                      track-by="id"
                      placeholder="Опция"
                      :searchable="true"
                      :options="options" />

            <pre>selectedOption: {{ selectedOption }}</pre>
        </c-section>

        <c-section title="Checkbox, Radio, Switch">

            <c-section title="Checkbox">
                <c-checkbox v-for="checkboxItem in checkboxes"
                            v-model="checkbox"
                            :key="checkboxItem.value"
                            :value="checkboxItem">
                    {{ checkboxItem.name }}
                </c-checkbox>

                <pre>checkbox: {{ checkbox }}</pre>
            </c-section>

            <c-section title="Radio">

                <c-radio v-for="radioItem in radios"
                         v-model="radio"
                         :key="radioItem.value"
                         :value="radioItem">
                    {{ radioItem.name }}
                </c-radio>

                <pre>radio: {{ radio }}</pre>
            </c-section>

            <c-section title="Switch">
                <c-switch v-model="switcher">
                    Switch
                </c-switch>

                <pre>switcher: {{ switcher }}</pre>
            </c-section>

        </c-section>

    </div>

</template>

<script>
    import CTextInput from "../components/base/TextInput";
    import CSection from "../components/Section";
    import CTextarea from "../components/base/TextArea";
    import CCheckbox from "../components/base/Checkbox";
    import CRadio from "../components/base/Radio";
    import CSwitch from "../components/base/Switcher";
    import CSelect from "../components/base/Select";

    export default {
        name: 'screen-form-controls',
        components: {CSelect, CSwitch, CRadio, CCheckbox, CTextarea, CSection, CTextInput},
        data() {
            return {
                name: '',
                about: '',
                checkbox: [],
                radio: '1',
                switcher: false,
                selectedOption: ''
            }
        },
        computed: {
            checkboxes() {
                return _.times(5, item => ({
                    name: `Checkbox ${item + 1}`,
                    value: 100 + (item + 1) * 2
                }))
            },
            radios() {
                return _.times(5, item => ({
                    name: `Radio ${item + 1}`,
                    value: 1 + (item + 1) * 2
                }))
            },
            options() {
                return _.times(5, item => ({
                    id: item + 1,
                    name: `Option ${item + 1}`
                }))
            }
        }
    }
</script>

<style scoped lang="scss">
    .screen-form-controls {

    }

    .mt10px {
        margin-top: 10px;
    }
</style>
