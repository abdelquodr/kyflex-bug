import first from './introduction.jpg';
import third from './introduction_b.jpg';
import fourth from './introduction_c.jpg';
import signInUpPhoto1 from './register_signin1.jpg';
import signInUpPhoto2 from './register_signin2.jpg';
import signInUpPhoto3 from './register_signin3.jpg';
import signInUpPhoto4 from './register_signin4.jpg';
import Profile from './profile.png';
import SampleActivity from './sample.jpg';
import Sylvester from './Sylvester.jpg';

const IntroAlbum = [first, third, fourth];

const Register_signInCarousel = [
  {
    id: 1,
    image: signInUpPhoto4,
    title: 'Search your Favorite Experience',
    color: '#000000',
  },
  {
    id: 2,
    image: signInUpPhoto2,
    title: 'Join the Experience',
    color: '#FFFFFF',
  },
  {
    id: 3,
    image: signInUpPhoto1,
    title: 'Have fun!',
    color: '#000000',
  },
];

const Register_signInAlbum = [signInUpPhoto1, signInUpPhoto2, signInUpPhoto3];

export {
  IntroAlbum,
  Register_signInAlbum,
  Profile,
  Register_signInCarousel,
  SampleActivity,
  Sylvester,
};
