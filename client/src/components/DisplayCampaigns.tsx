import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ExtraCampaignsDetails } from '../pages/Home';
import { loader } from '../assets';

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
  return (
    <div>
      <h1 className="font-epilogue font-semibold text-white text-left">
        {title} ({campaigns.length})
      </h1>
      <div className="flex flex-wrap mt-[20px] gap-[28px]">
        {isLoading && (
          <img src={loader} className="w-[100px] h-[100px] object-contain" />
        )}
        
        { !isLoading && campaigns.length === 0 && (<p className=>You have not created any campaigns</p>)
          campaigns.map(() => <></>)
        }
      </div>
    </div>
  );
};

export default DisplayCampaigns;
