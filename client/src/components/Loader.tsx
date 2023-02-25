import { useTranslation } from 'react-i18next';
import { loader } from '../assets/images';

const Loader = () => {
  const {t} = useTranslation();
  return (
    <div className="fixed inset-0 z-10 h-screen bg-[rgba(0,0,0,0.7)] flex flex-col items-center justify-center">
      <img src={loader} className="w-[100px] h-[100px] object-contain" />
      <p className="mt-[20px] font-epilogue font-bold text-[28px] text-center text-[#14a037]">
        {t('please_wait')}
      </p>
    </div>
  );
};

export default Loader;
