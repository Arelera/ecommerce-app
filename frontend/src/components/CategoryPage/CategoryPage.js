import { useParams } from 'react-router-dom';
import ProductGrid from '../ProductGrid/ProductGrid';
import faker from 'faker';
import SubMenu from '../Header/SubMenu';

export default function CategoryPage() {
  const params = useParams();
  // const category = params.category;
  // const subcategory = params.subcategory;
  // search DB by category and subcategory then give those as products

  return (
    <div>
      <SubMenu />
      <ProductGrid products={getFakeProducts(10)} />
    </div>
  );
}

const getFakeProducts = (num) => {
  const prods = [];
  while (prods.length < num) {
    prods.push({
      imgUrl: faker.image.nature(),
      price: faker.commerce.price(),
      name: faker.commerce.productDescription(),
      rating: Math.floor(Math.random() * 5 * 100) / 100,
    });
  }
  return prods;
};
