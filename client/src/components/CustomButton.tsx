import React from 'react';

type CustomBottomType = {
  btnType: 'button' | 'submit';
  title: string;
  styles: string;
  handleClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const CustomBottom: React.FC<CustomBottomType> = ({
  btnType,
  title,
  styles,
  handleClick,
}) => {
  return (
    <button 
    type={btnType} 
    className={` font-semibold text-[16px] leading-[26px] text-stone-900 dark:text-stone-50 min-h-[52px] px-4 rounded-[10px] ${styles}`} 
    onClick={handleClick}>
      {title}
    </button>
  );
};

export default CustomBottom;
