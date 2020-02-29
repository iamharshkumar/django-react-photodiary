export const URL = "http://127.0.0.1:8000";

const apiURL ='/api';

export const endpoint =`${URL}${apiURL}`;

export const postListURL =`${endpoint}/posts/`;
export const postDetailURL = (id) => `${endpoint}/post/${id}/`;
export const UserIdURL = `${endpoint}/user-id/`;
export const createComment = `${endpoint}/comment/`;
export const profileView = (username) => `${endpoint}/profile/${username}`;
export const userFollow = (username) => `${endpoint}/profile/${username}/follow/`;
export const likes = `${endpoint}/likes/`;
export const updateProfile = (id) => `${endpoint}/profile/${id}/edit/`;
export const userFeed = `${endpoint}/userfeed/`;
