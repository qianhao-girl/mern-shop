import React,{ useState } from 'react';

function CheckBox(props) {
    const [isChecked, setChecked] = useState([]);

    const changeHandle = (value) => {
        const currentIndex = isChecked.indexOf(value);
        const newChecked = [...isChecked]
        if(currentIndex < 0){
            newChecked.push(value);
        }else{
            newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);
        props.handleFilterChange(newChecked)
    }

    const renderCheckBox = () => props.list && props.list.map((item,index) => 
        <div key={index}>
            <input type='checkbox' 
                checked={isChecked.indexOf(index) > -1 ? true : false} 
                onChange={() => changeHandle(index)}
            />
            <label>{item.label}</label>
        </div>
    )
    return (
        <div>
            {renderCheckBox()}
        </div>
    )
}

export default CheckBox;
