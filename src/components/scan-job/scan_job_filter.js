import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import ControlledCheckbox from "../../components/form/controlled_checkbox";
import ControlledTextField from "../../components/form/controlled_text_field";
import ControlledRangeInput from "../../components/form/controlled_range_input";
import ControlledSlider from "../../components/form/controlled_slider";
import ControlledRadio from "../../components/form/controlled_radio";

import iconSearch from "../../assets/images/block-list/search-light.svg";
import iconFilter from "../../assets/images/block-list/ic_filter.svg";
import { useSelector } from "react-redux";
import { FindType, selectSelectedTab } from "../../reducers/scanjob.reducer";
import ControlledRating from "../form/controlled_rating";

function ScanJobFilters(props) {
  const { onFilter } = props;
  const { control } = useForm({
    defaultValues: {
      search: "",
      country: "",
      rating: 0,
      rank: "",
      investment: [0, 0],
      partners: [0, 0],
      portfolio: [0, 0],
      industry: "",
      operatingstatus: false,
    },
  });

  const selectedTab = useSelector(selectSelectedTab);

  // const handleFilters = (values) => {
  //   onFilter && onFilter(values)
  // }

  return (
    <div className="hidden md:flex h-fit flex-wrap w-[362px] bg-[#191B2A] rounded-lg p-6">
      <div className="flex flex-col flex-1 gap-y-8">
        <div className="flex flex-row justify-between text-green-text-profile">
          <div className="flex flex-row items-center gap-x-[14px] text--bold-xl">
            {/* <img src={iconFilter} className="icon" alt="icon" /> */}
            Filter by:
          </div>
          {/* <button className="sh_btn btn_secondary">Clear(3)</button> */}
        </div>
        <ControlledTextField
          control={control}
          label="Search"
          placeholder="Job title, Skill, Company name"
          name="search"
          color="dark"
          startAdornment={<img src={iconSearch} className="icon" alt="icon" />}
          labelClassName="!text-base"
        />
        <ControlledTextField
          control={control}
          label="All Categories"
          placeholder="IT, Design, Sale,..."
          name="categories"
          color="dark"
          startAdornment={<img src={iconSearch} className="icon" alt="icon" />}
          labelClassName="!text-base"
        />
        <ControlledTextField
          control={control}
          label="All Locations"
          placeholder="United States, Canada,..."
          name="locations"
          color="dark"
          startAdornment={<img src={iconSearch} className="icon" alt="icon" />}
          labelClassName="!text-base"
        />
        <div className="flex flex-col items-start justify-between gap-y-6">
          <ControlledCheckbox
            control={control}
            label="Salary"
            name="salary"
            text="Less than 50"
            id="rating_high"
            labelClassName="!text-base"
          />
          <ControlledCheckbox
            control={control}
            name="salary"
            text="From 1000$"
            id="salary_low"
          />
          <ControlledCheckbox
            control={control}
            name="salary"
            text="From 3000$"
            id="salary_medium"
          />
          <ControlledCheckbox
            control={control}
            name="salary"
            text="From 5000$"
            id="salary_lowest"
          />
          <ControlledCheckbox
            control={control}
            name="salary"
            text="From 7000$"
            id="salary_lowest"
          />
          <ControlledCheckbox
            control={control}
            name="salary"
            text="Negotiable"
            id="salary_negotiable"
          />
        </div>
        <div className="flex flex-col items-start justify-between gap-y-6">
          <ControlledCheckbox
            control={control}
            label="Level"
            name="level"
            text="Student / Internship"
            id="rating_high"
            labelClassName="!text-base"
          />
          <ControlledCheckbox
            control={control}
            name="level"
            text="Entry level"
            id="level_entry"
          />
          <ControlledCheckbox
            control={control}
            name="level"
            text="Experienced (Non-Manager)"
            id="level_experienced"
          />
          <ControlledCheckbox
            control={control}
            name="level"
            text="Team Leader / Supervisor"
            id="level_leader"
          />
          <ControlledCheckbox
            control={control}
            name="level"
            text="Manager"
            id="level_manager"
          />
          <ControlledCheckbox
            control={control}
            name="level"
            text="Senior Manager"
            id="level_senior_manager"
          />
        </div>
        {selectedTab === FindType.TALENT && (
          <ControlledRating control={control} name="rating" label="Rating" />
        )}
        {/* <ControlledSlider
                    control={control}
                    label="Rank"
                    name="rank"
                    color="dark"
                    labelClassName="!text-base"
                />
                <ControlledRangeInput
                    control={control}
                    label="Number of Investment Received"
                    name="investment"
                    color="dark"
                    max={100}
                    min={0}
                    startAdornment={<img src={iconSearch} className="icon" alt="icon" />}
                    labelClassName="!text-base"
                    inputClassName="text-[14px]"
                />

                <ControlledRangeInput
                    control={control}
                    label="Partners"
                    name="partners"
                    color="dark"
                    max={100}
                    min={0}
                    startAdornment={<img src={iconSearch} className="icon" alt="icon" />}
                    labelClassName="!text-base"
                    inputClassName="text-[14px]"
                />

                <ControlledRangeInput
                    control={control}
                    label="Portfolio"
                    name="portfolio"
                    color="dark"
                    max={100}
                    min={0}
                    startAdornment={<img src={iconSearch} className="icon" alt="icon" />}
                    labelClassName="!text-base"
                    inputClassName="text-[14px]"
                />

                <ControlledTextField
                    control={control}
                    label="Industry"
                    placeholder="E.g. Finance, Blockchain,..."
                    name="industry"
                    color="dark"
                    startAdornment={<img src={iconSearch} className="icon" alt="icon" />}
                    labelClassName="!text-base"
                />

                <div className="flex flex-col items-start justify-between gap-y-6">
                    <ControlledRadio
                        control={control}
                        label="Operating Status"
                        name="operatingstatus"
                        text="Active"
                        id="kyc_yes"
                        labelClassName="!text-base"
                    />
                    <ControlledRadio control={control} name="kyc" text="Close" id="kyc_no" />
                </div> */}
      </div>
    </div>
  );
}

ScanJobFilters.propTypes = {
  onFilter: PropTypes.func,
};

export default ScanJobFilters;
