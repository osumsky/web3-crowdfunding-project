import React from 'react';
import { ExtraCampaignsDetails } from '../pages/Profile';
import { tagType, thirdweb } from '../assets/images';
import { daysLeft } from '../utils';
import { useTranslation } from 'react-i18next';

type FundCampaignsDetails = ExtraCampaignsDetails & {
  handleClick: React.MouseEventHandler<HTMLDivElement>;
};

const FundCard: React.FC<FundCampaignsDetails> = ({
  owner,
  title,
  description,
  target,
  deadline,
  amountCollected,
  image,
  handleClick,
}) => {
  const { t } = useTranslation();
  const remainingDays = daysLeft(Number(deadline));

  return (
    <div
      className="rounded-[16px] dark:bg-stone-800 bg-stone-300 cursor-pointer"
      onClick={handleClick}
    >
      {/* Main image */}
      <img
        src={image}
        className="w-full h-[158px] object-cover rounded-[16px]"
      />

      {/* Category */}
      <div className="flex flex-col p-4">
        <div className="flex flex-row items-center mb-[18px]">
          <img src={tagType} className="w-[16px] h-[16px] object-contain" />
          <p className="ml-[12px] mt-[2px]  font-medium text-[12px] dark:text-stone-500 text-stone-800">
            Education
          </p>
        </div>

        {/* Title + Description */}
        <div className="block">
          <h3 className=" font-semibold text-[16px] dark:text-stone-50 text-black text-left leading-[28px] truncate">
            {title}
          </h3>
          <p className="mt-[4px]  font-normal dark:text-stone-500 text-stone-800 text-left leading-[18px] truncate">
            {description}
          </p>
        </div>

        {/* Amount collected + days left  */}
        <div className="flex justify-between flex-wrap mt-[16px] gap-2">
          <div className="flex flex-col">
            <h4 className=" font-semibold text-[14px] dark:text-stone-300 text-stone-900 leading-[22px] text-center">
              {amountCollected}
            </h4>
            <p className="mt-[4px]  font-normal text-[12px] leading-[18px] dark:text-stone-500 text-stone-700 truncate sm:max-w-[120px]">
              {t('raised_of')} {target}
            </p>
          </div>
          <div className="flex flex-col">
            <h4 className=" font-semibold text-[14px] dark:text-stone-300 text-stone-900 leading-[22px] text-center">
              {remainingDays}
            </h4>
            <p className="mt-[4px]  font-normal text-[12px] leading-[18px] dark:text-stone-500 text-stone-700 truncate sm:max-w-[120px]">
              {t('days_left')}
            </p>
          </div>
        </div>

        {/* Owner address */}
        <div className="flex items-center mt-[20px] gap-[12px]">
          <div className="w-[32px] h-[32px] rounded-full flex justify-center items-center dark:bg-stone-900 bg-stone-100">
            <img src={thirdweb} className="w-1/2 h-1/2 object-contain" />
          </div>
          <p className="flex-1  font-normal text-[12px] dark:text-stone-500 text-stone-800 truncate">
            by <span className="dark:text-stone-300 text-stone-800">{owner}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FundCard;
