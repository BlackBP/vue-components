<script>
  import _ from '../../utils/helpers'
  import {createIcon} from '../icon/helper'
  import mixinsButton from '../../mixins/button'

  const ClassName = 'c-icon-btn'
  const IconClassName = `${ClassName}__icon`

  export default {
    name: 'c-icon-btn',
    functional: true,
    mixins: [mixinsButton],
    props: {
      icon: {
        type: String,
        default: 'dots-horizontal',
        required: true
      }
    },
    render(createElement, {data, props, listeners = {}}) {
      const {
        tag: propTag,
        icon: propIcon,
        type: propType,
        disabled: propDisabled,
        color: propColor,
        size: propSize,
        transparent: propTransparent,
        elevated: propElevated,
        bordered: propBordered
      } = props

      data = _.defaultsDeep({
        attrs: {
          disabled: propDisabled,
          type: propType
        },
        on: {
          click: (event) => {
            if (propDisabled) return
            if (listeners) {
              if (_.isFunction(listeners.click)) {
                listeners.click(event)
              }
            }
          }
        },
        class: [
          data.class,
          ClassName,
          _.isString(propColor) && propColor !== '' ? `is-${propColor}` : '',
          _.isString(propSize) && propSize !== '' ? `is-${propSize}` : '',
          {
            [`is-disabled`]: propDisabled,
            [`is-transparent`]: propTransparent,
            [`is-elevated`]: propElevated,
            [`is-bordered`]: propBordered
          }
        ]
      }, data)

      // Render
      return createElement(propTag, data, [
        createIcon(createElement, IconClassName, {
          name: propIcon
        })
      ])
    }
  }
</script>
