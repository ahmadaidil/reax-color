import React from 'react'
import t from 'prop-types'
import styled from 'styled-components'
import { handleFocus } from '../../helpers/interaction'

import Checkboard from './checkboard'

const ENTER = 13

const Container = styled.div`
  background: ${p => p.color};
  height: 100%;
  width: 100%;
  cursor: pointer;
  position: relative;
  outline: none;
  border-radius: ${p => p.borderRadius};
  box-shadow: ${p => (p.focus ? p.focusStyle : p.boxShadow)};
`

export const Swatch = ({
  color, onClick, onHover, title = color,
  children, focus, focusStyle, boxShadow, borderRadius
}) => {
  const transparent = color === 'transparent'

  const handleClick = e => onClick(color, e)
  const handleKeyDown = e => e.keyCode === ENTER && onClick(color, e)
  const handleHover = e => onHover(color, e)

  const optionalEvents = {}
  if (onHover) {
    optionalEvents.onMouseOver = handleHover
  }

  return (
    <Container
      onClick={handleClick}
      title={title}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      {...optionalEvents}
      {...{
        color, borderRadius, focus, focusStyle, boxShadow
      }}
    >
      { children }
      { transparent && (
        <Checkboard
          borderRadius="3px"
          boxShadow="inset 0 0 0 1px rgba(0,0,0,0.1)"
        />
      ) }
    </Container>
  )
}

Swatch.propTypes = {
  color: t.any.isRequired,
  onClick: t.func,
  onHover: t.func.isRequired,
  title: t.any.isRequired,
  children: t.any.isRequired,
  focus: t.any.isRequired,
  focusStyle: t.string.isRequired,
  boxShadow: t.string.isRequired,
  borderRadius: t.string.isRequired
}

Swatch.defaultProps = {
  onClick: () => {}
}

export default handleFocus(Swatch)
