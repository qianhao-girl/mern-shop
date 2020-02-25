import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { registerUser, loginUser} from '../../../store/actions/index';
import Input from '../../../components/UI/Form/Input/Input';
import classes from './Register.module.css';


class Register extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false,
                error: null,
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6,
                },
                valid: false,
                touched: false,
                error: null,
            },
            comfirm_password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Comfirm your password'
                },
                value: '',
                validation: {
                    required: true,
                    comformEmail: true,
                },
                valid: false,
                touched: false,
                error: null,
            }

        },
        formValid: false,
    }

    checkValidity (controlName, value, rules, errors ) {
        let isValid = true;
        if ( !rules ) {
            return true;
        }

        if ( rules.required ) {
            isValid = isValid && value.trim() !== '';

            let meet = value.trim() !== '';
            if(!meet) errors.push(`${controlName}'s value can not be empty !`);
        }

        if ( rules.minLength ) {
            isValid = isValid && value.length >= rules.minLength;

            let meet = value.length >= rules.minLength;
            if(!meet) errors.push(`the length of ${controlName} must be larger than ${rules.minLength} !`);

        }

        if ( rules.maxLength ) {
            isValid = isValid && value.length <= rules.maxLength;

            let meet = value.length <= rules.maxLength;
            if(!meet) errors.push(`the length of ${controlName} must be smaller than ${rules.maxLength} !`);
        }

        if ( rules.isEmail ) {
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Cheatsheet
            const pattern = /[a-z0-9][a-z0-9-]*(?:\.[a-z0-9-]+)*@(?:[a-z0-9]([a-z0-9-]*\.))+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid =  isValid && pattern.test( value );

            let meet = pattern.test( value );
            if(!meet) errors.push(`emaill address is invalid!`);
        }

        if( rules.comformEmail ){
            // error due to: right now this.state.controls[controlName].value  isn't the newest value,
            //               has not be updated through setState(...)
            //error: let meet = this.state.controls['password'].value
            //          .startsWith(this.state.controls[controlName].value);
            //not enough:
            // let meet = this.state.controls['password'].value.startsWith(value); + TODO: Onsubmit(){....; password===comfire_password}
            let meet = this.state.controls['password'].value === value;

            if(!meet) errors.push(`${controlName} should match the password`);
            isValid = isValid && meet;

        }

        if ( rules.isNumeric ) {
            const pattern = /^\d+$/;
            isValid = isValid && pattern.test( value );

            let meet = pattern.test( value );
            if(!meet) errors.push(`${controlName} should be numeric!`);
        }

        
        return isValid;
    }

    
    inputChangedHandler = ( event, controlName ) => {
        let errors = [];
        //the newest this.state.controls[controlName].value havn't be updated  untill last expression setState,
        //so don't pass any this.state.controls[controlName].value to function this.checkValidity
        let valid = this.checkValidity(controlName,
              event.target.value,
              this.state.controls[controlName].validation, 
              errors);
              console.log(controlName,valid);
        
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: valid,
                touched: true,
                error: errors.length==0? null : errors[0]
            }
        };
       
        this.setState( { controls: updatedControls } );
    }

    submitHandler = (event) => {
        event.preventDefault();
        let isFormInvalid = Object.entries(this.state.controls).map(item => {return item[1].valid}).some((valid) => !valid);
        if(!isFormInvalid){
            this.props.onRegisterDispatch(this.state.controls.email.value, this.state.controls.password.value)
            .then(action =>{
                console.log("onRegisterDispatch ",action.payload.successs)
                return action.payload.success;
            }).then( res => {
                if(res){
                    this.props.onAutoLoginDispatch(this.state.controls.email.value, this.state.controls.password.value)
                    .then(action =>{
                        console.log("onRegisterDispatch ", action.payload.loginSuccess);
                        if(action.payload.loginSuccess) this.props.history.push('/');
                    });
                }
            });
            // console.log("register in state to props:",this.props.registerd); XXXX undefined
            // console.log("registered: ",registered)
            // if(registered){
            //     console.log("registered? ", true);
            //     this.props.onAutoLoginDispatch(this.state.controls.email.value, this.state.controls.password.value)
            //     .then(action =>{
            //         console.log("loginSuccess: ",action.payload.loginSuccess);
            //         if(action.payload.loginSuccess) this.props.history.push('/');
            //     });
            // }
        }
    }

    render(){
        const elemArray = [];
        for(let i in this.state.controls){
            elemArray.push({
                id: i,
                config: this.state.controls[i],
            });
        }

        let form = elemArray.map(formElement => (
            <div key={formElement.id} className={classes.FormControl}>
                <Input
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={( event ) => this.inputChangedHandler( event, formElement.id )} />
                {formElement.config.error? <p style={{color: "red", height:"20px"}}>{formElement.config.error}</p>: null}
            </div>
        ))
        return (
            <div className={classes.FormContainer}>
                <form onSubmit={this.submitHandler}>
                   {form}
                   <button>Submit</button>
                </form>
            </div>
        )
    }
  
}


// const mapStateToProps = state => {
//     return {
//         registerd: state.user && state.user.register ? true : false,
//         loginSuccess: state.user.loginSuccess,
//     }
// };

const mapDispatchToProps = dispatch => {
    return {
        onRegisterDispatch: (email, password) => dispatch(registerUser({email: email, password: password})),
        onAutoLoginDispatch: (email , password) => dispatch(loginUser({email: email, password: password})),
    }
}

export default withRouter(connect(null,mapDispatchToProps)(Register));
// export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Register));

