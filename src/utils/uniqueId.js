import shortId from 'shortid';

/**
 * Generates unique id. Based on shortId library
 *
 * @param {String} [prefix] - prefix
 * @param {String} [postfix] - postfix
 * @return {string}
 */
export default function uuId(prefix = 'item-', postfix = '') {
    if(!_.isString(prefix)) {
        prefix = 'item-';
    }
    if(!_.isString(postfix)) {
        postfix = `-${shortId.generate()}`;
    }

    return `${prefix}${shortId.generate()}${postfix}`;
}