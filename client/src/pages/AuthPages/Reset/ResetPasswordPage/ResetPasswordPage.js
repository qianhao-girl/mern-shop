import React,{ useState} from 'react';
import axios from 'axios';
import classes from './ResetPasswordPage.module.css';


function ResetPasswordPage() {

    const [email, setEmail] = useState("");

    const changeHandler = event => {
        setEmail(event.currentTarget.value);
    }

    const onSubmit = (event) =>{
        event.preventDefault();
        if(!email) alert("Please enter your email!");
        axios.post("/api/user/reset", { email: email}).then(response => {
            console.log(response);
        });
        
    }
    return(
        <div className={classes.formContainer}>
            <h1>Reset your password</h1>
            <form className={classes.Form} onSubmit={onSubmit}>
                <div className={classes.FormControl}>
                    <label htmlFor="email" className={classes.Label}>your email(required)</label>
                    <input 
                        type="email" name="email"
                        id="email" className="form-control"
                        value={email }
                        onChange={ changeHandler } />
                </div>
                <div className={classes.FormControl}>
                    <button>send email</button>
                </div>                     
            </form>
        </div>
    )
}

export default ResetPasswordPage;
