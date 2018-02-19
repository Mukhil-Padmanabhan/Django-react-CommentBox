import React from "react";
import CommentForm from './CommentForm.jsx';
import CommentList from './CommentList.jsx';
import SingleComment from './SingleComment.jsx'
var $ = require ('jquery');

export default class CommentBox extends React.Component{

constructor(props) {
	super(props);
	this.state={
		data:[], 
		pageToLoad: "landingPage",
		url:""
	};
	this.loadCommentsFromServer.bind(this);
	this.handleCommentSubmit.bind(this);
}



commentReply(val) {
	let url = `https://api.mlab.com/api/1/databases/usercomments/collections/comments/${val}?&apiKey=eg_8-g8bqzxOtvMOjRdQ9A1XzOU0JGiK`;
	this.setState({url})
	this.loadCommentsFromServer(url)
	this.setState({pageToLoad:"commentOnOthers"});
	//this.updateComment(url)
}

deletePost(val) {
	let url = `https://api.mlab.com/api/1/databases/usercomments/collections/comments/${val}?&apiKey=eg_8-g8bqzxOtvMOjRdQ9A1XzOU0JGiK`;
	this.setState({url})
	this.deleteComment(url)
	this.setState({pageToLoad:"landingPage"});
}

updateComment(val, url) {
	let keyUrl = url.url;
	this.loadCommentsFromServer(keyUrl);
	var comments = this.state.data || []
	comments.commentedBy = comments.commentedBy ? comments.commentedBy : [];
	comments.commentedBy.push(val);
	console.log("comments", comments);
	$.ajax({
	url: keyUrl,
	dataType: 'json',
	type: 'PUT',
	data: JSON.stringify(comments),
	contentType: "application/json", 
	success: function(data) {
		this.setState({data})
	}.bind(this),
	error: function(xhr, status, err) {
	this.setState({data: comments});
	}.bind(this)
	});
   
}


deleteComment(url) {
	let keyUrl = url.url;
	console.log("keyUrl", keyUrl)
	$.ajax({
	url: keyUrl,
	dataType: 'json',
	type: "DELETE",
	async: true,
	timeout: 300000,
	success: function(data) {
		this.setState({data})
	}.bind(this),
	error: function(xhr, status, err) {
	this.setState({data: comments});
	}.bind(this)
	});  
}


loadCommentsFromServer(fiurl) {
	let that = this;
    $.ajax({
      url: fiurl ? fiurl : this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
      	if(data) {
			this.setState({data})
			return data;
      	}
      }.bind(this),
      error: function(xhr, status, err) {
        //console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }


   handleCommentSubmit(comment, url) {
    var comments = [];
    let urlToHit = 'https://api.mlab.com/api/1/databases/usercomments/collections/comments?apiKey=eg_8-g8bqzxOtvMOjRdQ9A1XzOU0JGiK';
    comment.id = Date.now();
    var newComments = comments.concat([comment]);
    console.log("newComments", newComments);
    //this.setState({data: newComments});
    $.ajax({
      url: urlToHit,
      dataType: 'json',
      type: 'POST',
      data: JSON.stringify(comment),
      contentType: "application/json", 
      success: function(data) {
      	this.setState({data})
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({data: comments});
        //console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }
  
  componentDidMount() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer,   this.props.pollInterval);
  }

  render() {
  	switch(this.state.pageToLoad){
  		case 'landingPage':
  		return (
	       <div className="commentBox">
	        <h1>Comment Box</h1>
	        <CommentList  data={this.state.data} commentReply={this.commentReply.bind(this)} deletePost={this.deletePost.bind(this)}/>
	        <br/>
	        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
	      </div>
   		 );
  		case 'commentOnOthers':
  		return (
	       <div className="commentBox">
	        <h1>Comment Box</h1>
	        <SingleComment  data={this.state.data}/>
	        <br/>
	        <CommentForm updateComment={this.updateComment.bind(this)} url={this.state.url}/>
	      </div>
   		 );
  	} 
  }
};
