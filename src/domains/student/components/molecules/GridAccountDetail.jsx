import { formatDate } from "../../../../shared/utils/formatDate";
import { formatRoles } from "../../../../shared/utils/formatRoles";
import RowDetail from "../atoms/RowDetail";
import PropTypes from "prop-types";

const GridAccountDetail = ({ user, coursesCompleted }) => {
  const formatedCreatedAt = formatDate(user.createdAt);
  const formatedRoles = formatRoles(user.roles).join(", ");
  return (
    <div className="grid grid-cols-1 gap-y-2 p-2 text-[color:var(--color-default-300)]">
      <RowDetail
        title="Account created"
        value={formatedCreatedAt}
        isEditable={false}
      />
      <RowDetail
        title="Account type"
        value={formatedRoles}
        isEditable={false}
      />
      <RowDetail
        title="Courses completed"
        value={coursesCompleted}
        border={false}
        isEditable={false}
      />
    </div>
  );
};

export default GridAccountDetail;

GridAccountDetail.propTypes = {
  user: PropTypes.shape({
    roles: PropTypes.arrayOf(PropTypes.string).isRequired,
    createdAt: PropTypes.string.isRequired,
  }),
  coursesCompleted: PropTypes.number.isRequired,
};
