import React, { Component, PureComponent } from 'react'
import styled from 'styled-components'
import * as hue from '../../helpers/hue'

const HueBody = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border-radius: ${p => p.radius};
  box-shadow: ${p => p.shadow};

  .hue-horizontal {
    background: linear-gradient(to right, #f00 0%, #ff0 17%, #0f0
      33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);
  }

  .hue-vertical {
    background: linear-gradient(to top, #f00 0%, #ff0 17%, #0f0 33%,
      #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);
  }
`

const HueContainer = styled.div`
  padding: 0 2px;
  position: relative;
  height: 100%;
  border-radius: ${p => p.radius};
`

const Pointer = styled.div`
  position: absolute;
  left: ${p => (p.direction === 'vertical' ? '0px' : `${(p.hsl.h * 100) / 360}%`)};
  top: ${p => (p.direction === 'vertical' ? `${-((this.props.hsl.h * 100) / 360) + 100}%` : '0px')};
`

const Slider = styled.div`
  margin-top: 1px;
  width: 4px;
  border-radius: 1px;
  height: 8px;
  box-shadow: 0 0 2px rgba(0, 0, 0, .6);
  background: #fff;
  transform: translateX(-2px);
`

export class Hue extends (PureComponent || Component) {
  componentWillUnmount() {
    this.unbindEventListeners()
  }

  handleChange = e => {
    const change = hue.calculateChange(e, this.props.direction, this.props.hsl, this.container)
    if (change && typeof this.props.onChange === 'function') this.props.onChange(change, e)
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
    const { direction = 'horizontal' } = this.props

    return (
      <HueBody {...this.props}>
        <HueContainer
          className={`hue-${direction}`}
          ref={container => { this.container = container }}
          onMouseDown={this.handleMouseDown}
          onTouchMove={this.handleChange}
          onTouchStart={this.handleChange}
          {...this.props}
        >
          <Pointer {...this.props}>
            { this.props.pointer ? (
              <this.props.pointer {...this.props} />
            ) : (
              <Slider />
            ) }
          </Pointer>
        </HueContainer>
      </HueBody>
    )
  }
}

export default Hue
