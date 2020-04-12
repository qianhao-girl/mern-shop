import React from 'react'

function _SingleComment(props) {
    return (
        <div>
            {props.comment && props.comment.content}           
        </div>
    )
}

export default _SingleComment
