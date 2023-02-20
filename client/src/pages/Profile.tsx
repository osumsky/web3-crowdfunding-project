import React, { useEffect, useState } from 'react';
import { DisplayCampaigns } from '../components';
import { useStateContext } from '../context';
import { CampaignDetailsType } from './CreateCampaign';

export type ExtraCampaignsDetails = CampaignDetailsType & {
  owner: string;
  amountCollected: number;
  pId: number;
};

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const { address, contract, getUserCampaigns } = useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getUserCampaigns();
    setCampaigns(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (contract) {
      fetchCampaigns();
    } else {
      setCampaigns([]);
    }
  }, [address, contract]);

  return (
    <DisplayCampaigns
      title="All Campaigns"
      isLoading={isLoading}
      campaigns={campaigns}
    />
  );
};

export default Profile;
