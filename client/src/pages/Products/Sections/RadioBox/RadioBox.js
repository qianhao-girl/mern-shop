import React,{ useState } from 'react';
import classes from './RadioBox.module.css';

function RadioBox(props) {

    const [Value, setValue] = useState(0);

    const handleChange = (event) => {
        setValue(event.currentTarget.value);
        props.handleFilterChange(event.currentTarget.value)
    }

    const renderRadioBox = () => props.list && props.list.map((item, index) => 
        (
            <div>
                <input type='radio' name={props.name} id={`${props.name}${index}`}
                    value={index}
                />
                <label htmlFor={`${props.name}${index}`}>{item.label}</label>
            </div>)
    );


    return (
        <div className={classes.RadioBox}
            onChange={handleChange}>
            {renderRadioBox()}
        </div>
    )
}

export default RadioBox;
