import React,{ Component } from 'react';

export default class Auth extends Component{
    state = {
        controls:{
            email: {
                elementType: 'input',
                elementConfig:{
                    type: "email",
                    placeholder: "Your Email Address(required)"
                },
                value: "",
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig:{
                    type: "password",
                    placeholder: "Password(required)"
                },
                value: "",
                validation: {
                    required: true,
                    minLength: 8
                },
                valid: false,
                touched: false
            }
        }
    }

    render(){


        return(
            <div>
                <form>

                </form>
            </div>
        )
    }
}