import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import S from './AddProduct.module.scss';
import categories from '../categories';
import cleanForUrl from '../cleanForUrl';
import productService from '../../services/productService';

export default function AddProduct() {
  const history = useHistory();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [images, setImages] = useState();
  const [category, setCategory] = useState();
  const [subcategory, setSubcategory] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const signedUser = useSelector((state) => state.user);
  const subcategories = categories.find((cat) => cat.name === category);

  const handleSubmitProduct = (e) => {
    e.preventDefault();
    const productToSubmit = {
      name,
      description,
      price,
      images,
      creator: signedUser.id,
      category: cleanForUrl(category),
      subcategory: cleanForUrl(subcategory),
    };
    setIsLoading(true);
    productService
      .addProduct(productToSubmit)
      .then((res) => {
        history.push(`/product/${res.id}`);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  return (
    <div className={S.formBox}>
      {signedUser ? (
        <form onSubmit={handleSubmitProduct} className={S.form}>
          <label>
            <p>Product images</p>
            <input
              onChange={(e) => setImages(e.target.files)}
              type="file"
              name="images"
              multiple
              required
            />
          </label>
          <label>
            <p>Product name</p>
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              name="name"
              required
            />
          </label>
          <label>
            <p>Product description</p>
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              name="description"
              required
            ></textarea>
          </label>
          <label>
            <p>Product price $</p>
            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              type="number"
              name="price"
              min="0"
              required
            />
          </label>
          <label>
            <p>Stock</p>
            <input
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              type="number"
              name="stock"
              min="0"
              required
            />
          </label>
          <div className={S.radioGroups}>
            <div className={S.radioGroup}>
              <p>Category</p>
              {categories.map((cat) => (
                <label key={cat.name}>
                  <input
                    type="radio"
                    name="category"
                    value={cat.name}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  />
                  {cat.name}
                </label>
              ))}
            </div>
            {category && (
              <div className={S.radioGroup}>
                <p>Subcategory</p>
                {subcategories.subcategories.map((subcat) => (
                  <label key={subcat}>
                    <input
                      type="radio"
                      name="subcategory"
                      value={subcat}
                      onChange={(e) => setSubcategory(e.target.value)}
                      required
                    />
                    {subcat}
                  </label>
                ))}
              </div>
            )}
          </div>
          <p>{isLoading && 'Loading...'}</p>
          <button type="submit">Add product</button>
        </form>
      ) : (
        <Redirect to="/" />
      )}
    </div>
  );
}
