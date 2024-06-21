import React from "react";
import {isFn, render} from "./utils.js";

/**
 *
 * @param {BooleanLike} match
 * @param {boolean} strict
 * @param {NodeFunction} then
 * @param {ReactNode | null} children
 * @returns {ReactNode | null}
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
 * @param {BooleanLike} check
 * @param {NodeFunction} then
 * @param {NodeFunction} children
 * @returns {ReactNode | null}
 * @constructor
 */
export const Case = ({check, then = null, children = null}) => {
  return render({children: (then || children)});
};

/**
 *
 * @param {NodeFunction} then
 * @param {NodeFunction} children
 * @returns {ReactNode | null}
 * @constructor
 */
export const Default = ({then = null, children = null}) => {
  return render({children: (then || children)});
};
