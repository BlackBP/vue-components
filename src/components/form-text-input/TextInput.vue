<template>
    <c-form-field class="c-text-input"
                  content-class="c-text-input__wrap"
                  :focused="focused"
                  :has-error="hasErrors"
                  :helper-text="helperText"
                  :disabled="disabled"
                  :readonly="readonly"
                  :count="valueLength"
                  :count-max="maxLength"
                  :show-counter="showCounter"
                  :show-helper="true">

        <template v-if="$slots.leading">
            <div class="c-text-input__leading">
                <slot name="leading"/>
            </div>
        </template>

        <template v-else>
            <c-icon v-if="leading"
                    class="c-text-input__leading"
                    :name="leading"/>
        </template>

        <input ref="field"
               class="c-text-input__field"
               autocomplete="off"
               :type="type"
               :placeholder="placeholder"
               :disabled="disabled"
               :readonly="readonly"
               :min="type === 'number' ? 0 : false"
               :value="value"
               @input="handleChange"
               @keypress="handleKeyPress"
               @focus="focused = true"
               @blur="focused = false">

        <template v-if="$slots.trailing">
            <div class="c-text-input__trailing">
                <slot name="trailing"/>
            </div>
        </template>

        <template v-else>
            <c-icon v-if="trailing"
                    class="c-text-input__trailing"
                    :name="trailing"/>
        </template>

    </c-form-field>
</template>

<script>
    import {
        isObjectLike,
        isString,
        isFunction
    } from '../../utils/helpers';
    import {getConfig} from '../../config';
    import mixinFormInput from '../../mixins/form-input';
    import {CFormField} from '../form-field';
    import {CIcon} from '../icon';

    export default {
        name: "c-text-input",
        mixins: [mixinFormInput],
        components: {
            CIcon,
            CFormField
        },
        props: {
            type: {
                type: String,
                default: 'text',
            },
            mask: {
                type: [String, Boolean, Object],
                default: false,
            },
            leading: {
                type: String,
                default: '',
            },
            trailing: {
                type: String,
                default: '',
            }
        },
        computed: {
            hasMask() {
                return isObjectLike(this.mask) || isString(this.mask)
            }
        },
        mounted() {
            const config = getConfig(this, 'textInput');
            const onMount = isFunction(config.mounted) ? config.mounted : () => {
            };

            onMount(this, this.mask, this.hasMask, this.$refs.field);
        },
        beforeDestroy() {
            const config = getConfig(this, 'textInput');
            const onBeforeDestroy = isFunction(config.beforeDestroy) ? config.beforeDestroy : () => {
            };

            onBeforeDestroy(this, this.mask, this.hasMask, this.$refs.field);
        }
    }
</script>
