import Vue from 'vue';
import Inputmask from "inputmask";
import Components from '../../components.js'

Vue.use(Components, {
    textInput: {
        mounted($vm, mask, hasMask, fieldRef) {
            if(hasMask) {
                new Inputmask(mask).mask(fieldRef);
            }
        },
        beforeDestroy($vm, mask, hasMask, fieldRef) {
            if (fieldRef.inputmask && hasMask) {
                fieldRef.inputmask.remove()
            }
        }
    }
});