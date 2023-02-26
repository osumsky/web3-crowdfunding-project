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

  const handleSubmit = async (e: React.SyntheticEvent): Promise<any> => {
    e.preventDefault();
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
        alert('Provide valid image URL');
        setForm({ ...form, [FieldName.image]: '' });
      }
    });
  };

  const handleFormFieldChange = (
    fieldName: FieldName,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  return (
    <div className="bg-stone-800 flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      {isSaving && <Loader />}

      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-stone-700 rounded-[10px]">
        <h1 className="font-bold sm:text-[25px] text-[18px] leading-[38px] text-stone-50">
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
        <div className="w-full flex justify-start items-center rounded-[10px] bg-indigo-500 p-4">
          <img src={money} className="w-[40px] h-[40px] object-contain" />
          <h4 className="font-epilogue font-bold text-[25px] text-stone-50 ml-[20px]">
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
            title={t('submit_campaign')}
            styles="bg-emerald-500"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateCampaign;
