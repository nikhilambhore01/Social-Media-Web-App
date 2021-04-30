/** @format */

import {
  UPDATE_POSTS,
  ADD_POST,
  ADD_COMMENT,
  UPDATE_POST_LIKE,
  ADD_COMMENT_LIKES,
} from "../actions/actionTypes";

export default function posts(state = [], action) {
  switch (action.type) {
    case UPDATE_POSTS:
      return action.posts;

    case ADD_POST:
      return [action.post, ...state];

    case ADD_COMMENT:
      const newPosts = state.map((post) => {
        if (post._id === action.postId) {
          return {
            ...post,
            comments: [action.comment, ...post.comments],
          };
        }
        return post;
      });
      return newPosts;

    case UPDATE_POST_LIKE:
      const updatedPosts = state.map((post) => {
        if (post._id === action.postId) {
          return {
            ...post,
            likes: [...post.likes, action.userId],
          };
        }

        return post;
      });
      return updatedPosts;

    case ADD_COMMENT_LIKES:
      const updatedComment = state.map((comment) => {
        if (comment._id === action.commentId) {
          return {
            ...comment,
            likes: [...comment.likes, action.userId],
            likes: [...likes],
          };
        }

        return comment;
      });
      return updatedComment;

    default:
      return state;
  }
}
