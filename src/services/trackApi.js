import axios from 'axios';

export default axios.create({
    baseURL: 'https://track-server-amber.vercel.app/',
});

//const baseUrl = 'https://track-server-amber.vercel.app/';

// export const getBlogPostsAPI = async () => {
//   try {
//     const res = await axios.get(baseUrl + '/posts');
//     return res;
//   } catch (err) {
//     console.log('getBlogPostsAPI ' + err);
//   }
// };

// export const signUpAPI = async (email, password) => {
//   try {
//     const res = await axios.post(baseUrl + '/signup', {
//       email,
//       password,
//     });
//     return res;
//   } catch (err) {
//     console.log(err);
//   }
// };

// export const modifyBlogPostAPI = async (
//   id: string,
//   title: string,
//   content: string,
// ) => {
//   try {
//     const res = await axios.put(baseUrl + '/posts/' + id, {
//       title,
//       content,
//     });
//     return res;
//   } catch (err) {
//     console.log(err);
//   }
// };

// export const deleteBlogPostAPI = async (id: string) => {
//   try {
//     const res = await axios.delete(baseUrl + '/posts/' + id);
//     return res;
//   } catch (err) {
//     console.log(err);
//   }
// };
