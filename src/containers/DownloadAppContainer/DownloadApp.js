import React from 'react'
import styled from 'styled-components'

import { toArray } from 'utils'
import { DIR } from 'constantz'

import { EditorContainer } from 'containers'

export default class DownloadApp extends React.Component {
  constructor(props) {
    super(props)

    const files = toArray(props.files).filter(({ type }) => type !== DIR)

    this.state = {
      files,
      filesIndex: 0,
      maxFileIndex: files.length - 1,
    }
  }

  backgroundExportEditor = React.createRef()

  componentDidMount() {
    this.copyFileContents()
    this.setState({ // eslint-disable-line react/no-did-mount-set-state
      filesIndex: 1,
    })
  }

  componentDidUpdate() {
    const { onFinish } = this.props
    const { filesIndex, maxFileIndex } = this.state

    this.copyFileContents()

    if (filesIndex === maxFileIndex) {
      onFinish()
    } else {
      this.setState({ // eslint-disable-line react/no-did-update-set-state
        filesIndex: filesIndex + 1,
      })
    }
  }

  copyFileContents() {
    /* eslint-disable */
    ;(function selectText(e, r, s, d) {
      d = document
      if ((s = window.getSelection)) {
        ;(r = d.createRange()).selectNode(e)
        ;(s = s()).removeAllRanges()
        s.addRange(r)
      } else if (d.selection) {
        ;(r = d.body.createTextRange()).moveToElementText(e)
        r.select()
      }
    })(this.backgroundExportEditor.current)

    console.log(
      (function getSelectionText() {
        var text = ''
        if (window.getSelection) {
          text = window.getSelection().toString()
        } else if (document.selection && document.selection.type !== 'Control') {
          text = document.selection.createRange().text
        }
        return text
      })()
    )

    ;(function clearSelection() {
      if (window.getSelection) {
        window.getSelection().removeAllRanges()
      } else if (document.selection) {
        document.selection.empty()
      }
    })()
    /* eslint-enable */
  }

  render() {
    const { files, filesIndex } = this.state

    return (
      <Wrapper innerRef={this.backgroundExportEditor}>
        <EditorContainer currentFileId={files[filesIndex].id} />
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  position: absolute;
  z-index: -1;
  height: 1px;
  width: 1px;
  overflow: auto;
`
