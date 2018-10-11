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
    return <div>{data && console.log(user)}</div>;
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
