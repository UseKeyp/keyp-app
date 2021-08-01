import React from 'react'
import Icon from './Icon'
import Wrapper from './Wrapper'

export const generated = (props) => {
  return (
    <Wrapper>
      <Icon {...props} name="treasure_chess" />
    </Wrapper>
  )
}

export default { title: 'Components/Icon' }
