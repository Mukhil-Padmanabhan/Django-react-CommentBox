import React from "react"

import CommentBox from "../components/Headline"

var data = [
  {id: 1, author: "Pete Hunt", text: "This is one comment"},
  {id: 2, author: "Jordan Walke", text: "This is *another* comment"}
]

export default class App1Container extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <CommentBox url="https://api.mlab.com/api/1/databases/usercomments/collections/comments?apiKey=eg_8-g8bqzxOtvMOjRdQ9A1XzOU0JGiK" pollInterval={2000}/>
          </div>
        </div>
      </div>
    )
  }
}
