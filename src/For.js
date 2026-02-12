import {isFn, isObject} from './utils';

/**
 * Loop component for Array data type.
 * @param {Array} items
 * @param {LoopFunction} children
 * @returns {ReactNode[] | null}
 * @constructor
 */
const ForArray = ({items, children}) => {
  return items.map((item, index) => {
    return children(item, index.toString(), index);
  });
};

/**
 * Loop component for Object data type.
 * @param {Object} items
 * @param {LoopFunction} children
 * @returns {ReactNode[] | null}
 * @constructor
 */
const ForObject = ({items, children}) => {
  return Object.entries(items).map(([key, item], index) => {
    return children(item, key, index);
  });
};

/**
 * Loop component for Map data type.
 * @param {Map} items
 * @param {LoopFunction} children
 * @returns {ReactNode[] | null}
 * @constructor
 */
const ForMap = ({items, children}) => {
  return [...items].map(([key, item], index) => {
    return children(item, key, index);
  });
};

/**
 * Loop component for Set data type.
 * @param {Set} items
 * @param {LoopFunction} children
 * @returns {ReactNode[] | null}
 * @constructor
 */
const ForSet = ({items, children}) => {
  return  [...items].map((item, index) => {
    return children(item, index.toString(), index);
  });
};

/**
 * Loop component
 * @param {IteratorLike} items
 * @param {LoopFunction} children
 * @returns {ReactNode[] | null}
 * @constructor
 */
export const For = ({items, children}) => {
  if (!isFn(children)) {
    children = () => children;
  }

  if (items instanceof Array) {
    return ForArray({items, children}); // <ForArray items={items} children={children}></ForArray>
  } else if (items instanceof Set) {
    return ForSet({items, children}); // <ForSet items={items} children={children}></ForSet>
  } else if (items instanceof Map) {
    return ForMap({items, children}); // <ForMap items={items} children={children}></ForMap>
  } else if (isObject(items)) {
    return ForObject({items, children}); // <ForObject items={items} children={children}></ForObject>
  }
};
