import React, { Component, PureComponent } from 'react'
import styled from 'styled-components'
import * as alpha from '../../helpers/alpha'

import Checkboard from './checkboard'

const AlphaWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border-radius: ${p => p.radius};
`

const CheckboardContainer = styled(AlphaWrapper)`
  overflow: hidden;
`

const Gradient = styled(AlphaWrapper)`
  background: ${({ rgb, direction }) => (direction === 'vertical'
    ? `linear-gradient(to right, rgba(${rgb.r},${rgb.g},${rgb.b}, 0) 0%, rgba(${rgb.r},${rgb.g},${rgb.b}, 1) 100%)`
    : `linear-gradient(to bottom, rgba(${rgb.r},${rgb.g},${rgb.b}, 0) 0%, rgba(${rgb.r},${rgb.g},${rgb.b}, 1) 100%)`)};
  box-shadow: ${p => p.shadow};
`

const Container = styled.div`
  position: relative;
  height: 100%;
  margin: 0 3px;
`

const Pointer = styled.div`
  position: absolute;
  left: ${({ rgb, direction }) => (direction === 'vertical' ? `${rgb.a * 100}%` : 0)};
  top:${({ rgb, direction }) => (direction === 'vertical' ? 0 : `${rgb.a * 100}%`)};
`

const Slider = styled.div`
  width: 4px;
  border-radius: 1px;
  height: 8px;
  box-shadow: 0 0 2px rgba(0, 0, 0, .6);
  background: #fff;
  margin-top: 1px;
  transform: translateX(-2px);
`

export class Alpha extends (PureComponent || Component) {
  componentWillUnmount() {
    this.unbindEventListeners()
  }

  handleChange = e => {
    const change = alpha.calculateChange(e, this.props.hsl, this.props.direction, this.props.a, this.container)
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

  unbindEventListeners = () => {
    window.removeEventListener('mousemove', this.handleChange)
    window.removeEventListener('mouseup', this.handleMouseUp)
  }

  render() {
    return (
      <AlphaWrapper {...this.props}>
        <CheckboardContainer {...this.props}>
          <Checkboard renderers={this.props.renderers} />
        </CheckboardContainer>
        <Gradient {...this.props} />
        <Container
          ref={container => { this.container = container }}
          onMouseDown={this.handleMouseDown}
          onTouchMove={this.handleChange}
          onTouchStart={this.handleChange}
        >
          <Pointer {...this.props}>
            { this.props.pointer ? (
              <this.props.pointer {...this.props} />
            ) : (
              <Slider />
            ) }
          </Pointer>
        </Container>
      </AlphaWrapper>
    )
  }
}

export default Alpha
