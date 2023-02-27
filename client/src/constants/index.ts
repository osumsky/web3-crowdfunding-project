import {
  createCampaign,
  dashboard,
  profile,
} from '../assets/images';

export type NavLinkType = {
  name: NavLinkName;
  imageUrl: string;
  link: string;
  disabled?: boolean;
};

export enum NavLinkName {
  Dashbord = 'dashboard',
  Campaign = 'campaign',
  Profile = 'profile',
}

export const navlinks: Array<NavLinkType> = [
  {
    name: NavLinkName.Dashbord,
    imageUrl: dashboard,
    link: '/',
  },
  {
    name: NavLinkName.Campaign,
    imageUrl: createCampaign,
    link: '/create-campaign',
  },
  {
    name: NavLinkName.Profile,
    imageUrl: profile,
    link: '/profile',
  },
];

export const CROWD_PLATFORM_CONTRACT_ADRESS: string =
  '0xA02aAadd2967018A3f4F3Ee6c723B9721b26d3b6';
