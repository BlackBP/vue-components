import {createProp} from "../utils/component";

export default {
    props: {
        id: createProp(String, ''),
        value: createProp(null, ''),
        placeholder: createProp(String, ''),
    },
    data() {
        return {
            focused: false
        }
    },
    computed: {
        /**
         *
         * @return {Vue | Element | Vue[] | Element[]}
         */
        fieldRef() {
            return this.$refs.field;
        },

        /**
         *
         * @return {String|Boolean}
         */
        inputId() {
            let id = this.id;
            return id !== '' ? id : false
        },
    }
}