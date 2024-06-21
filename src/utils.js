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
 * Render jsx component by its props.
 * @param {object} props JSX component props
 * @returns {*|null}
 */
export const render = (props) => {
  if (isFn(props.children)) {
    return (props.children());
  }

  return (props.children || null);
};