import _ from 'lodash'
import {rawOption, mappedOption, optionMapProps} from "./index"

export default class OptionService {

    static isObject(option: rawOption): boolean {
        return _.isObjectLike(option) && !_.isArray(option)
    }

    static isString(option: rawOption): boolean {
        return _.isString(option)
    }

    static isNumber(option: rawOption): boolean {
        return _.isNumber(option)
    }

    static isGroup(optionValues: any): boolean {
        return _.isArray(optionValues) ? _.size(optionValues) > 0 : false;
    }

    static getText(option: rawOption|mappedOption, prop: string): string|number {
        if (OptionService.isObject(option)) {
            return _.get(option, prop, '')
        }

        if(typeof option ==='string' || typeof option === 'number') {
            return option
        }

        return ''
    }

    static getId(option: rawOption|mappedOption, prop: string): string|number {
        if (OptionService.isObject(option)) {
            return _.get(option, prop, '')
        }

        if(typeof option ==='string' || typeof option === 'number') {
            return option
        }

        return ''
    }

    static getGroupValues(option: rawOption|mappedOption, prop: string): [] {
        return _.get(option, prop, [])
    }

    static getGroupText(option: rawOption|mappedOption, prop: string): number|string {
        return _.get(option, prop, '')
    }

    static map(option: rawOption = {}, props: optionMapProps): mappedOption {
        let value;
        const {
            trackBy: propTrackBy,
            optionText: propOptionText,
            groupValues: propGroupValues,
            groupText: propGroupText,
        } = props;
        const groupValues = OptionService.getGroupValues(option, propGroupValues);
        const groupText = OptionService.getGroupText(option, <string>propGroupText);
        const optionText = OptionService.getText(option, propOptionText);
        const optionId = OptionService.getId(option, propTrackBy);
        const isGroup = OptionService.isGroup(groupValues);
        // let isDisabled = _.get(option, 'disabled', false); // TODO: Обдумать вариант отключения опции

        if (isGroup) {
            value = [...groupValues];
        } else {
            if (OptionService.isObject(option)) {
                value = {...<object>option};
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