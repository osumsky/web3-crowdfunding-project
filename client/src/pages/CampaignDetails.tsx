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
  const { makeDonate, getDonations, contract, address } = useBlockchaingContext();
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
          <div className="relative w-full h-[4px] bg-[#3a3a43] mt-2">
            <div
              className="absolute h-full bg-[#4acd8d]"
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
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
              {t('creator')}
            </h4>
            <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px]">
              <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer">
                <img
                  src={thirdweb}
                  className="w-[60%] h-[60%] object-contain"
                />
              </div>
              <div>
                <h4 className="font-epilogue font-semibold text-[14px] text-white break-all">
                  {state.owner}
                </h4>
                <p className="font-epilogue font-normal text-[12px] text-[#808191]">
                  10 campaign
                </p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
              {t('story')}
            </h4>
            <div className="mt-[20px]">
              <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                {state.description}
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
              {t('donators')}
            </h4>
            <div className="mt-[20px] flex flex-col gap-4">
              {donators.length > 0 ? (
                donators.map((item, index: number) => (
                  <div
                    key={`${item.donator}-${index}`}
                    className="flex justify-between items-center gap-4"
                  >
                    <p className="font-epilogue font-normal text-[16px] text-[#b2b3bd] leading-[24px] break-all">
                      {index + 1}. {item.donator}
                    </p>
                    <p className="font-epilogue font-normal text-[16px] text-[#b2b3bd] leading-[24px] break-all">
                      {`${item.donation} ETH`}
                    </p>
                  </div>
                ))
              ) : (
                <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                  {t('no_donators')}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex-1">
          <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
            {t('fund')}
          </h4>
          <div className="mt-[20px] flex flex-col p-4 bg-[#1c1c24] rounded-[10px]">
            <p className="font-epologue font-medium text-[20px] leading-[30px] text-center text-[#808191]">
              {t('fund_campaign')}
            </p>
            <div className="mt-[30px]">
              <input
                type="number"
                placeholder="ETH 0.0001"
                step="0.0001"
                className="w-full py-[10px] sm:px-[20px] px-[16px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white focus:border-white
              text-[18px] leading-[30px] placeholder:text-[#4b5264] rounded-[10px]"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />

              <div className="my-[20px] p-4 bg-[#131313] rounded-[10px]">
                <h4 className="font-epilogue font-semibold text-[14px] leading-[20px] text-white">
                  {t('back_it')}
                </h4>
                <p className="mt-[20px] font-epilogue font-normal leading-[20px] text-[#808191]">
                  {t('support_project')}
                </p>
              </div>
              <CustomButton
                btnType="button"
                title={t('fund_campaign')}
                styles="w-full bg-[#8c6dfd]"
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
