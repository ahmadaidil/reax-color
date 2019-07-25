import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import {
  Checkboard, ColorWrap, Saturation, Hue, Alpha
} from '../common'
import SketchFields from './fields'
import SketchPresetColors from './presetColors'

const Picker = styled.div`
  width: ${p => p.width};
  padding: 10px 10px 0;
  box-sizing: initial;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 0 1px rgba(0,0,0,.15), 0 8px 16px rgba(0,0,0,.15);
`

const SaturationWrap = styled.div`
  width: 100%;
  padding-bottom: 75%;
  position: relative;
  overflow: hidden;
`

const Controls = styled.div`
  display: flex;
`

const Sliders = styled.div`
  padding: 4px 0;
  flex: 1;
`

const HueWrap = styled.div`
  position: relative;
  height: 10px;
  overflow: hidden;
`

const AlphaWrap = styled.div`
  position: relative;
  height: 10px;
  margin-top: 4px;
  overflow: hidden;
  display: ${p => (p.disableAlpha ? 'none' : 'block')};
`

const Color = styled.div`
  width: 24px;
  height: ${p => (p.disableAlpha ? '10px' : '24px')};
  position: relative;
  margin-top: 4px;
  margin-left: 4px;
  border-radius: 3px;
`

const ActiveColor = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border-radius: 2px;
  background: ${({ rgb }) => `rgba(${rgb.r},${rgb.g},${rgb.b},${rgb.a})`};
  box-shadow: 'inset 0 0 0 1px rgba(0,0,0,.15), inset 0 0 4px rgba(0,0,0,.25)';
`

export const Sketch = ({
  width, rgb, hex, hsv, hsl, onChange, onSwatchHover,
  disableAlpha, presetColors, renderers, className = ''
}) => (
  <Picker width={width} className={`sketch-picker ${className}`}>
    <SaturationWrap>
      <Saturation
        radius="3px"
        shadow="inset 0 0 0 1px rgba(0,0,0,.15), inset 0 0 4px rgba(0,0,0,.25)"
        hsl={hsl}
        hsv={hsv}
        onChange={onChange}
      />
    </SaturationWrap>
    <Controls className="flexbox-fix">
      <Sliders>
        <HueWrap>
          <Hue
            radius="2px"
            shadow="inset 0 0 0 1px rgba(0,0,0,.15), inset 0 0 4px rgba(0,0,0,.25)"
            hsl={hsl}
            onChange={onChange}
          />
        </HueWrap>
        <AlphaWrap disableAlpha={disableAlpha}>
          <Alpha
            radius="2px"
            shadow="inset 0 0 0 1px rgba(0,0,0,.15), inset 0 0 4px rgba(0,0,0,.25)"
            rgb={rgb}
            hsl={hsl}
            renderers={renderers}
            onChange={onChange}
          />
        </AlphaWrap>
      </Sliders>
      <Color disableAlpha={disableAlpha}>
        <Checkboard />
        <ActiveColor rgb={rgb} />
      </Color>
    </Controls>
    <SketchFields
      rgb={rgb}
      hsl={hsl}
      hex={hex}
      onChange={onChange}
      disableAlpha={disableAlpha}
    />
    <SketchPresetColors
      colors={presetColors}
      onClick={onChange}
      onSwatchHover={onSwatchHover}
    />
  </Picker>
)

Sketch.propTypes = {
  disableAlpha: PropTypes.bool,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  presetColors: PropTypes.array,
  rgb: PropTypes.object.isRequired,
  hex: PropTypes.string.isRequired,
  hsv: PropTypes.object.isRequired,
  hsl: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onSwatchHover: PropTypes.func.isRequired,
  renderers: PropTypes.any.isRequired,
  className: PropTypes.string
}

Sketch.defaultProps = {
  disableAlpha: false,
  width: 200,
  presetColors: ['#D0021B', '#F5A623', '#F8E71C', '#8B572A', '#7ED321', '#417505',
    '#BD10E0', '#9013FE', '#4A90E2', '#50E3C2', '#B8E986', '#000000',
    '#4A4A4A', '#9B9B9B', '#FFFFFF'],
  className: ''
}

export default ColorWrap(Sketch)
