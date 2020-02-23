import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { loginUser } from "../../../store/actions/user_actions";
// import { loginUser } from '../../acions/user_actions';

import classes from './LoginPage.module.css';

class Login extends Component{

    state = {
        email: "",
        password: "",
        errors: []
    }
    //[ ]
    changeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    submitForm = event =>{
        event.preventDefault();
        let dataToSubmit = {
            email: this.state.email,
            password: this.state.password
        };
        if(this.isFormValid(this.state)){
            this.setState({ errors: []});
            this.props.dispatch(loginUser(dataToSubmit))
              .then(response => {
                  if(response.payload.loginSuccess){
                      this.props.history.push('/');
                  }else{
                      this.setState({ 
                          errors: this.state.errors.cancat(
                              response.payload.message
                          )
                      })
                  }
              })
        }else{
            this.setState({
                errors: this.state.errors.concat(
                    "form is not valid"
                )
            });
        }
    } 
    //TODO:
    isFormValid = ({email, password}) =>{
        return email && password;
    }

    // displayErrors = (errors) => {
    //     errors.map((err,index)=> {
    //         <p key={ index }>{ err }</p>
    //     });
    // }

    render(){
        return(
            <div className={classes.formContainer}>
                <div className="form-center">
                    <h1>Login</h1>
                    <form className="login-form">
                        <div className="form-group">
                            <label htmlFor="email">your email(required)</label>
                            <input 
                                type="email" name="email"
                                 id="email" className="form-control"
                                 value={ this.state.email }
                                onChange={ this.changeHandler } />
                            
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">your password(required)</label>
                            <input type="password" name="password" value="password" 
                                className="form-control" id="password"
                                onChange={ this.changeHandler } />
                        </div> 
                        {/* {this.state.errors.length > 0 && (
                            <div className="form-group">s
                                {this.displayErrors(this.state.errors)}
                            </div>
                        )} */}
                        <div className="form-group">
                            <button className="primary-button">submit</button>
                        </div>                     
                    </form>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        user: state.user
    }
};

export default connect(mapStateToProps)(Login);