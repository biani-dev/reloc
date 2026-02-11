# Reloc – React Logic Components

[![npm](https://img.shields.io/npm/v/reloc?logo=npm)](https://www.npmjs.com/package/reloc)
[![License](https://img.shields.io/github/license/biani-dev/reloc?logo=github&logoColor=959DA5&labelColor=2D3339)](https://github.com/biani-dev/reloc/blob/main/LICENSE)
[![Contact](https://img.shields.io/badge/contact-@TuyenNV-blue.svg?style=flat&logo=twitter)](https://twitter.com/tuyennv22)

**Reloc** provides logic control components for React JSX, including:

- `<If>` – simple conditional rendering  
- `<Switch>`, `<Case>`, `<Default>` – complex conditional logic
- `<For>` – iteration over collections  

---

## Installation

### npm
```bash
npm i reloc
````

### yarn

```bash
yarn add reloc
```

---

## API

## 1. Simple Conditional – `<If>`

### Props

| Name                 | Type                        | Required | Description           |
| -------------------- | --------------------------- | -------- | --------------------- |
| `is`                 | Boolean                     | ✔        | Condition to evaluate |
| `then` or `children` | ReactNode | Function | null | ✖        | Content to render     |

### Examples

**Recommended usage (with function):**

```jsx
import { If } from 'reloc';

<If is={obj} then={() => (
  <span>It is done</span>
)} />
```

**Alternative syntax:**

```jsx
<If is={status === DONE}>
  {() => (
    <span>It is done</span>
  )}
</If>
```

**⚠️ Unsafe syntax (not recommended):**

```jsx
<If is={status === DONE}>
  <span>It is done</span>
</If>
```

---

## 2. Complex Conditionals – Switch / Case

### `<Switch>`

Only the **first matching case** will be rendered.

| Prop     | Type                    | Required | Default | Description                                         |
| -------- |-------------------------| -------- | ------- | --------------------------------------------------- |
| `match`  | Boolean, Number, String | ✖        | `true`  | Value to compare against cases                      |
| `strict` | Boolean                 | ✖        | `true`  | When enabled, comparison checks both value and type |

---

### `<Case>`

| Prop                 | Type                        | Required |
| -------------------- | --------------------------- | -------- |
| `is`                 | Boolean                     | ✔        |
| `then` or `children` | ReactNode | Function | null | ✖        |

---

### `<Default>`

| Prop                 | Type                        | Required |
| -------------------- | --------------------------- | -------- |
| `then` or `children` | ReactNode | Function | null | ✖        |

---

### Example 1: Conditional logic

```jsx
import { Switch, Case, Default } from 'reloc';

<Switch>
  <Case is={status === DOING} then={() => (
      <span>DOING</span>
  )} />
  <Case is={status === DONE} then={() => (
      <span>DONE</span>
  )} />
  <Default then={() => (
      <span>OTHER</span>
  )} />
</Switch>
```

**Alternative syntax:**

```jsx
<Switch>
  <Case is={status === DOING}>
    {() => (
        <span>DOING</span>
    )}
  </Case>
  <Case is={status === DONE}>
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

---

### Example 2: Switch mode

```jsx
<Switch match={status}>
  <Case is={DOING} then={() => (
      <span>DOING</span>
  )} />
  <Case is={DONE} then={() => (
      <span>DONE</span>
  )} />
  <Default then={() => (
      <span>OTHER</span>
  )} />
</Switch>
```

---

### Example 3: Switch mode with `strict={false}`

```jsx
<Switch match={1} strict={false}>
  <Case is={'1'} then={() => (
      <span>Passed</span>
  )} />
  <Case is={'2'} then={() => (
      <span>Not passed</span>
  )} />
  <Default then={() => (
      <span>Not passed</span>
  )} />
</Switch>
```

**⚠️ Unsafe syntax (not recommended):**

```jsx
<Switch match={status}>
    <Case is={'doing'}>
        <span>Passed</span>
    </Case>
    <Case is={'done'}>
        <span>Not Passed</span>
    </Case>
    <Default>
        <span>Not passed</span>
    </Default>
</Switch>
```

---

## 3. Loop – `<For>`

Supported data types:

* `Array`
* `Set`
* `Map`
* `Object`

### Props

| Name       | Type                              | Required | Description           |
| ---------- |-----------------------------------| -------- | --------------------- |
| `items`    | Array, Set, Map, Object           | ✔        | Collection to iterate |
| `children` | `(item, key, index) => ReactNode` | ✔        | Render function       |

> For `Array` and `Set`, `key` is the same as `index`.

### Example

```jsx
import { For } from 'reloc';

<For items={items}>
  {(item, key, index) => (
    <span key={key}>
      {index}: {item.name}
    </span>
  )}
</For>
```

---

## Important: Deferring Evaluation of Children

JavaScript uses **eager evaluation**, meaning JSX expressions are executed even when conditions are false.

### Incorrect ❌

```jsx
<If is={obj}>
  <span>{obj.attr}</span>
</If>
```

This will throw an error if `obj` is `undefined`.

### Correct ✅

```jsx

<If is={obj} then={() => (
    <span>{obj.attr}</span>
)} />
```

Or:

```jsx
<If is={obj}>
    {() => (
        <span>{obj.attr}</span>
    )}
</If>
```

👉 **Recommendation:** Always use **arrow functions** for `children` in:

* `<If>`
* `<Case>`
* `<Default>`
* `<For>`

For more discussion, see the React team issue:
[https://github.com/reactjs/react-future/issues/35](https://github.com/reactjs/react-future/issues/35)

---

## Alternative Solutions

Reloc prioritizes long-term compatibility with React, though the syntax may feel verbose in some cases.

If you prefer JSX syntax closer to native control statements, consider:

* [babel-plugin-jsx-control-statements](https://www.npmjs.com/package/babel-plugin-jsx-control-statements)
* [tsx-control-statements](https://www.npmjs.com/package/tsx-control-statements)

### Limitations of these approaches:

* ❌ Depend on specific transpilers (babel, tsx)
* ❌ Limited compatibility with modern bundlers (Vite, esbuild, microbundle)
* ❌ Poor IDE syntax highlighting
* ❌ Potential maintenance issues when upgrading transpilers

👉 A React-component-based approach like **Reloc** is generally safer and more future-proof.
