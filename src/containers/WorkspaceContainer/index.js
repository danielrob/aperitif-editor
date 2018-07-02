import React from 'react'
import { Workspace } from 'components'
import { ToTextContainer } from 'containers'

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
      vm: null,
    }
  }

  /* Project Exporting / Embed */
  startToText = cbName => this.setState({ toText: true, cbName })

  onToTextFinish = fileTree => {
    const { cbName } = this.state
    this.setState({ toText: false })
    if (cbName === 'embedStackBlitz') {
      embedStackBlitz(fileTree).then(vm => {
        setTimeout(() => {
          this.setState({
            embedWidth: Math.max(document.body.clientWidth * 0.3, 250),
            vm,
            interval: setInterval(this.updateEmbed, 5000),
          })
        }, 500)
      })
    } else {
      WorkspaceContainer.onTextFinishActions[cbName](fileTree, this.state)
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
        Math.max(document.body.clientWidth - clientX, 10),
        (document.body.clientWidth - this.state.width - 10)
      ),
    })
    e.preventDefault()
  }

  handleEmbedDividerMouseUp = e => {
    document.removeEventListener('mousemove', this.handleEmbedDividerMouseMove)
    document.removeEventListener('mouseup', this.handleEmbedDividerMouseUp)
    e.preventDefault()
  }

  handleEmbedDividerMouseDown = e => {
    document.addEventListener('mousemove', this.handleEmbedDividerMouseMove)
    document.addEventListener('mouseup', this.handleEmbedDividerMouseUp)
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
