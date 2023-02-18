import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import { money } from '../assets';
import { CustomButton, FormField } from '../components';
import { checkIfImage } from '../utils';

type FormType = {
  name: string;
  title: string;
  description: string;
  target: string;
  deadline: string;
  image: string;
};

const defaultForm: FormType = {
  name: '',
  title: '',
  description: '',
  target: '',
  deadline: '',
  image: '',
};

enum FieldName {
  name = 'name',
  title = 'title',
  description = 'description',
  target = 'target',
  deadline = 'deadline',
  image = 'image',
}

const CreateCampaign = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState(defaultForm);
  const handleSubmit = () => null;
  const handleChange = () => null;

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
            fieldName={FieldName.name}
            labelName="Your Name *"
            placeholder="John Doe"
            inputType="text"
            value={form.name}
            handleChange={handleChange}
            isTextArea={false}
          />
          <FormField
            fieldName={FieldName.title}
            labelName="Campaign Title *"
            placeholder="Write a title"
            inputType="text"
            value={form.title}
            handleChange={handleChange}
            isTextArea={false}
          />
        </div>
        <FormField
          fieldName={FieldName.description}
          labelName="Story *"
          placeholder="Write your story"
          value={form.description}
          handleChange={handleChange}
          isTextArea={true}
        />
        <div className='w-full flex justify-start items-center rounded-[10px] bg-[#8c6dfd] p-4'>
          <img src={money} className="w-[40px] h-[40px] object-contain" />
          <h4 className='font-epilogue font-bold text-[25px] text-white ml-[20px]'>You will get 100% of the raised amount</h4>
        </div>
      </form>
    </div>
  );
};

export default CreateCampaign;
