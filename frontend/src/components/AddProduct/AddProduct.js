import { useState } from 'react';
import S from './AddProduct.module.scss';
import categories from '../categories';
import cleanForUrl from '../cleanForUrl';

export default function AddProduct() {
  const [price, setPrice] = useState(0);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState();
  const [category, setCategory] = useState();
  const [subcategory, setSubcategory] = useState();

  const subcategories = categories.find((cat) => cat.name === category);

  const handleSubmitProduct = () => {
    const productToSubmit = {
      name,
      description,
      images,
      category: cleanForUrl(category),
      subcategory: cleanForUrl(subcategory),
    };
  };

  return (
    <div className={S.formBox}>
      <form onSubmit={handleSubmitProduct} className={S.form}>
        <label>
          <p>Product images</p>
          <input
            onChange={(e) => setImages(e.target.value)}
            type="file"
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
          Product description
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

        <button type="submit">Add product</button>
      </form>
    </div>
  );
}
