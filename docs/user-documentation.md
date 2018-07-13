# User Documentation
Aperitif uses JSON you provide and a drag and drop interface to help you quickly flesh out an app or feature intelligently. It allows you to interact with React code by dragging things like props, files, and components to quickly create a component tree, as well as adding styles via styled-components.

The major editor interactions are to drag, rename, toggle (click), and style. Many of these will be natural to you if you understand React, but Aperitif editor can also be a fun way to learn about React. In any case, let's run through the various actions you can do with Aperitif.

## Providing JSON
As mentioned in the README Aperitif currently works better when the provided JSON maps reasonably cleanly to the desired UI. This generally means that each layers of the api response would equal a new layer in the component tree. If this is not the case, you can either quickly clean up the response (e.g. just use the value of `data` if the response is `{ meta: {}, status: {}, data: {} }`) or simply add unneeded layers of components - and them delete them after export.

## Managing Props
```javascript
const Component = ({
  name // A prop is one of the named parameters passed to a React Component
}) =>
```

Props can be dragged to three locations, let's use a prop named `is_awesome` in these examples.

### to the `<Component isAwesome={is_awesome}/>` tag itself
This allows you to add a prop to an existing component. If you visit that component (and it's not a styled component) you will note that it now accepts that prop in it's function signature. The attribute name will be the name of the dragged prop in camelCase.

### to the children area `<Component>[option]</Component>`
Depending on the example payload of the prop (as seen in the tooltip when hovering on the prop) various drop options will be provided when dragging a prop between Component's opening and closing tags. In general, you will be provided with some of four types of options:

#### Option 1 - new styled component
```
<Component>
  <styled.span>{is_awesome}</styled.span>
<Component>
```
In this case, a new styled component (one new file) will be created in the same directory as the current file. The name of the component will be the dragged prop name in PascalCase. In some cases Aperitif may try to guess a more suitable element than a `span` for such a drop.

This option is good when you know the component will always be purely responsible for displaying the value, and no custom logic needs to be applied to the value.


#### Option 2 - new component with param
```
<Component>
  <IsAwesome isAwesome={is_awesome} />
<Component>
```
In this case a new component folder will be created with a `Wrapper` element and an `index.js`. This is useful in most cases - as it will always allow you to later add custom logic surrounding the prop to the created component later. Also, if the payload is an array, it is good to have a wrapper component around the list.

#### Option 3 - literal
```
<Component>
  {is_awesome}
<Component>
```
This should be somewhat self-explanatory.

#### Option 4 - create component and pass prop as children.
```
<Component>
  <IsAwesome>
   {is_awesome}
  </IsAwesome>
<Component>
```
In this case the created component will be passed the `children` prop and will render `{children}`. This is basically a shortcut method for Option 2, then Option 3.


### to white space - remove a prop
Props can currently be deleted by dropping them to "nowhere" - i.e. any white space in the main editor not covered by text.


## Managing Attributes
The term prop can be ambiguous, so the term attribute here means a "call prop" i.e. a property name given to a component call.

### Move attributes between components
Once a prop is added to a component as an attribute, it can be dragged between components. Note that this can potentially remove an entire chain of props going down the component tree if they all relied on this one. It will also be added to the target components definition.

### Rename attributes
Within a component file, a prop itself cannot be renamed, but the attribute name can be. For example `foo={bar}` can be changed to `foozeball={bar}`. When this is done, the corresponding prop in the component definition will also be renamed. So `const Component = ({ foo })` => `const Component = ({ foozeball })`.


## Managing Components
Components can be either the component definition, or a component invocation e.g. when a component is used as a tag in JSX - `<Component />`.

### Creating components
Besides creating components by dragging props as per the Managing props section above, components can be created clicking the plus button, or hovering over the plus button and selecting one of the options. Presently these are to create a styled-component, or a component bundle.

### Adding existing components to JSX
Files which default export a component can be dragged onto JSX of the currently open file to add another component invocation.

### Moving component invocations
Component invocations can be re-ordered within the current JSX.

### Changing component type
Stateless function components (SFC) can be toggled to Class components by clicking on the `const` in their declaration. e.g. `const Component = () =>`. A class component, if it has no other lifecycle methods than render and no constructor can also be toggled back to a SFC by clicking on `class`.


## Managing Files

### Within the file explorer
Files can be dragged within the file explorer.

### Merging files
Styled component files can be dropped onto the editor of an open `index.js` _that's in the same parent folder_ to combine files. The styled-component declaration will be below the declared propTypes. If this results in a folder with only an `index.js` file, that folder will be made into a flat file component.


## Managing Preferences
At the moment the only preference is the use of semicolons. Click the end of the line of any statement to toggle semis on or off.