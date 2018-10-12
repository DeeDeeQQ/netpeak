import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import styled from "react-emotion";
import { Link } from "react-router-dom";
import SimpleStorage from "react-simple-storage";

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newItem: "",
      list: []
    };
  }

  updateInput(key, value) {
    // update react state
    this.setState({ [key]: value });
  }

  componentDidMount() {
    const id = this.props.match.params.postId;
    this.props.post(id);
  }

  addItem() {
    // create a new item with unique id
    const newItem = {
      id: 1 + Math.random(),
      postId: this.props.match.params.postId,
      value: this.state.newItem.slice()
    };

    // copy current list of items
    const list = [...this.state.list];

    // add the new item to the list
    list.push(newItem);

    // update state with new list, reset the new item input
    this.setState({
      list,
      newItem: ""
    });
  }

  render() {
    const { fetching, data, error } = this.props;
    const { comments, post, user } = { ...data };

    return (
      <WrapperDiv>
        {fetching ? (
          <div>Loading...</div>
        ) : (
          data && (
            <MainPostDiv>
              <Link to="/">Go back</Link>
              <PostDiv>
                <UserInfoDiv>
                  <span>{user.username}</span>
                  <span>{user.email}</span>
                </UserInfoDiv>
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
              {this.state.list &&
                this.state.list.map(
                  comment =>
                    comment.postId === this.props.match.params.postId && (
                      <div>{comment.value}</div>
                    )
                )}
              <div>{console.log(this.state)}</div>
              <SimpleStorage parent={this} />
              <input
                type="text"
                value={this.state.text}
                onChange={e => this.updateInput("newItem", e.target.value)}
              />
              <button
                onClick={() => this.addItem()}
                disabled={!this.state.newItem.length}
              >
                &#43; Add
              </button>
            </MainPostDiv>
          )
        )}
        {error && <p style={{ color: "red" }}>Uh oh - something went wrong!</p>}
      </WrapperDiv>
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

const WrapperDiv = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const MainPostDiv = styled("div")``;

const PostDiv = styled("div")`
  border: 1px solid black;
  & > h2 {
    text-transform: uppercase;
    background-color: #c2c2c2;
    margin-top: 0;
  }
`;

const UserInfoDiv = styled("div")`
  display: flex;
  background-color: #c2c2c2;
  align-self: center;
  justify-content: space-between;
`;

const CommentsDiv = styled("div")`
  border: 1px solid black;
  margin: 10px 0 0 30px;
  & > div {
    display: flex;
    justify-content: space-between;
    background-color: #c2c2c2;
  }
`;
