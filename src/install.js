/**
 *
 * @param {Object} {components: Object, plugins: Object}
 * @return {Function} plugin install function
 */
export const installFactory = ({ components = {}, plugins = {} } = {}) => {
  const install = (Vue) => {
    if (install.installed) {
      /* istanbul ignore next */
      return
    }
    install.installed = true

    registerComponents(Vue, components)
    registerPlugins(Vue, plugins)
  }

  install.installed = false

  return install
}

/**
 * @param {Object} opts
 * @param {Object} [opts.components]
 * @param {Object} [opts.plugins]
 * @param {Object} [extend]
 * @return {{install: install}}
 */
export const pluginFactory = (opts = {}, extend = {}) => ({
  ...extend,
  install: installFactory(opts)
})

/**
 * @param {Object} Vue
 * @param {Object} components
 */
export const registerComponents = (Vue, components = {}) => {
  for (const component in components) {
    registerComponent(Vue, component, components[component])
  }
}

/**
 * @param {Object} Vue
 * @param {String} name
 * @param {Object} definition
 */
export const registerComponent = (Vue, name, definition) => {
  if (Vue && name && definition) {
    Vue.component(name, definition)
  }
}

/**
 * @param {Object} Vue
 * @param {Object} plugins definitions
 */
export const registerPlugins = (Vue, plugins = {}) => {
  for (const plugin in plugins) {
    if (plugin && plugins[plugin]) {
      Vue.use(plugins[plugin])
    }
  }
}
