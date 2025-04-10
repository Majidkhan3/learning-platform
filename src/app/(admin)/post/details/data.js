import avatar4 from '@/assets/images/users/avatar-4.jpg';
import avatar6 from '@/assets/images/users/avatar-6.jpg';
import avatar8 from '@/assets/images/users/avatar-8.jpg';
import small1Img from '@/assets/images/small/img-1.jpg';
import small3Img from '@/assets/images/small/img-3.jpg';
import small4Img from '@/assets/images/small/img-4.jpg';
import { addOrSubtractDaysFromDate } from '@/utils/date';
export const commentsData = [{
  image: avatar8,
  name: 'Tina C. Vaden',
  description: "Wow, I stumbled upon Admin Pulse and I'm blown away! The content is so relevant and insightful, it feels like they're speaking directly to me as an administrative professional.",
  like: 67,
  comment: 34,
  date: addOrSubtractDaysFromDate(12),
  icon: 'solar:chat-square-bold-duotone'
}, {
  image: avatar4,
  name: 'Chas E. Baker',
  description: "I've been following Admin Pulse for a while now, and I have to say, it's become my go-to resource for staying updated on administrative trends.",
  like: 43,
  comment: 6,
  date: addOrSubtractDaysFromDate(245),
  icon: 'solar:chat-square-bold-duotone',
  reply: [{
    image: avatar6,
    name: 'Danial D. Mitzel',
    description: 'From the latest industry news to practical tips and strategies, every article is a gem. Highly recommend giving it a read',
    like: 23,
    comment: 3,
    date: addOrSubtractDaysFromDate(154)
  }]
}];
export const blogData = [{
  image: small1Img,
  title: "Luxury Real Estate Trends: What Defines Today's High-End Properties?",
  date: addOrSubtractDaysFromDate(12)
}, {
  image: small3Img,
  title: 'Home Renovation Mistakes to Avoid: Tips from Real Estate Experts',
  date: addOrSubtractDaysFromDate(152)
}, {
  image: small4Img,
  title: 'The Future of Urban Development: Smart Cities and Real Estate',
  date: addOrSubtractDaysFromDate(512)
}];