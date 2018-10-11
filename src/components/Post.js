import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import styled from "react-emotion";
import { Link } from "react-router-dom";

class Post extends Component {
  componentDidMount() {
    const id = this.props.match.params.postId;
    this.props.post(id);
  }
  render() {
    const { fetching, data, error } = this.props;
    const { comments, post, user } = { ...data };

    return (
      <div>
        {fetching ? (
          <div>Loading...</div>
        ) : (
          data && (
            <MainPostDiv>
              <UserInfoDiv>
                <span>{user.username}</span>
                <span>{user.email}</span>
              </UserInfoDiv>
              <PostDiv>
                <h2>{post.title}</h2>
                <p>{post.body}</p>
              </PostDiv>
              {comments.map(comment => (
                <CommentsDiv key={comment.id}>
                  <div>
                    <span>{comment.name}</span>
                    <span>{comment.email}</span>
                  </div>
                  <p>{comment.body}</p>
                </CommentsDiv>
              ))}
            </MainPostDiv>
          )
        )}
        {error && <p style={{ color: "red" }}>Uh oh - something went wrong!</p>}
      </div>
    );
  }
}

export default connect(
  state => ({
    fetching: state.post.fetching,
    data: state.post.data,
    error: state.post.error
  }),
  dispatch => ({
    post: id =>
      dispatch({
        type: "API_CALL_REQUEST_POST",
        payload: id
      })
  })
)(withRouter(Post));

const MainPostDiv = styled("div")``;

const PostDiv = styled("div")``;

const UserInfoDiv = styled("div")``;

const CommentsDiv = styled("div")``;
