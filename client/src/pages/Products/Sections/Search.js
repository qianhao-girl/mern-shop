import React,{useState} from 'react';
import { FaSearch } from 'react-icons/fa';

function Search(props) {
    const [Value, setValue] = useState("");

    const changeHandle = (event) => {
        setValue(event.currentTarget.value);
        props.report(event.currentTarget.value);
    }

    return (
        <div>
            <input type="text" value={Value} placeholder="Search By Typing..."  onChange={changeHandle} />
            <FaSearch size="30"/>
        </div>
    )
}

export default Search;
