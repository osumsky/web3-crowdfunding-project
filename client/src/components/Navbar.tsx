import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CustomButton } from './';
import { logo, menu, search, thirdweb } from '../assets/images';
import { navlinks, NavLinkName, NavLinkType } from '../constants';
import { getLinkByNavLinkName } from '../utils';
import { useStateContext } from '../context';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const navigate = useNavigate();
  const [isActive, setIsAcive] = useState(NavLinkName.Dashbord);
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const { connectWallet, address } = useStateContext();
  const { t, i18n } = useTranslation();

  return (
    // Navbar container
    <div className="md:flex-row flex flex-col-reverse justify-between mb-[35px] gap-6">
      {/* Search container */}
      <div className="lg:flex flex flex-row max-w-[458px] py-2 pl-4 pr-2 h-[52px] bg-[#1c1c24] rounded-[100px]">
        <input
          type="text"
          placeholder="Search fro campaigns"
          className="flex w-full font-epilogue font-normal text-[14px] placeholder:text-[$4b5264] text-white bg-transparent outline-none mr-2"
        />
        {/* Search image container */}
        <div className="w-[72px] h-full rounded-[20px] bg-[#4acd8d] flex justify-center items-center cursor-pointer">
          <img src={search} className="w-[16px] h-[16px] object-contain" />
        </div>
      </div>

      {/* Connect button container */}
      <div className="sm:flex hidden flex-row justify-end items-center gap-4">
        <CustomButton
          btnType="button"
          title={address ? t('campaign_creation') : t('connect')}
          styles={address ? 'bg-[#1dc071]' : 'bg-[#8c6dfd]'}
          handleClick={() => {
            if (address) {
              navigate(getLinkByNavLinkName(NavLinkName.Campaign));
            } else {
              connectWallet?.();
            }
          }}
        />

        <Link
          to={
            navlinks[
              navlinks.findIndex((item) => item.name === NavLinkName.Profile)
            ].link
          }
        >
          <div className="w-[52px] h-[52px] rounded-full bg-[#2c2f32] flex justify-center items-center">
            <img src={thirdweb} className="w-[60%] h-[60%] object-contain" />
          </div>
        </Link>
      </div>

      {/* Small screen navigation */}
      <div className="sm:hidden flex justify-between items-center relative">
        {/* image container */}
        <div className="w-[40px] h-[40px] rounded-[10px] bg-[#2c2f32] flex justify-center items-center cursor-pointer">
          <img src={logo} className="w-[60%] h-[60%] object-contain" />
        </div>
        <img
          src={menu}
          className="w-[34px] h-[34px] object-contain cursor-pointer"
          onClick={() => {
            setToggleDrawer((prevState) => !prevState);
          }}
        />
        <div
          className={`absolute top-[60px] right-0 left-0 bg-[#1c1c24] z-10 shadow-secondary py-4 ${
            !toggleDrawer ? '-translate-y-[100vh]' : 'translate-y-0'
          } transition-all duration-700`}
        >
          <ul className="mb-4">
            {navlinks.map((linkItem: NavLinkType) => (
              <li
                key={linkItem.name}
                className={`flex p-4 ${
                  isActive === linkItem.name && 'bg-[#3a3a43]'
                }`}
                onClick={() => {
                  setIsAcive(linkItem.name);
                  setToggleDrawer(false);
                  navigate(linkItem.link);
                }}
              >
                <img
                  src={linkItem.imageUrl}
                  className={`h-[24px] w-[24px] object-contain ${
                    isActive === linkItem.name ? 'grayscale-0' : 'grayscale'
                  }`}
                />

                <p
                  className={`ml-[20px] font-epilogue font-semibold text-[14px] capitalize ${
                    isActive === linkItem.name
                      ? 'text-[#1dc071]'
                      : 'text-[#808191]'
                  }`}
                >
                  {linkItem.name}
                </p>
              </li>
            ))}
          </ul>

          <div className="flex mx-4">
            <CustomButton
              btnType="button"
              title={address ? 'Create a campaign' : 'Connect'}
              styles={address ? 'bg-[#1dc071]' : 'bg-[#8c6dfd]'}
              handleClick={() => {
                if (address) {
                  navigate(getLinkByNavLinkName(NavLinkName.Campaign));
                } else {
                  connectWallet?.();
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
