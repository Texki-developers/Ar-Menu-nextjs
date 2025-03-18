import React, { JSX } from 'react';
import {
  ArcticonsCrunchyroll,
  BitterIcon,
  FluentPremium20Regular,
  GameIconsHotSpices,
  GameIconsWrappedSweet,
  HealthiconsGlutenFree,
  HighProteinIcon,
  HugeiconsOrganicFood,
  IconParkOutlineBabyTaste,
  IconParkTwotoneChafingDishOne,
  KetoFriendlyIcon,
  LowCarbIcon,
  LucideLabPepperChilli,
  MaterialSymbolsLightFeaturedSeasonalAndGiftsRounded,
  SoftFoodIcon,
  SolarChefHatHeartOutline,
  StreetFoodIcon,
  VeganFriendlyIcon,
} from '../Icons';

// Import other icons as needed

export enum EFoodSpecialty {
  CHEF_SPECIAL = 'CHEF_SPECIAL',
  SPICY = 'SPICY',
  EXTRA_SPICY = 'EXTRA_SPICY',
  SWEET = 'SWEET',
  SOUR = 'SOUR',
  BITTER = 'BITTER',
  CRUNCHY = 'CRUNCHY',
  SOFT = 'SOFT',
  GLUTEN_FREE = 'GLUTEN_FREE',
  HIGH_PROTEIN = 'HIGH_PROTEIN',
  LOW_CARB = 'LOW_CARB',
  VEGAN_FRIENDLY = 'VEGAN_FRIENDLY',
  KETO_FRIENDLY = 'KETO_FRIENDLY',
  ORGANIC = 'ORGANIC',
  SEASONAL = 'SEASONAL',
  STREET_FOOD = 'STREET_FOOD',
  LUXURY = 'LUXURY',
  SIGNATURE_DISH = 'SIGNATURE_DISH',
}

// Map specialties to their respective icons
const specialtyIcons: Record<EFoodSpecialty, JSX.Element> = {
  [EFoodSpecialty.CHEF_SPECIAL]: <SolarChefHatHeartOutline />,
  [EFoodSpecialty.SPICY]: <LucideLabPepperChilli />,
  [EFoodSpecialty.EXTRA_SPICY]: <GameIconsHotSpices />,
  [EFoodSpecialty.SWEET]: <GameIconsWrappedSweet />,
  [EFoodSpecialty.SOUR]: <IconParkOutlineBabyTaste />,
  [EFoodSpecialty.BITTER]: <BitterIcon />,
  [EFoodSpecialty.CRUNCHY]: <ArcticonsCrunchyroll />,
  [EFoodSpecialty.SOFT]: <SoftFoodIcon />,
  [EFoodSpecialty.GLUTEN_FREE]: <HealthiconsGlutenFree />,
  [EFoodSpecialty.HIGH_PROTEIN]: <HighProteinIcon />,
  [EFoodSpecialty.LOW_CARB]: <LowCarbIcon />,
  [EFoodSpecialty.VEGAN_FRIENDLY]: <VeganFriendlyIcon />,
  [EFoodSpecialty.KETO_FRIENDLY]: <KetoFriendlyIcon />,
  [EFoodSpecialty.ORGANIC]: <HugeiconsOrganicFood />,
  [EFoodSpecialty.SEASONAL]: (
    <MaterialSymbolsLightFeaturedSeasonalAndGiftsRounded />
  ),
  [EFoodSpecialty.STREET_FOOD]: <StreetFoodIcon />,
  [EFoodSpecialty.LUXURY]: <FluentPremium20Regular />,
  [EFoodSpecialty.SIGNATURE_DISH]: <IconParkTwotoneChafingDishOne />,
};

export default function SpecialityTag({
  tag,
  variant,
}: {
  tag: EFoodSpecialty;
  variant?: 'dark' | 'light';
}) {
  return (
    <div
      className={`${
        variant === 'dark'
          ? 'border-[rgba(0,0,0,0.12)] text-black'
          : 'border-[rgb(146,118,111)] bg-[rgba(0,0,0,0.24)] text-white'
      } flex gap-[5px] rounded-[16px] border-[2px] p-[5px] backdrop-blur-md`}
    >
      {specialtyIcons[tag] ?? null}
      <p className="text-small flex items-center">{tag.replace('_', ' ')}</p>
    </div>
  );
}
