import _ from "../../utils/helpers";
import OptionService from "./OptionService";

export default class OptionListService {

    /**
     *
     * @param {*} options
     * @return {Boolean}
     */
    static isValid(options) {
        return _.isArray(options)
    }

    /**
     *
     * @param {*} options
     * @return {Boolean}
     */
    static isEmpty(options) {
        return _.size(options) <= 0
    }

    /**
     *
     * @param {rawOption[]} list
     * @param {rawOption} option
     * @param {String} trackBy
     */
    static removeOptionFromList(list = [], option, trackBy) {
        return _.filter(list, selectedOption => {
            return OptionService.getId(option, trackBy) !== OptionService.getId(selectedOption, trackBy)
        })
    }

    /**
     *
     * @param {Array} options
     * @param {Object} props
     * @return {mappedOption[]}
     */
    static map(options = [], props = {}) {
        if(!OptionListService.isValid(options) && OptionListService.isEmpty(options)) return [];

        const {
            query: propQuery = '',
            trackBy: propTrackBy,
            optionText: propOptionText,
            groupValues: propGroupValues,
            groupText: propGroupText,
            selectedList: propSelectedList
        } = props;

        options = _.reduce(options, (mappedOptions, option) => {
            option = OptionService.map(option, {
                trackBy: propTrackBy,
                optionText: propOptionText,
                groupValues: propGroupValues,
                groupText: propGroupText,
            });

            if(_.size(propSelectedList) > 0) {
                option.selected = _.some(propSelectedList, selectedItem => {
                    return OptionService.getId(selectedItem, propTrackBy) === option.id
                })
            }

            if(option.group) {
                mappedOptions.push(option, ...OptionListService.map(option.value, props))
            } else {
                mappedOptions.push(option)
            }

            return mappedOptions
        }, []);

        if(propQuery !== '') {
            options = _.filter(options, option => {
                if(option.group) return false;
                return _.toLower(option.text).match(propQuery);
            })
        }

        return options
    }
}