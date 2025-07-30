import PropTypes from "prop-types";
import { Icon } from "../../../../shared/components/atoms/Icon";

/**
 * Renders buttons that have a function, if a button doesnt have a function it doesnt render
 * @param {*} edit Edit function, shows as a pencil
 * @param {*} erase Erase function, shows as a trash can
 * @param {*} complete Complete function, shows as a check
 */
export default function P2PCardButtons({ edit, erase, complete }) {
  return (
    <div className="flex ">
      {edit ? (
        <button
          data-testid="edit"
          onClick={edit}
          className="hover:cursor-pointer mr-4"
        >
          <Icon className="w-5 h-5" icon={"edit"} />
        </button>
      ) : (
        <></>
      )}
      {erase ? (
        <button
          data-testid="erase"
          onClick={erase}
          className="hover:cursor-pointer mr-4"
        >
          <Icon className="w-5 h-5" icon={"delete"} />
        </button>
      ) : (
        <></>
      )}
      {complete ? (
        <button
          data-testid="complete"
          onClick={complete}
          className="hover:cursor-pointer  ml-auto"
        >
          <Icon className="w-5 h-5" icon={"checkSyllabus"} />
        </button>
      ) : (
        <></>
      )}
    </div>
  );
}

P2PCardButtons.propTypes = {
  edit: PropTypes.func,
  erase: PropTypes.func,
  complete: PropTypes.func,
};
