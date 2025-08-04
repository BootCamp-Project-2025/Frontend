import { NavLink } from "react-router-dom";
import { Title } from "../../../../shared/components/atoms/Title";
import { useCallback, useRef } from "react";
import { Button } from "../../../../shared/components/atoms/Button";
import PropTypes from "prop-types";

export default function P2PNavbar({ save }) {
  const postRef = useRef();
  const filesRef = useRef();

  const handleSave = useCallback(() => {
    if (postRef.current.ariaCurrent !== null) {
      save("POST");
    }
    if (filesRef.current.ariaCurrent !== null) {
      save("FILE");
    }
  }, [save]);

  const getClassName = useCallback(
    ({ isActive }) => (isActive ? "p2pNavbar-active border-b-2 px-5" : "px-5"),
    []
  );

  return (
    <div className="flex mb-4">
      <NavLink ref={postRef} className={getClassName} to={"posts"}>
        <Title color="default" size="xl">
          Publications
        </Title>
      </NavLink>
      <NavLink ref={filesRef} className={getClassName} to={"files"}>
        <Title color="default" size="xl">
          Files
        </Title>
      </NavLink>
      {save ?? (
        <Button
          onClick={handleSave}
          className="ml-auto"
          radius="full"
          variant="bordered"
        >
          +
        </Button>
      )}
    </div>
  );
}

P2PNavbar.propTypes = {
  save: PropTypes.func,
};
