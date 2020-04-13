import React,{ useEffect, useState} from 'react';
import SingleComment from './_SingleComment';

function ReplyComments(props) {
    const [CommentNum, setCommentNum] = useState(0);
    const [OpenReplyComments, setOpenReplyComments] = useState(false);

    useEffect(() => {//setCommentNum
        let total = props.commentLists.reduce((accu, comment) =>{
            if(comment.replyTo === props.parentCommentId){
                return accu + 1;
            }else{
                return accu;
            }
        }, 0);
        setCommentNum(total);
    },[props.parentCommentId, props.commentLists]);

    const toggleOpenReply = (open) => {
        setOpenReplyComments(!open)
    };

    const renderReplyComments = (parentCommentId) => 
        props.commentLists.map((comment) => (
            <React.Fragment>
                {comment.replyTo === parentCommentId && 
                    <div style={{ width: "80%", marginLeft: "45px"}}>
                        <SingleComment 
                            postId={props.postId}
                            comment={comment}
                            refreshFunction={props.refreshFunction}
                            replyTotal={CommentNum}
                         />
                        <ReplyComments 
                            postId={props.postId}
                            parentCommentId={comment._id}
                            refreshFunction={props.refreshFunction}
                            commentLists={props.commentLists}
                        />
                    </div>
                }
            </React.Fragment>
        ));
    

    return (
        <div>
            {CommentNum > 0 &&
                <p  style={{color:"blue", fontStyle:"bold"}}
                    onClick={() => toggleOpenReply(OpenReplyComments)}>
                    {OpenReplyComments? "hidden replies" : "view replies from others"}                   
                </p>
            }  
            {OpenReplyComments && renderReplyComments(props.parentCommentId)}          
        </div>
    )
}

export default ReplyComments;
