import { useContext, createContext } from 'react';
import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
} from '@thirdweb-dev/react';
import { CONTRACT_ADRESS } from '../constants';

import { FormType } from '../pages/CreateCampaign';

type ContextValueType = {
  address: string | undefined;
  contract: any;
  createCampaign: Function;
};

const defaultContext: ContextValueType = {
  address: undefined,
  contract: undefined,
  createCampaign: () => {},
};

const StateContext = createContext<ContextValueType>(defaultContext);
export const useStateContext = (): ContextValueType => useContext(StateContext);

export const StateContextProvider: React.FC = ({
  children,
}: React.PropsWithChildren) => {
  const { contract } = useContract(CONTRACT_ADRESS);
  const { mutateAsync: createCampaign } = useContractWrite(
    contract,
    'createCampaign'
  );

  const address = useAddress();
  const connect = useMetamask();

  const publishCampaign = async (form: FormType) => {
    try {
      const data = await createCampaign([
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

  return (
    <StateContext.Provider
      value={{ address, contract, createCampaign: publishCampaign }}
    >
      {children}
    </StateContext.Provider>
  );
};
