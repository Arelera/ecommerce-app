import { useState } from 'react';
import S from './AddProduct.module.scss';

export default function AddProduct() {
  const [price, setPrice] = useState(0);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState();

  const handleSubmitProduct = () => {};
  return (
    <div className={S.formBox}>
      <form onSubmit={handleSubmitProduct} className={S.form}>
        <label>
          <p>Product images</p>
          <input
            onChange={(e) => setImages(e.target.value)}
            type="file"
            multiple
          />
        </label>
        <label>
          <p>Product name</p>
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            name="name"
          />
        </label>
        <label>
          Product description
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            name="description"
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
          />
        </label>
        <button type="submit">Add product</button>
      </form>
    </div>
  );
}
