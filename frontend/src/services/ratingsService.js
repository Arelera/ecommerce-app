import axios from 'axios';

const baseUrl = process.env.BASE_URL || 'http://localhost:3001';

const rateProduct = async (id, rating) => {
  // "rating" should have rating, comment and user
  const response = await axios.post(`${baseUrl}/products/${id}`, rating);
  return response.data;
};

const deleteRating = async (id, token) => {
  const response = await axios.delete(`${baseUrl}/products/ratings/${id}`, {
    headers: { Authorization: token },
  });
  return response.data;
};

const editRating = async (id, rating, token) => {
  const response = await axios.put(
    `${baseUrl}/products/ratings/${id}`,
    rating,
    {
      headers: { Authorization: token },
    }
  );
  return response.data;
};

const ratingsService = {
  rateProduct,
  deleteRating,
  editRating,
};

export default ratingsService;
