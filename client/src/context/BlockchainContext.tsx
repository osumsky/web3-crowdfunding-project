import { useContext, createContext } from 'react';
import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
  useDisconnect,
} from '@thirdweb-dev/react';
import { CROWD_PLATFORM_CONTRACT_ADRESS } from '../constants';

import { CampaignDetailsType } from '../pages/CreateCampaign';
import { BaseContract, ethers } from 'ethers';
import { ExtraCampaignsDetails } from '../pages/Profile';
import { SmartContract } from '@thirdweb-dev/sdk';
import { DonationType } from '../pages/CampaignDetails';

type BlockchainContextValueType = {
  address: string | undefined;
  contract: SmartContract<BaseContract> | undefined;
  disconnectWallet: ReturnType<typeof useDisconnect> | undefined;
  connectWallet: ReturnType<typeof useMetamask> | undefined;
  createCampaign: Function;
  getAllCampaigns: Function;
  getUserCampaigns: Function;
  makeDonate: Function;
  getDonations: Function;
};

const BlockchainContext = createContext<BlockchainContextValueType | null>(null);
export const useBlockchaingContext = (): BlockchainContextValueType =>
  useContext(BlockchainContext) as BlockchainContextValueType;

// ...OnSC / ...FromSC - on/from smart contract
export const BlockchainContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { contract } = useContract(CROWD_PLATFORM_CONTRACT_ADRESS);
  const { mutateAsync: createCampaignOnSC } = useContractWrite(
    contract,
    'createCampaign'
  );

  const address = useAddress();
  const connectWallet = useMetamask();
  const disconnectWallet = useDisconnect();

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

  const makeDonate = async (pId: number, amount: string): Promise<void> => {
    await contract?.call('donateToCampaign', pId, {
      value: ethers.utils.parseEther(amount),
    });
  };

  const getDonations = async (pId: number): Promise<Array<DonationType>> => {
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
    <BlockchainContext.Provider
      value={{
        address,
        contract,
        connectWallet,
        disconnectWallet,
        createCampaign,
        getAllCampaigns,
        getUserCampaigns,
        makeDonate,
        getDonations,
      }}
    >
      {children}
    </BlockchainContext.Provider>
  );
};
