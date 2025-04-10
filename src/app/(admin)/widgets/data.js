import { currency } from '@/context/constants';
export const stateData = [{
  icon: 'solar:asteroid-bold-duotone',
  iconColor: 'info',
  amount: '59.6',
  title: 'Total Sales',
  change: '8.72',
  changeColor: 'success',
  badgeIcon: 'bx:doughnut-chart'
}, {
  icon: 'solar:black-hole-line-duotone',
  iconColor: 'success',
  amount: '24.03',
  title: 'Total Expenses',
  change: '3.28',
  changeColor: 'danger',
  badgeIcon: 'bx:bar-chart-alt-2'
}, {
  icon: 'solar:leaf-bold-duotone',
  iconColor: 'primary',
  amount: '48.7',
  title: 'Investments',
  change: '5.69',
  changeColor: 'danger',
  badgeIcon: 'bx:building-house'
}, {
  icon: 'solar:crown-star-bold-duotone',
  iconColor: 'danger',
  amount: '11.3',
  title: 'Savings',
  change: '10.58',
  changeColor: 'success',
  badgeIcon: 'bx:bowl-hot'
}, {
  icon: 'solar:cpu-bolt-line-duotone',
  iconColor: 'warning',
  amount: '5.5',
  title: 'Profit',
  change: '8.72',
  changeColor: 'success',
  badgeIcon: 'bx:cricket-ball'
}];
export const statisticData = [{
  icon: 'solar:leaf-bold-duotone',
  iconColor: 'primary',
  title: 'Campaign Sent',
  amount: '13, 647',
  change: '2.3',
  changeColor: 'success'
}, {
  icon: 'solar:cpu-bolt-line-duotone',
  iconColor: 'secondary',
  title: 'New Leads',
  amount: '9, 526',
  change: '8.1',
  changeColor: 'success'
}, {
  icon: 'solar:layers-bold-duotone',
  iconColor: 'success',
  title: 'Deals',
  amount: '976',
  change: '0.3',
  changeColor: 'danger'
}, {
  icon: 'solar:shield-bold-duotone',
  iconColor: 'info',
  title: 'Booked Revenue',
  amount: `${currency}123.6k`,
  change: '10.6',
  changeColor: 'danger'
}];
export const scheduleData = [{
  time: '09:00',
  title: 'Setup Github Repository',
  variant: 'primary',
  duration: '09:00 - 10:00'
}, {
  time: '10:00',
  title: 'Design Review - Rasket Admin',
  variant: 'success',
  duration: '10:00 - 10:30'
}, {
  time: '11:00',
  title: 'Meeting with BD Team',
  variant: 'info',
  duration: '11:00 - 12:30'
}, {
  time: '01:00',
  title: 'Meeting with Design Studio',
  variant: 'warning',
  duration: '01:00 - 02:00'
}];