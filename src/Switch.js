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
      let {'is': passed} = child.props;

      // Complex condition mode.
      if (match === undefined && Boolean(passed)) {
        return child;
      }

      // Switch mode.
      if (strict ? (passed === match) : (passed == match)) {
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
 * @param {BooleanLike} is
 * @param {NodeFunction} then
 * @param {NodeFunction} children
 * @returns {ReactNode | null}
 * @constructor
 */
export const Case = ({is, then = null, children = null}) => {
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
