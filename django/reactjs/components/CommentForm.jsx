import React from "react";
var $ = require ('jquery');

export default class CommentForm extends React.Component{	
constructor(props){
  super(props)
    this.state={
      author:"", 
      text:""
    };
}
  
  handleAuthorChange(e) {
    let value = e.target.value;
    this.setState({author: value });
  }
  
  handleTextChange(e) {
    let comment = e.target.value;
    this.setState({text: comment});
  }
  
  handleSubmit(e) {
    e.preventDefault();
    var author = this.state.author.trim();
    var text = this.state.text.trim();
    var url = this.props.url;
    if (!text || !author) {
      return;
    }
    console.log("urlcheck", url);
    url ? this.props.updateComment({author: author, text: text}, {url: url}) : this.props.onCommentSubmit({author: author, text: text}, {url: url});
    this.setState({author: '', text: ''});
  }
 
 render() {
    return (
     <form className="commentForm" onSubmit={this.handleSubmit.bind(this)}>
        <input type="text" placeholder="Your name" onChange={this.handleAuthorChange.bind(this)} /><br/><br/>
        <input type="text" placeholder="Comment here" onChange={this.handleTextChange.bind(this)} /><br/><br/>
        <div><input type="submit" value="Post"/></div>
      </form>
    );
  }
};