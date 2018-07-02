import React from 'react'
import { Workspace } from 'components'
import { ToTextContainer } from 'containers'

import download from './download'
import toStackBlitz from './toStackBlitz'

export default class WorkspaceContainer extends React.PureComponent {
  static onTextFinishActions = {
    download,
    toStackBlitz,
  }

  constructor() {
    super()
    this.state = {
      width: Math.min(document.body.clientWidth * 0.3, 300),
      toText: false,
      cbName: null,
    }
  }

  /* Project Exporting */
  startToText = cbName => this.setState({ toText: true, cbName })

  onToTextFinish = fileTree => {
    const { cbName } = this.state
    this.setState({ toText: false })
    WorkspaceContainer.onTextFinishActions[cbName](fileTree)
  }

  handleDownloadApp = () => this.startToText('download')

  handleExportToStackBlitz = () => this.startToText('toStackBlitz')

  /* Divider */
  handleMouseMove = e => {
    const { clientX } = e
    this.setState({
      width: Math.min(Math.max(clientX, 10), document.body.clientWidth * 0.45),
    })
    e.preventDefault()
  }

  handleMouseUp = e => {
    document.removeEventListener('mousemove', this.handleMouseMove)
    document.removeEventListener('mouseup', this.handleMouseUp)
    e.preventDefault()
  }

  handleDividerMouseDown = e => {
    document.addEventListener('mousemove', this.handleMouseMove)
    document.addEventListener('mouseup', this.handleMouseUp)
    e.preventDefault()
  }

  render() {
    return [
      <Workspace
        key="workspace"
        {...this.props}
        width={this.state.width}
        handleDividerMouseDown={this.handleDividerMouseDown}
        workspaceActions={{
          downloadApp: this.handleDownloadApp,
          exportToStackBlitz: this.handleExportToStackBlitz,
        }}
      />,
      this.state.toText && <ToTextContainer key="toText" onFinish={this.onToTextFinish} />,
    ]
  }
}
