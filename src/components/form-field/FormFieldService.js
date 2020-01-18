import _ from 'lodash'

export default class FormFieldService {

    /**
     *
     * @param {String|Array} error
     * @return {string}
     */
    static getErrorText(error) {
        if(_.isArray(error)) {
            return error.join(';');
        } else if(_.isString(error)) {
            return error
        } else {
            return ''
        }
    }

    /**
     *
     * @param {String|Array} error
     * @return {Number}
     */
    static getErrorSize(error) {
        return _.size(error)
    }

    /**
     *
     * @param {String|Number|Array} countValue
     * @return {number}
     */
    static getCountValueSize(countValue) {
        if(_.isNumber(countValue)) {
            return value;
        } else if(_.isString(countValue) || _.isArray(countValue)) {
            return _.size(countValue)
        } else {
            return 0
        }
    }
}