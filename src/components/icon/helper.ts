import {CreateElement, VNode, VNodeData} from 'vue'
import {CIcon} from './index'
import {IconProps} from "../../../types/icon";

export const createIcon = (createElement: CreateElement, className: string, props: IconProps): VNode|null => {
    return props.name ? createElement(CIcon, <VNodeData>{
        class: className,
        props: props
    }) : null
};