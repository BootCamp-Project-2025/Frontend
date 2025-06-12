import PropTypes from "prop-types";
import { Button } from "../../../../shared/components/atoms/Button";

export const LanguageCard = ({ id, name, proficiency, editCard }) => (
  <div
    className="bg-[#D7E6FD] p-4 rounded-lg flex items-center justify-between"
    data-testid="language-card"
  >
    <div className="flex flex-col">
      <p className="font-semibold text-gray-800">{name}</p>
      <p className="text-gray-600">{proficiency}</p>
    </div>
    <Button
      styleType="editBtn"
      classname="text-white"
      onClick={() => editCard(id)}
    >
      <span className="material-symbols-outlined">edit</span>
    </Button>
  </div>
);

LanguageCard.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  proficiency: PropTypes.string.isRequired,
  editCard: PropTypes.func.isRequired,
};
