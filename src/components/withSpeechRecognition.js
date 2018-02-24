import React from 'react';
import getComponentDisplayName from '../helpers/getComponentDisplayName';
import { env } from '../helpers/env'

const withSpeechRecognition = (WrappedComponent) => {
    class WithSpeechRecognition extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                speechRecognition: null,
            };
        }

        // Stores temporary transcript result until firing onEnd event.
        // Useful when onResult doesn't return anything, because it hasn't detected anything.
        tempTranscript = ''

        // Transcript saved from previous SpeechRecognition objects, when the session was not yet ended by user
        fullTranscript = ''

        // Is speech recognition ended by user or by itself being idle
        isStoppedByUser = false

        // After recording is stopped wait for this number of ms for final onResult event
        afterStopDelay = 2000

        start = () => {
            if (this.state.speechRecognition !== null) {
                this.isStoppedByUser = false
                this.state.speechRecognition.start();
            }
        };

        stop = () => {
            if (this.state.speechRecognition !== null) {
                this.isStoppedByUser = true

              if (env.isDev()) {
                console.log('[EVENT] Stopped by user');
              }

                setTimeout(() => {
                  this.state.speechRecognition.stop();
                }, this.afterStopDelay)
            }
        };

        abort = () => {
            if (this.state.speechRecognition !== null) {
                this.state.speechRecognition.abort();
            }
        };

        onStart = (event) => {
          if (env.isDev()) {
            console.info("[EVENT] speechRecognition onstart", event);
          }
            this.props.onStart && this.props.onStart(event);
        };

        onResult = (event) => {
            // See: https://w3c.github.io/speech-api/webspeechapi.html#speechreco-result
          if (env.isDev()) {
            console.info("[EVENT] speechRecognition onresult", event);
          }
            let currentTranscript = '';

            const resultsList = event.results

            for (let i = 0; i < resultsList.length; i++) {
              const result = resultsList[i]
              if (result.isFinal) {
                currentTranscript = currentTranscript
                  ? `${currentTranscript} ${result[0].transcript.trim()}`
                  : result[0].transcript.trim()
              }
            }

          if (env.isDev()) {
            console.log('currentTranscript', currentTranscript)
          }

            this.tempTranscript = currentTranscript
            // this.props.onResult && this.props.onResult(currentTranscript);
        };

        onEnd = (event) => {
            if (env.isDev()) {
              console.info("[EVENT] speechRecognition onend", event);
            }

            // Save current transcript and restart speech recognition
            this.fullTranscript = this.fullTranscript
              ? `${this.fullTranscript} ${this.tempTranscript.trim()}`
              : this.tempTranscript.trim()

            if (env.isDev()) {
              console.log('fullTranscript', this.fullTranscript)
            }

            this.tempTranscript = ''

            if (this.isStoppedByUser) {
                // Finish speech recognition
                this.props.onEnd && this.props.onEnd(this.fullTranscript);
                this.fullTranscript = ''
            } else {
                this.start()
            }
        };

        onError = (event) => {
          if (env.isDev()) {
            console.info("[EVENT] speechRecognition onerror", event);
          }
            this.props.onError && this.props.onError(event);
        };

        initSpeechRecognition = (language) => {
          const SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition;

          if (SpeechRecognition !== undefined) {
            const speechRecognition = new SpeechRecognition();
            speechRecognition.continuous = true;
            speechRecognition.interimResults = false;
            speechRecognition.lang = language;
            speechRecognition.onstart = this.onStart;
            speechRecognition.onend = this.onEnd;
            speechRecognition.onerror = this.onError;
            speechRecognition.onresult = this.onResult;

            this.setState({ speechRecognition });
          }
        }

        componentWillUpdate({ language }) {
            if (this.state.speechRecognition !== null && this.state.speechRecognition.lang !== language) {
                this.initSpeechRecognition(language)
            }
        }


        componentDidMount() {
            this.initSpeechRecognition(this.props.language)
        }

        render() {
            const {
                onStart, onEnd, onResult, onError,
                ...passThroughProps
            } = this.props;
            const injectedProps = {
                startRecording: this.start,
                stopRecording: this.stop,
                abortRecording: this.abort,
                afterStopDelay: this.afterStopDelay
            };
            const props = Object.assign(
                {},
                passThroughProps,
                injectedProps,
            );

            return <WrappedComponent {...props} />
        }
    }

    WithSpeechRecognition.displayName =
        `withSpeechRecognition(${getComponentDisplayName(WrappedComponent)})`;

    return WithSpeechRecognition;
};

export default withSpeechRecognition;
