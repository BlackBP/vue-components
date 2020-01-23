import _ from 'lodash'

/**
 *
 * @param size
 */
export function getButtonSize(size: string): string {
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