import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CustomButton } from './';
import { menu, moon, search, sun, thirdweb } from '../assets/images';
import { navlinks, NavLinkName, NavLinkType } from '../constants';
import { getLinkByNavLinkName } from '../utils';
import { useBlockchaingContext } from '../context/BlockchainContext';
import { useTranslation } from 'react-i18next';
import { availableLanguages, LanguageType } from '../i18nextConf';
import { Themes, useThemeContext } from '../context/ThemeContext';

const Navbar = () => {
  const navigate = useNavigate();
  const [isActive, setIsAcive] = useState(NavLinkName.Dashbord);
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const { connectWallet, address } = useBlockchaingContext();

  const { theme, setTheme } = useThemeContext();

  const { t, i18n } = useTranslation();
  const handleLangSelect = (e: any): void => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    // Navbar container
    <div className="md:flex-row flex flex-col-reverse justify-between mb-[35px] gap-6">
      {/* Search container */}
      <div className="lg:flex flex flex-row md:max-w-[458px] w-full py-2 pl-4 pr-2 h-[52px] bg-[#1c1c24] rounded-[100px]">
        <input
          type="text"
          placeholder={t('search_for')}
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
      <div className="sm:hidden flex justify-between items-center relative ">
        {/* Language selection */}
        <div>
          <select
            className="w-[40px] h-[40px] px-2 rounded-full text-transparent appearance-none cursor-pointer"
            style={{
              backgroundImage: `url(${
                availableLanguages[i18n.resolvedLanguage as keyof LanguageType]
                  .image
              })`,
              backgroundSize: 'contain',
            }}
            onChange={handleLangSelect}
            defaultValue={i18n.resolvedLanguage}
          >
            {Object.keys(availableLanguages).map((langKey) => (
              <option
                key={langKey}
                value={langKey}
                className="bg-[#818181] text-black
                checked:bg-[#13131a] checked:text-[#818181]"
              >
                {availableLanguages[langKey as keyof LanguageType].originalName}
              </option>
            ))}
          </select>
        </div>
        <img
          src={menu}
          className="w-[34px] h-[34px] object-contain cursor-pointer"
          onClick={() => {
            setToggleDrawer((prevState) => !prevState);
          }}
        />

        {/* Burger menu */}
        <div
          className={`absolute top-[60px] right-0 left-0 bg-[#1c1c24] z-10 shadow-secondary py-4 rounded-xl ${
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

            {/* Dark/Light THEMES */}

            <li
              key={0}
              className="flex p-4 my-4"
              onClick={() => {
                setTheme(theme === Themes.LIGHT ? Themes.DARK : Themes.LIGHT);
                setToggleDrawer(false);
              }}
            >
              <img src={theme === Themes.DARK ? sun : moon} />
              <p className="ml-[20px] font-epilogue font-semibold text-[14px] capitalize text-[#808191]">
                Light/Dark Theme
              </p>
            </li>
          </ul>

          <div className="flex mx-4">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
