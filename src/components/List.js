import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

class List extends Component {
  render() {
    const { data, postList } = this.props;
    return <button onClick={postList}> test </button>;
  }
}

export default connect(
  state => ({
    data: state.postList
  }),
  dispatch => ({
    postList: () => dispatch({ type: "GET_NEW_POSTS" })
  })
)(withRouter(List));
