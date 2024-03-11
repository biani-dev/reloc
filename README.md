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

## Important: Deferring evaluation of children

It's crucial to understand that in JavaScript, which is an eagerly evaluated language, the code inside both the &lt;If&gt;, &lt;Case&gt;, &lt;Default&gt;, and &lt;For&gt; components will be executed even if the condition turns out to be false.

More specifically, the following code will throw an error `obj is not defined`:
```jsx
<If check={ obj }>
  <span>{ obj.attr }</span>
</If>
```
To fix this issue, the code should be written like this:
```jsx
<If check={ obj }>
  {() =>  (
    <span>{ obj.attr }</span>
  )}
</If>
```
or alternative syntax:
```jsx
<If check={ obj } then={() => (
  <span>{ obj.attr }</span>
)} />
```
Therefore, for safety and efficiency reasons, it's recommended to use arrow functions for the child components of &lt;If&gt;, &lt;Case&gt;, &lt;Default&gt;, &lt;For&gt;.

For more discussion on If in React by the react team, have a look at https://github.com/reactjs/react-future/issues/35.

## Alternative Solutions
As mentioned above, this package doesn't always run with the cleanest and most readable syntax. You'll need to use arrow functions for cases where children have complex logic to ensure safety.

So, is there any solution for a more comprehensive implementation of control statements in JSX? The answer is YES. You can refer to the following packages:
- [jsx-control-statements](https://www.npmjs.com/package/babel-plugin-jsx-control-statements)
- [tsx-control-statements](https://www.npmjs.com/package/tsx-control-statements)

These are packages I really like but have to be cautious about due to the following limitations:
- Compatibility: They only support a specific transpiler (babel, tsx). As of the current date (2024-01-06), jsx-control-statements doesn't work with popular bundlers like Vite, esbuild, microbundle, etc.
- Long-term support: Solutions using React components to implement control statements will remain compatible with newer React versions as long as React ensures backward compatibility. Projects based on transpiler plugins may need updates when a new transpiler version is released.
- IDE lacks code highlighting support.

## API

### 1. Simple condition
#### &lt;If&gt;
| Property             | Type                      | Required |
|----------------------|---------------------------|----------|
| `check`              | Boolean                   | yes      |
| `then` or `children` | ReactNode, Function, null | no       |

Example 01:
```jsx
import { If } from  'reloc';

<If check={status === DONE}>
  <span>It is done</span>
</If>
```
or deferred syntax:
```jsx
<If check={status === DONE}>
  {() => (
    <span>It is done</span>
  )}
</If>
```
or alternative syntax:
```jsx
<If check={ obj } then={() => (
  <span>It is done</span>
)} />
```

## 2. Complex conditional, Switch statements
### &lt;Switch&gt;
Only the first case that satisfies the condition will be rendered.

| Property     | Type                    | Required | Default | Description                                                                                                                                                                             |
|--------------|-------------------------|----------|---------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `match`      | Boolean, Number, String | no       |         | If the `match` has set value, the component works as a 'Switch mode.' Otherwise, it works as a complex conditional mode.                                                                |
| `strict`     | Boolean                 | no       | true    | Only available for 'Switch mode.' If `strict` is true, it will check the data type of the `match` when comparing with the case value. See the example below for a better understanding. |

### &lt;Case&gt;
| Property             | Type                      | Required |
|----------------------|---------------------------|----------|
| `check`              | Boolean                   | yes      |
| `then` or `children` | ReactNode, Function, null | no       |

### &lt;Default&gt;
| Property             | Type                      | Required |
|----------------------|---------------------------|----------|
| `-`                  |                           |          |
| `then` or `children` | ReactNode, Function, null | no       |
Example 02 - Complex condition:
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
<details>
<summary>or deferred syntax:</summary>

```jsx
import {Switch, Case, Default} from  'reloc';

<Switch>
  <Case check={status === DOING}>
    {() => (
      <span>DOING</span>
    )}
  </Case>
  <Case check={status === DONE}>
    {() => (
      <span>DONE</span>
    )}
  </Case>
  <Default>
    {() => (
      <span>OTHER</span>
    )}
  </Default>
</Switch>
```
</details>

<details>
<summary>or alternative syntax:</summary>

```jsx
import {Switch, Case, Default} from  'reloc';

<Switch>
  <Case check={status === DOING} then={() => (
    <span>DOING</span>
  )} />
  <Case check={status === DONE} then={() => (
    <span>DONE</span>
  )} />
  <Default then={() => (
    <span>OTHER</span>
  )} />
</Switch>
```
</details>

Example 03: Switch mode:
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
_Deferred syntax, alternative syntax similar to example 02._

Example 04: Switch mode with the `strict` prop off:
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
_Deferred syntax, alternative syntax similar to example 02._

## 3. Loop
### &lt;For&gt;
Support Array, Set, Map, Object data types.

| Property   | Type                                                                       | Required | Description                                                                                   |
|------------|----------------------------------------------------------------------------|----------|-----------------------------------------------------------------------------------------------|
| `items`    | Array, Map, Set, Object                                                    | yes      |                                                                                               |
| `children` | Function: (item: any, key: String&#124;Number, index: Number) => ReactNode | yes      | If the data type of the `items` is an Array or Set, the 'key' value will reference the index. |

Example 05:
```jsx
import {For} from  'reloc';

<For items={items}>
  {(item, key, index) => (
    <span key={key}>{index}: {item.name}</span>
  )}
</For>
```
or alternative syntax:
```jsx
<For items={items} children={(item, key, index) => (
  <span key={key}>{index}: {item.name}</span>
)} />
```