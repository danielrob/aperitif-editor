
<h1 align="center">Aperitif Editor</h1>
<img src="../assets/create-component-from-prop.gif" style="display: block;height: auto;width: 100%;"/>

<p align="center"><a href="https://aperitif.netlify.com" target="_blank"><img src="./public/social.png" width="50"></a></p>

<p align="center">
  🍸🍹 Start React apps and features based on API data.
  <br>
  <br>
  <a href="https://spectrum.chat/aperitif-editor"><img src="https://withspectrum.github.io/badge/badge.svg" alt="Join the community on Spectrum"></a>
  <a href="https://travis-ci.com/danielrob/aperitif-editor"><img src="https://travis-ci.com/danielrob/aperitif-editor.svg" alt="Build Status"></a>
<a href="https://twitter.com/intent/tweet?text=Aperitif+-+%F0%9F%8D%B8%F0%9F%8D%B9+an+editor+for+starting+React+apps+and+features+based+on+API+data+%40AperitifEditor.&url=https%3A%2F%2Fgithub.com%2Fdanielrob%2Faperitif-editor&hashtags=&original_referer=http%3A%2F%2Fgithub.com%2F&tw_p=tweetbutton" target="_blank">
  <img src="http://jpillora.com/github-twitter-button/img/tweet.png"
       alt="tweet button" title="Aperitif - 🍸🍹 An editor for starting React apps and features based on API data @AperitifEditor."></img>
</a>
  <br>
    <br>
</p>


## What does it do?

Aperitif uses JSON you provide and a drag and drop interface to help you quickly flesh out an app or feature intelligently. It allows you to interact with React code by dragging things like props, files, and components to quickly create a component tree, as well as adding styles via styled-components.

### How can I use it?

- It's deployed at [https://aperitif.netlify.com/](https://aperitif.netlify.com/)
- or clone this repo npm install and run `npm start`

### How do I use it?

The major editor interactions are to drag, rename, toggle (click), and style. It will help you if you understand React, but Aperitif editor can also be a fun way to learn about React. In either case you can see the [full user documentation](./docs/user-documentation.md) for further details. Some less obvious interactions are:
 - Remove props/components by dragging them onto a whitespace area of the editor.
 - Use standard keyboard shortcuts to undo and redo.
 - Drag files to component children to add another instance of that component.
 - Toggle semicolons by clicking at the end of any statement.
 - Toggle components to class syntax by clicking on `const` and back (if poss) by clicking on `class`
 - Drag a styled component file onto the editor of an open index.js that's in the same parent folder to combine files.

#### Not all JSON is equal
Aperitif currently works better when the provided JSON maps reasonably cleanly to the desired UI. There are some improvements in the pipeline for this, for example destructuring props more deeply. The workaround is to create uneeded layers of components and delete them after exporting.

## How does it work?
Under the hood Aperitif manages a normalized redux store using a custom ORM inspired by [redux-orm](https://github.com/tommikaikkonen/redux-orm). The models are rendered as selectable text with all the associated (drag and drop) functionality. For text export, each file is rendered to an invisible dom element, and the browsers text selection api is used to copy the text for that file, adding it to the export. For a fuller introduction see the [technical introduction](./docs/technical-introduction.md) in the docs.

## Where too from here?
React code is highly structured. Pure business logic generally lives inside pure functions, in component class methods, or outside of the component tree e.g. reducers. This represents a lot of oppurtunity to strongly assist developers with managing the React code itself and to treat components at a higher level of abstraction than raw code. Aperitif offers a feeling that components are entities that can be thrown together like lego. This is great. It could be extended considerably. Is Aperitif (in meta naming fashion) a taster for it's future self, or possibly for a class of tools like this in general?

## Contributing
This is your project now! You are absolutely welcomed to get involved, even if that means asking questions, editing one character in the docs, or reporting issues. If you have ideas, browse the issues to see that it isn't already there, and add them in. Swing by the [spectrum community](https://spectrum.chat/aperitif-editor) for all of the above if you prefer.


### License
MIT license
