import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DisplayCampaigns } from '../components';
import { useStateContext } from '../context';
import { CampaignDetailsType } from './CreateCampaign';

export type ExtraCampaignsDetails = CampaignDetailsType & {
  owner: string;
  amountCollected: number;
  pId: number;
};

const Profile = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [campaigns, setCampaigns] = useState<Array<ExtraCampaignsDetails>>([]);
  const { address, contract, getUserCampaigns } = useStateContext();
  const {t} = useTranslation();

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
    title={t('all_campaigns')}
      isLoading={isLoading}
      campaigns={campaigns}
    />
  );
};

export default Profile;
