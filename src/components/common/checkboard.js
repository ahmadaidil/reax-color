import React from 'react'
import styled from 'styled-components'
import { get } from '../../helpers/checkboard'

const Grid = styled.div`
  border-radius: ${p => p.borderRadius};
  box-shadow: ${p => p.boxShadow};
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: ${p => `url(${get(p.white, p.grey, p.size, p.renderers.canvas)}) center left`};
`

const Checkboard = props => <Grid {...props} />

Checkboard.defaultProps = {
  size: 8,
  white: 'transparent',
  grey: 'rgba(0,0,0,.08)',
  renderers: {}
}

export default Checkboard
