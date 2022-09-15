import PropTypes from "prop-types"
import clsx from "clsx"

import IcTelegram from "../../assets/images/profile/telegram.svg"
import IcTwitter from "../../assets/images/profile/twitter.svg"

import ControlledTextField from "../form/controlled_text_field"
import ControlledGridUploadImage from "../form/controlled_grid_upload"
import ControlledSelect from "../form/controlled_select"
function CompanyPortfolio(props) {
  const { formProps, className } = props
  const { control } = formProps

  return (
    <div className={clsx("w-full", className)}>
      <div className="flex flex-row gap-x-8 mb-8">
        <ControlledTextField
          control={control}
          required
          label="Number of Investment Received"
          placeholder="Enter number"
          name="company_investment_received"
        />
        <ControlledTextField
          control={control}
          required
          label="Total Fund Received"
          placeholder="$ 1 000 000"
          name="company_total_fund_received"
        />
      </div>
      <div>
        <div className="text--semibold-xl text-green-text-profile mb-6">
          Portfolio
        </div>
        <div className="flex flex-row gap-x-[102px]">
          <div className="min-w-[364px] pt-3">
            <ControlledGridUploadImage
              name="company_portfolio"
              control={control}
            />
          </div>
          <div className="flex flex-col grow-[2] gap-y-6">
            <ControlledTextField
              control={control}
              required
              label="Project name"
              placeholder="Enter name"
              name="company_project_name"
            />
            <ControlledTextField
              control={control}
              required
              label="Website"
              placeholder="Enter link"
              name="company_website"
            />
            <div className="flex flex-row w-full items-end space-x-4">
              <ControlledTextField
                required
                control={control}
                label="Social Media"
                startAdornment={
                  <img src={IcTelegram} className="icon" alt="icon" />
                }
                placeholder="Add Telegram link"
                name="community.telegram"
              />
              <ControlledTextField
                control={control}
                startAdornment={
                  <img src={IcTwitter} className="icon" alt="icon" />
                }
                placeholder={"Add Twitter link"}
                name="community.twitter"
              />
            </div>
            <ControlledSelect
              label="Status of the project"
              control={control}
              options={[]}
              placeholder={"Select status"}
              name="company_status_of_project"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

CompanyPortfolio.propTypes = {
  formProps: PropTypes.object,
  className: PropTypes.string
}

export default CompanyPortfolio
