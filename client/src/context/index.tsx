import { useContext, createContext } from 'react';
import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
} from '@thirdweb-dev/react';
import { CROWD_PLATFORM_CONTRACT_ADRESS } from '../constants';

import { CampaignDetailsType } from '../pages/CreateCampaign';
import { BaseContract, ethers } from 'ethers';
import { ExtraCampaignsDetails } from '../pages/Home';
import { SmartContract } from '@thirdweb-dev/sdk';

type ContextValueType = {
  address: string | undefined;
  contract: SmartContract<BaseContract> | undefined;
  connectWallet: ReturnType<typeof useMetamask> | undefined;
  createCampaign: Function;
  getAllCampaigns: Function;
  getUserCampaigns: Function;
  makeDonate: Function;
  getDonations: Function;
};

const defaultContext: ContextValueType = {
  address: undefined,
  contract: undefined,
  connectWallet: undefined,
  createCampaign: () => {},
  getAllCampaigns: () => [],
  getUserCampaigns: () => [],
  makeDonate: () => {},
  getDonations: () => [],
};

const StateContext = createContext<ContextValueType>(defaultContext);
export const useStateContext = (): ContextValueType => useContext(StateContext);

// ...OnSC / ...FromSC - on/from smart contract
export const StateContextProvider: React.FC = ({
  children,
}: React.PropsWithChildren) => {
  const { contract } = useContract(CROWD_PLATFORM_CONTRACT_ADRESS);
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

  const getAllCampaigns = async (): Promise<Array<ExtraCampaignsDetails>> => {
    try {
      const campaigns = await contract?.call('getCampaigns');
      const parsedCampaigns = campaigns.map(
        (campaign: ExtraCampaignsDetails, index: number) => ({
          owner: campaign.owner,
          title: campaign.title,
          description: campaign.description,
          target: ethers.utils.formatEther(campaign.target.toString()),
          deadline: Number(campaign.deadline),
          amountCollected: ethers.utils.formatEther(
            campaign.amountCollected.toString()
          ),
          image: campaign.image,
          pId: index,
        })
      );
      console.info('contract call successs', parsedCampaigns);
      return parsedCampaigns;
    } catch (err) {
      console.error('contract call failure', err);
      return [];
    }
  };

  const getUserCampaigns = async (): Promise<Array<ExtraCampaignsDetails>> => {
    const allCampanigns = await getAllCampaigns();
    const filtredCampaigns = allCampanigns.filter(
      (campanign) => campanign.owner === address
    );
    return filtredCampaigns;
  };

  const makeDonate = async (pId: number, amount: string): Promise<any> => {
    const data = await contract?.call('donateToCampaign', pId, {value: ethers.utils.parseEther(amount)});
    return data;
  };

  const getDonations = async (pId: number): Promise<any> => {
    const donations = await contract?.call('getDonators', pId);
       // [0] - Donators, [1] - Donations
    const numberOfDonations = donations[0].length;
    const parseDonations = [];
    for (let i = 0; i < numberOfDonations; i++) {
      parseDonations.push({
        donator: donations[0][i],
        donation: ethers.utils.formatEther(donations[1][i].toString()),
      });
    }
    return parseDonations;
  };

  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        connectWallet,
        createCampaign,
        getAllCampaigns,
        getUserCampaigns,
        makeDonate,
        getDonations,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};
