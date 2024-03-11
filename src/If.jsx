import {render} from "./utils.js";

/**
 * Simple condition component.
 * @param {BooleanLike} conditionResult
 * @param {React.ReactNode | Function | null | undefined} then
 * @param {React.ReactNode | Function | null} children
 * @returns {JSX.Element | null}
 * @constructor
 */
export const If = ({check: conditionResult, then = null, children = null}) => {
  return (conditionResult && (then || children)) ? render({children: (then || children)}) : null;
};