import React, { Component, PureComponent } from 'react'
import styled from 'styled-components'
import throttle from 'lodash/throttle'
import * as saturation from '../../helpers/saturation'

const Basic = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border-radius: ${p => p.radius};
`

const Color = styled(Basic)`
  background: ${p => `hsl(${p.hsl.h}, 100%, 50%)`};
`

const White = styled(Basic)`
  background: linear-gradient(to right, #fff, rgba(255,255,255,0));
`

const Black = styled(Basic)`
  box-shadow: ${p => p.shadow};
  background: linear-gradient(to top, #000, rgba(0,0,0,0));
`

const Pointer = styled.div`
  position: 'absolute';
  top: ${p => `${-(p.hsv.v * 100) + 100}%`};
  left: ${p => `${p.hsv.s * 100}%`};
  cursor: default;
`

const Circle = styled.div`
  width: 4px;
  height: 4px;
  box-shadow: 0 0 0 1.5px #fff, inset 0 0 1px 1px rgba(0,0,0,.3),
    0 0 1px 2px rgba(0,0,0,.4);
  border-radius: 50%;
  cursor: hand;
  transform: translate(-2px, -2px);
`

export class Saturation extends (PureComponent || Component) {
  constructor(props) {
    super(props)

    this.throttle = throttle((fn, data, e) => {
      fn(data, e)
    }, 50)
  }

  componentWillUnmount() {
    this.throttle.cancel()
    this.unbindEventListeners()
  }

  handleChange = e => {
    if (typeof this.props.onChange === 'function') {
      this.throttle(
        this.props.onChange,
        saturation.calculateChange(e, this.props.hsl, this.container),
        e,
      )
    }
  }

  handleMouseDown = e => {
    this.handleChange(e)
    window.addEventListener('mousemove', this.handleChange)
    window.addEventListener('mouseup', this.handleMouseUp)
  }

  handleMouseUp = () => {
    this.unbindEventListeners()
  }

  unbindEventListeners() {
    window.removeEventListener('mousemove', this.handleChange)
    window.removeEventListener('mouseup', this.handleMouseUp)
  }

  render() {
    return (
      <Color
        ref={container => { this.container = container }}
        onMouseDown={this.handleMouseDown}
        onTouchMove={this.handleChange}
        onTouchStart={this.handleChange}
        {...this.props}
      >
        <White {...this.props}>
          <Black {...this.props} />
          <Pointer {...this.props}>
            { this.props.pointer ? (
              <this.props.pointer {...this.props} />
            ) : (
              <Circle />
            ) }
          </Pointer>
        </White>
      </Color>
    )
  }
}

export default Saturation
