import {render} from "./utils.js";

/**
 * Simple condition component.
 * @param {BooleanLike} conditionResult
 * @param {JSX.Element | ReactElement | Function | null} children
 * @returns {JSX.Element | ReactElement | null}
 * @constructor
 */
export const If = ({check: conditionResult, children = null}) => {
  return (conditionResult && children) ? render({children}) : null;
};