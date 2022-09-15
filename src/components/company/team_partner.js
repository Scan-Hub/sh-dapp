import PropTypes from "prop-types"
import clsx from "clsx"
import ControlledTextField from "../form/controlled_text_field"
import ControlledGridUploadImage from "../form/controlled_grid_upload"
import ControlledSelect from "../form/controlled_select"

function CompanyTeamAndPartner(props) {
  const { formProps, className } = props
  const { control } = formProps

  return (
    <div className={clsx("w-full", className)}>
      <div className="mb-[60px]">
        <div className="text--bold-xl text-green-text-profile mb-6">
          Team Member
        </div>
        <div className="flex flex-row gap-x-[102px]">
          <div className="w-[364px] pt-3">
            <ControlledGridUploadImage
              name="company_team_members"
              control={control}
            />
          </div>
          <div className="flex flex-col grow-[2] gap-y-6">
            <ControlledTextField
              control={control}
              required
              label="Name"
              placeholder="Enter name"
              name="company_member_name"
            />
            <ControlledTextField
              control={control}
              required
              label="Title"
              placeholder="Enter title"
              name="company_member_title"
            />
            <ControlledTextField
              control={control}
              required
              label="Email"
              placeholder="Enter email"
              name="company_member_email"
            />
            <ControlledTextField
              control={control}
              label="Phone"
              placeholder="Enter phone number"
              name="company_member_phone"
            />
            <ControlledTextField
              control={control}
              label="Linkedin"
              placeholder="Add Linkedin"
              name="company_member_linkedin"
            />
          </div>
        </div>
      </div>
      <div>
        <div className="text--bold-xl text-green-text-profile mb-6">
          Partners
        </div>
        <div className="flex flex-row gap-x-[102px]">
          <div className="w-[364px] pt-3">
            <ControlledGridUploadImage
              name="company_partners"
              control={control}
            />
          </div>
          <div className="flex flex-col grow-[2] gap-y-6">
            <ControlledTextField
              control={control}
              required
              label="Name"
              placeholder="Enter name"
              name="company_partner_name"
            />
            <ControlledTextField
              control={control}
              required
              label="Website"
              placeholder="Enter link"
              name="company_partner_website"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

CompanyTeamAndPartner.propTypes = {
  className: PropTypes.string,
  formProps: PropTypes.object
}

export default CompanyTeamAndPartner
