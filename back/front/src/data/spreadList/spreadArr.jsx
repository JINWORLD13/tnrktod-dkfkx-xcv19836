import { useTranslation } from 'react-i18next';
import styles from '../../styles/scss/_SpreadModal.module.scss';
import {
  CelticCrossForModal,
  SixCardsTimesForModal,
  FourCardsForModal,
  SingleCardForModal,
  ThreeCardsForModal,
  ThreeCardsTimeForModal,
  TwoCardsForModal,
  TwoCardsBinaryChoiceForModal,
  ThreeCardsSolutionForModal,
  FiveCardsRelationshipForModal,
  ThreeCardsADayForModal,
  ThreeCardsThreeWayChoiceForModal,
} from '../../page/TarotCardForm/TarotCardTableForm.jsx';
import { Capacitor } from '@capacitor/core';
const isNative = Capacitor.isNativePlatform();
export const spreadArr = () => {
  const { t } = useTranslation();
  return [
    {
      img: <SingleCardForModal className={'spread-modal'} />,
      title: t(`title.single`),
      description: t(`description.single`),
      titleSpeedMode: t(`title.single_speed_mode`),
      descriptionSpeedMode: t(`description.single_speed_mode`),
      count: 1,
      admobAds: 1, 
      spreadListNumber: 100,
      voucherForNormal: (
        <span className={styles['one-card']}>I{t(`unit.kind-of-voucher`)} x 1{t(`unit.ea`)}</span>
      ),
      voucherForDeep: (
        <span className={styles['one-card']}>
          I{t(`unit.kind-of-voucher`)} x 2{t(`unit.ea`)}{' '}
          <span className={styles['center-underline']}>3{t(`unit.ea`)}</span>
        </span>
      ),
      voucherForSerious: true ? (
        <span className={styles['one-card']}>
          I{t(`unit.kind-of-voucher`)} x 4{t(`unit.ea`)}{' '}
          <span className={styles['center-underline']}>5{t(`unit.ea`)}</span>
        </span>
      ) : (
        <span className={styles['one-card']}>I{t(`unit.kind-of-voucher`)} x 5{t(`unit.ea`)}</span>
      ), 
      voucherToPayForNormal: [1, 1],
      voucherToPayForDeep: [1, 2], 
      voucherToPayForSerious: true ? [1, 4] : [1, 5], 
    },
    {
      img: <TwoCardsForModal className={'spread-modal'} />,
      title: t(`title.two`),
      description: t(`description.two`),
      titleSpeedMode: t(`title.two_speed_mode`),
      descriptionSpeedMode: t(`description.two_speed_mode`),
      count: 2,
      admobAds: 1, 
      spreadListNumber: 200,
      voucherForNormal: (
        <span className={styles['two-cards']}>II{t(`unit.kind-of-voucher`)} x 1{t(`unit.ea`)}</span>
      ),
      voucherForDeep: (
        <span className={styles['two-cards']}>
          II{t(`unit.kind-of-voucher`)} x 2{t(`unit.ea`)}{' '}
          <span className={styles['center-underline']}>3{t(`unit.ea`)}</span>
        </span>
      ),
      voucherForSerious: true ? (
        <span className={styles['two-cards']}>
          II{t(`unit.kind-of-voucher`)} x 4{t(`unit.ea`)}{' '}
          <span className={styles['center-underline']}>5{t(`unit.ea`)}</span>
        </span>
      ) : (
        <span className={styles['two-cards']}>II{t(`unit.kind-of-voucher`)} x 5{t(`unit.ea`)}</span>
      ), 
      voucherToPayForNormal: [2, 1],
      voucherToPayForDeep: [2, 2], 
      voucherToPayForSerious: true ? [2, 4] : [2, 5], 
    },
    {
      img: <TwoCardsBinaryChoiceForModal className={'spread-modal'} />,
      title: t(`title.two_choice`),
      description: t(`description.two_choice`),
      titleSpeedMode: t(`title.two_speed_mode`),
      descriptionSpeedMode: t(`description.two_speed_mode`),
      count: 2,
      admobAds: 1, 
      spreadListNumber: 201,
      voucherForNormal: (
        <span className={styles['two-cards']}>II{t(`unit.kind-of-voucher`)} x 1{t(`unit.ea`)}</span>
      ),
      voucherForDeep: (
        <span className={styles['two-cards']}>
          II{t(`unit.kind-of-voucher`)} x 2{t(`unit.ea`)}{' '}
          <span className={styles['center-underline']}>3{t(`unit.ea`)}</span>
        </span>
      ),
      voucherForSerious: true ? (
        <span className={styles['two-cards']}>
          II{t(`unit.kind-of-voucher`)} x 4{t(`unit.ea`)}{' '}
          <span className={styles['center-underline']}>5{t(`unit.ea`)}</span>
        </span>
      ) : (
        <span className={styles['two-cards']}>II{t(`unit.kind-of-voucher`)} x 5{t(`unit.ea`)}</span>
      ), 
      voucherToPayForNormal: [2, 1],
      voucherToPayForDeep: [2, 2], 
      voucherToPayForSerious: true ? [2, 4] : [2, 5], 
    },
    {
      img: <ThreeCardsForModal className={'spread-modal'} />,
      title: t(`title.three`),
      description: t(`description.three`),
      titleSpeedMode: t(`title.three_speed_mode`),
      descriptionSpeedMode: t(`description.three_speed_mode`),
      count: 3,
      admobAds: 1, 
      spreadListNumber: 300,
      voucherForNormal: (
        <span className={styles['three-cards']}>III{t(`unit.kind-of-voucher`)} x 1{t(`unit.ea`)}</span>
      ),
      voucherForDeep: (
        <span className={styles['three-cards']}>
          III{t(`unit.kind-of-voucher`)} x 2{t(`unit.ea`)}{' '}
          <span className={styles['center-underline']}>3{t(`unit.ea`)}</span>
        </span>
      ),
      voucherForSerious: true ? (
        <span className={styles['three-cards']}>
          III{t(`unit.kind-of-voucher`)} x 4{t(`unit.ea`)}{' '}
          <span className={styles['center-underline']}>5{t(`unit.ea`)}</span>
        </span>
      ) : (
        <span className={styles['three-cards']}>III{t(`unit.kind-of-voucher`)} x 5{t(`unit.ea`)}</span>
      ), 
      voucherToPayForNormal: [3, 1],
      voucherToPayForDeep: [3, 2], 
      voucherToPayForSerious: true ? [3, 4] : [3, 5], 
    },
    {
      img: <ThreeCardsTimeForModal className={'spread-modal'} />,
      title: t(`title.three_time`),
      description: t(`description.three_time`),
      titleSpeedMode: t(`title.three_speed_mode`),
      descriptionSpeedMode: t(`description.three_speed_mode`),
      count: 3,
      admobAds: 1, 
      spreadListNumber: 301,
      voucherForNormal: (
        <span className={styles['three-cards']}>III{t(`unit.kind-of-voucher`)} x 1{t(`unit.ea`)}</span>
      ),
      voucherForDeep: (
        <span className={styles['three-cards']}>
          III{t(`unit.kind-of-voucher`)} x 2{t(`unit.ea`)}{' '}
          <span className={styles['center-underline']}>3{t(`unit.ea`)}</span>
        </span>
      ),
      voucherForSerious: true ? (
        <span className={styles['three-cards']}>
          III{t(`unit.kind-of-voucher`)} x 4{t(`unit.ea`)}{' '}
          <span className={styles['center-underline']}>5{t(`unit.ea`)}</span>
        </span>
      ) : (
        <span className={styles['three-cards']}>III{t(`unit.kind-of-voucher`)} x 5{t(`unit.ea`)}</span>
      ), 
      voucherToPayForNormal: [3, 1],
      voucherToPayForDeep: [3, 2], 
      voucherToPayForSerious: true ? [3, 4] : [3, 5], 
    },
    {
      img: <ThreeCardsSolutionForModal className={'spread-modal'} />,
      title: t(`title.three_solution`),
      description: t(`description.three_solution`),
      titleSpeedMode: t(`title.three_speed_mode`),
      descriptionSpeedMode: t(`description.three_speed_mode`),
      count: 3,
      admobAds: 1, 
      spreadListNumber: 302,
      voucherForNormal: (
        <span className={styles['three-cards']}>III{t(`unit.kind-of-voucher`)} x 1{t(`unit.ea`)}</span>
      ),
      voucherForDeep: (
        <span className={styles['three-cards']}>
          III{t(`unit.kind-of-voucher`)} x 2{t(`unit.ea`)}{' '}
          <span className={styles['center-underline']}>3{t(`unit.ea`)}</span>
        </span>
      ),
      voucherForSerious: true ? (
        <span className={styles['three-cards']}>
          III{t(`unit.kind-of-voucher`)} x 4{t(`unit.ea`)}{' '}
          <span className={styles['center-underline']}>5{t(`unit.ea`)}</span>
        </span>
      ) : (
        <span className={styles['three-cards']}>III{t(`unit.kind-of-voucher`)} x 5{t(`unit.ea`)}</span>
      ), 
      voucherToPayForNormal: [3, 1],
      voucherToPayForDeep: [3, 2], 
      voucherToPayForSerious: true ? [3, 4] : [3, 5], 
    },
    {
      img: <ThreeCardsADayForModal className={'spread-modal'} />,
      title: t(`title.three_a_day`),
      description: t(`description.three_a_day`),
      titleSpeedMode: t(`title.three_speed_mode`),
      descriptionSpeedMode: t(`description.three_speed_mode`),
      count: 3,
      admobAds: 1, 
      spreadListNumber: 303,
      voucherForNormal: (
        <span className={styles['three-cards']}>III{t(`unit.kind-of-voucher`)} x 1{t(`unit.ea`)}</span>
      ),
      voucherForDeep: (
        <span className={styles['three-cards']}>
          III{t(`unit.kind-of-voucher`)} x 2{t(`unit.ea`)}{' '}
          <span className={styles['center-underline']}>3{t(`unit.ea`)}</span>
        </span>
      ),
      voucherForSerious: true ? (
        <span className={styles['three-cards']}>
          III{t(`unit.kind-of-voucher`)} x 4{t(`unit.ea`)}{' '}
          <span className={styles['center-underline']}>5{t(`unit.ea`)}</span>
        </span>
      ) : (
        <span className={styles['three-cards']}>III{t(`unit.kind-of-voucher`)} x 5{t(`unit.ea`)}</span>
      ), 
      voucherToPayForNormal: [3, 1],
      voucherToPayForDeep: [3, 2], 
      voucherToPayForSerious: true ? [3, 4] : [3, 5], 
    },
    {
      img: <ThreeCardsThreeWayChoiceForModal className={'spread-modal'} />,
      title: t(`title.three_choice`),
      description: t(`description.three_choice`),
      titleSpeedMode: t(`title.three_speed_mode`),
      descriptionSpeedMode: t(`description.three_speed_mode`),
      count: 3,
      admobAds: 1, 
      spreadListNumber: 304,
      voucherForNormal: (
        <span className={styles['three-cards']}>III{t(`unit.kind-of-voucher`)} x 1{t(`unit.ea`)}</span>
      ),
      voucherForDeep: (
        <span className={styles['three-cards']}>
          III{t(`unit.kind-of-voucher`)} x 2{t(`unit.ea`)}{' '}
          <span className={styles['center-underline']}>3{t(`unit.ea`)}</span>
        </span>
      ),
      voucherForSerious: true ? (
        <span className={styles['three-cards']}>
          III{t(`unit.kind-of-voucher`)} x 4{t(`unit.ea`)}{' '}
          <span className={styles['center-underline']}>5{t(`unit.ea`)}</span>
        </span>
      ) : (
        <span className={styles['three-cards']}>III{t(`unit.kind-of-voucher`)} x 5{t(`unit.ea`)}</span>
      ), 
      voucherToPayForNormal: [3, 1],
      voucherToPayForDeep: [3, 2], 
      voucherToPayForSerious: true ? [3, 4] : [3, 5], 
    },
    {
      img: <FourCardsForModal className={'spread-modal'} />,
      title: t(`title.four`),
      description: t(`description.four`),
      titleSpeedMode: t(`title.four_speed_mode`),
      descriptionSpeedMode: t(`description.four_speed_mode`),
      count: 4,
      admobAds: 1, 
      spreadListNumber: 400,
      voucherForNormal: (
        <span className={styles['four-cards']}>IV{t(`unit.kind-of-voucher`)} x 1{t(`unit.ea`)}</span>
      ),
      voucherForDeep: (
        <span className={styles['four-cards']}>
          IV{t(`unit.kind-of-voucher`)} x 2{t(`unit.ea`)}{' '}
          <span className={styles['center-underline']}>3{t(`unit.ea`)}</span>
        </span>
      ),
      voucherForSerious: true ? (
        <span className={styles['four-cards']}>
          IV{t(`unit.kind-of-voucher`)} x 4{t(`unit.ea`)}{' '}
          <span className={styles['center-underline']}>5{t(`unit.ea`)}</span>
        </span>
      ) : (
        <span className={styles['four-cards']}>IV{t(`unit.kind-of-voucher`)} x 5{t(`unit.ea`)}</span>
      ), 
      voucherToPayForNormal: [4, 1],
      voucherToPayForDeep: [4, 2], 
      voucherToPayForSerious: true ? [4, 4] : [4, 5], 
    },
    {
      img: <FiveCardsRelationshipForModal className={'spread-modal'} />,
      title: t(`title.five_relationship`),
      description: t(`description.five_relationship`),
      titleSpeedMode: t(`title.five_relationship_speed_mode`),
      descriptionSpeedMode: t(`description.five_relationship_speed_mode`),
      count: 5,
      admobAds: 1, 
      spreadListNumber: 501,
      voucherForNormal: (
        <span className={styles['five-cards']}>V{t(`unit.kind-of-voucher`)} x 1{t(`unit.ea`)}</span>
      ),
      voucherForDeep: (
        <span className={styles['five-cards']}>
          V{t(`unit.kind-of-voucher`)} x 2{t(`unit.ea`)}{' '}
          <span className={styles['center-underline']}>3{t(`unit.ea`)}</span>
        </span>
      ),
      voucherForSerious: true ? (
        <span className={styles['five-cards']}>
          V{t(`unit.kind-of-voucher`)} x 4{t(`unit.ea`)}{' '}
          <span className={styles['center-underline']}>5{t(`unit.ea`)}</span>
        </span>
      ) : (
        <span className={styles['five-cards']}>V{t(`unit.kind-of-voucher`)} x 5{t(`unit.ea`)}</span>
      ), 
      voucherToPayForNormal: [5, 1],
      voucherToPayForDeep: [5, 2], 
      voucherToPayForSerious: true ? [5, 4] : [5, 5], 
    },
    {
      img: <SixCardsTimesForModal className={'spread-modal'} />,
      title: t(`title.six-day`),
      description: t(`description.six-day`),
      titleSpeedMode: t(`title.six_speed_mode`),
      descriptionSpeedMode: t(`description.six_speed_mode`),
      count: 6,
      admobAds: 1, 
      spreadListNumber: 600,
      voucherForNormal: (
        <span className={styles['six-cards']}>VI{t(`unit.kind-of-voucher`)} x 1{t(`unit.ea`)}</span>
      ),
      voucherForDeep: (
        <span className={styles['six-cards']}>
          VI{t(`unit.kind-of-voucher`)} x 2{t(`unit.ea`)}{' '}
          <span className={styles['center-underline']}>3{t(`unit.ea`)}</span>
        </span>
      ),
      voucherForSerious: true ? (
        <span className={styles['six-cards']}>
          VI{t(`unit.kind-of-voucher`)} x 4{t('unit.ea')}{' '}
          <span className={styles['center-underline']}>5{t('unit.ea')}</span>
        </span>
      ) : (
        <span className={styles['six-cards']}>VI{t(`unit.kind-of-voucher`)} x 5{t('unit.ea')}</span>
      ), 
      voucherToPayForNormal: [6, 1],
      voucherToPayForDeep: [6, 2], 
      voucherToPayForSerious: true ? [6, 4] : [6, 5], 
    },
    {
      img: <SixCardsTimesForModal className={'spread-modal'} />,
      title: t(`title.six-week`),
      description: t(`description.six-week`),
      titleSpeedMode: t(`title.six_speed_mode`),
      descriptionSpeedMode: t(`description.six_speed_mode`),
      count: 6,
      admobAds: 1, 
      spreadListNumber: 601,
      voucherForNormal: (
        <span className={styles['six-cards']}>VI{t(`unit.kind-of-voucher`)} x 1{t(`unit.ea`)}</span>
      ),
      voucherForDeep: (
        <span className={styles['six-cards']}>
          VI{t(`unit.kind-of-voucher`)} x 2{t(`unit.ea`)}{' '}
          <span className={styles['center-underline']}>3{t(`unit.ea`)}</span>
        </span>
      ),
      voucherForSerious: true ? (
        <span className={styles['six-cards']}>
          VI{t(`unit.kind-of-voucher`)} x 4{t('unit.ea')}{' '}
          <span className={styles['center-underline']}>5{t('unit.ea')}</span>
        </span>
      ) : (
        <span className={styles['six-cards']}>VI{t(`unit.kind-of-voucher`)} x 5{t('unit.ea')}</span>
      ), 
      voucherToPayForNormal: [6, 1],
      voucherToPayForDeep: [6, 2], 
      voucherToPayForSerious: true ? [6, 4] : [6, 5], 
    },
    {
      img: <SixCardsTimesForModal className={'spread-modal'} />,
      title: t(`title.six-month`),
      description: t(`description.six-month`),
      titleSpeedMode: t(`title.six_speed_mode`),
      descriptionSpeedMode: t(`description.six_speed_mode`),
      count: 6,
      admobAds: 1, 
      spreadListNumber: 602,
      voucherForNormal: (
        <span className={styles['six-cards']}>VI{t(`unit.kind-of-voucher`)} x 1{t(`unit.ea`)}</span>
      ),
      voucherForDeep: (
        <span className={styles['six-cards']}>
          VI{t(`unit.kind-of-voucher`)} x 2{t(`unit.ea`)}{' '}
          <span className={styles['center-underline']}>3{t(`unit.ea`)}</span>
        </span>
      ),
      voucherForSerious: true ? (
        <span className={styles['six-cards']}>
          VI{t(`unit.kind-of-voucher`)} x 4{t('unit.ea')}{' '}
          <span className={styles['center-underline']}>5{t('unit.ea')}</span>
        </span>
      ) : (
        <span className={styles['six-cards']}>VI{t(`unit.kind-of-voucher`)} x 5{t('unit.ea')}</span>
      ), 
      voucherToPayForNormal: [6, 1],
      voucherToPayForDeep: [6, 2], 
      voucherToPayForSerious: true ? [6, 4] : [6, 5], 
    },
    {
      img: <CelticCrossForModal className={'spread-modal'} />,
      title: t(`title.celtic_cross`),
      description: t(`description.celtic_cross`),
      titleSpeedMode: t(`title.celtic_cross_speed_mode`),
      descriptionSpeedMode: t(`description.celtic_cross_speed_mode`),
      count: 10,
      admobAds: 1, 
      spreadListNumber: 1000,
      voucherForNormal: (
        <span className={styles['ten-cards']}>X{t(`unit.kind-of-voucher`)} x 1{t(`unit.ea`)}</span>
      ),
      voucherForDeep: (
        <span className={styles['ten-cards']}>
          X{t(`unit.kind-of-voucher`)} x 2{t(`unit.ea`)}{' '}
          <span className={styles['center-underline']}>3{t(`unit.ea`)}</span>
        </span>
      ),
      voucherForSerious: true ? (
        <span className={styles['ten-cards']}>
          X{t(`unit.kind-of-voucher`)} x 4{t(`unit.ea`)}{' '}
          <span className={styles['center-underline']}>5{t(`unit.ea`)}</span>
        </span>
      ) : (
        <span className={styles['ten-cards']}>X{t(`unit.kind-of-voucher`)} x 5{t(`unit.ea`)}</span>
      ), 
      voucherToPayForNormal: [10, 1],
      voucherToPayForDeep: [10, 2], 
      voucherToPayForSerious: true ? [10, 4] : [10, 5], 
    },
  ];
};
export const spreadArrForPoint = () => {
  const { t } = useTranslation();
  const priceOnSale = (originalPointPrice, salePercentage) => {
    const result = originalPointPrice * (1 - salePercentage * 0.01);
    return result;
  };
  return [
    {
      img: <SingleCardForModal className={'spread-modal'} />,
      title: t(`title.single`),
      description: t(`description.single`),
      count: 1,
      admobAds: 1, 
      spreadListNumber: 100,
      originalPointPriceForNormal: 20,
      salePercentageForNormal: 50,
      listPointPriceForNormal: Math.ceil(priceOnSale(20, 50)),
      originalPointPriceForDeep: 50,
      salePercentageForDeep: 50,
      listPointPriceForDeep: Math.ceil(priceOnSale(50, 50)),
      originalPointPriceForSerious: 100,
      salePercentageForSerious: 50,
      listPointPriceForSerious: Math.ceil(priceOnSale(100, 50)),
    },
    {
      img: <TwoCardsForModal className={'spread-modal'} />,
      title: t(`title.two`),
      description: t(`description.two`),
      count: 2,
      admobAds: 1, 
      spreadListNumber: 200,
      originalPointPriceForNormal: 30,
      salePercentageForNormal: 60,
      listPointPriceForNormal: Math.ceil(priceOnSale(30, 60)),
      originalPointPriceForDeep: 70,
      salePercentageForDeep: 60,
      listPointPriceForDeep: Math.ceil(priceOnSale(70, 60)),
      originalPointPriceForSerious: 140,
      salePercentageForSerious: 60,
      listPointPriceForSerious: Math.ceil(priceOnSale(140, 60)),
    },
    {
      img: <ThreeCardsForModal className={'spread-modal'} />,
      title: t(`title.three`),
      description: t(`description.three`),
      count: 3,
      admobAds: 1, 
      spreadListNumber: 300,
      originalPointPriceForNormal: 40,
      salePercentageForNormal: 60,
      listPointPriceForNormal: Math.ceil(priceOnSale(40, 60)),
      originalPointPriceForDeep: 80,
      salePercentageForDeep: 60,
      listPointPriceForDeep: Math.ceil(priceOnSale(80, 60)),
      originalPointPriceForSerious: 160,
      salePercentageForSerious: 60,
      listPointPriceForSerious: Math.ceil(priceOnSale(160, 60)),
    },
    {
      img: <ThreeCardsTimeForModal className={'spread-modal'} />,
      title: t(`title.three_time`),
      description: t(`description.three_time`),
      count: 3,
      admobAds: 1, 
      spreadListNumber: 301,
      originalPointPriceForNormal: 40,
      salePercentageForNormal: 60,
      listPointPriceForNormal: Math.ceil(priceOnSale(40, 60)),
      originalPointPriceForDeep: 80,
      salePercentageForDeep: 60,
      listPointPriceForDeep: Math.ceil(priceOnSale(80, 60)),
      originalPointPriceForSerious: 160,
      salePercentageForSerious: 60,
      listPointPriceForSerious: Math.ceil(priceOnSale(160, 60)),
    },
    {
      img: <FourCardsForModal className={'spread-modal'} />,
      title: t(`title.four`),
      description: t(`description.four`),
      count: 4,
      admobAds: 1, 
      spreadListNumber: 400,
      originalPointPriceForNormal: 50,
      salePercentageForNormal: 60,
      listPointPriceForNormal: Math.ceil(priceOnSale(50, 60)),
      originalPointPriceForDeep: 100,
      salePercentageForDeep: 60,
      listPointPriceForDeep: Math.ceil(priceOnSale(100, 60)),
      originalPointPriceForSerious: 200,
      salePercentageForSerious: 60,
      listPointPriceForSerious: Math.ceil(priceOnSale(200, 60)),
    },
    {
      img: <CelticCrossForModal className={'spread-modal'} />,
      title: t(`title.celtic_cross`),
      description: t(`description.celtic_cross`),
      count: 10,
      admobAds: 1, 
      spreadListNumber: 1000,
      originalPointPriceForNormal: 100,
      salePercentageForNormal: 70,
      listPointPriceForNormal: Math.ceil(priceOnSale(100, 70)),
      originalPointPriceForDeep: 200,
      salePercentageForDeep: 70,
      listPointPriceForDeep: Math.ceil(priceOnSale(200, 70)),
      originalPointPriceForSerious: 400,
      salePercentageForSerious: 70,
      listPointPriceForSerious: Math.ceil(priceOnSale(400, 70)),
    },
  ];
};
