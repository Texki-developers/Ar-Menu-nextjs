import { foodTypeImages, isValidFoodType } from '@/config/config';
import Image from 'next/image';

const FoodTypeImage: React.FC<{ foodType?: string }> = ({ foodType }) => {
  if (!foodType || !isValidFoodType(foodType)) return null;
  return <Image src={foodTypeImages[foodType]} alt={foodType} fill />;
};

export default FoodTypeImage;
