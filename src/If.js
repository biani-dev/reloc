import {render} from "./utils.js";

/**
 * Simple condition component.
 * @param {BooleanLike} conditionResult
 * @param {NodeFunction} then
 * @param {NodeFunction} children
 * @returns {ReactNode | null}
 * @constructor
 */
export const If = ({check: conditionResult, then = null, children = null}) => {
  return (conditionResult && (then || children)) ? render({children: (then || children)}) : null;
};