import React from 'react';

type CountBoxType = {
  title: string;
  value: string | number;
};

const CountBox: React.FC<CountBoxType> = ({ title, value }) => {
  return (
    <div className="flex flex-col items-center w-[140px] ">
      <h4 className="font-epilogue font-bold text-[30px] dark:text-stone-50 text-stone-900 p-3 dark:bg-stone-700 bg-stone-300 rounded-t-[10px] w-full text-center truncate">
        {value}
      </h4>
      <p className="font-epilogue font-normal text-[16px] dark:text-stone-500 text-stone-200 dark:bg-stone-800 bg-stone-400 px-3 py-2 w-full rounded-b-[10px] text-center ">
        {title}
      </p>
    </div>
  );
};

export default CountBox;
