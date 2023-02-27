import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useBlockchaingContext } from '../context/BlockchainContext';
import { CustomButton, Loader } from '../components';
import { calculateBarPercentage, daysLeft } from '../utils';
import { thirdweb } from '../assets/images';
import CountBox from '../components/CountBox';
import { ExtraCampaignsDetails } from './Profile';
import { useTranslation } from 'react-i18next';

type LocationState = {
  state: ExtraCampaignsDetails;
};

export type DonationType = {
  donator: string;
  donation: string;
};

const CampaignDetails = () => {
  const { makeDonate, getDonations, contract, address } =
    useBlockchaingContext();
  const { state } = useLocation() as LocationState;
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState('');
  const [donators, setDonators] = useState<Array<DonationType>>([]);

  const { t } = useTranslation();

  const remaingingDays = daysLeft(Number(state.deadline));

  const fetchDonators = async () => {
    const data = await getDonations(state.pId);
    setDonators(data);
  };

  useEffect(() => {
    if (contract) fetchDonators();
  }, [contract, address]);

  const handleDonate = async () => {
    setIsLoading(true);
    const result = await makeDonate(state.pId, amount);
    navigate('/');
    setIsLoading(false);
  };

  return (
    <div>
      {isLoading && <Loader />}

      <div className="w-full flex md:flex-row flex-col mt-10 gap-[12px]">
        <div className="flex-1 flex-col">
          <img
            src={state.image}
            className="w-full h-[410px] object-cover rounded-xl"
          />
          <div className="relative w-full h-[4px] dark:bg-stone-800 bg-stone-300 mt-2">
            <div
              className="absolute h-full bg-emerald-500"
              style={{
                width: `${calculateBarPercentage(
                  Number(state.target),
                  state.amountCollected
                )}%`,
                maxWidth: '100%',
              }}
            ></div>
          </div>
        </div>

        <div className="flex md:w-[150px] w-full flex-wrap justify-between ">
          <CountBox title={t('days_left')} value={remaingingDays} />
          <CountBox
            title={`${t('raised_of')} ${state.target}`}
            value={state.amountCollected}
          />
          <CountBox title={t('total_backers')} value={donators.length} />
        </div>
      </div>

      <div className="mt-[60px] flex lg:flex-row flex-col gap-5">
        <div className="flex-[2] flex flex-col gap-[40px]">
          <div>
            <h4 className="font-epilogue font-semibold text-[18px] dark:text-stone-50 text-stone-900 uppercase">
              {t('creator')}
            </h4>
            <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px]">
              <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full dark:bg-stone-800 bg-stone-300 cursor-pointer">
                <img
                  src={thirdweb}
                  className="w-[60%] h-[60%] object-contain"
                />
              </div>
              <div>
                <h4 className="font-epilogue font-semibold text-[14px] dark:text-stone-50 text-stone-800 break-all">
                  {state.owner}
                </h4>
                <p className="font-epilogue font-normal text-[12px] text-stone-500">
                  10 campaign
                </p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-epilogue font-semibold text-[18px] dark:text-stone-50 text-stone-800 uppercase">
              {t('story')}
            </h4>
            <div className="mt-[20px]">
              <p className="font-epilogue font-normal text-[16px] dark:text-stone-50 text-stone-800 leading-[26px] text-justify">
                {state.description}
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-epilogue font-semibold text-[18px] dark:text-stone-50 text-stone-800 uppercase">
              {t('donators')}
            </h4>
            <div className="mt-[20px] flex flex-col gap-4">
              {donators.length > 0 ? (
                donators.map((item, index: number) => (
                  <div
                    key={`${item.donator}-${index}`}
                    className="flex justify-between items-center gap-4"
                  >
                    <p className="font-epilogue font-normal text-[16px] dark:text-stone-300 text-stone-800 leading-[24px] break-all">
                      {index + 1}. {item.donator}
                    </p>
                    <p className="font-epilogue font-normal text-[16px] dark:text-stone-300 text-stone-800 leading-[24px] break-all">
                      {`${item.donation} ETH`}
                    </p>
                  </div>
                ))
              ) : (
                <p className="font-epilogue font-normal text-[16px] dark:text-stone-500 text-stone-800 leading-[26px] text-justify">
                  {t('no_donators')}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex-1">
          <h4 className="font-epilogue font-semibold text-[18px] dark:text-stone-50 text-stone-800 uppercase">
            {t('fund')}
          </h4>
          <div className="mt-[20px] flex flex-col p-4 dark:bg-stone-800 bg-stone-300 rounded-[10px]">
            <p className="font-epologue font-medium text-[20px] leading-[30px] text-center dark:text-stone-400 text-stone-800">
              {t('fund_campaign')}
            </p>
            <div className="mt-[30px]">
              <input
                type="number"
                placeholder="ETH 0.0001"
                step="0.0001"
                className="w-full py-[10px] sm:px-[20px] px-[16px] outline-none border-[1px] dark:border-stone-600 border-stone-400 bg-transparent font-epilogue dark:text-stone-50 dark:focus:border-stone-50 text-stone-900 focus:border-stone-900
              text-[18px] leading-[30px] placeholder:text-stone-600 rounded-[10px]"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />

              <div className="my-[20px] p-4 dark:bg-stone-900 bg-stone-100 rounded-[10px]">
                <h4 className="font-epilogue font-semibold text-[14px] leading-[20px] dark:text-stone-50 text-stone-800">
                  {t('back_it')}
                </h4>
                <p className="mt-[20px] font-epilogue font-normal leading-[20px] dark:text-stone-400 text-stone-600">
                  {t('support_project')}
                </p>
              </div>

              <CustomButton
                btnType="button"
                title={t('fund_campaign')}
                styles="w-full dark:bg-indigo-500 bg-indigo-300"
                handleClick={handleDonate}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetails;
