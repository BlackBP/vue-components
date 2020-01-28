type ButtonSizeObject = {
    [key: string]: string
}

/**
 * @param size
 */
export function getButtonSize(size: string): string {
    const baseSize: ButtonSizeObject = {
        xs: 'is-small',
        md: 'is-medium',
        lg: 'is-large'
    };

    if(baseSize.hasOwnProperty(size)) {
        return baseSize[size]
    } else {
        return size
    }
}

/**
 * @param color
 */
export function getButtonColor(color: string = ''): string {
    return `is-${color}`
}