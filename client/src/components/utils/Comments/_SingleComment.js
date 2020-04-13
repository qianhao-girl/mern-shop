import React,{ useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import {AiOutlineLike, AiOutlineDislike } from 'react-icons/ai';

function _SingleComment(props) {
    const user = useSelector(state => state.user);
    const [CommentValue, setCommentValue] = useState("");
    const [OpenReply, setOpenReply] = useState(false);


    const inputChangeHandler = (event) => {
        setCommentValue(event.currentTarget.value);
    }

    const toggleReplyForm = () => {
        setOpenReply(!OpenReply);
    }

    const onSubmit = (event) => {
        event.preventDefault();

        const variables = {
            writer: user.UserData._id,
            postId: props.postId,
            replyTo: props.comment._id,
            content: CommentValue,
        }

        axios.post('/api/product/saveComment', variables)
        .then(response => {
            console.log("response to save comment request");
            if(response.data.success){
                console.log("comment saved");
                setCommentValue("");
                setOpenReply(false);
                props.refreshFunction(response.data.result);
            }else{
                setCommentValue(response.data.err);
            }
        })
    }


    return (
        <div>
            {props.comment && (
                <>
                    <div style={{color:"red"}}>{props.comment.writer._id}</div>
                    <div>{props.comment.content}</div>
                    <div>
                        <span><AiOutlineLike /></span>
                        <span><AiOutlineDislike /></span>
                        <span onClick={toggleReplyForm}>Reply</span>
                    </div>
                   {OpenReply &&
                        <form onSubmit={ onSubmit }>
                            <input type="text" placeholder="add public reply..." 
                                onChange={inputChangeHandler}
                            />
                            <div>
                                <button onClick={() => setOpenReply(false)}>Cancel</button>
                                <button onClick={onSubmit}>Reply</button>
                            </div>
                        </form>                   
                   }
                </>
             )}           
        </div>
    )
}

export default _SingleComment
