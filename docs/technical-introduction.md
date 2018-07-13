# Technical Introduction

## Overview
Under the hood Aperitif manages a normalized redux store using a custom ORM inspired by [redux-orm](https://github.com/tommikaikkonen/redux-orm). The models are rendered as selectable text with all the associated (drag and drop) functionality. For text export, each file is rendered to an invisible dom element, and the browsers text selection api is used to copy the text for that file, adding it to the export. This export is created and sent to the StackBlitz embed in a debounced fashion on most redux-actions.

## Models
The model enties are `Declaration`, `DeclParam`, `Invocation`, `CallParam`, `Name` and `File`. The model relationships when applied to React code are such that a `DeclParam` (e.g. prop) on a component `Declaration` should only exist if one of the `Invocation`s of that component has a `CallParam` with the same `nameId`. Similarly, a component `Declaration` and it's related `File`(s) will generally only exist if there is an `Invocation` of that component somewhere. If the last invocation is removed for instance, the related `Declaration` and it's `File`s should also be removed.

So far these six models have been enough to represent all of the code Aperitif can render in a suitable fashion.

## ORM
When it was considered, redux-orm lacked support for create-react-app without ejecting, and didn't particularly handle bidirectional relationships very well. Much of the api was copied in Aperitif's reimplementation, though this has drifted with time.

Conceptually, you can think of Aperitif's implementation more as an immutablity helper that also manages relationships. When kicking off a session for instance, you simply provide the orm with the current session data, and extract the models which will act as helpers on their designated keys in the provided data.

```
const state = { files: {...}, declarations: {...}, ... }
const session = orm.session(state)
const { File, Declaration } = session // now have helpers to manage `files` and `declarations`.
```

One of the eccentric aspects of the implementation is that the `Model`s made available by the orm are for the most part singletons _and they can only have one 'result' in context at any given time_. This means that you may occasionaly see e.g.

```
Name.withId(2)
Name.value // name with id 2 is in context, so this will return it's value
```

Links:
 - Almost all of the ORM implementation is the Model class itself - see `src/orm/Model.js`.
 - View `src/orm/models` to see the specific model type declarations.

 ## To be continued...