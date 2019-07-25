import React from 'react'

export const handleFocus = (Component, Span = 'span') => function Focus(props) {
  const [focus, setFocus] = React.useState(false)

  return (
    <Span onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}>
      <Component {...props} focus={focus} />
    </Span>
  )
}

// class Focus extends React.Component {
//   state = { focus: false }
//   handleFocus = () => this.setState({ focus: true })
//   handleBlur = () => this.setState({ focus: false })

//   render() {
//     return (
//       <Span onFocus={ this.handleFocus } onBlur={ this.handleBlur }>
//         <Component { ...this.props } { ...this.state } />
//       </Span>
//     )
//   }
// }
