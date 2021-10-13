import { Component } from "react";
import {connect} from 'react-redux';
import {fetchStreams}from '../../actions'

class StreamList extends Component{
    componentDidMount(){
        this.props.fetchStreams();
    }

    renderlist(){
        return this.props.streams.map(stream=>{
            return(
                <div className="item" key={stream.id}>
                    <i className="large middle aligned icon camera"/>
                    <div className="content">
                        {stream.title}
                        <div className="description">
                            {stream.description}
                        </div>
                    </div>
                </div>
            )
        })
    }
    render(){
        return <div>
            <h2>Stream</h2>
            <div className="ui celled list">
                {this.renderlist()}
            </div>
        </div>
    }
    
};

const mapStateToProps=(state)=>{
    return{
        streams:Object.values(state.streams),
    }
}

export default connect (mapStateToProps,{fetchStreams})(StreamList);