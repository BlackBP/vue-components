<template>
    <c-form-field class="c-text-area"
                  content-class="c-text-area__wrap"
                  :focused="focused"
                  :has-error="hasErrors"
                  :helper-text="helperText"
                  :disabled="disabled"
                  :readonly="readonly"
                  :count="valueLength"
                  :count-max="maxLength"
                  :show-counter="showCounter"
                  :show-helper="true">

        <textarea v-model="model"
                  ref="field"
                  cols="30"
                  class="c-text-area__field"
                  :rows="rows"
                  :disabled="disabled"
                  :readonly="readonly"
                  :placeholder="placeholder"
                  @focus="focused = true"
                  @blur="focused = false"></textarea>

    </c-form-field>
</template>

<script>
    import mixinFormInput from '../../mixins/form-input';
    import {CFormField} from '../form-field';

    export default {
        name: "c-text-area",
        mixins: [mixinFormInput],
        components: {
            CFormField
        },
        props: {
            rows: {
                type: Number,
                default: 10,
            }
        }
    }
</script>
