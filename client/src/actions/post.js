import axios from 'axios'
import {
    GET_POSTS,
    POST_ERROR,
    UPDATE_LIKES,
    DELETE_POST,
    ADD_POST,
    GET_POST,
    ADD_COMMENT,
    REMOVE_COMMENT
}from './types.js'
import { setAlert} from './alert'
//get posts
export const getPosts =()=>async dispatch=>{
    try {
        console.log('getposts try')
        const res = await axios.get('/api/posts')
        console.log('getposts res.data',res.data)
        dispatch({
            type:GET_POSTS,
            payload:res.data
        })
    } catch (err) {
        console.log('getposts err',err)
        dispatch({
            type:POST_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        })
    }
}
export const addLike =id=>async dispatch=>{
    try {
        console.log('addlike try')
        const res = await axios.put(`/api/posts/like/${id}`)
        console.log('addlike res',res)
        dispatch({
            type:UPDATE_LIKES,
            payload:{id,likes:res.data}
        })
    } catch (err) {
        console.log('likes err',err)
        dispatch({
            type:POST_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        })
    }
}
export const removeLike =id=>async dispatch=>{
    try {
        console.log('removelike try')
        const res = await axios.put(`/api/posts/unlike/${id}`)
        console.log('removelike res',res)
        dispatch({
            type:UPDATE_LIKES,
            payload:{id,likes:res.data}
        })
    } catch (err) {
        console.log('likes err',err)
        dispatch({
            type:POST_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        })
    }
}
// delete post
export const deletePost = id => async dispatch=>{
    try{
        console.log('deletepost trying')
        await axios.delete(`/api/posts/${id}`)
        console.log('deletepost id',id)
        dispatch({
            type:DELETE_POST,
            payload:id
        })
        dispatch(setAlert('Post Removed','success'))
    }catch(err){
        console.log('deletepost',err)
        dispatch({
            type:POST_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        })
    }
}
// add post
export const addPost = formData => async dispatch=>{
    const config ={
        headers:{
            'Content-Type':'application/json'
        }
    }
    try{
        console.log('addpost trying')
        const res = await axios.post('/api/posts',formData,config)
        console.log('addpost formdata',formData,'res data',res.data,'res',res)
        dispatch({
            type:ADD_POST,
            payload:res.data
        })
        dispatch(setAlert('Post Created','success'))
    }catch(err){
        console.log('add post',err)
        dispatch({
            type:POST_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        })
    }
}
// get post
export const getPost = id => async dispatch=>{
   
    try{
        console.log('getpost trying')
        const res = await axios.get(`/api/posts/${id}`)
        console.log('getpost res',res)
        dispatch({
            type:GET_POST,
            payload:res.data
        })
       
    }catch(err){
        console.log('getpost',err)
        dispatch({
            type:POST_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        })
    }
}
// add comment
export const addComment =(postId, formData) => async dispatch=>{
    const config ={
        headers:{
            'Content-Type':'application/json'
        }
    }
    try{
        console.log('addcomment trying')
        const res = await axios.post(`/api/posts/comment/${postId}`,formData,config)
        console.log('addcomment formdata',formData,'res data',res.data,'res',res)
        dispatch({
            type:ADD_COMMENT,
            payload:res.data
        })
        dispatch(setAlert('Comment Added','success'))
    }catch(err){
        console.log('add comment',err)
        dispatch({
            type:POST_ERROR,
            payload:{msg:err.response.statusText,status:err.response.status}
        })
    }
}
// delete comments
export const deleteComment = (postId, commentId) => async dispatch => {
    try {
      await axios.delete(`/api/posts/comment/${postId}/${commentId}`);
  
      dispatch({
        type: REMOVE_COMMENT,
        payload: commentId
      });
  
      dispatch(setAlert('Comment Removed', 'success'));
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };