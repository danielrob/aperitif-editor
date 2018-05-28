import React from 'react'
import { CLASS_PROP, CLASS_METHOD } from 'constantz'
import { ClassProperty, ClassMethod } from './'

const ClassPropertyDeclarationFactory = props => {
  switch (props.type) {
    case CLASS_PROP: return <ClassProperty {...props} />
    case CLASS_METHOD: return <ClassMethod {...props} />
    default: return <div>unknown type</div>
  }
}

export default ClassPropertyDeclarationFactory
