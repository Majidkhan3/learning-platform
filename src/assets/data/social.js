import avatar10 from '@/assets/images/users/avatar-10.jpg';
import { addOrSubtractDaysFromDate, addOrSubtractMinutesFromDate } from '@/utils/date';
import { userData } from './other';
import small1 from '@/assets/images/small/img-4.jpg';
import small2 from '@/assets/images/small/img-6.jpg';
import small3 from '@/assets/images/small/img-7.jpg';
export const messages = [];
export const socialGroupsData = [{
  id: '301',
  groupName: 'General',
  name: 'HG',
  description: 'Good morning everyone !',
  time: addOrSubtractDaysFromDate(50),
  change: 1,
  variant: 'warning'
}, {
  id: '302',
  groupName: 'Project A',
  name: 'Rk',
  description: 'This themes is awesome! ...',
  time: addOrSubtractDaysFromDate(158),
  variant: 'success'
}, {
  id: '303',
  groupName: 'Project B',
  name: 'Susan',
  description: 'Hey...😊',
  time: addOrSubtractDaysFromDate(44),
  variant: 'warning'
}, {
  id: '304',
  groupName: 'Reporting',
  name: 'HK',
  description: 'Good Morning Everyone',
  time: addOrSubtractDaysFromDate(66),
  change: 5,
  variant: 'danger'
}, {
  id: '305',
  groupName: 'Work Reporting',
  name: 'Angela',
  description: 'Today work is...',
  time: addOrSubtractDaysFromDate(78),
  variant: 'success'
}, {
  id: '306',
  groupName: 'Meeting',
  name: 'HR',
  description: 'Next meeting today 10am',
  time: addOrSubtractDaysFromDate(89),
  change: 1,
  variant: 'primary'
}
// {
//   id: '307',
//   groupName: 'General',
//   name: 'HG',
//   description: "Good morning everyone !",
//   time: addOrSubtractDaysFromDate(50),
//   change: 1
// },
// {
//   id: '308',
//   groupName: 'General',
//   name: 'HG',
//   description: "Good morning everyone !",
//   time: addOrSubtractDaysFromDate(50),
//   change: 1
// },
// {
//   id: '309',
//   groupName: 'General',
//   name: 'HG',
//   description: "Good morning everyone !",
//   time: addOrSubtractDaysFromDate(50),
//   change: 1
// },
// {
//   id: '310',
//   groupName: 'General',
//   name: 'HG',
//   description: "Good morning everyone !",
//   time: addOrSubtractDaysFromDate(50),
//   change: 1
// },
];
const defaultTo = {
  id: '112',
  mutualCount: 56,
  name: 'Gilbert Chicoine',
  avatar: avatar10,
  email: 'jamesbridge@teleworm.us',
  message: 'Hey! Okay, thank you for letting me know. See you!',
  time: addOrSubtractMinutesFromDate(650),
  contact: '456 9595 9594',
  location: 'California, USA',
  languages: ['English', 'German', 'Spanish'],
  activityStatus: 'online'
};
for (const user of userData) {
  messages.push({
    id: '101',
    to: defaultTo,
    from: user,
    message: {
      type: 'text',
      value: "Hey Gaston, how's all going?"
    },
    sentOn: addOrSubtractMinutesFromDate(110)
  }, {
    id: '102',
    to: user,
    from: defaultTo,
    message: {
      type: 'text',
      value: 'Yeah, everything good!'
    },
    sentOn: addOrSubtractMinutesFromDate(110)
  }, {
    id: '103',
    to: defaultTo,
    from: user,
    message: {
      type: 'file',
      value: [{
        preview: small1.src
      }, {
        preview: small2.src
      }, {
        preview: small3.src
      }]
    },
    sentOn: addOrSubtractMinutesFromDate(110)
  }, {
    id: '104',
    to: user,
    from: defaultTo,
    message: {
      type: 'text',
      value: 'Okk Nice ! Please Send Zip File'
    },
    sentOn: addOrSubtractMinutesFromDate(110)
  }, {
    id: '105',
    to: defaultTo,
    from: user,
    message: {
      type: 'file',
      value: [{
        name: 'admin- dashboard2024.zip',
        size: 2.3
      }]
    },
    sentOn: addOrSubtractMinutesFromDate(110)
  }, {
    id: '106',
    to: user,
    from: defaultTo,
    message: {
      type: 'text',
      value: 'Okk David , Will update the Designs'
    },
    sentOn: addOrSubtractMinutesFromDate(20)
  }, {
    id: '107',
    to: defaultTo,
    from: user,
    message: {
      type: 'text',
      value: "Thanks, Gaston. I appreciate your support. Overall, I'm optimistic about our team's performance and looking forward to tackling new challenges in the next quarter."
    },
    sentOn: addOrSubtractMinutesFromDate(10)
  });
}
export const emailsData = [{
  id: '2001',
  fromId: '102',
  toId: '101',
  subject: 'Lucas Kriebel (@Daniel J. Olsen) has sent you a direct message on Twitter!',
  content: '@Daniel J. Olsen - Very cool :) Nicklas, You have a new direct message.',
  label: 'Primary',
  createdAt: new Date('11:49 am'),
  read: false,
  starred: false,
  important: true,
  deleted: false
}, {
  id: '2002',
  fromId: '103',
  toId: '101',
  subject: 'Images',
  label: 'Primary',
  attachments: [
    // { preview: postImg1, name: 'Img_201.jpg' },
    // { preview: postImg2, name: 'Img_202.jpg' },
    // { preview: postImg3, name: 'Img_203.jpg' },
    // { preview: postImg4, name: 'Img_204.jpg' },
    // { preview: postImg6, name: 'Img_206.jpg' },
    // { preview: postImg7, name: 'Img_207.jpg' },
  ],
  createdAt: new Date('Feb 21'),
  read: true,
  starred: true,
  important: true,
  deleted: false
}, {
  id: '2003',
  fromId: '104',
  toId: '101',
  subject: 'Train/Bus',
  content: "Yes ok, great! I'm not stuck in Stockholm anymore, we're making progress.",
  label: 'Primary',
  createdAt: new Date('Feb 19'),
  read: true,
  starred: false,
  important: false,
  deleted: false
}, {
  id: '2004',
  fromId: '105',
  toId: '101',
  subject: "This Week's Top Stories",
  content: "Our top pick for you on Medium this week The Man Who Destroyed America's Ego",
  label: 'Primary',
  createdAt: new Date('Feb 28'),
  read: false,
  starred: false,
  important: false,
  deleted: false
}, {
  id: '2005',
  fromId: '106',
  toId: '101',
  label: 'Primary',
  attachments: [{
    name: 'Dashboard.pdf'
  }, {
    name: 'pages-data.pdf'
  }],
  createdAt: new Date('Feb 28'),
  read: true,
  starred: true,
  important: false,
  deleted: false
}, {
  id: '2006',
  fromId: '107',
  toId: '101',
  label: 'Primary',
  attachments: [{
    name: 'doc1.doc'
  }, {
    name: 'doc2.doc'
  }, {
    name: 'doc3.doc'
  }, {
    name: 'doc4.doc'
  }],
  createdAt: new Date('Feb 27'),
  read: true,
  starred: false,
  important: true,
  deleted: false
}, {
  id: '2007',
  fromId: '108',
  toId: '101',
  subject: 'Regarding our meeting',
  content: "That's great, see you on Thursday!",
  label: 'Primary',
  createdAt: new Date('Feb 24'),
  read: false,
  starred: true,
  important: false,
  deleted: false
}, {
  id: '2008',
  fromId: '109',
  toId: '101',
  subject: "Task assigned: Clone ARP's website",
  content: 'You have been assigned a task by Alex@Work on the board Web.',
  label: 'Primary',
  createdAt: new Date('Feb 24'),
  read: false,
  starred: true,
  important: false,
  deleted: false
}, {
  id: '2009',
  fromId: '110',
  toId: '101',
  subject: "Let's go fishing!",
  content: "Hey, You wanna join me and Fred at the lake tomorrow? It'll be awesome.",
  label: 'Primary',
  createdAt: new Date('Feb 23'),
  read: true,
  starred: false,
  important: true,
  deleted: false
}, {
  id: '2010',
  fromId: '111',
  toId: '101',
  subject: 'Hey man',
  content: "Nah man sorry i don't. Should i get it?",
  label: 'Primary',
  createdAt: new Date('Feb 23'),
  read: true,
  starred: true,
  important: true,
  deleted: false
}, {
  id: '2011',
  fromId: '112',
  toId: '101',
  subject: '1 new items in your Stackexchange inbox',
  content: 'The following items were added to your Stack Exchange global inbox since you last checked it.',
  label: 'Primary',
  createdAt: new Date('Feb 21'),
  read: true,
  starred: true,
  important: false,
  deleted: false
}, {
  id: '2012',
  fromId: '102',
  toId: '101',
  subject: 'You can now use your storage in Google Drive',
  content: 'Hey Nicklas Sandell! Thank you for purchasing extra storage space in Google Drive.',
  label: 'Primary',
  createdAt: new Date('Feb 20'),
  read: true,
  starred: true,
  important: false,
  deleted: false
}, {
  id: '2013',
  fromId: '102',
  toId: '101',
  subject: 'Lucas Kriebel (@Daniel J. Olsen) has sent you a direct message on Twitter!',
  content: '@Daniel J. Olsen - Very cool :) Nicklas, You have a new direct message.',
  label: 'Social',
  createdAt: new Date('11:49 am'),
  read: false,
  starred: false,
  important: true,
  deleted: false
}, {
  id: '2014',
  fromId: '103',
  toId: '101',
  subject: 'Images',
  label: 'Promotions',
  attachments: [
    // { preview: postImg1, name: 'Img_201.jpg' },
    // { preview: postImg2, name: 'Img_202.jpg' },
    // { preview: postImg3, name: 'Img_203.jpg' },
    // { preview: postImg4, name: 'Img_204.jpg' },
    // { preview: postImg6, name: 'Img_206.jpg' },
    // { preview: postImg7, name: 'Img_207.jpg' },
  ],
  createdAt: new Date('Feb 21'),
  read: false,
  starred: true,
  important: true,
  deleted: false
}, {
  id: '2015',
  fromId: '104',
  toId: '101',
  subject: 'Train/Bus',
  content: "Yes ok, great! I'm not stuck in Stockholm anymore, we're making progress.",
  label: 'Updates',
  createdAt: new Date('Feb 19'),
  read: false,
  starred: false,
  important: false,
  deleted: false
}, {
  id: '2016',
  fromId: '105',
  toId: '101',
  subject: "This Week's Top Stories",
  content: "Our top pick for you on Medium this week The Man Who Destroyed America's Ego",
  label: 'Forums',
  createdAt: new Date('Feb 28'),
  read: false,
  starred: false,
  important: false,
  deleted: false
}, {
  id: '2017',
  fromId: '106',
  toId: '101',
  label: 'Social',
  attachments: [{
    name: 'Dashboard.pdf'
  }, {
    name: 'pages-data.pdf'
  }],
  createdAt: new Date('Feb 28'),
  read: true,
  starred: true,
  important: false,
  deleted: false
}, {
  id: '2018',
  fromId: '107',
  toId: '101',
  label: 'Promotions',
  attachments: [{
    name: 'doc1.doc'
  }, {
    name: 'doc2.doc'
  }, {
    name: 'doc3.doc'
  }, {
    name: 'doc4.doc'
  }],
  createdAt: new Date('Feb 27'),
  read: false,
  starred: false,
  important: true,
  deleted: false
}, {
  id: '2019',
  fromId: '108',
  toId: '101',
  subject: 'Regarding our meeting',
  content: "That's great, see you on Thursday!",
  label: 'Social',
  createdAt: new Date('Feb 24'),
  read: true,
  starred: true,
  important: false,
  deleted: false
}, {
  id: '2020',
  fromId: '109',
  toId: '101',
  subject: "Task assigned: Clone ARP's website",
  content: 'You have been assigned a task by Alex@Work on the board Web.',
  label: 'Updates',
  createdAt: new Date('Feb 24'),
  read: true,
  starred: true,
  important: false,
  deleted: false
}, {
  id: '2021',
  fromId: '110',
  toId: '101',
  subject: "Let's go fishing!",
  content: "Hey, You wanna join me and Fred at the lake tomorrow? It'll be awesome.",
  label: 'Updates',
  createdAt: new Date('Feb 23'),
  read: true,
  starred: false,
  important: true,
  deleted: false
}, {
  id: '2022',
  fromId: '111',
  toId: '101',
  subject: 'Hey man',
  content: "Nah man sorry i don't. Should i get it?",
  label: 'Forums',
  createdAt: new Date('Feb 23'),
  read: false,
  starred: true,
  important: true,
  deleted: false
}, {
  id: '2023',
  fromId: '112',
  toId: '101',
  subject: '1 new items in your Stackexchange inbox',
  content: 'The following items were added to your Stack Exchange global inbox since you last checked it.',
  label: 'Social',
  createdAt: new Date('Feb 21'),
  read: true,
  starred: true,
  important: false,
  deleted: false
}, {
  id: '2024',
  fromId: '102',
  toId: '101',
  subject: 'You can now use your storage in Google Drive',
  content: 'Hey Nicklas Sandell! Thank you for purchasing extra storage space in Google Drive.',
  label: 'Promotions',
  createdAt: new Date('Feb 20'),
  read: true,
  starred: true,
  important: false,
  deleted: false
}, {
  id: '2025',
  fromId: '103',
  toId: '101',
  subject: 'Hello',
  content: 'Trip home from Colombo has been arranged, then Jenna will come get me from Stockholm. :)',
  label: 'Updates',
  createdAt: new Date('Mar 6'),
  read: true,
  starred: false,
  important: true,
  deleted: false
}, {
  id: '2026',
  fromId: '104',
  toId: '101',
  subject: "Since you asked... and i'm inconceivably bored at the train station",
  content: "Alright thanks. I'll have to re-book that somehow, i'll get back to you.",
  label: 'Forums',
  createdAt: new Date('Mar 6'),
  read: true,
  starred: false,
  important: false,
  deleted: false
}, {
  id: '2027',
  fromId: '101',
  toId: '102',
  subject: 'Lucas Kriebel (@Daniel J. Olsen) has sent you a direct message on Twitter!',
  content: '@Daniel J. Olsen - Very cool :) Nicklas, You have a new direct message.',
  label: 'Social',
  createdAt: new Date('11:49 am'),
  read: true,
  starred: false,
  important: true,
  deleted: false
}, {
  id: '2028',
  fromId: '101',
  toId: '103',
  subject: 'Images',
  label: 'Promotions',
  attachments: [
    // { preview: postImg1, name: 'Img_201.jpg' },
    // { preview: postImg2, name: 'Img_202.jpg' },
    // { preview: postImg3, name: 'Img_203.jpg' },
    // { preview: postImg4, name: 'Img_204.jpg' },
    // { preview: postImg6, name: 'Img_206.jpg' },
    // { preview: postImg7, name: 'Img_207.jpg' },
  ],
  createdAt: new Date('Feb 21'),
  read: true,
  starred: true,
  important: true,
  deleted: false
}, {
  id: '2029',
  fromId: '101',
  toId: '104',
  subject: 'Train/Bus',
  content: "Yes ok, great! I'm not stuck in Stockholm anymore, we're making progress.",
  label: 'Updates',
  createdAt: new Date('Feb 19'),
  read: true,
  starred: false,
  important: false,
  deleted: false
}, {
  id: '2030',
  fromId: '101',
  toId: '105',
  subject: "This Week's Top Stories",
  content: "Our top pick for you on Medium this week The Man Who Destroyed America's Ego",
  label: 'Forums',
  createdAt: new Date('Feb 28'),
  read: true,
  starred: false,
  important: false,
  deleted: false
}, {
  id: '2031',
  fromId: '101',
  toId: '106',
  label: 'Social',
  attachments: [{
    name: 'Dashboard.pdf'
  }, {
    name: 'pages-data.pdf'
  }],
  createdAt: new Date('Feb 28'),
  read: true,
  starred: true,
  important: false,
  deleted: false
}, {
  id: '2032',
  fromId: '109',
  toId: '101',
  subject: "Task assigned: Clone ARP's website",
  content: 'You have been assigned a task by Alex@Work on the board Web.',
  label: 'Updates',
  createdAt: new Date('Feb 24'),
  read: true,
  starred: true,
  important: false,
  deleted: true
}, {
  id: '2033',
  fromId: '110',
  toId: '101',
  subject: "Let's go fishing!",
  content: "Hey, You wanna join me and Fred at the lake tomorrow? It'll be awesome.",
  label: 'Updates',
  createdAt: new Date('Feb 23'),
  read: true,
  starred: false,
  important: true,
  deleted: true
}];