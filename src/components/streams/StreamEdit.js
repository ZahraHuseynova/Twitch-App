import { connect } from "react-redux";
import { Component } from "react";
import { fetchStream, editStream } from "../../actions";
import StreamForm from "./StreamForm";
class StreamEdit extends Component {
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }

    onSubmit = (formValues) => {
        this.props.editStream(this.props.match.params.id, formValues);
    };

    render() {
        if (this.props.stream) {
            const { title, description } = this.props.stream;
            return (
                <div>
                    <h3>Edit a Stream</h3>
                    <StreamForm
                        onSubmit={this.onSubmit}
                        initialValues={{ title, description }}
                    />
                </div>
            );
        }
        return <div>Loading...</div>;
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        stream: state.streams[ownProps.match.params.id],
    };
};

export default connect(mapStateToProps, { fetchStream, editStream })(
    StreamEdit
);