import React from 'react';

type FormFieldType = {
  labelName: string;
  placeholder: string;
  inputType?: string;
  isTextArea: boolean;
  value: string;
  handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  >;
};

const FormField: React.FC<FormFieldType> = ({
  labelName,
  placeholder,
  inputType,
  isTextArea,
  value,
  handleChange,
}) => {
  return (
    <label className="flex-1 w-full flex flex-col">
      {labelName && (
        <span className=" font-medium text-[14px] leading-[22px] dark:text-stone-300 text-stone-900 mb-[10px]">
          {labelName}
        </span>
      )}
      {isTextArea ? (
        <textarea
          required
          value={value}
          onChange={handleChange}
          rows={10}
          placeholder={placeholder}
          className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] dark:border-stone-500 border-stone-400 focus:dark:border-stone-50 focus:border-stone-900 bg-transparent  dark:text-stone-50 text-stone-900 text-[14px] placeholder:text-stone-500 rounded-[10px] sm:min-w-[300px]"
        />
      ) : (
        <input
          required
          value={value}
          onChange={handleChange}
          type={inputType}
          step="0.1"
          min="0"
          placeholder={placeholder}
          className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] dark:border-stone-500 border-stone-400 focus:dark:border-stone-50 focus:border-stone-900 bg-transparent  dark:text-stone-50 text-stone-900 text-[14px] placeholder:text-stone-500 rounded-[10px] sm:min-w-[300px]"
        />
      )}
    </label>
  );
};

export default FormField;
