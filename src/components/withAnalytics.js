import React from 'react'
import ReactGA from 'react-ga'
import getComponentDisplayName from '../helpers/getComponentDisplayName'
import { env } from '../helpers/env'

const pageview = (path) => {
  if (env.isDev()) {
    console.log(`[ANALYTICS] [Pageview] ${path}`)
  }
  return ReactGA.pageview(path)
}

const set = (fieldsObject) => {
  return ReactGA.set(fieldsObject)
}

const event = ({
                 category = 'Navigation',
                 action = '',
                 label = '',
                 value = undefined,
                 nonInteraction = true,
               } = {}) => {
  if (env.isDev()) {
    console.log(`[ANALYTICS] [Event] ${category} -> ${action}`)
  }
  return ReactGA.event({
    category,
    action,
    label,
    value,
    nonInteraction
  });
}

const withAnalytics = (WrappedComponent) => {
  class withAnalytics extends React.Component {
    analyticsAPI = {
      pageview,
      set,
      event
    }

    render () {
      const {
        ...passThroughProps
      } = this.props

      const injectedProps = {
        analyticsAPI: this.analyticsAPI
      };

      const props = Object.assign(
        {},
        passThroughProps,
        injectedProps
      )

      return <WrappedComponent {...props} />
    }
  }

  withAnalytics.displayName =
    `withAnalytics(${getComponentDisplayName(WrappedComponent)})`

  return withAnalytics
}

export default withAnalytics
