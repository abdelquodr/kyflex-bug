import image from '../assets/images/sample.jpg';
// import Breakfast from '../assets/images/introduction.jpg';
// import Beauty from '../assets/images/introduction_b.jpg';
import Takeout from '../assets/images/introduction_c.jpg';
import Drinks from '../assets/images/main.jpg';
import Beauty from '../assets/images/beauty.jpg';
import Breakfast from '../assets/images/breakfast.jpg';
import HealthyFoods from '../assets/images/healthy-foods.jpg';
import {
  faUsers,
  faHamburger,
  faWallet,
  faCut,
} from '@fortawesome/free-solid-svg-icons';
import { Profile } from '../assets/images';
import Joy from '../assets/images/profile1.png';

const SampleForSearch = [
  {
    id: 1,
    img: image,
    title: 'Football and Cookout',
    host: 'Sylvester Amponsah',
    rating: 4.2,
    totalRating: 100,
    price: 6,
    duration: 0.5,
    url: 'home',
  },
  {
    id: 2,
    img: image,
    title: 'Coding Night',
    host: 'Alistaire Suh',
    rating: 3.3,
    totalRating: 80,
    price: 10,
    duration: 1.5,
    url: 'home',
  },
  {
    id: 3,
    img: image,
    title: 'NBA Jam',
    host: 'Joy Lodra',
    rating: 2.1,
    totalRating: 120,
    price: 5,
    duration: 2.0,
    url: 'home',
  },
  {
    id: 4,
    img: image,
    title: 'KyFlex Hour',
    host: 'Josh Awuah',
    rating: 1.5,
    totalRating: 150,
    price: 15,
    duration: 1.5,
    url: 'home',
  },
  {
    id: 5,
    img: image,
    title: 'Heavy soccer training for kids under 5 years old',
    host: 'Jack Jones',
    rating: 5.0,
    totalRating: 50,
    price: 10,
    duration: 2.5,
    url: 'home',
  },
];

const SampleReviews = [
  {
    id: 1,
    title: 'Sample Review',
    rating: 4.5,
    author: 'Matt Damon',
    body: `Lorem ipsum dolor sit amet,
             consectetur adipiscing elit.
              Donec vel iaculis libero. Sed mi mauris,
               convallis ac elementum nec,
                aliquam id sapien.
                Lorem ipsum dolor sit amet,
                consectetur adipiscing elit.
                 Donec vel iaculis libero. Sed mi mauris,
            `,
    for: SampleForSearch[2].title,
  },
  {
    id: 2,
    title: 'Sample Review',
    rating: 3.5,
    author: 'James Dean',
    body: `Lorem ipsum dolor sit amet,
             consectetur adipiscing elit.
              Donec vel iaculis libero. Sed mi mauris,
               convallis ac elementum nec,
                aliquam id sapien.
                Lorem ipsum dolor sit amet,
                consectetur adipiscing elit.
                 Donec vel iaculis libero. Sed mi mauris,
            `,
    for: SampleForSearch[2].title,
  },
  {
    id: 3,
    title: 'Sample Review',
    rating: 2.5,
    author: 'Richard Fineman',
    body: `Lorem ipsum dolor sit amet,
             consectetur adipiscing elit.
              Donec vel iaculis libero. Sed mi mauris,
               convallis ac elementum nec,
                aliquam id sapien.
                Lorem ipsum dolor sit amet,
                consectetur adipiscing elit.
                 Donec vel iaculis libero. Sed mi mauris,
            `,
    for: SampleForSearch[2].title,
  },
  {
    id: 4,
    title: 'Sample Review',
    rating: 1.5,
    author: 'Al Rinker',
    body: `Lorem ipsum dolor sit amet,
             consectetur adipiscing elit.
              Donec vel iaculis libero. Sed mi mauris,
               convallis ac elementum nec,
                aliquam id sapien.
                Lorem ipsum dolor sit amet,
                consectetur adipiscing elit.
                 Donec vel iaculis libero. Sed mi mauris,
            `,
    for: SampleForSearch[2].title,
  },
  {
    id: 5,
    title: 'Sample Review',
    rating: 0.5,
    author: 'Frank Sinatra',
    body: `Lorem ipsum dolor sit amet,
             consectetur adipiscing elit.
              Donec vel iaculis libero. Sed mi mauris,
               convallis ac elementum nec,
                aliquam id sapien.
                Lorem ipsum dolor sit amet,
                consectetur adipiscing elit.
                 Donec vel iaculis libero. Sed mi mauris,
            `,
    for: SampleForSearch[2].title,
  },
  {
    id: 6,
    title: 'Sample Review',
    rating: 0.5,
    author: 'Nolan Ryan',
    body: `Lorem ipsum dolor sit amet,
             consectetur adipiscing elit.
              Donec vel iaculis libero. Sed mi mauris,
               convallis ac elementum nec,
                aliquam id sapien.
                Lorem ipsum dolor sit amet,
                consectetur adipiscing elit.
                 Donec vel iaculis libero. Sed mi mauris,
            `,
    for: SampleForSearch[2].title,
  },
  {
    id: 7,
    title: 'Sample Review',
    rating: 1.5,
    author: 'Judy Garland',
    body: `Lorem ipsum dolor sit amet,
             consectetur adipiscing elit.
              Donec vel iaculis libero. Sed mi mauris,
               convallis ac elementum nec,
                aliquam id sapien.
                Lorem ipsum dolor sit amet,
                consectetur adipiscing elit.
                 Donec vel iaculis libero. Sed mi mauris,
            `,
    for: SampleForSearch[2].title,
  },
  {
    id: 8,
    title: 'Sample Review',
    rating: 4.5,
    author: 'Dean Martin',
    body: `Lorem ipsum dolor sit amet,
             consectetur adipiscing elit.
              Donec vel iaculis libero. Sed mi mauris,
               convallis ac elementum nec,
                aliquam id sapien.
                Lorem ipsum dolor sit amet,
                consectetur adipiscing elit.
                 Donec vel iaculis libero. Sed mi mauris,
            `,
    for: SampleForSearch[2].title,
  },
  {
    id: 9,
    title: 'Sample Review',
    rating: 3.5,
    author: 'Neil Armstrong',
    body: `Lorem ipsum dolor sit amet,
             consectetur adipiscing elit.
              Donec vel iaculis libero. Sed mi mauris,
               convallis ac elementum nec,
                aliquam id sapien.
                Lorem ipsum dolor sit amet,
                consectetur adipiscing elit.
                 Donec vel iaculis libero. Sed mi mauris,
            `,
    for: SampleForSearch[2].title,
  },
];

const Bookings = [
  {
    id: 1,
    from: 'Matt Damon',
    to: 'John Doe',
    target: 'group Jogging',
    link: SampleForSearch[2].url,
    status: 'Pending...',
  },
  {
    id: 2,
    from: 'Mickey Cohen',
    to: 'John Doe',
    target: 'group Jogging',
    link: SampleForSearch[2].url,
    status: 'Accepted',
  },
  {
    id: 3,
    from: 'James Dean',
    to: 'John Doe',
    target: 'MotorBike Riding',
    link: SampleForSearch[2].url,
    status: 'Declined',
  },
  {
    id: 4,
    from: 'Eva Green',
    to: 'John Doe',
    target: 'French Movie Night',
    link: SampleForSearch[2].url,
    status: 'Pending...',
  },
];

const SampleUserDashboardProfile = {
  name: 'John Smith',
  image: Profile,
  rating: 4.2,
  description: `
            An sports enthusiast. I host fun sports activities.
            I used to play baseball professionally. 
        `,
  account_balance: 120,
  response_rate: 99,
  performance_stat: {
    _1star: 0,
    _2star: 20,
    _3star: 10,
    _4star: 30,
    _5star: 50,
  },
  totalReview: SampleReviews,
  total_transactions: SampleForSearch,
  active_experiences: SampleForSearch.slice(1, 4),
  pending_bookings: Bookings,
  bookings: Bookings,
  _30days_bookings: Bookings,
};

const SampleCategories = [
  {
    id: 1,
    image: Beauty,
    title: 'Beauty',
    description: `
            Lorem ipsum dolor sit amet, consectetur 
            adipiscing elit, sed do eiusmod tempor 
            incididunt ut labore et dolore magna aliqua.
        `,
  },
  {
    id: 2,
    image: Breakfast,
    title: 'Breakfast',
    description: `
            Lorem ipsum dolor sit amet, consectetur 
            adipiscing elit, sed do eiusmod tempor 
            incididunt ut labore et dolore magna aliqua.
        `,
  },
  {
    id: 3,
    image: HealthyFoods,
    title: 'Healthy Foods',
    description: `
            Lorem ipsum dolor sit amet, consectetur 
            adipiscing elit, sed do eiusmod tempor 
            incididunt ut labore et dolore magna aliqua.
        `,
  },
  // {
  //   id: 4,
  //   image: Takeout,
  //   title: 'Takeout',
  //   description: `
  //           Lorem ipsum dolor sit amet,
  //           consectetur adipiscing elit.
  //           Donec vel iaculis libero. Sed mi mauris,
  //           convallis ac elementum nec, aliquam id sapien.
  //       `,
  // },
  // {
  //   id: 5,
  //   image: Takeout,
  //   title: 'Takeout',
  //   description: `
  //           Lorem ipsum dolor sit amet,
  //           consectetur adipiscing elit.
  //           Donec vel iaculis libero. Sed mi mauris,
  //           convallis ac elementum nec, aliquam id sapien.
  //       `,
  // },
  // {
  //   id: 6,
  //   image: Takeout,
  //   title: 'Takeout',
  //   description: `
  //           Lorem ipsum dolor sit amet,
  //           consectetur adipiscing elit.
  //           Donec vel iaculis libero. Sed mi mauris,
  //           convallis ac elementum nec, aliquam id sapien.
  //       `,
  // },
];

const WhatIsKyFlexContents = [
  {
    id: 1,
    icon: faUsers,
    header: 'Community',
    description: `
            KyFlex is a community for beauty and food lovers. 
            Book a haircut, get your nails done, request 
            a cosmetologist all from the comfort of your home. 
            Discover what people around the world are eating 
            and try it yourself.
        `,
  },
  {
    id: 2,
    icon: faWallet,
    header: 'Platform',
    description: `
            Our role as a platform is to intermediate smooth 
            transactions between clients and hosts. Our comprehensive 
            review system ensures that the best experience providers 
            are accessible at the press of a button.
        `,
  },
  {
    id: 3,
    icon: faCut,
    header: 'Beauty',
    description: `
            There is no need to wait in long lines at the barbershop or 
            salons anymore, with our on-demand beauty experience, 
            the service comes to you. Request barbers and hairdressers 
            near you and they will be at your doorstep shortly. 
        `,
  },
  {
    id: 4,
    icon: faHamburger,
    header: 'Food',
    description: `
            Explore the world’s most authentic meals prepared by 
            a local near you. Select the flag of your desired 
            food nationality and let your taste buds run wild.
        `,
  },
];

const SampleExperienceReviews = [
  {
    id: 1,
    image: Joy,
    rating: 4.5,
    reviewNum: 200,
    author: 'Matt Damon',
    body: `Lorem ipsum dolor sit amet,
             consectetur adipiscing elit.
              Donec vel iaculis libero. Sed mi mauris,
               convallis ac elementum nec,
                aliquam id sapien.
            `,
  },
  {
    id: 2,
    image: Joy,
    rating: 3.5,
    reviewNum: 20,
    author: 'James Dean',
    body: `Lorem ipsum dolor sit amet,
             consectetur adipiscing elit.
              Donec vel iaculis libero. Sed mi mauris,
               convallis ac elementum nec,
                aliquam id sapien.
            `,
  },
  {
    id: 3,
    image: Joy,
    rating: 2.5,
    reviewNum: 120,
    author: 'Richard Fineman',
    body: `Lorem ipsum dolor sit amet,
             consectetur adipiscing elit.
              Donec vel iaculis libero. Sed mi mauris,
               convallis ac elementum nec,
                aliquam id sapien.
            `,
  },
  {
    id: 4,
    image: Joy,
    rating: 1.5,
    reviewNum: 2,
    author: 'Al Rinker',
    body: `Lorem ipsum dolor sit amet,
             consectetur adipiscing elit.
              Donec vel iaculis libero. Sed mi mauris,
               convallis ac elementum nec,
                aliquam id sapien.
            `,
  },
  {
    id: 5,
    image: Joy,
    author: 'Frank Sinatra',
    rating: 0.5,
    reviewNum: 17,
    body: `Lorem ipsum dolor sit amet,
             consectetur adipiscing elit.
              Donec vel iaculis libero. Sed mi mauris,
               convallis ac elementum nec,
                aliquam id sapien.
            `,
  },
  {
    id: 6,
    image: Joy,
    author: 'Joy Lodra',
    rating: 3,
    reviewNum: 15,
    body: `Lorem ipsum dolor sit amet,
             consectetur adipiscing elit.
              Donec vel iaculis libero. Sed mi mauris,
               convallis ac elementum nec,
                aliquam id sapien.
            `,
  },
];

export {
  SampleForSearch,
  SampleUserDashboardProfile,
  Bookings,
  SampleReviews,
  SampleCategories,
  WhatIsKyFlexContents,
  SampleExperienceReviews,
};
