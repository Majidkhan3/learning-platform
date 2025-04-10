import { addOrSubtractDaysFromDate } from '@/utils/date';
import avatar3 from '@/assets/images/users/avatar-3.jpg';
import avatar4 from '@/assets/images/users/avatar-4.jpg';
export const articleData = [{
  title: 'A Comprehensive Guide to Buying Your First Home: Everything You Need to Know from Start to Finish',
  date: addOrSubtractDaysFromDate(50),
  description: 'First, ensure that you have a development environment ready. This typically involves installing the necessary tools and dependencies. We recommend using a reliable framework or platform that supports rapid development.',
  name: 'Jason M. Boone',
  tags: ['Tutorials', 'Blog', 'Homes'],
  image: avatar3
}, {
  title: 'Understanding the Ins and Outs of the Real Estate Market: Key Trends and Predictions for 2023',
  date: addOrSubtractDaysFromDate(250),
  description: "In recent years, interest rates have been a pivotal factor in the real estate market. In 2023, the Federal Reserve's policies will continue to impact mortgage rates. A rise in interest rates can increase borrowing costs, potentially.",
  name: 'Billy J. Woodward',
  tags: ['Tutorials', 'Blog'],
  image: avatar4
}];
export const postData = [{
  link: 'https://www.youtube.com/embed/PrUxWZiQfy4?autohide=0&showinfo=0&controls=0',
  title: 'Home renovations that add value',
  description: 'Renovating your home can be a rewarding endeavor, not only for improving your living space but also for increasing the value of your property',
  name: 'Kelly L. Jones',
  date: addOrSubtractDaysFromDate(45),
  tags: ['Tutorials', 'News']
}, {
  link: 'https://www.youtube.com/embed/D89Dgg32yLk?si=hxvuTzNEzCyfuBN1',
  title: 'Real estate market trends for 2023',
  description: "One of the most significant trends in 2023 is the rise in interest rates. The Federal Reserve's efforts to combat inflation have led to increased mortgage rates.",
  name: 'Tim T. Dame',
  date: addOrSubtractDaysFromDate(145),
  tags: ['Blog', 'News']
}, {
  link: 'https://www.youtube.com/embed/qBpY4MJt6lc?si=LXHNQxR1XHEt_5VT',
  title: 'Buying a fixer-upper: pros and cons ',
  description: 'Fixer-uppers are often priced lower than move-in ready homes, allowing for potential savings and equity-building opportunities.',
  name: 'Manuel B. Barry',
  date: addOrSubtractDaysFromDate(185),
  tags: ['Blog', 'Homes']
}, {
  link: 'https://www.youtube.com/embed/wEw4A7CcSWU?si=BWA7J4IpWkiYvypk',
  title: 'Navigating the mortgage process ',
  description: "Get pre-approved for a mortgage to establish your budget and demonstrate to sellers that you're a serious buyer.",
  name: 'Obdulia J. Gatlin',
  date: addOrSubtractDaysFromDate(385),
  tags: ['Homes', 'News']
}];