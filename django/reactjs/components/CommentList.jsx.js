
import React from "react";
import Comment from './Comment.jsx'

export default class CommentList extends React.Component{
constructor(props){
	super(props);
}

replyHandler(val) {
	this.props.commentReply(val);
}


deleteHandler(val) {
	this.props.deletePost(val);
}

  render() {
  	let that = this;
  	var dataExists = this.props.data || [];
  	var commentNodes = dataExists.map(function(comment, index) {
  	var commentsByOthers  = comment.commentedBy ? comment.commentedBy : []
      return (
        <Comment author={comment.author} key={comment.id} >
          {comment.text}
          <br/>
          Other Comments:
          	{commentsByOthers.map(function(data, id){
          		return(<div><div style={{"marginLeft": "5em"}}><i>{data.author} {data.text}</i></div></div>)
          	})}<br/>
          <span><a onClick={that.replyHandler.bind(that, comment._id.$oid)}>Reply</a></span>{"  		"}        
          <span><a onClick={that.deleteHandler.bind(that, comment._id.$oid)}>Delete</a></span>
          <hr/>
        </Comment>
      );
    });
    return (
      <div className="commentList">
         <hr/>{commentNodes}
      </div>
    );
  }
}