import React from "react";
import {isFn, isObject} from './utils';

/**
 *
 * @param {Array|Map|Set|Object} items
 * @param {React.ReactNode|JSX.Element|Function} children
 * @returns {JSX.Element}
 * @constructor
 */
export const For = ({items, children}) => {
  if (!isFn(children)) {
    children = () => children;
  }

  if (items instanceof Array) {
    return <ForArray items={items} children={children}></ForArray>
  } else if (items instanceof Set) {
    return <ForSet items={items} children={children}></ForSet>
  } else if (items instanceof Map) {
    return <ForMap items={items} children={children}></ForMap>
  } else if (isObject(items)) {
    return <ForObject items={items} children={children}></ForObject>
  }
};

/**
 *
 * @param {Array} items
 * @param {Function} children
 * @returns {Array<React.Component>}
 * @constructor
 */
const ForArray = ({items, children}) => {
  return items.map((item, index) => {
    return children(item, index, index);
  });
};

/**
 *
 * @param {Object} items
 * @param {Function} children
 * @returns {Array<React.Component>}
 * @constructor
 */
const ForObject = ({items, children}) => {
  return Object.entries(items).map((entry, index) => {
    const [key, item] = entry;
    return children(item, key, index);
  });
};

/**
 *
 * @param {Map} items
 * @param {Function} children
 * @returns {Array<React.Component>}
 * @constructor
 */
const ForMap = ({items, children}) => {
  const components = [];

  let index = 0;
  for (const [key, item] of items) {
    components.push(children(item, key, index));
    ++index;
  }

  return components;
};

/**
 *
 * @param {Set} items
 * @param {Function} children
 * @returns {Array<React.Component>}
 * @constructor
 */
const ForSet = ({items, children}) => {
  const components = [];

  let index = 0;
  for (const item of items) {
    components.push(children(item, index, index));
    ++index;
  }

  return components;
};
