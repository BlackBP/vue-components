import {
    toString,
    isArray
} from '../utils/helpers';

const MODEL = {
    prop: 'value',
    event: 'input',
};

export default {
    model: MODEL,
    props: {
        value: {
            type: null,
            default: ''
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        readonly: {
            type: Boolean,
            default: false,
        },
        placeholder: {
            type: String,
            default: '',
        },
        helper: {
            type: String,
            default: '',
        },
        errors: {
            type: Array,
            default: () => [],
        },
        showCounter: {
            type: Boolean,
            default: false,
        },
        maxLength: {
            type: Number,
            default: 100,
        }
    },
    data() {
        return {
            focused: false
        }
    },
    computed: {
        valueLength() {
            return toString(this.value).length
        },
        hasErrors() {
            if (isArray(this.errors)) {
                return this.errors.length > 0
            }

            return false;
        },
        helperText() {
            let text = this.helper;

            if (this.hasErrors) {
                text = this.errors.join(', ');
            }

            return text;
        },
        fieldRef() {
            return this.$refs.field;
        }
    },
    methods: {
        focus() {
            this.$refs.field.focus();
        },
        handleChange(event) {
            this.$emit(MODEL.event, event.target.value)
        },
        handleKeyPress(event) {
            this.$emit('keypress', event)
        }
    }
}