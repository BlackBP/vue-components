import _ from 'lodash'

export function isEmptyString(value) {
    return typeof value === 'string' && value === ''
}

export default {
    isEmptyString,
    defaultsDeep: _.defaultsDeep
}
