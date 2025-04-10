import { currency } from '@/context/constants';
export const customerData = [{
  title: 'Active Property',
  Property: 350,
  icon: 'solar:home-2-bold',
  count: '231',
  progress: 60,
  variant: 'success'
}, {
  title: 'View Property',
  Property: 231,
  icon: 'solar:home-bold',
  count: '27',
  progress: 20,
  variant: 'warning'
}, {
  title: 'Own Property',
  Property: 27,
  icon: 'solar:money-bag-bold',
  count: `${currency}928,128`,
  progress: 80,
  variant: 'primary'
}];