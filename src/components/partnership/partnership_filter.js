import { useForm } from "react-hook-form"
import PropTypes from "prop-types"
import ControlledCheckbox from "../../components/form/controlled_checkbox"
import ControlledTextField from "../../components/form/controlled_text_field"
import ControlledRangeInput from "../../components/form/controlled_range_input"
import ControlledSliderCustom from "../../components/form/controlled_slider_custom"
import ControlledRadio from "../../components/form/controlled_radio"

import iconSearch from "../../assets/images/block-list/search-light.svg"
import iconFilter from "../../assets/images/block-list/ic_filter.svg"

function PartnershipFilters(props) {
    const { onFilter } = props
    const { control } = useForm({
        defaultValues: {
            country: "",
            rating: "",
            rank: "",
            investment: [0, 0],
            partners: [0, 0],
            portfolio: [0, 0],
            industry: "",
            operatingstatus: false
        }
    })

    // const handleFilters = (values) => {
    //   onFilter && onFilter(values)
    // }

    return (
        <div className="hidden md:block w-[362px] bg-[#191B2A] rounded-lg p-6">
            <div className="flex flex-col gap-y-8">
                <div className="flex flex-row justify-between text-green-text-profile">
                    <div className="flex flex-row items-center gap-x-[14px] text--bold-xl">
                        <img src={iconFilter} className="icon" alt="icon" />
                        Filter
                    </div>
                    <button className="sh_btn btn_secondary">Clear(3)</button>
                </div>
                <ControlledTextField
                    control={control}
                    label="Country"
                    placeholder="E.g. US, Canada,..."
                    name="country"
                    color="dark"
                    startAdornment={<img src={iconSearch} className="icon" alt="icon" />}
                    labelClassName="!text-base"
                />
                <div className="flex flex-col items-start justify-between gap-y-6">
                    <ControlledCheckbox
                        control={control}
                        label="Rating"
                        name="rating"
                        text="Less than 50"
                        id="rating_high"
                        labelClassName="!text-base"
                    />
                    <ControlledCheckbox
                        control={control}
                        name="rating"
                        text="51 to 200"
                        id="rating_low"
                    />
                    <ControlledCheckbox
                        control={control}
                        name="rating"
                        text="201 to 1000"
                        id="rating_medium"
                    />
                    <ControlledCheckbox
                        control={control}
                        name="rating"
                        text="1001 to 5000"
                        id="rating_lowest"
                    />
                    <ControlledCheckbox
                        control={control}
                        name="rating"
                        text="More than 5000"
                        id="rating_lowest"
                    />
                </div>
                <ControlledSliderCustom
                    control={control}
                    label="Rank"
                    name="rank"
                    color="dark"
                    labelClassName="!text-base"
                    min={0}
                    max={5000}
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
                        id="operating_yes"
                        labelClassName="!text-base"
                    />
                    <ControlledRadio control={control} name="operatingstatus" text="Close" id="operating_no" />
                </div>
            </div>
        </div>
    )
}

PartnershipFilters.propTypes = {
    onFilter: PropTypes.func
}

export default PartnershipFilters
