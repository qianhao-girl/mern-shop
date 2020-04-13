import React,{ useState} from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import SingleComment from './_SingleComment';
import ReplyComments from './ReplyComments';


function Comments(props) {
    const user = useSelector(state => state.user);
    const [Content, setContent] = useState("");

    const onInputChangeHandler = (event) => {
        setContent(event.currentTarget.value);
    };

    const onSubmit = (event) => {
        event.preventDefault();

        const variables = {
            content: Content,
            writer: user.UserData._id,
            postId: props.postId,
        }        
        axios.post('/api/product/saveComment', variables).then(
            response => {
                if(response.data.success){
                    setContent("");
                    props.refreshFunction(response.data.result);
                }else{
                    console.log(response.data.err);
                }
            }
        )
    }

    return (
        <div>
            <h2>replies</h2>
            <hr></hr>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="write your comment"
                    value={Content}
                    onChange={onInputChangeHandler}
                />
                <button 
                    disabled={!user.UserData || !user.UserData._id}
                    onClick={onSubmit}
                >submit</button>
            </form>
            {props.commentLists && props.commentLists.map((comment,index) =>{
                if(comment.replyTo){
                    return null;
                }else{
                    return (
                        <React.Fragment key={"comment"+index}>
                            <SingleComment 
                                comment={comment} postId={props.postId}
                                refreshFunction={props.refreshFunction}
                            />
                            <ReplyComments
                                commentLists={props.commentLists}
                                parentCommentId={comment._id}
                                postId={props.postId}
                                refreshFunction={props.refreshFunction}
                             />
                        </React.Fragment>
                    )
                }
            })}
        </div>
    )
}

export default Comments
