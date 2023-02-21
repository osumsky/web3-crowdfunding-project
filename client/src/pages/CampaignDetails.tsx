import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ethers } from 'ethers';

import { useStateContext } from '../context';
import { CustomButton } from '../components';
import { calculateBarPercentage, daysLeft } from '../utils';
import { thirdweb, loader } from '../assets';
import { ExtraCampaignsDetails } from './Home';
import CountBox from '../components/CountBox';

const CampaignDetails: React.FC = () => {
  const { contract, address } = useStateContext();
  const { state } = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState(0);
  const [donators, setDonators] = useState([]);

  const remaingingDays = daysLeft(Number(state.deadline));

  return (
    <div>
      {isLoading && (
        <img src={loader} className="w-[100px] h-[100px] object-contain" />
      )}

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
                  state.target,
                  state.amountCollected
                )}%`,
                maxWidth: '100%',
              }}
            ></div>
          </div>
        </div>

        <div className="flex md:w-[150px] w-full flex-wrap justify-between gap-[32px]">
          <CountBox title="Days Left" value={remaingingDays} />
          <CountBox
            title={`Raised of ${state.target}`}
            value={state.amountCollected}
          />
          <CountBox title="Total Backers" value={donators.length} />
        </div>
      </div>

      <div className="mt-[60px] flex lg:flep-row flex-col gap-5">
        <div className="flex-[2] flex flex-col gap-[40px]">
          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
              Creator
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
              Story
            </h4>

            <div className="mt-[20px]">
              <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                {state.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetails;
