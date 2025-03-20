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
  [EFoodSpecialty.CHEF_SPECIAL]: (
    <SolarChefHatHeartOutline
      style={{ fontSize: '0.8rem', color: '#FF9800' }}
    />
  ), // Orange
  [EFoodSpecialty.SPICY]: (
    <LucideLabPepperChilli style={{ fontSize: '0.8rem', color: '#D32F2F' }} />
  ), // Red
  [EFoodSpecialty.EXTRA_SPICY]: (
    <GameIconsHotSpices style={{ fontSize: '0.8rem', color: '#B71C1C' }} />
  ), // Dark Red
  [EFoodSpecialty.SWEET]: (
    <GameIconsWrappedSweet style={{ fontSize: '0.8rem', color: '#F48FB1' }} />
  ), // Pink
  [EFoodSpecialty.SOUR]: (
    <IconParkOutlineBabyTaste
      style={{ fontSize: '0.8rem', color: '#FBC02D' }}
    />
  ), // Yellow
  [EFoodSpecialty.BITTER]: (
    <BitterIcon style={{ fontSize: '0.8rem', color: '#6D4C41' }} />
  ), // Dark Brown
  [EFoodSpecialty.CRUNCHY]: (
    <ArcticonsCrunchyroll style={{ fontSize: '0.8rem', color: '#FFB300' }} />
  ), // Golden Yellow
  [EFoodSpecialty.SOFT]: (
    <SoftFoodIcon style={{ fontSize: '0.8rem', color: '#E0E0E0' }} />
  ), // Light Gray
  [EFoodSpecialty.GLUTEN_FREE]: (
    <HealthiconsGlutenFree style={{ fontSize: '0.8rem', color: '#43A047' }} />
  ), // Healthy Green
  [EFoodSpecialty.HIGH_PROTEIN]: (
    <HighProteinIcon style={{ fontSize: '0.8rem', color: '#673AB7' }} />
  ), // Purple
  [EFoodSpecialty.LOW_CARB]: (
    <LowCarbIcon style={{ fontSize: '0.8rem', color: '#388E3C' }} />
  ), // Dark Green
  [EFoodSpecialty.VEGAN_FRIENDLY]: (
    <VeganFriendlyIcon style={{ fontSize: '0.8rem', color: '#2E7D32' }} />
  ), // Deep Green
  [EFoodSpecialty.KETO_FRIENDLY]: (
    <KetoFriendlyIcon style={{ fontSize: '0.8rem', color: '#795548' }} />
  ), // Brown
  [EFoodSpecialty.ORGANIC]: (
    <HugeiconsOrganicFood style={{ fontSize: '0.8rem', color: '#8BC34A' }} />
  ), // Light Green
  [EFoodSpecialty.SEASONAL]: (
    <MaterialSymbolsLightFeaturedSeasonalAndGiftsRounded
      style={{ fontSize: '0.8rem', color: '#FF7043' }}
    />
  ), // Warm Orange
  [EFoodSpecialty.STREET_FOOD]: (
    <StreetFoodIcon style={{ fontSize: '0.8rem', color: '#FF5722' }} />
  ), // Bold Orange-Red
  [EFoodSpecialty.LUXURY]: (
    <FluentPremium20Regular style={{ fontSize: '0.8rem', color: '#FFD700' }} />
  ), // Gold
  [EFoodSpecialty.SIGNATURE_DISH]: (
    <IconParkTwotoneChafingDishOne
      style={{ fontSize: '0.8rem', color: '#9C27B0' }}
    />
  ), // Royal Purple
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
      } flex items-center gap-[5px] rounded-[16px] border-[1px] px-[5px] py-[3px] backdrop-blur-md`}
    >
      {specialtyIcons[tag] ?? null}
      <p className="text-small flex items-center">
        {tag
          .toLowerCase()
          .replace(/_/g, ' ')
          .replace(/\b\w/g, (char) => char.toUpperCase())}
      </p>
    </div>
  );
}
