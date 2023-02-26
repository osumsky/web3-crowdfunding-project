import React from 'react';

type CountBoxType = {
  title: string;
  value: string | number;
};

const CountBox: React.FC<CountBoxType> = ({ title, value }) => {
  return (
    <div className="flex flex-col items-center w-[140px] ">
      <h4 className="font-epilogue font-bold text-[30px] text-stone-50 p-3 bg-stone-700 rounded-t-[10px] w-full text-center truncate">
        {value}
      </h4>
      <p className="font-epilogue font-normal text-[16px] text-stone-500 bg-stone-800 px-3 py-2 w-full rounded-b-[10px] text-center ">
        {title}
      </p>
    </div>
  );
};

export default CountBox;
