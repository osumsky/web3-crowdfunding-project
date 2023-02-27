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
  const [toggleDrawer, setToggleDrawer] = useState(true);
  const { connectWallet, address } = useBlockchaingContext();

  const { theme, changeTheme } = useThemeContext();

  const { t, i18n } = useTranslation();
  const handleLangSelect = (e: any): void => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    // Navbar container
    <div className="md:flex-row flex flex-col-reverse justify-between mb-[35px] gap-6">
      {/* Search container */}
      <div className="lg:flex flex flex-row md:max-w-[458px] w-full py-2 pl-4 pr-2 h-[52px] bg-stone-300 dark:bg-stone-800 rounded-[100px]">
        <input
          type="text"
          placeholder={t('search_for')}
          className="flex w-full font-epilogue font-normal text-[14px] placeholder:text-stone-500 text-stone-900 dark:text-stone-50 bg-transparent outline-none mr-2"
        />
        {/* Search image container */}
        <div className="w-[72px] h-full rounded-[20px] dark:bg-emerald-500 bg-emerald-300 flex justify-center items-center cursor-pointer">
          <img src={search} className="w-[16px] h-[16px] object-contain invert" />
        </div>
      </div>

      {/* Connect button container */}
      <div className="sm:flex hidden flex-row justify-end items-center gap-4">
        <CustomButton
          btnType="button"
          title={address ? t('campaign_creation') : t('connect')}
          styles={address ? 'dark:bg-emerald-500 bg-emerald-300' : 'dark:bg-indigo-500 bg-indigo-300'}
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
          <div className="w-[52px] h-[52px] rounded-full bg-stone-300 dark:bg-stone-800 flex justify-center items-center">
            <img src={thirdweb} className="w-[60%] h-[60%] object-contain" />
          </div>
        </Link>
      </div>

      {/* Small screen navigation */}
      <div className="sm:hidden flex justify-between items-center relative">
        {/* Language selection */}
        <div className="w-[52px] h-[52px] rounded-full bg-stone-300 dark:bg-stone-800 flex justify-center items-center">
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
                className="bg-stone-800 text-stone-400
                checked:bg-stone-600 checked:text-stone-900"
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
          className={`absolute top-[60px] right-0 left-0 dark:bg-stone-900 bg-stone-300 z-10 shadow-secondary py-4 rounded-xl ${
            !toggleDrawer ? '-translate-y-[100vh]' : 'translate-y-0'
          } transition-all duration-700`}
        >
          <ul className="mb-4">
            {navlinks.map((linkItem: NavLinkType) => (
              <li
                key={linkItem.name}
                className={`flex p-4 ${
                  isActive === linkItem.name && 'dark:bg-stone-800 bg-stone-50'
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
                      ? 'text-emerald-500'
                      : 'dark:text-stone-500 text-stone-800'
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
                changeTheme();
                setToggleDrawer(false);
              }}
            >
              <img src={theme === Themes.DARK ? sun : moon} />
              <p className="ml-[20px] font-epilogue font-semibold text-[14px] capitalize dark:text-stone-500 text-stone-800">
                Light/Dark Theme
              </p>
            </li>
          </ul>

          <div className="flex mx-4">
            <CustomButton
              btnType="button"
              title={address ? t('campaign_creation') : t('connect')}
              styles={address ? 'dark:bg-emerald-500 bg-emerald-300' : 'dark:bg-indigo-500 bg-indigo-300'}
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
