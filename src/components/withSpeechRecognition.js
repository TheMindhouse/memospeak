import React from 'react';
import getComponentDisplayName from '../helpers/getComponentDisplayName';

const withSpeechRecognition = (WrappedComponent) => {
    class WithSpeachRecognition extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                speechRecognition: null,
            };
        }

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
            let result = undefined;
            if (
                event.results &&
                event.results.length !== 0 &&
                event.results[0].length !== 0 &&
                event.results[0][0].transcript !== ''
            ) {
                result = event.results[0][0].transcript;
            }
            this.props.onResult && this.props.onResult(result);
        };

        onEnd = (event) => {
            console.info("[EVENT] speechRecognition onend", event);
            this.props.onEnd && this.props.onEnd(event);
        };

        onError = (event) => {
            console.info("[EVENT] speechRecognition onerror", event);
            this.props.onError && this.props.onError(event);
        };

        componentDidMount() {
            const SpeechRecognition =
                window.SpeechRecognition || window.webkitSpeechRecognition;

            if (SpeechRecognition !== undefined) {
                const speechRecognition = new SpeechRecognition();
                speechRecognition.continuous = true;
                speechRecognition.interimResults = false;
                speechRecognition.lang = this.props.language;
                speechRecognition.onstart = this.onStart;
                speechRecognition.onend = this.onEnd;
                speechRecognition.onerror = this.onError;
                speechRecognition.onresult = this.onResult;

                this.setState({ speechRecognition });
            }
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

    WithSpeachRecognition.displayName =
        `withSpeechRecognition(${getComponentDisplayName(WrappedComponent)})`;

    return WithSpeachRecognition;
};

export default withSpeechRecognition;
