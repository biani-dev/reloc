# React logic components

[![npm](https://img.shields.io/npm/v/reloc?logo=npm)](https://www.npmjs.com/package/reloc)
[![License](https://img.shields.io/github/license/biani-dev/reloc?logo=github&logoColor=959DA5&labelColor=2D3339)](https://github.com/biani-dev/reloc/blob/main/LICENSE)
[![Contact](https://img.shields.io/badge/contact-@TuyenNV-blue.svg?style=flat&logo=twitter)](https://twitter.com/tuyennv22)

Provide the React control statements components &lt;If&gt;,  &lt;Switch&gt;,  &lt;For&gt;
<hr>

## Installation
npm:
```batch
npm i reloc
```

yarn:
```batch
yarn add reloc
```

## API

### 1. Simple condition
#### &lt;If&gt;
| Property | Type    | Required | Default |
|----------|---------|----------|---------|
| `check`  | Boolean | yes      |         |

Example:
```jsx
import { If } from  'reloc';

<If check={status === DONE}>
  <span>It is done</span>
</If>
```

## 2. Complex conditional, Switch statements
### &lt;Switch&gt;
Only the first case that satisfies the condition will be rendered.

| Property     | Type                    | Required | Default | Description                                                                                                                           |
|--------------|-------------------------|----------|---------|---------------------------------------------------------------------------------------------------------------------------------------|
| `match`      | Boolean, Number, String | no       |         | If the `match` has set value, the component works as a 'Switch mode.' Otherwise, it works as a complex conditional mode.              |
| `strict`     | Boolean                 | no       | true    | Only available for 'Switch mode.' If `strict` is true, it will check the data type of the `match` when comparing with the case value. |

### &lt;Case&gt;
| Property | Type    | Required | Default |
|----------|---------|----------|---------|
| `check`  | Boolean | yes      |         |

### &lt;Default&gt;
| Property | Type | Required | Default |
|----------|------|----------|---------|
| `-`      |      |          |         |

Complex condition example:
```jsx
import {Switch, Case, Default} from  'reloc';

<Switch>
  <Case check={status === DOING}>
    <span>DOING</span>
  </Case>
  <Case check={status === DONE}>
    <span>DONE</span>
  </Case>
  <Default>
    <span>OTHER</span>
  </Default>
</Switch>
```

Switch mode example:
```jsx
import {Switch, Case, Default} from  'reloc';

<Switch match={status}>
  <Case check={DOING}>
    <span>DOING</span>
  </Case>
  <Case check={DONE}>
    <span>DONE</span>
  </Case>
  <Default>
    <span>OTHER</span>
  </Default>
</Switch>
```

Switch mode with the `strict` prop off example:
```jsx
import {Switch, Case, Default} from  'reloc';

<Switch match={1} strict={false}>
  <Case check={'1'}>
    <span>Passed</span>
  </Case>
  <Case check={'2'}>
    <span>Not passed</span>
  </Case>
  <Default>
    <span>Not passed</span>
  </Default>
</Switch>
```

## 3. Loop
### &lt;For&gt;
Support Array, Set, Map, Object data types.

| Property   | Type                                                                         | Required | Description                                                                                   |
|------------|------------------------------------------------------------------------------|----------|-----------------------------------------------------------------------------------------------|
| `items`    | Array, Map, Set, Object                                                      | yes      |                                                                                               |
| `children` | Function: (item: any, key: String&#124;Number, index: Number) => JSX.Element | yes      | If the data type of the `items` is an Array or Set, the 'key' value will reference the index. |

Example:
```jsx
import {For} from  'reloc';

<For items={items}>
  {(item, key, index) => (
    <span key={key}>{index}: {item.name}</span>
  )}
</For>
```