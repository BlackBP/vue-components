import _ from "../../utils/helpers";

/**
 * @typedef {String|Number|Object} rawOption
 */

/**
 * @typedef {Object} mappedOption
 * @property {String|Number} id
 * @property {String|Number} text
 * @property {*} value
 * @property {Boolean} selected
 * @property {Boolean} group
 */

export default class OptionService {
    /**
     * @param {rawOption} option
     * @return {Boolean}
     */
    static isObject(option) {
        return _.isObjectLike(option) && !_.isArray(option)
    }

    /**
     *
     * @param {rawOption} option
     * @return {Boolean}
     */
    static isString(option) {
        return _.isString(option)
    }

    /**
     *
     * @param {rawOption} option
     * @return {Boolean}
     */
    static isNumber(option) {
        return _.isNumber(option)
    }

    /**
     *
     * @param {*} optionValues
     * @return {boolean}
     */
    static isGroup(optionValues) {
        return _.isArray(optionValues) && _.size(optionValues) > 0;
    }

    /**
     *
     * @param option
     * @param prop
     * @return {String|Number}
     */
    static getText(option, prop) {
        if (OptionService.isObject(option)) {
            return _.get(option, prop, '')
        }

        return option
    }

    /**
     *
     * @param {rawOption} option
     * @param {String} prop
     * @return {String|Number}
     */
    static getId(option, prop) {
        if (OptionService.isObject(option)) {
            return _.get(option, prop, '')
        }

        return option
    }

    /**
     *
     * @param option
     * @param prop
     * @return {*}
     */
    static getGroupValues(option, prop) {
        return _.get(option, prop, [])
    }

    /**
     *
     * @param option
     * @param prop
     * @return {*}
     */
    static getGroupText(option, prop) {
        return _.get(option, prop, '')
    }

    /**
     *
     * @param {rawOption} option
     * @param {Object} props
     * @return {mappedOption}
     */
    static map(option = {}, props = {}) {
        let value;
        const {
            trackBy: propTrackBy,
            optionText: propOptionText,
            groupValues: propGroupValues,
            groupText: propGroupText,
        } = props;
        const groupValues = OptionService.getGroupValues(option, propGroupValues);
        const groupText = OptionService.getGroupText(option, propGroupText);
        const optionText = OptionService.getText(option, propOptionText);
        const optionId = OptionService.getId(option, propTrackBy);
        const isGroup = OptionService.isGroup(groupValues);
        // let isDisabled = _.get(option, 'disabled', false); // TODO: Обдумать вариант отключения опции

        if (isGroup) {
            value = [...groupValues];
        } else {
            if (OptionService.isObject(option)) {
                value = {...option};
            } else if (OptionService.isString(option) || OptionService.isNumber(option)) {
                value = option;
            } else {
                value = 'undefined'
            }
        }

        return {
            id: optionId,
            text: isGroup ? groupText : optionText,
            value: value,
            selected: false,
            group: isGroup
        }
    }
}