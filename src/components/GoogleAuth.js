import { Component } from 'react';
import {connect} from 'react-redux'
import {signIn,signOut} from '../actions';


class GoogleAuth extends Component  {
    
    componentDidMount(){
        window.gapi.load('auth2',()=>{
            window.gapi.auth2.init({
                clientId:'246384755010-d24p86nus48rshv7339fbdbecqhadpf3.apps.googleusercontent.com',
                scope:'email',
            }).then(()=>{
                this.auth=window.gapi.auth2.getAuthInstance();

                this.onAuthChange(this.auth.isSignedIn.get());

                this.auth.isSignedIn.listen(()=>this.onAuthChange(this.auth.isSignedIn.get()))
            });
        });
    };

    onSignInClick = ()=>{
        this.auth.signIn();
    };
    
    onSignOutClick = ()=>{
        this.auth.signOut();
    };

    onAuthChange=(isSignedIn)=>{
        if (isSignedIn){
            this.props.signIn(this.auth.currentUser.get().getId());
        }else {
            this.props.signOut()
        }
    };



    renderAuthButtons=()=>{
        if (this.props.isSignedIn === null){
            return null;
        } else if (this.props.isSignedIn){
            return(
                <button className="ui red google button" onClick={this.onSignOutClick}>
                    <i className="google icon"/>
                    Sign Out
                </button>
            );
        } else {
            return(
                <button className="ui blue google button" onClick={this.onSignInClick}>
                    <i className="google icon"/>
                    Sign In
                </button>
            );
        }
    };
    render() {
        return <div>{this.renderAuthButtons()}</div>
    }
};

const mapStateToProps = (state)=>{
    return {isSignedIn:state.auth.isSignedIn}
}

export default connect(mapStateToProps,{signIn,signOut})(GoogleAuth);