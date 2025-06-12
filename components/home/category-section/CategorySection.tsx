import FoodCard from '../card/FoodCard';
import { CategorizedType } from '@/types/home/product.types';

interface Props {
    category: CategorizedType;
}

const CategorySection = ({ category }: Props) => {
    if (!category || !category.products || category.products.length === 0) {
        return null;
    }
    return (
        <div key={category.category._id} className="mb-4">
            <h2 className="text-primary pb-2">{category.category.name}</h2>
            {category.products.map((item) => (
                <FoodCard key={item._id} items={item} />
            ))}
        </div>
    );
};

export default CategorySection;
