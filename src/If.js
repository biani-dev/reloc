import {render} from "./utils.js";

/**
 * Simple condition component.
 * @param {BooleanLike} passed
 * @param {NodeFunction} then
 * @param {NodeFunction} children
 * @returns {ReactNode | null}
 * @constructor
 */
export const If = ({'is': passed, then = null, children = null}) => {
  return (passed && (then || children)) ? render({children: (then || children)}) : null;
};