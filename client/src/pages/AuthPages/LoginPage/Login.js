import React,{ Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser, auth } from "../../../store/actions/index";
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
        // console.log("reaady to submit form");
        event.preventDefault();
        let dataToSubmit = {
            email: this.state.email,
            password: this.state.password
        };
        if(this.isFormValid(this.state)){
            console.log("this.setState({ errors: []});")
            this.setState({ errors: []});
            this.props.dispatch(loginUser(dataToSubmit))
              .then(response => {
                  if(response.payload.loginSuccess){
                    console.log("push back to homePage by LoginPage");
                    this.props.dispatch(auth());
                    this.props.history.push('/');
                  }else{
                      this.setState(prevState => {
                          let error = response.payload.message;
                          console.log(error);
                          return {...prevState, 
                                errors: prevState.errors.concat([error])}
                      })
                  }
              })
        }else{
            this.setState({
                errors: this.state.errors.push(
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
                <h1>Login</h1>
                <form className={classes.Form} onSubmit={this.submitForm}>
                    <div className={classes.FormControl}>
                        <label htmlFor="email" className={classes.Label}>your email(required)</label>
                        <input 
                            type="email" name="email"
                             id="email" className="form-control"
                             value={ this.state.email }
                            onChange={ this.changeHandler } />
                    </div>
                    <div className={classes.FormControl}>
                        <label htmlFor="password" className={classes.Label}>your password(required)</label>
                        <input type="password" name="password" value={this.state.password} 
                            className="form-control" id="password"
                            onChange={ this.changeHandler } />
                    </div> 
                    <div className={classes.FormControl}>
                        <button className="primary-button">submit</button>
                    </div>                     
                </form>
                <Link to="/reset">forgot your password?</Link>
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