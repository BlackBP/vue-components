export type ButtonSize = 'is-small' | 'is-medium' | 'is-large'| ''

export type ButtonCommonProps = {
    tag?: string
    type?: string | boolean
    color?: string
    size?: ButtonSize
    bordered?: boolean
    elevated?: boolean
    transparent?: boolean
    disabled?: boolean
}

export type ButtonProps = Partial<ButtonCommonProps> & {
    leading?: string;
    trailing?: string;
    block?: boolean;
}

export type IconBtnProps = Partial<ButtonCommonProps> & {
    icon?: string
}