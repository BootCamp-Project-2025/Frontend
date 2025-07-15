import PropTypes from "prop-types";
import RowDetail from "../atoms/RowDetail";

const GridPersonalDetail = ({ userName, client }) => {
  return (
    <div className="grid grid-cols-1 gap-y-2 p-2 text-[color:var(--color-default-300)]">
      <RowDetail title="Full name" value={userName} isEditable={true} />
      <RowDetail
        title="Date of Birth"
        value={client.dateOfBirth}
        isEditable={true}
      />
      <RowDetail title="Gender" value={client.gender} isEditable={true} />
      <RowDetail title="Country" value={client.country} isEditable={true} />
      <RowDetail title="City" value={client.city} isEditable={true} />
      <RowDetail
        title="Phone number"
        value={client.phoneNumber}
        isEditable={true}
      />
      <RowDetail
        title="Language preference"
        value={client.languagePreference}
        border={false}
        isEditable={true}
      />
    </div>
  );
};

export default GridPersonalDetail;

GridPersonalDetail.propTypes = {
  userName: PropTypes.string.isRequired,
  client: PropTypes.shape({
    phoneNumber: PropTypes.string,
    country: PropTypes.string,
    city: PropTypes.string,
    gender: PropTypes.string,
    dateOfBirth: PropTypes.bool,
    socialLinks: PropTypes.arrayOf(PropTypes.string),
    languagePreference: PropTypes.string,
  }),
};
