import PropTypes from "prop-types";
import RowDetail from "../atoms/RowDetail";
import { formatDate } from "../../../../shared/utils/formatDate";
import { putRequest } from "../../../../shared/api/putRequest";
import { useToastContext } from "../../../../shared/contexts/ToastContext";
import { capitalize } from "../../../../shared/utils/capitalize";

const GridPersonalDetail = ({ client, setClient }) => {
  const { showToast } = useToastContext();

  const handleUpdateField = async (field, value) => {
    const updatedClient = { ...client, [field]: value };

    try {
      const res = await putRequest(`clients/${client.id}`, updatedClient);
      if (res.success) {
        setClient(updatedClient);
        showToast(`${capitalize(field)} updated`, "success");
      } else {
        showToast(`Error updating ${capitalize(field)}`, "error");
        console.error("Error updating", res.error);
      }
    } catch (err) {
      console.error("Unexpected error", err);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-y-2 p-2 text-[color:var(--color-default-300)]">
      <RowDetail
        title="Date of Birth"
        value={formatDate(client.dateOfBirth)}
        isEditable={true}
        onConfirm={(val) => handleUpdateField("dateOfBirth", val)}
        valueFormat={"YYYY-MM-DD"}
      />
      <RowDetail
        title="Gender"
        value={client.gender && capitalize(client.gender)}
        isEditable={true}
        onConfirm={(val) => handleUpdateField("gender", val.toLowerCase())}
        valueFormat={"Male, Female, Other"}
      />
      <RowDetail
        title="Country"
        value={client.country}
        isEditable={true}
        onConfirm={(val) => handleUpdateField("country", val)}
        valueFormat={"Bolivia"}
      />
      <RowDetail
        title="City"
        value={client.city}
        isEditable={true}
        onConfirm={(val) => handleUpdateField("city", val)}
        valueFormat={"La Paz"}
      />
      <RowDetail
        title="Phone number"
        value={client.phoneNumber}
        isEditable={true}
        onConfirm={(val) => handleUpdateField("phoneNumber", val)}
        border={false}
        valueFormat={"+54 911 1234-5678"}
      />
    </div>
  );
};
export default GridPersonalDetail;

GridPersonalDetail.propTypes = {
  client: PropTypes.object,
  setClient: PropTypes.func,
};
