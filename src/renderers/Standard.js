import React from 'react'
import { Line, InvisibleTextArea } from 'components'

export default class Standard extends React.Component {
  render() {
    const { imports, exports, currentFile, expression, names, createNewChild, tag } = this.props

    return (
      <div>
        {imports.map(imp => (
          <Line statement key={imp.id}>
            import {imp.default} from '{imp.fromModule}'
          </Line>
        ))}
        <br />
        const {names[currentFile.nameId]} = styled.{tag}`
        <br />
        <InvisibleTextArea />
        <br />
        `
        <br />
        <br />
        {exports.map(exp => <Line key={exp.id} statement>{exp.defaultName && `export default ${exp.defaultName}`}</Line>)}
      </div>
    )
  }
}
