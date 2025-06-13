import PropTypes from "prop-types";
import { Button } from "../../../../shared/components/atoms/Button";
import Icon from "../atoms/Icon";

export default function CertificationCard({ certification, onEdit }) {
  const handleEditClick = () => {
    if (onEdit) {
      onEdit(certification);
    } else {
      console.error("onEdit function is not provided");
    }
  };

  return (
    <div className="flex p-4 gap-3 justify-between bg-[#D7E6FD] text-[#2525252] rounded-2xl">
      <div className="flex gap-5">
        <Icon icon={"certification"} className="w-8 h-8 mt-1" />
        <div className="">
          <div className="text-xl font-bold justify-between">
            {certification.name} - {certification.year}
          </div>
          <span className="text-lg font-light">
            {certification.institution}
          </span>
        </div>
      </div>
      <Button
        styleType="editBtn"
        classname="w-12 h-8"
        onClick={handleEditClick}
      >
        <Icon icon={"edit"} className="w-5 h-5" />
      </Button>
    </div>
  );
}

CertificationCard.propTypes = {
  certification: PropTypes.shape({
    year: PropTypes.number.isRequired,
    name: PropTypes.string,
    institution: PropTypes.string,
  }).isRequired,
  onEdit: PropTypes.func,
};
