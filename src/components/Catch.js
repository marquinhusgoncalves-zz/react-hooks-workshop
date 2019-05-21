import React, { Component } from 'react'

export default class Catch extends Component {
  state = { hasError: false }

  static getDerivedStateFromError(error) {
    // Update the state, at the next rendering, we'll know that an error has been caught
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      // Display of the fallback of our choice
      return <h1>Something went wrong.</h1>
    }

    return this.props.children
  }
}
