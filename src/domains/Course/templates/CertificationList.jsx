import PropTypes from "prop-types";
import CertificationCard from "../organisms/CertificationCard";

export default function CertificationList({ certifications }) {
  return (
    <div>
      {certifications &&
        certifications.map((certification, index) => (
          <CertificationCard key={index} certification={certification} />
        ))}
    </div>
  );
}

CertificationList.propTypes = {
  certifications: PropTypes.arrayOf(
    PropTypes.shape({
      year: PropTypes.number.isRequired,
      name: PropTypes.string,
      acreditedBy: PropTypes.string,
    })
  ).isRequired,
};
