import _ from "lodash";
import JSONPlaceholder from "../apis/JSONPlaceholder";

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  await dispatch(fetchPosts());
  _.chain(getState().posts)
    .map('userId')
    .uniq()
    .forEach(userId => dispatch(fetchUser(userId)))
    .value(); // note: this value function will execute
}

export const fetchPosts = () => async dispatch => {
  const response = await JSONPlaceholder.get('/posts');
  dispatch({type: "FETCH_POSTS", payload: response.data})
};

export const fetchUser = (userId) => async dispatch => {
  const response = await JSONPlaceholder.get(`/users/${userId}`);
  dispatch({type: "FETCH_USER", payload: response.data});
};

/*
export const fetchUser = (userId) => dispatch => _fetchUser(userId, dispatch)
const _fetchUser = _.memoize(async (userId, dispatch) => {
  const response = await JSONPlaceholder.get(`/users/${userId}`);
  dispatch({type: "FETCH_USER", payload: response.data});
});*/
