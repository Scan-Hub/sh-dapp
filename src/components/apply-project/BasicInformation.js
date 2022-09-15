import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFormTypes } from "../../actions/form.actions";
import {
  selectAuditCompanyTypes,
  selectCategoryTypes,
  selectChain,
} from "../../reducers/form.reducer";
import DatePickerComponent from "../global/DatePicker";
import { Input } from "../global/Input";
import SelectBox from "../global/SelectBox";
import SelectTagsField from "../global/SelectTagsField";
import InputSmartContract from "./InputSmartContract";
import "./styles.scss";

const listingStatus = [
  { id: "Yes", name: "Yes" },
  { id: "No", name: "No" },
];

const defaultSmartContracts = [{ id: 1, chain: "", contract: "" }];

const BasicInformation = ({ errors, register, reset, setValue, control }) => {
  const dispatch = useDispatch();

  const listChain = useSelector(selectChain);
  const listCategoryTypes = useSelector(selectCategoryTypes);
  const listAuditCompanyTypes = useSelector(selectAuditCompanyTypes);

  const [smartContracts, setSmartContracts] = useState(defaultSmartContracts);

  const onAddMoreContract = () => {
    let tempContracts = [].concat(smartContracts);
    let defaultObject = {
      id: smartContracts.length + 1,
      chain: "",
      contract: "",
    };
    tempContracts.push(defaultObject);
    setSmartContracts(tempContracts);
  };
  const onGetFormType = useCallback(() => {
    dispatch(fetchFormTypes());
  }, [dispatch]);

  useEffect(() => {
    onGetFormType();
  }, [onGetFormType]);
  return (
    <div>
      <p className="sm:text-xl text-lg font-montserrat_semi_bold font-bold text-green-text-profile sm:mt-24 mt-14">
        Basic Information
      </p>
      <div className="sm:mt-12 mt-10 flex flex-row w-full sm:space-x-12 space-x-6 items-start">
        <SelectTagsField
          required
          className={"w-full space-y-3"}
          title={"Category Type"}
          data={listCategoryTypes}
          name="category_type_sector"
          setValue={setValue}
          error={errors.category_type_sector}
        />
        <SelectTagsField
          required
          className={"w-full space-y-3"}
          title={"Audit Company"}
          data={listAuditCompanyTypes}
          name="audit_company_sector"
          setValue={setValue}
          error={errors.audit_company_sector}
        />
      </div>

      <div className="sm:mt-12 mt-10 flex flex-row items-center w-full sm:space-x-12 space-x-6">
        <SelectBox
          type={"jsonArr"}
          required
          className={"w-full max-w-[273px]"}
          reset={reset}
          register={register}
          setValue={setValue}
          title={"Listing Status"}
          options={listingStatus}
          name={"listing_status"}
          placeholder={"Select"}
          error={errors.listing_status}
          control={control}
        />
        <Input
          reset={reset}
          register={register}
          name={"token_symbol"}
          title={"Token Symbol"}
          placeholder={"Add symbol"}
          error={errors.token_symbol}
        />
        <DatePickerComponent
          required
          className="w-full"
          reset={reset}
          register={register}
          setValue={setValue}
          title={"Launch Date"}
          name={"launching_date"}
          placeholder={"Choose a date"}
          error={errors?.launching_date}
          control={control}
        />
      </div>
      <div className="sm:mt-12 mt-10 flex flex-row w-full sm:space-x-12 space-x-6 items-end">
        <div className="w-full sm:space-y-8 space-y-4">
          {smartContracts.map((_, index) => (
            <div key={index} className="w-full">
              <InputSmartContract
                index={index}
                reset={reset}
                errors={errors}
                setValue={setValue}
                control={control}
                register={register}
                chainsOption={listChain ? listChain : []}
              />
            </div>
          ))}
        </div>
        <button
          type="button"
          className="flex justify-center items-center min-w-[48px] w-12 h-12 bg-[#191B2A] rounded-lg cursor-pointer"
          onClick={onAddMoreContract}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default BasicInformation;
