/** @format */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addLike } from '../store/actions/posts';

class Comment extends Component {
  handleCommentLike = () => {
    const { comment, user } = this.props;
    this.props.dispatch(addLike(comment._id, 'Comment', user._id));
    console.log('isCommentLiked', comment.likes.length);
  };

  render() {
    const { comment, user } = this.props;
    const isCommentLiked = comment.likes.includes(user._id);

    return (
      <div className="post-comment-item">
        <div className="post-comment-header">
          <span className="post-comment-author">{comment.user.name}</span>
          <span className="post-comment-time">
            {comment.createdAt.slice(11, 16)} mins ago
          </span>

          {/* <button
            className="comment-like no-btn"
            onClick={this.handleCommentLike}>
            {isCommentLiked ? (
              <img
                src="https://image.flaticon.com/icons/svg/1076/1076984.svg"
                alt="like post"
              />
            ) : (
              <img
                src="https://image.flaticon.com/icons/svg/1077/1077035.svg"
                alt="likes-icon"
              />
            )}
          </button>
          <span className="post-comment-likes">
            {comment.likes.length} likes
          </span> */}
          <button
            style={{ cursor: 'pointer' }}
            className="post-like no-btn "
            onClick={this.handleCommentLike}>
            <span className="post-comment-likes">
              {comment.likes.length} likes
            </span>
          </button>
        </div>

        <div className="post-comment-content">{comment.content}</div>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return {
    user: auth.user,
  };
}

export default connect(mapStateToProps)(Comment);
