import { nanoid } from 'nanoid';
import axios from 'axios';
import { imagesRef } from '../firebase/storage';

const baseUrl = process.env.BASE_URL || 'http://localhost:3001';

// for product page, so we need it's comments as well
const getById = async (id) => {
  const response = await axios.get(`${baseUrl}/products/${id}`);
  return response.data;
};

const getByCategory = async (category) => {};
const getBySubcategory = async (subcategory) => {};

const addProduct = async (product) => {
  const images = product.images;
  const productToSend = {};

  for (let k in product) {
    // for the images, loop through them and add em to the storage 1 by 1
    if (`${k}` === 'images') {
      const imagesArr = [];
      // put the files up to firebase storage then get their urls
      for (let i = 0; i < images.length; i++) {
        // unique name with nanoid
        const filename = nanoid();
        const fileRef = imagesRef.child(
          `${filename}.${getExt(images[i].name)}`
        );
        await fileRef.put(images[i]);
        const fileUrl = await fileRef.getDownloadURL();

        // save path too for deleting file when needed
        imagesArr.push([fileUrl, `${fileRef.fullPath}`]);
      }

      productToSend['images'] = imagesArr;
    } else {
      productToSend[k] = product[k];
    }
  }
  const response = await axios.post(`${baseUrl}/products`, productToSend);

  return response.data;
};

const rateProduct = async (id, obj) => {
  // obj should have rater user and products id
  const response = await axios.post(`${baseUrl}/products/${id}`, obj);
  return response.data;
};

const getExt = (filename) => filename.split('.').pop();

export default {
  getById,
  getByCategory,
  getBySubcategory,
  addProduct,
  rateProduct,
};
