import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import { money } from '../assets/images';
import { CustomButton, FormField, Loader } from '../components';
import { checkIfImage } from '../utils';
import { useBlockchaingContext } from '../context/BlockchainContext';
import { useTranslation } from 'react-i18next';

enum FieldName {
  name = 'name',
  title = 'title',
  description = 'description',
  target = 'target',
  deadline = 'deadline',
  image = 'image',
}

export type CampaignDetailsType = {
  [FieldName.name]: string;
  [FieldName.title]: string;
  [FieldName.description]: string;
  [FieldName.target]: string;
  [FieldName.deadline]: string;
  [FieldName.image]: string;
};

const defaultForm: CampaignDetailsType = {
  name: '',
  title: '',
  description: '',
  target: '',
  deadline: '',
  image: '',
};

const CreateCampaign = () => {
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [form, setForm] = useState<CampaignDetailsType>(defaultForm);
  const { createCampaign } = useBlockchaingContext();
  const { t } = useTranslation();

  const { address } = useBlockchaingContext();
  const handleSubmit = async (e: React.SyntheticEvent): Promise<any> => {
    e.preventDefault();
    if (address)
      checkIfImage(form.image, async (exists: boolean) => {
        if (exists) {
          setIsSaving(true);
          await createCampaign({
            ...form,
            target: ethers.utils.parseUnits(form.target, 18),
          });
          setIsSaving(false);
          navigate('/');
        } else {
          alert(t('valid_url'));
          setForm({ ...form, [FieldName.image]: '' });
        }
      });
    else alert(t('connect_wallet'));
  };

  const handleFormFieldChange = (
    fieldName: FieldName,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  return (
    <div className="dark:bg-stone-800 bg-stone-300 flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      {isSaving && <Loader />}

      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] dark:bg-stone-700 bg-stone-400 rounded-[10px]">
        <h1 className="font-bold sm:text-[25px] text-[18px] leading-[38px] dark:text-stone-50 text-stone-900">
          {t('start_campaign')}
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full mt-[65px] flex flex-col gap-[30px]"
      >
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName={`${t('your_name')} *`}
            placeholder="John Doe"
            inputType="text"
            value={form.name}
            handleChange={(e) => handleFormFieldChange(FieldName.name, e)}
            isTextArea={false}
          />
          <FormField
            labelName={`${t('campaign_title')} *`}
            placeholder={t('write_title')}
            inputType="text"
            value={form.title}
            handleChange={(e) => handleFormFieldChange(FieldName.title, e)}
            isTextArea={false}
          />
        </div>

        <FormField
          labelName={`${t('story')} *`}
          placeholder={t('write_story')}
          value={form.description}
          handleChange={(e) => handleFormFieldChange(FieldName.description, e)}
          isTextArea={true}
        />

        {/* Money banner */}
        <div className="w-full flex justify-start items-center rounded-[10px] dark:bg-indigo-500 bg-indigo-600 p-4">
          <img src={money} className="w-[40px] h-[40px] object-contain" />
          <h4 className=" font-bold text-[25px] text-stone-50 ml-[20px]">
            {t('reward')}
          </h4>
        </div>

        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName={`${t('target')} *`}
            placeholder="ETH 0.5"
            inputType="number"
            value={form.target}
            handleChange={(e) => handleFormFieldChange(FieldName.target, e)}
            isTextArea={false}
          />
          <FormField
            labelName={`${t('end_date')} *`}
            placeholder=""
            inputType="date"
            value={form.deadline}
            handleChange={(e) => handleFormFieldChange(FieldName.deadline, e)}
            isTextArea={false}
          />
          <FormField
            labelName={`${t('campaign_image')} *`}
            placeholder={t('image_url')}
            inputType="url"
            value={form.image}
            handleChange={(e) => handleFormFieldChange(FieldName.image, e)}
            isTextArea={false}
          />
        </div>

        {/* Submit button */}
        <div className="flex justify-center items-center mt-[40px]">
          <CustomButton
            btnType="submit"
            styles={
              address
                ? 'dark:bg-emerald-500 bg-emerald-300'
                : 'dark:bg-stone-500 bg-stone-100'
            }
            title={t('submit_campaign')}
          />
        </div>
      </form>
    </div>
  );
};

export default CreateCampaign;
