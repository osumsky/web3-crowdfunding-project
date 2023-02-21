import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ExtraCampaignsDetails } from '../pages/Profile';
import { loader } from '../assets';
import FundCard from './FundCard';
import Loader from './Loader';

type DisplayCampaignsType = {
  title: string;
  isLoading: boolean;
  campaigns: Array<ExtraCampaignsDetails>;
};

const DisplayCampaigns: React.FC<DisplayCampaignsType> = ({
  title,
  isLoading,
  campaigns,
}) => {
  const navigate = useNavigate();

  const handleNavigate = (campaign: ExtraCampaignsDetails) => {
    navigate(`/campaign-details/${campaign.title}`, { state: campaign });
  };

  return (
    <div>
      <h1 className="font-epilogue font-semibold text-white text-left">
        {title} ({campaigns.length})
      </h1>
      <div className="flex flex-wrap mt-[20px] gap-[28px]">
        {isLoading && <Loader />}

        {!isLoading && campaigns.length === 0 && (
          <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818181]">
            You have not created any campaigns
          </p>
        )}

        {!isLoading &&
          campaigns.length > 0 &&
          campaigns.map((campaign) => (
            <FundCard
              key={campaign.pId}
              {...campaign}
              handleClick={() => handleNavigate(campaign)}
            />
          ))}
      </div>
    </div>
  );
};

export default DisplayCampaigns;
