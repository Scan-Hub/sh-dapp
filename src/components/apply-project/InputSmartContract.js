import React from "react";
import { Input } from "../global/Input";
import SelectChain from "./SelectChain";

const InputSmartContract = ({
  index,
  reset,
  control,
  errors,
  register,
  setValue,
  chainsOption,
}) => {
  return (
    <div className="w-full flex flex-row items-center sm:space-x-12 space-x-6">
      <div className="w-full max-w-[273px]">
        <SelectChain
          className={"w-full"}
          reset={reset}
          register={register}
          setValue={setValue}
          title={"Chain"}
          options={chainsOption}
          name={`smart_contracts.${index}.chain`}
          placeholder={"Select"}
          error={errors.smart_contracts && errors.smart_contracts[index]?.chain}
          control={control}
        />
      </div>
      <Input
        reset={reset}
        register={register}
        name={`smart_contracts.${index}.contract`}
        title={"Smart Contract"}
        placeholder={"Insert"}
        error={
          errors.smart_contracts && errors.smart_contracts[index]?.contract
        }
      />
    </div>
  );
};

export default InputSmartContract;
