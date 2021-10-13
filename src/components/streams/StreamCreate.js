import { Component } from "react";
import {Field,formValues,reduxForm} from 'redux-form'
import {connect} from 'react-redux'
import {createStream} from '../../actions'

class  StreamCreate extends Component{
    renderError({error, touched}){
        if(error && touched){
            return(
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            );
        }
    }
    renderInput=({input,label,meta})=>{
        const className=`field ${meta.error&& meta.touched?'error':''}`;
        return (
            <div className={className}>
                <label>{label}</label>
                <input {... input}/>
                {this.renderError(meta)}
            </div>
        );
    };

    onSubmit=(formValues)=>{
        this.props.createStream(formValues);
    }
    render(){
        return (
        <form className="ui form" onSubmit={this.props.handleSubmit(this.onSubmit)}>
            <Field name="title" component={this.renderInput} label="Title"/>
            <Field name="description"component={this.renderInput} label="Description"/>
            <button className="ui button primary">Submit</button>
        </form>
        )
    }
};

const validate = (formValue)=>{
    const errors={}
    if(!formValue.title){
        errors.title='You must enter title'
    }
    if(!formValue.description){
        errors.description='You must enter description'
    }
    return errors;
}

const formWrapped = reduxForm ({
    form:'streamCreate',
    validate,
})(StreamCreate);

export default connect(null,{createStream})(formWrapped)