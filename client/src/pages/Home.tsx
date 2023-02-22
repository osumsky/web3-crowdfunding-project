import { useEffect, useState } from 'react';
import { DisplayCampaigns } from '../components';
import { useStateContext } from '../context';
import { ExtraCampaignsDetails } from './Profile';

const Home = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [campaigns, setCampaigns] = useState<Array<ExtraCampaignsDetails>>([]);
  const { address, contract, getAllCampaigns } = useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getAllCampaigns();
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

export default Home;
