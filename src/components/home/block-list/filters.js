import { memo } from "react"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import PropTypes from "prop-types"
import omit from "lodash/omit"
import ControlledCheckbox from "../../form/controlled_checkbox"
import ControlledTextField from "../../form/controlled_text_field"
import ControlledRangeInput from "../../form/controlled_range_input"
import ControlledSlider from "../../form/controlled_slider"
import ControlledRadio from "../../form/controlled_radio"

import iconSearch from "../../../assets/images/block-list/search-light.svg"
import iconFilter from "../../../assets/images/block-list/ic_filter.svg"
import { queryCustomFormFilter } from "../../../actions"

function Filters(props) {
  const { onFilter } = props
  const dispatch = useDispatch()
  const { control, getValues, handleSubmit, reset, formState } = useForm({
    defaultValues: {
      chain_id: "",
      category: "",
      kyc: false,
      entity: "",
      audit: "",
      votes: [0, 20],
      holders: [0, 100],
      ratings: []
    }
  })

  console.log("getValues", getValues(), formState)
  const handleFilters = (values) => {
    dispatch(
      queryCustomFormFilter(
        omit(values, ["kyc", "holders", "votes", "ratings"])
      )
    )
    console.log("values", values)
  }

  return (
    <div className="hidden md:block w-[362px] bg-[#191B2A] rounded-lg p-6">
      <form
        onSubmit={handleSubmit(handleFilters)}
        className="flex flex-col gap-y-8"
      >
        <div className="flex flex-row justify-between text-green-text-profile">
          <div className="flex flex-row items-center gap-x-[14px] text--bold-xl">
            <img src={iconFilter} className="icon" alt="icon" />
            Filter
          </div>
          <button
            className="sh_btn btn_secondary"
            onClick={() => {
              reset()
            }}
          >
            Clear
          </button>
        </div>
        <ControlledTextField
          control={control}
          label="Chain"
          placeholder="E.g. ETH, BSC..."
          name="chain_id"
          color="dark"
          startAdornment={<img src={iconSearch} className="icon" alt="icon" />}
          labelClassName="!text-base"
        />
        <ControlledTextField
          control={control}
          label="Category"
          placeholder="E.g. DeFi, NFT,..."
          name="category"
          color="dark"
          startAdornment={<img src={iconSearch} className="icon" alt="icon" />}
          labelClassName="!text-base"
        />

        <div className="flex flex-row items-end justify-between">
          <ControlledRadio
            control={control}
            label="KYC"
            name="kyc"
            text="Yes"
            id="kyc_yes"
            labelClassName="!text-base"
          />
          <ControlledRadio control={control} name="kyc" text="No" id="kyc_no" />
        </div>
        <ControlledTextField
          control={control}
          label="Entity"
          placeholder="E.g. DeFi,..."
          name="entity"
          color="dark"
          startAdornment={<img src={iconSearch} className="icon" alt="icon" />}
          labelClassName="!text-base"
        />
        <ControlledTextField
          control={control}
          label="Audit"
          placeholder="E.g. Ceritk, Hacken,..."
          name="audit"
          color="dark"
          startAdornment={<img src={iconSearch} className="icon" alt="icon" />}
          labelClassName="!text-base"
        />
        <ControlledSlider
          control={control}
          label="Votes"
          name="votes"
          color="dark"
          labelClassName="!text-base"
        />
        <ControlledRangeInput
          control={control}
          label="Holders"
          name="holders"
          color="dark"
          max={100}
          min={0}
          startAdornment={<img src={iconSearch} className="icon" alt="icon" />}
          labelClassName="!text-base"
          inputClassName="text-[14px]"
        />
        <div className="flex flex-row flex-wrap items-end justify-between gap-y-6">
          <ControlledCheckbox
            control={control}
            label="Rating"
            name="ratings"
            text="High"
            id="rating_high"
            labelClassName="!text-base"
          />
          <ControlledCheckbox
            control={control}
            name="rating"
            text="Low"
            id="rating_low"
          />
          <ControlledCheckbox
            control={control}
            name="rating"
            text="Medium"
            id="rating_medium"
          />
          <ControlledCheckbox
            control={control}
            name="rating"
            text="Lowest"
            id="rating_lowest"
          />
        </div>
        {/* <button type="submit">submit</button> */}
      </form>
    </div>
  )
}

Filters.propTypes = {
  onFilter: PropTypes.func
}

export default memo(Filters)
