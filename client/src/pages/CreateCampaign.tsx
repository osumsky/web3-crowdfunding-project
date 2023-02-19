import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import { money } from '../assets';
import { CustomButton, FormField } from '../components';
import { checkIfImage } from '../utils';

enum FieldName {
  name = 'name',
  title = 'title',
  description = 'description',
  target = 'target',
  deadline = 'deadline',
  image = 'image',
}

type FormType = {
  [FieldName.name]: string;
  [FieldName.title]: string;
  [FieldName.description]: string;
  [FieldName.target]: string;
  [FieldName.deadline]: string;
  [FieldName.image]: string;
};

const defaultForm: FormType = {
  name: '',
  title: '',
  description: '',
  target: '',
  deadline: '',
  image: '',
};

const CreateCampaign = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState(defaultForm);
  const handleSubmit = (e: React.FormEvent<SubmitEvent>) => {
    e.preventDefault();
  };
  const handleFormFieldChange = (
    fieldName: FieldName,
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  return (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      {isLoading && 'Loading...'}
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">
          Start a Campaign
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full mt-[65px] flex flex-col gap-[30px]"
      >
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Your Name *"
            placeholder="John Doe"
            inputType="text"
            value={form.name}
            handleChange={(e) => handleFormFieldChange(FieldName.name, e)}
            isTextArea={false}
          />
          <FormField
            labelName="Campaign Title *"
            placeholder="Write a title"
            inputType="text"
            value={form.title}
            handleChange={(e) => handleFormFieldChange(FieldName.title, e)}
            isTextArea={false}
          />
        </div>

        <FormField
          labelName="Story *"
          placeholder="Write your story"
          value={form.description}
          handleChange={(e) => handleFormFieldChange(FieldName.description, e)}
          isTextArea={true}
        />

        {/* Money banner */}
        <div className="w-full flex justify-start items-center rounded-[10px] bg-[#8c6dfd] p-4">
          <img src={money} className="w-[40px] h-[40px] object-contain" />
          <h4 className="font-epilogue font-bold text-[25px] text-white ml-[20px]">
            You will get 100% of the raised amount
          </h4>
        </div>

        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Target *"
            placeholder="ETH 0.5"
            inputType="number"
            value={form.target}
            handleChange={(e) => handleFormFieldChange(FieldName.target, e)}
            isTextArea={false}
          />
          <FormField
            labelName="End Date *"
            placeholder="End Date"
            inputType="date"
            value={form.deadline}
            handleChange={(e) => handleFormFieldChange(FieldName.deadline, e)}
            isTextArea={false}
          />
          <FormField
            labelName="Campaign image *"
            placeholder="Place image URL of your campaign"
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
            title="Submit new campaign"
            styles="bg-[#1dc071]"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateCampaign;
