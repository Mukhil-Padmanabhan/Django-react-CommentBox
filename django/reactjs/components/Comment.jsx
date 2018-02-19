import React from "react";


export default class Comment extends React.Component{
  render() {
    return (
      <div className="comment">
        <div>
          <h2 className="commentAuthor">{this.props.author}</h2>
        </div>
        {this.props.children}
      </div>
    );
  }
};