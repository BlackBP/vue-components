import _ from "../utils/helpers"

const MODEL = {
    prop: 'value',
    event: 'input'
};

const MixinFormTextInput = {
    model: MODEL,
    props: {
        maxLength: {
            type: [Number, String],
            default: 0
        }
    },
    computed: {
        className() {
            const state = this.state;

            return [
                state !== '' && state
            ]
        },
        attrMaxLength() {
            const maxLength = parseInt(this.maxLength);
            return maxLength > 0 ? maxLength : false;
        }
    },
    methods: {
        focus() {
            this.$el.focus();
        },
        onInput(event) {
            if(this.disabled || this.readonly) return;

            const value = event.target.value;
            const valueSize = _.size(value);
            const maxLength = parseInt(this.maxLength);

            if (maxLength > 0) {
                if (valueSize <= this.maxLength) {
                    this.$emit(MODEL.event, value);
                }
            } else {
                this.$emit(MODEL.event, value)
            }
        },
        onFocus(event) {
            this.$emit('focus', event)
        },
        onBlur(event) {
            this.$emit('blur', event)
        },
        onKeyUp(event) {
            this.$emit('keyup', event)
        },
        onKeyDown(event) {
            this.$emit('keydown', event)
        },
    }
};

export default MixinFormTextInput