export declare type optionText = string | number
export declare type optionId = string | number
export declare type optionValue = any
export declare type optionIsSelected = boolean
export declare type optionIsGroup = boolean
export declare type stateQuery = string | number
export declare type propTrackBy = string
export declare type propOptionText = string
export declare type propOptionGroupText = string

export declare type rawOption = string | number | null | {
    id?: optionId,
    text?: optionText,
    value?: optionValue,
    selected?: optionIsSelected,
    group?: optionIsGroup
}

export declare type mappedOption = {
    id: optionId,
    text: optionText,
    value: optionValue,
    selected: optionIsSelected,
    group: optionIsGroup
}

export declare type rawOptionArray = rawOption[] | []

export declare type mappedOptionArray = mappedOption[] | []

export declare type optionMapProps = {
    query?: stateQuery,
    trackBy: propTrackBy,
    optionText: propOptionText,
    groupValues: any,
    groupText?: propOptionGroupText,
    selectedList?: rawOptionArray
}