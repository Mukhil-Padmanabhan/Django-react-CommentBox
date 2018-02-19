
import React from "react";
import Comment from './Comment.jsx'

export default class SingleComment extends React.Component{
constructor(props){
	super(props);
}

  render() {
  	var data = this.props.data;
    return (
      <div className="commentList">
         <Comment author={data.author} key={data.id} >
         {data.text}
         </Comment>
      </div>
    );
  }
}