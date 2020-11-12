import axios from 'axios';

const baseUrl = process.env.BASE_URL || 'http://localhost:3001';

const signupUser = async (user) => {
  const response = await axios.post(`${baseUrl}/sign-up`, user);
  console.log(response.data);
  return response.data;
};

const signinUser = async (user) => {
  const response = await axios.post(`${baseUrl}/sign-in`, user);
  console.log(response.data);
  return response.data;
};

export default { signupUser, signinUser };
