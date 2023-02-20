import { useContext, createContext } from 'react';
import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
} from '@thirdweb-dev/react';
import { CONTRACT_ADRESS } from '../constants';

import { CampaignDetailsType } from '../pages/CreateCampaign';
import { ethers } from 'ethers';
import { ExtraCampaignsDetails } from '../pages/Home';

type ContextValueType = {
  address: string | undefined;
  contract: any;
  connectWallet: any;
  createCampaign: Function;
  getCampaigns: Function;
};

const defaultContext: ContextValueType = {
  address: undefined,
  contract: undefined,
  connectWallet: undefined,
  createCampaign: () => {},
  getCampaigns: () => [],
};

const StateContext = createContext<ContextValueType>(defaultContext);
export const useStateContext = (): ContextValueType => useContext(StateContext);

// ...OnSC / ...FromSC - on/from smart contract
export const StateContextProvider: React.FC = ({
  children,
}: React.PropsWithChildren) => {
  const { contract } = useContract(CONTRACT_ADRESS);
  const { mutateAsync: createCampaignOnSC } = useContractWrite(
    contract,
    'createCampaign'
  );

  const address = useAddress();
  const connectWallet = useMetamask();

  const createCampaign = async (form: CampaignDetailsType) => {
    try {
      const data = await createCampaignOnSC([
        address, // owner
        form.title,
        form.description,
        form.target,
        new Date(form.deadline).getTime(),
        form.image,
      ]);
      console.info('contract call successs', data);
    } catch (err) {
      console.error('contract call failure', err);
    }
  };

  
  
  const getCampaigns = async (): Promise<Array<any>> => {
    try {
      const campaigns = await contract?.call('getCampaigns');
      const parsedCampaigns = campaigns.map((campaign: ExtraCampaignsDetails, index: number) =>({
        owner: campaign.owner,
        title: campaign.title,
        description: campaign.description,
        target: ethers.utils.formatEther(campaign.target.toString()),
        deadline: Number(campaign.deadline),
        amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
        image: campaign.image,
        pId: index
      }))
      console.info('contract call successs', parsedCampaigns);
      return parsedCampaigns;
    } catch (err) {
      console.error('contract call failure', err);
      return [];
    }
  };

  return (
    <StateContext.Provider
      value={{ address, contract, connectWallet, createCampaign, getCampaigns }}
    >
      {children}
    </StateContext.Provider>
  );
};
