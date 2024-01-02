/**
 * Determines whether the provided argument is a function.
 * @param {any} maybeFn
 * @returns {boolean}
 */
export function isFn(maybeFn) {
  return typeof maybeFn === 'function';
}

/**
 * Determines whether the provided argument is an object.
 * @param {any} value
 * @returns {boolean}
 */
export function isObject(value) {
  return typeof value === 'object' && value !== null;
}

/**
 * Check value is match any in type list.
 * @param {any} value
 * @param {Array} types
 * @returns {boolean}
 */
export function matchedType(value, types) {
  return types.some(type => value instanceof type);
}

/**
 * Convert Array, map, et, Object to Array<entries>
 * @param {Array<T>|Set<T>|Map<T>|Object<T>} items
 * @returns {[number|string,T]}
 */
export function toEntries(items) {
  if (matchedType(items, [Array, Map])) {
    return Array.from(items.entries());
  }

  if (items instanceof Set) {
    return Array.from(items).map((item, index) => [index, item]);
  }

  if (isObject(items)) {
    return Object.entries(items);
  }

  throw Error('Unsupported data type.');
}

/**
 * Render jsx component by its props.
 * @param {object} JSX component props
 * @returns {*|null}
 */
export const render = (props) => {
  if (isFn(props.children)) {
    return (props.children());
  }

  return (props.children || null);
};