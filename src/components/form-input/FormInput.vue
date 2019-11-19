<template>

    <div class="c-form-input"
         :class="className">

        <div ref="field"
             class="c-form-input__field"
             :class="contentClass">
            <slot/>
        </div>

        <div v-show="showCounter || hasHelper"
             class="c-form-input__footer">

            <small v-if="hasHelper"
                   class="c-form-input__helper">
                <template v-if="$slots.helper">
                    <slot name="helper"/>
                </template>
                <template v-else>
                    {{ helperText }}
                </template>
            </small>

            <small v-if="showCounter"
                   class="c-form-input__counter"
                   title="Максимальное количество символов">
                {{ count }}/{{ countMax }}
            </small>

        </div>

    </div>

</template>

<script>
    import {isArray, isString, size} from '../../utils/helpers';
    import {createProp} from '../../utils/component';
    import mixinFormInput from '../../mixins/form-input';

    export default {
        name: "c-form-input",
        mixins: [mixinFormInput],
        props: {
            countMax: createProp([Number, String], ''),
            count: createProp([Number, String], ''),
            contentClass: createProp([String, Array, Object], ''),
            focused: createProp(Boolean, false),
        },
        computed: {
            className() {
                return {
                    'has-error': this.hasErrors,
                    'is-focused': this.focused,
                    'is-disabled': this.disabled,
                    'is-readonly': this.readonly,
                }
            },
            helperLength() {
                return size(this.helper)
            },
            hasHelper() {
                return size(this.helperText) > 0
            },
            hasErrors() {
                return this.isArrayErrors || isString(this.errors) && this.errors !== ''
            },
            isArrayErrors() {
                return isArray(this.errors) && size(this.errors) > 0
            },
            helperText() {
                let errors = this.errors;
                let helper = this.helper;

                if (this.hasErrors) {
                    if (this.isArrayErrors) {
                        return errors.join('; ')
                    }

                    return this.errors
                }

                if (isString(helper) && size(helper) > 0) {
                    return helper
                }
            },
            fieldRef() {
                return this.$refs.field
            }
        }
    }
</script>
