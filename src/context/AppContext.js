import React from 'react';
import createDataContext from './createDataContext';
import {
  getBlogPostsAPI,
  addBlogPostAPI,
  deleteBlogPostAPI,
  modifyBlogPostAPI,
} from '../services/apiBlog';

export const AppContext = React.createContext({});

const fetchData = async () => {
  try {
    return await getBlogPostsAPI();
  } catch (err) {
    console.log('fetchData' + err);
    throw Error();
  }
};

const blogReducer = (state, action) => {
  switch (action.type) {
    case 'get_blogposts':
      // action.payload.map(num => {
      //   return console.log(num);
      // });
      return action.payload;
    case 'add_blogpost':
      return [
        ...state,
        {
          id: Math.floor(Math.random() * 99999),
          title: action.payload.title,
          content: action.payload.content,
        },
      ];
    case 'delete_blogpost':
      return state.filter(blogPost => blogPost.id !== action.payload);
    case 'edit_blogpost':
      return state.map(blogPost => {
        return blogPost.id === action.payload.id ? action.payload : blogPost;
      });
    default:
      return state;
  }
};

const getBlogPosts = dispatch => {
  return async () => {
    try {
      const res = await fetchData();
      var newArray = res.data.map(num => {
        return { id: num._id, title: num.title, content: num.content };
      });
      dispatch({ type: 'get_blogposts', payload: newArray });
      if (res == undefined || res.status !== 200) {
        console.log('Something went wrong!');
        return Error();
      }
    } catch (err) {
      console.log('getBlogposts ', err);
      throw Error();
    }
  };
};

const addBlogPost = dispatch => {
  return async (title, content, callback) => {
    // dispatch({
    //   type: 'add_blogpost',
    //   payload: { title: title, content: content },
    // });
    const res = await addBlogPostAPI(title, content);
    if (res == undefined || res.status !== 200) {
      console.log('Something went wrong!');
    }
    if (callback) {
      callback();
    }
  };
};

const deleteBlogPost = dispatch => {
  return async id => {
    const res = await deleteBlogPostAPI(id);
    if (res == undefined || res.status !== 200) {
      console.log('Something went wrong!');
    } else {
      dispatch({ type: 'delete_blogpost', payload: id });
    }
    // if (callback) {
    //   callback();
    // }
  };
};

const editBlogPost = dispatch => {
  return async (id, title, content, callback) => {
    const res = await modifyBlogPostAPI(id, title, content);
    if (res == undefined || res.status !== 200) {
      console.log('Something went wrong!');
    } else {
      dispatch({
        type: 'edit_blogpost',
        payload: { id, title, content },
      });
    }
    if (callback) {
      callback();
    }
  };
};

export const { Context, Provider } = createDataContext(
  blogReducer,
  { addBlogPost, deleteBlogPost, editBlogPost, getBlogPosts },
  [],
);
