import PropTypes from "prop-types";
import RowSocialLink from "../atoms/RowSocialLink";
import { capitalize } from "../../../../shared/utils/capitalize";

const GridSocialLinksDetail = ({ socialLinks, isEditingAll }) => {
  const supportedPlatforms = ["linkedin", "instagram", "facebook", "youtube"];

  const renderRows = supportedPlatforms.map((platform, index) => {
    const link = socialLinks.find(
      (item) => item.platform.toLowerCase() === platform
    );

    return (
      <RowSocialLink
        key={platform}
        title={capitalize(platform)}
        icon={platform}
        url={link?.url || "-"}
        border={index !== supportedPlatforms.length - 1}
        isEditingAll={isEditingAll}
      />
    );
  });

  return (
    <div className="grid grid-cols-1 gap-y-2 p-2 px-8 text-[color:var(--color-default-300)]">
      {renderRows}
    </div>
  );
};

export default GridSocialLinksDetail;

GridSocialLinksDetail.propTypes = {
  socialLinks: PropTypes.arrayOf(PropTypes.string),
  isEditingAll: PropTypes.bool,
};
