import {render} from "./utils.js";

/**
 *
 * @param {any} conditionResult
 * @param {React.ReactNode|JSX.Element|Function|null} children
 * @returns {React.Component|null}
 * @constructor
 */
export const If = ({check: conditionResult, children = null}) => {
  return (conditionResult && children) ? render({children}) : null;
};