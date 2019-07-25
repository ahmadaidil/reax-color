import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Swatch } from '../common'

const Colors = styled.div`
  margin: 0 -10px;
  padding: 10px 0 0 10px;
  border-top: 1px solid #eee;
  display: ${({ colors }) => (!colors || !colors.length ? 'none' : 'flex')};
  flex-wrap: wrap;
  position: relative;
`

const SwatchWrap = styled.div`
  width: 16px;
  height: 16px;
  margin: 0 10px 10px 0;
`

const SketchPresetColors = ({ colors, onClick, onSwatchHover }) => {
  const handleClick = (hex, e) => {
    onClick({
      hex,
      source: 'hex'
    }, e)
  }

  return (
    <Colors className="flexbox-fix">
      { colors.map(colorObjOrString => {
        const c = typeof colorObjOrString === 'string'
          ? { color: colorObjOrString }
          : colorObjOrString
        const key = `${c.color}${c.title || ''}`

        return (
          <SwatchWrap key={key}>
            <Swatch
              {...c}
              onClick={handleClick}
              onHover={onSwatchHover}
              focusStyle={`inset 0 0 0 1px rgba(0,0,0,.15), 0 0 4px ${c.color}`}
              borderRadius="3px"
              boxShadow="inset 0 0 0 1px rgba(0,0,0,.15)"
            />
          </SwatchWrap>
        )
      }) }
    </Colors>
  )
}

SketchPresetColors.propTypes = {
  colors: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      color: PropTypes.string,
      title: PropTypes.string
    })],)).isRequired,
  onClick: PropTypes.func,
  onSwatchHover: PropTypes.func.isRequired
}

SketchPresetColors.defaultProps = {
  onClick: () => {}
}

export default SketchPresetColors
