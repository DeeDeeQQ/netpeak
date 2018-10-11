import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import styled from "react-emotion";
import { Link } from "react-router-dom";

class List extends Component {
  componentDidMount() {
    this.props.postList();
  }
  render() {
    const { fetching, data, error } = this.props; //fetching time < 300ms so I skip adding some indication in render
    return (
      <ListDiv>
        {data &&
          data.map(data => (
            <Link to={`/post/${data.id}`} key={data.id}>
              <span>{data.title}</span>
              <p>{data.body}</p>
            </Link>
          ))}
      </ListDiv>
    );
  }
}

export default connect(
  state => ({
    fetching: state.postList.fetching,
    data: state.postList.data,
    error: state.postList.error
  }),
  dispatch => ({
    postList: () => dispatch({ type: "API_CALL_REQUEST_LIST" })
  })
)(withRouter(List));

const ListDiv = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  & > a {
    display: inherit;
    flex-direction: inherit;
    align-items: inherit;
    width: 90%;
    margin: 10px 0 0 0;
    padding: 10px;
    border: 1px solid grey;
    border-radius: 3px;
    text-decoration: none;
    color: black;
    & > span {
      font-weight: 700;
      text-transform: uppercase;
    }
    &:hover {
      border: 1px solid yellow;
    }
  }
`;
