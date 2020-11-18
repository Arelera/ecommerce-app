import S from './ProductEditForm.module.scss';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editOne } from '../../reducers/productsReducer';

export default function ProductEditForm({ product, cancelEditing }) {
  const dispatch = useDispatch();
  const [editedProduct, setEditedProduct] = useState(product);

  const handleEditSubmit = (e) => {
    // no preventDefault here
    // refreshing will get the new product nicely
    dispatch(editOne(product.id, editedProduct));
  };

  return (
    <form className={S.editForm} onSubmit={handleEditSubmit}>
      <h2>Edit product</h2>
      <label>
        Name
        <input
          value={editedProduct.name}
          name="name"
          type="text"
          onChange={(e) =>
            setEditedProduct({
              ...editedProduct,
              name: e.target.value,
            })
          }
        />
      </label>
      <label>
        Description
        <textarea
          name="description"
          value={editedProduct.description}
          onChange={(e) =>
            setEditedProduct({
              ...editedProduct,
              description: e.target.value,
            })
          }
        ></textarea>
      </label>
      <div className={S.flex}>
        <label>
          Price
          <input
            value={editedProduct.price}
            type="number"
            min="0"
            onChange={(e) =>
              setEditedProduct({
                ...editedProduct,
                price: e.target.value,
              })
            }
          />
        </label>
        <label>
          Stock
          <input
            value={editedProduct.stock}
            type="number"
            min="0"
            onChange={(e) =>
              setEditedProduct({
                ...editedProduct,
                stock: e.target.value,
              })
            }
          />
        </label>
      </div>
      <button type="submit">Submit</button>
      <button type="button" onClick={cancelEditing}>
        Cancel
      </button>
    </form>
  );
}
