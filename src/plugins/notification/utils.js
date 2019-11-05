/**
 *
 * @param {Object} notify
 * @param {String} [notify.message]
 * @param {String} [notify.title]
 * @param {Number} [notify.duration]
 * @param {Function} [notify.color]
 * @param {Function} [notify.onClick]
 * @param {Function} [notify.onClose]
 * @return {{id: String, message: String, title: String, color: String, duration: Number, onClick: Function, onClose: Function}}
 */
export const notificationFactory = (notify = {}) => {
    let {
        message = '',
        title = 'Уведомление',
        duration = 10000,
        color = '',
        onClick = () => {
        },
        onClose = () => {
        },
        ...rest
    } = notify;

    return {
        ...rest,
        id: `notify-${+new Date()}`,
        message,
        title,
        color,
        duration,
        onClick,
        onClose,
    }
};