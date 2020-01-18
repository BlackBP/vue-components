import _ from 'lodash'
import OptionService from "./OptionService";
import {mappedOption, mappedOptionArray, optionMapProps, rawOption, rawOptionArray} from "./index";

export default class OptionListService {

    static isValid(options: any): boolean {
        return _.isArray(options)
    }

    static isEmpty(options: any): boolean {
        return _.size(options) <= 0
    }

    static removeOptionFromList(list: rawOptionArray, option: rawOption, trackBy: string): rawOptionArray {
        return list.filter((selectedOption) => {
            return OptionService.getId(option, trackBy) !== OptionService.getId(selectedOption, trackBy)
        })
    }

    static map(options: rawOptionArray, props: optionMapProps): mappedOptionArray {
        if (!OptionListService.isValid(options) && OptionListService.isEmpty(options)) return [];

        const {
            query: propQuery = '',
            trackBy: propTrackBy,
            optionText: propOptionText,
            groupValues: propGroupValues,
            groupText: propGroupText,
            selectedList: propSelectedList
        } = props;

        let mappedOptions: mappedOptionArray = _.reduce(options, (mappedOptions: any[], option: rawOption) => {
            let mapped = OptionService.map(option, {
                trackBy: propTrackBy,
                optionText: propOptionText,
                groupValues: propGroupValues,
                groupText: propGroupText,
            });

            if (_.size(propSelectedList) > 0) {
                mapped.selected = _.some(propSelectedList, selectedItem => {
                    return OptionService.getId(selectedItem, propTrackBy) === mapped.id
                })
            }

            if (mapped.group) {
                mappedOptions.push(mapped, ...OptionListService.map(mapped.value, props))
            } else {
                mappedOptions.push(mapped)
            }

            return mappedOptions
        }, []);

        if (propQuery !== '') {
            return mappedOptions.filter(option => {
                if (option.group) return false;
                return _.toLower(<string>option.text).match(<string>propQuery);
            })
        }

        return mappedOptions
    }
}