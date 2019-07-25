/* eslint-disable no-param-reassign */

import React from 'react'
import t from 'prop-types'
import styled from 'styled-components'
import * as color from '../../helpers/color'

import { EditableInput } from '../common'

const Fields = styled.div`
  display: flex;
  padding-top: 4px;
`

const Single = styled.div`
  flex: 1;
  padding-left: 6px;
`

const Alpha = styled.div`
  flex: 1;
  padding-left: 6px;
  display: ${p => (p.disableAlpha ? 'none' : 'block')};
`

const Double = styled.div`
  flex: 2;
`

const SketchFields = ({
  onChange, rgb, hsl, hex, disableAlpha
}) => {
  // const styles = reactCSS({
  //   default: {
  //     fields: {
  //       display: 'flex',
  //       paddingTop: '4px'
  //     },
  //     single: {
  //       flex: '1',
  //       paddingLeft: '6px'
  //     },
  //     alpha: {
  //       flex: '1',
  //       paddingLeft: '6px'
  //     },
  //     double: {
  //       flex: '2'
  //     },
  //     input: {
  //       width: '80%',
  //       padding: '4px 10% 3px',
  //       border: 'none',
  //       boxShadow: 'inset 0 0 0 1px #ccc',
  //       fontSize: '11px'
  //     },
  //     label: {
  //       display: 'block',
  //       textAlign: 'center',
  //       fontSize: '11px',
  //       color: '#222',
  //       paddingTop: '3px',
  //       paddingBottom: '4px',
  //       textTransform: 'capitalize'
  //     }
  //   },
  //   disableAlpha: {
  //     alpha: {
  //       display: 'none'
  //     }
  //   }
  // }, { disableAlpha })

  const handleChange = (data, e) => {
    if (data.hex) {
      if (color.isValidHex(data.hex)) {
        onChange({
          hex: data.hex,
          source: 'hex'
        }, e)
      }
    } else if (data.r || data.g || data.b) {
      onChange({
        r: data.r || rgb.r,
        g: data.g || rgb.g,
        b: data.b || rgb.b,
        a: rgb.a,
        source: 'rgb'
      }, e)
    } else if (data.a) {
      if (data.a < 0) {
        data.a = 0
      } else if (data.a > 100) {
        data.a = 100
      }

      data.a /= 100
      onChange({
        h: hsl.h,
        s: hsl.s,
        l: hsl.l,
        a: data.a,
        source: 'rgb'
      }, e)
    }
  }

  return (
    <Fields className="flexbox-fix">
      <Double>
        <EditableInput
          // style={{ input: styles.input, label: styles.label }}
          label="hex"
          value={hex.replace('#', '')}
          onChange={handleChange}
        />
      </Double>
      <Single>
        <EditableInput
          label="r"
          value={rgb.r}
          onChange={handleChange}
          dragLabel="true"
          dragMax="255"
        />
      </Single>
      <Single>
        <EditableInput
          label="g"
          value={rgb.g}
          onChange={handleChange}
          dragLabel="true"
          dragMax="255"
        />
      </Single>
      <Single>
        <EditableInput
          label="b"
          value={rgb.b}
          onChange={handleChange}
          dragLabel="true"
          dragMax="255"
        />
      </Single>
      <Alpha disableAlpha={disableAlpha}>
        <EditableInput
          label="a"
          value={Math.round(rgb.a * 100)}
          onChange={handleChange}
          dragLabel="true"
          dragMax="100"
        />
      </Alpha>
    </Fields>
  )
}

SketchFields.propTypes = {
  onChange: t.func.isRequired,
  rgb: t.object.isRequired,
  hsl: t.object.isRequired,
  hex: t.string.isRequired,
  disableAlpha: t.bool.isRequired
}

export default SketchFields
