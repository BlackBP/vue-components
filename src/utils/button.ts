import _ from 'lodash'
import {ButtonSize} from "../../types/button"

/**
 *
 * @param size
 */
export function getButtonSize(size: string): ButtonSize {
    return _.get({
        xs: 'is-small',
        md: 'is-medium',
        lg: 'is-large'
    }, size, size)
}

/**
 *
 * @param color
 */
export function getButtonColor(color: string = ''): string {
    return `is-${color}`
}