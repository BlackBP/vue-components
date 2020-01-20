export type optionText = string | number
export type optionId = string | number
export type optionValue = any
export type optionIsSelected = boolean
export type optionIsGroup = boolean
export type stateQuery = string | number
export type propTrackBy = string
export type propOptionText = string
export type propOptionGroupText = string

export type rawOption = string | number | null | {
    id?: optionId,
    text?: optionText,
    value?: optionValue,
    selected?: optionIsSelected,
    group?: optionIsGroup
}

export type mappedOption = {
    id: optionId,
    text: optionText,
    value: optionValue,
    selected: optionIsSelected,
    group: optionIsGroup
}

export type rawOptionArray = rawOption[] | []

export type mappedOptionArray = mappedOption[] | []

export type optionMapProps = {
    query?: stateQuery,
    trackBy: propTrackBy,
    optionText: propOptionText,
    groupValues: any,
    groupText?: propOptionGroupText,
    selectedList?: rawOptionArray
}