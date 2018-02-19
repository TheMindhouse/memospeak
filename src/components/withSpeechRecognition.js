import React from 'react';
import getComponentDisplayName from '../helpers/getComponentDisplayName';

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

        start = () => {
            if (this.state.speechRecognition !== null) {
                this.state.speechRecognition.start();
            }
        };

        stop = () => {
            if (this.state.speechRecognition !== null) {
                this.state.speechRecognition.stop();
            }
        };

        abort = () => {
            if (this.state.speechRecognition !== null) {
                this.state.speechRecognition.abort();
            }
        };

        onStart = (event) => {
            console.info("[EVENT] speechRecognition onstart", event);
            this.props.onStart && this.props.onStart(event);
        };

        onResult = (event) => {
            // See: https://w3c.github.io/speech-api/webspeechapi.html#speechreco-result
            console.info("[EVENT] speechRecognition onresult", event);
            let transcript = '';

            const resultsList = event.results

            for (let i = 0; i < resultsList.length; i++) {
              const result = resultsList[i]
              if (result.isFinal) {
                transcript = transcript + result[0].transcript
              }
            }

            this.tempTranscript = transcript
            this.props.onResult && this.props.onResult(transcript);
        };

        onEnd = (event) => {
            console.info("[EVENT] speechRecognition onend", event);
            this.props.onEnd && this.props.onEnd(this.tempTranscript);
            this.tempTranscript = ''
        };

        onError = (event) => {
            console.info("[EVENT] speechRecognition onerror", event);
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
