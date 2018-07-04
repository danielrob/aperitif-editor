import React from 'react'

import { Workspace } from 'components'
import { ToTextContainer } from 'containers'
import { emitter } from 'middleware/spyMiddleware'

import makeReduxStackblitzUpdateReconciler from './makeReduxStackblitzUpdateReconciler'
import download from './download'
import toStackBlitz from './toStackBlitz'
import embedStackBlitz from './embedStackBlitz'
import embedUpdate from './embedUpdate'

export default class WorkspaceContainer extends React.PureComponent {
  static onTextFinishActions = {
    download,
    toStackBlitz,
    embedStackBlitz,
    embedUpdate,
  }

  constructor() {
    super()
    this.state = {
      width: Math.min(document.body.clientWidth * 0.3, 300),
      embedWidth: 0,
      toText: false,
      cbName: null,
    }
  }

  /* Project Exporting / Embed */
  startToText = cbName => {
    // Note: ToText won't start until there is a currentFileId, so choice between
    // preventing setting new incoming cb's or not garuanteeing original.
    if (!this.state.toText) {
      this.setState({ toText: true, cbName })
    }
  }

  onToTextFinish = fileTree => {
    const { cbName } = this.state
    this.setState({ toText: false })
    if (cbName === 'embedStackBlitz') {
      embedStackBlitz(fileTree).then(vm => {
        setTimeout(() => {
          this.setState({
            embedWidth: Math.max(document.body.clientWidth * 0.33, 250),
          })
          this.vm = vm
          emitter.addListener(makeReduxStackblitzUpdateReconciler(this.updateEmbed, vm))
        }, 500)
      })
    } else {
      WorkspaceContainer.onTextFinishActions[cbName](fileTree, this)
    }
  }

  handleDownloadApp = () => this.startToText('download')

  handleExportToStackBlitz = () => this.startToText('toStackBlitz')

  handleStartPreview = () => this.startToText('embedStackBlitz')

  updateEmbed = () => this.startToText('embedUpdate')

  componentDidMount() {
    this.handleStartPreview()
  }

  /* Divider */
  handleDividerMouseMove = e => {
    const { clientX } = e
    this.setState({
      width: Math.min(Math.max(clientX, 10), document.body.clientWidth * 0.55),
    })
    e.preventDefault()
  }

  handleDividerMouseUp = e => {
    document.removeEventListener('mousemove', this.handleDividerMouseMove)
    document.removeEventListener('mouseup', this.handleDividerMouseUp)
    e.preventDefault()
  }

  handleDividerMouseDown = e => {
    document.addEventListener('mousemove', this.handleDividerMouseMove)
    document.addEventListener('mouseup', this.handleDividerMouseUp)
    e.preventDefault()
  }

  /* EmbedDivider */
  handleEmbedDividerMouseMove = e => {
    const { clientX } = e
    this.setState({
      embedWidth: Math.min(
        Math.max(document.body.clientWidth - clientX, 2),
        (document.body.clientWidth - this.state.width - 10)
      ),
    })
    e.preventDefault()
  }

  handleEmbedDividerMouseUp = e => {
    window.removeEventListener('mousemove', this.handleEmbedDividerMouseMove)
    window.removeEventListener('mouseup', this.handleEmbedDividerMouseUp)
    e.preventDefault()
  }

  handleEmbedDividerMouseDown = e => {
    window.addEventListener('mousemove', this.handleEmbedDividerMouseMove)
    window.addEventListener('mouseup', this.handleEmbedDividerMouseUp)
    e.preventDefault()
  }

  render() {
    return [
      <Workspace
        key="workspace"
        {...this.props}
        width={this.state.width}
        embedWidth={this.state.embedWidth}
        handleDividerMouseDown={this.handleDividerMouseDown}
        handleEmbedDividerMouseDown={this.handleEmbedDividerMouseDown}
        workspaceActions={{
          downloadApp: this.handleDownloadApp,
          exportToStackBlitz: this.handleExportToStackBlitz,
          embedStackBlitz: this.handleStartPreview,
        }}
      />,
      this.state.toText && <ToTextContainer key="toText" onFinish={this.onToTextFinish} />,
    ]
  }
}
