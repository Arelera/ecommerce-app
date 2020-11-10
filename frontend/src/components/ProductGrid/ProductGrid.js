import ProductCard from './ProductCard/ProductCard';
import './ProductGrid.scss';

export default function ProductGrid({ products }) {
  // useParams and stuff, get the wanted products from DB

  return (
    <div className="productGrid">
      {products.map((prod, i) => (
        <ProductCard className="dog" product={prod} key={i.toString()} />
      ))}
    </div>
  );
}
