import {createProp} from "../utils/component";

export default {
    props: {
        tag: createProp(String, 'button'),
        type: createProp([String, Boolean], false),
        color: createProp(String, ''),
        bordered: createProp(Boolean, false),
        elevated: createProp(Boolean, false),
        transparent: createProp(Boolean, false),
        disabled: createProp(Boolean, false),
        dense: createProp(Boolean, false),
    }
}