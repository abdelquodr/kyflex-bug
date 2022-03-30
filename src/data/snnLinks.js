import {
  faTwitter,
  faFacebookF,
  faPinterestP,
  faLinkedinIn,
  faYoutube
} from '@fortawesome/free-brands-svg-icons';

/*
    this data is for footer component.
    This data holds SNN links.
*/

const SNN_links = [
  { id: 1, icon: faTwitter, end_point: '#' },
  {
    id: 2,
    icon: faFacebookF,
    end_point: 'https://www.facebook.com/KyFlex-544163759855914/',
  },
  { id: 3, icon: faPinterestP, end_point: '#' },
  {
    id: 4,
    icon: faLinkedinIn,
    end_point: 'https://www.linkedin.com/company/kyflex/',
  },
  { id: 5, icon: faYoutube, end_point: '#', },
];

export { SNN_links };
