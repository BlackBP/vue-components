import {createProp} from "../utils/component";

export default {
    props: {
        disabled: createProp(Boolean, false),
        readonly: createProp(Boolean, false),
        helper: createProp(String, ''),
        errors: createProp([String, Array], ''),
        showCounter: createProp(Boolean, false),
    }
}