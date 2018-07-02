import { set } from 'lodash'
import React from 'react'
import { DIR, SC } from 'constantz'
import { lastItem } from 'utils'
import { EditorContainer } from 'containers'

import copyNodeText from './copyNodeText'
import postProcessFileTree from './postProcessFileTree'

/**
 * ToText
 *
 * Exporting is achieved by rendering the project files to a hidden dom node using the exact same
 * EditorContainer component tree the real editor uses. The HTML text selection api is then used
 * to copy the text in that hidden node. ToText uses the component lifecycle itself + setState
 * to loop through the files, until all files have been copied. ToText is then unmounted.
 */
export default class ToText extends React.Component {
  constructor(props) {
    super(props)
    const { files, rootFiles } = props

    this.fileTree = {}
    this.hiddenNodeRef = React.createRef()
    this.currentTraversal = [
      {
        id: 'root',
        children: rootFiles,
        currentIndex: 0,
        max: rootFiles.length - 1,
      },
    ]

    let file = files[rootFiles[0]]

    while (file.type === DIR) {
      this.currentTraversal.push({
        id: file.id,
        children: file.children,
        currentIndex: 0,
        max: file.children.length - 1,
      })
      file = files[file.children[0]]
    }

    // initialState
    this.state = { currentFileId: file.id }
  }

  copyAndNextFile() {
    const { files, names, semis } = this.props
    const { currentTraversal, fileTree } = this // Note: these are mutation managed state

    // add currently rendered file's text to output tree
    const namePath = currentTraversal.reduce((out, node) => {
      const file = files[node.children[node.currentIndex]]
      const baseName = names[file.nameId].value
      const ext = (file.type === SC && '|js') || (file.type === DIR ? '' : `|${file.type}`)

      return `${out ? `${out}.` : ''}${baseName}${ext}`
    }, null)

    set(fileTree, namePath, copyNodeText(this.hiddenNodeRef.current))

    // walk project's file tree - start by going up if needed
    let node = lastItem(currentTraversal)

    while (node.id !== 'root' && node.currentIndex === node.max) {
      currentTraversal.pop()
      node = lastItem(currentTraversal)
    }

    if (node.id === 'root' && node.currentIndex === node.max) {
      this.props.onFinish(postProcessFileTree(fileTree, semis))
      return
    }

    // next item
    node.currentIndex += 1

    // go down if needed
    let file = files[node.children[node.currentIndex]]

    while (file.type === DIR) {
      currentTraversal.push({
        id: file.id,
        children: file.children,
        currentIndex: 0,
        shouldIncrement: false,
        max: file.children.length - 1,
      })
      file = files[file.children[0]]
    }

    // render new current file
    node = lastItem(currentTraversal)

    const nextCurrentFileId = node.children[node.currentIndex]

    this.setState({
      currentFileId: nextCurrentFileId,
    })
  }

  componentDidMount() {
    this.copyAndNextFile()
  }

  componentDidUpdate() {
    this.copyAndNextFile()
  }

  render() {
    const { currentFileId } = this.state

    return <EditorContainer currentFileId={currentFileId} />
  }
}
