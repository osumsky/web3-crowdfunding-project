import { MouseEventHandler, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { navlinks, NavLinkName, NavLinkType } from '../constants';
import { logo, sun } from '../assets/images';

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

  return (
    <div className="flex justify-between items-center flex-col sticky top-5 h-[93vh]">
      <Link to="/">
        <Icon
          styles="w-[52px] h-[52px] bg-[#2c2f32]"
          imageUrl={logo}
          handleClick={() => null}
        />
      </Link>

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
          styles="bg-[#1c1c24] shadow-secondary"
          imageUrl={sun}
          disabled
          handleClick={() => null}
        />
      </div>
    </div>
  );
};

export default Sidebar;
