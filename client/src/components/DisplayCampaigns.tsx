import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ExtraCampaignsDetails } from '../pages/Profile';
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
  const { t } = useTranslation();

  const navigate = useNavigate();

  const handleNavigate = (campaign: ExtraCampaignsDetails) => {
    navigate(`/campaign-details/${campaign.title}`, { state: campaign });
  };

  return (
    <div>
      <h1 className="font-epilogue font-semibold dark:text-stone-50 text-stone-900 text-left mb-4">
        {title} ({campaigns.length})
      </h1>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(288px, 1fr))',
          justifyContent: 'space-around',
          rowGap: '20px',
          gridGap: "20px"
        }}
        
      >
        {isLoading && <Loader />}

        {!isLoading && campaigns.length === 0 && (
          <p className="font-epilogue font-semibold text-[14px] leading-[30px] textstone-500">
            {t('no_campaigns')}
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
