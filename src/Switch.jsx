import React from "react";
import {isFn, render} from "./utils.js";

/**
 *
 * @param {any} match
 * @param {boolean} strict
 * @param {React.ReactNode|JSX.Element|Function} children
 * @returns {React.Component|null}
 * @constructor
 */
export const Switch = ({children, strict = true, match = undefined}) => {
  if (isFn(children)) {
    children = children();
  }

  for (let child of React.Children.toArray(children)) {
    if (!React.isValidElement(child)) {
      return null;
    }

    if (child.type === Case) {
      let {check: conditionResult} = child.props;

      // Complex condition mode.
      if (match === undefined && Boolean(conditionResult)) {
        return child;
      }

      // Switch mode.
      if (strict ? (conditionResult === match) : (conditionResult == match)) {
        return child;
      }
    } else if (child.type === Default) {
      return child;
    }
  }

  return null;
}

/**
 *
 * @param {any} check
 * @param {React.ReactNode|JSX.Element|Function|null} children
 * @returns {React.Component|null}
 * @constructor
 */
export const Case = ({check, children = null}) => {
  return render({children});
};

/**
 *
 * @param {React.ReactNode|JSX.Element|Function|null} children
 * @returns {React.Component|null}
 * @constructor
 */
export const Default = ({children = null}) => {
  return render({children});
};
