import PropTypes from "prop-types";
import RowSocialLink from "../atoms/RowSocialLink";
import { capitalize } from "../../../../shared/utils/capitalize";
import { putRequest } from "../../../../shared/api/putRequest";
import { useToastContext } from "../../../../shared/contexts/ToastContext";
import isValidLink from "../../../../shared/utils/isValidLink";

const GridSocialLinksDetail = ({ client, setClient, isEditingAll }) => {
  const { showToast } = useToastContext();

  const supportedPlatforms = ["LINKEDIN", "INSTAGRAM", "FACEBOOK", "YOUTUBE"];

  const handleUpdateLink = async (platform, newUrl) => {
    if (!isValidLink(newUrl)) {
      showToast("Invalid URL format", "error");
      return;
    }
    const updatedLinks = [...client.socialLinks];
    const index = updatedLinks.findIndex((item) => item.platform === platform);

    if (index !== -1) {
      updatedLinks[index] = { ...updatedLinks[index], url: newUrl };
    } else {
      updatedLinks.push({ platform, url: newUrl });
    }

    const updatedClient = { ...client, socialLinks: updatedLinks };

    try {
      const res = await putRequest(`clients/${client.id}`, updatedClient);
      if (res.success) {
        setClient(updatedClient);
        showToast(`${capitalize(platform.toLowerCase())} updated`, "success");
      } else {
        showToast(`Error updating ${capitalize(platform)}`, "error");
        console.error("Error updating", res.error);
      }
    } catch (err) {
      console.error("Unexpected error", err);
      showToast(`Unexpected error updating ${capitalize(platform)}`, "error");
    }
  };

  const renderRows = supportedPlatforms.map((platform, index) => {
    const link = client.socialLinks.find((item) => item.platform === platform);
    return (
      <RowSocialLink
        key={platform}
        title={capitalize(platform)}
        icon={platform.toLowerCase()}
        url={link?.url || ""}
        border={index !== supportedPlatforms.length - 1}
        isEditingAll={isEditingAll}
        onConfirm={(val) => handleUpdateLink(platform, val)}
        valueFormat={`https://www.${platform}.com/example`}
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
  client: PropTypes.object,
  setClient: PropTypes.func,
  isEditingAll: PropTypes.bool,
};
