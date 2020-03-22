import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import Input from '../../../../components/utils/Form/Input/Input';
import classes from './NewPasswordPage.module.css';


class NewPasswordPage extends Component {

    constructor(props){
        super(props);
        this.state = {
            controls: {
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
                        comformPassword: true,
                    },
                    valid: false,
                    touched: false,
                    error: null,
                }
    
            },
            formValid: false,
            tokenValid: null,
        }
        
        axios.get(`/api/user/reset/${props.match.params.token}`).then(response => {
            console.log(" response", response);
            return response.data.success  
        }).then(result => this.setState({ tokenValid: result}))
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

        if( rules.comformPassword ){
            let meet = this.state.controls['password'].value === value;
            if(!meet) errors.push(`${controlName} should match the password`);
            isValid = isValid && meet;
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
            console.log("props: in submit,", this.props);
            axios.post('/api/user/new-password',{ resetToken: this.props.match.params.token, 
                newPassword: this.state.controls.password.value })
        };
    }
    
    render(){
        console.log("render newPasswordPage");
        console.log("props: ", this.props);
        if(this.state.tokenValid === false){
            return <Redirect to="/reset"></Redirect>
        };
        if(this.state.tokenValid === null){
            return <p>waiting</p>
        };
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
                <h1>Your new password</h1>
                <form onSubmit={this.submitHandler}>
                    {form}
                    <button>Submit</button>
                </form>
             </div>)  
    }
}


// const mapStateToProps = state => {
//     return {
//         registerd: state.user && state.user.register ? true : false,
//         loginSuccess: state.user.loginSuccess,
//     }
// };



export default NewPasswordPage;


