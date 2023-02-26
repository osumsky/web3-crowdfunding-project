import { MouseEventHandler, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { navlinks, NavLinkName, NavLinkType } from '../constants';
import { sun, moon } from '../assets/images';
import { availableLanguages, LanguageType } from '../i18nextConf';
import { useTranslation } from 'react-i18next';
import { Themes, useThemeContext } from '../context/ThemeContext';

type IconPropsType = {
  styles?: string;
  name?: NavLinkName;
  imageUrl: string;
  isActive?: NavLinkName;
  disabled?: boolean;
  handleClick: MouseEventHandler<HTMLDivElement>;
};

const Icon: React.FC<IconPropsType> = ({
  styles,
  name,
  imageUrl,
  isActive,
  disabled,
  handleClick,
}) => {
  return (
    <div
      title={name && name[0].toUpperCase() + name.slice(1)}
      className={`w-[48px] h-[48px] rounded-[10px] ${
        isActive && isActive === name && 'bg-[2c2f32]'
      } flex justify-center items-center
      ${!disabled && 'cursor-pointer'} ${styles}`}
      onClick={handleClick}
    >
      <img
        src={imageUrl}
        className={`w-1/2 h-1/2 ${isActive !== name && 'grayscale'}`}
      />
    </div>
  );
};

const Sidebar = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(NavLinkName.Dashbord);

  const { theme, changeTheme } = useThemeContext();

  const { i18n } = useTranslation();
  const handleLangSelect = (e: any): void => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <div className="flex justify-between items-center flex-col sticky top-5 h-[93vh]">
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
      <div className="flex-1 flex flex-col justify-between items-center bg-[#1c1c24] rounded-[20px] w-[76px] py-4 mt-12">
        <div className="flex flex-col justify-center items-center gap-3">
          {navlinks.map((linkItem: NavLinkType) => (
            <Icon
              key={linkItem.name}
              {...linkItem}
              isActive={isActive}
              handleClick={() => {
                if (!linkItem.disabled) {
                  setIsActive(linkItem.name);
                  navigate(linkItem.link);
                }
              }}
            />
          ))}
        </div>
        <Icon
          styles="bg-[#1c1c24]"
          imageUrl={theme === Themes.DARK ? sun : moon}
          handleClick={() => changeTheme()}
        />
      </div>
    </div>
  );
};

export default Sidebar;
