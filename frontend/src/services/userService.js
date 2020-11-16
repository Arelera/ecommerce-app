import axios from 'axios';

const baseUrl = process.env.BASE_URL || 'http://localhost:3001';

const signupUser = async (user) => {
  const response = await axios.post(`${baseUrl}/sign-up`, user);
  return response.data;
};

const signinUser = async (user) => {
  try {
    const response = await axios.post(`${baseUrl}/sign-in`, user);
    console.log(typeof response.status);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export default { signupUser, signinUser };
