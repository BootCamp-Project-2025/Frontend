import { NavLink } from "react-router-dom";
import { Title } from "../../../../shared/components/atoms/Title";
import { useCallback, useRef } from "react";
import { Button } from "../../../../shared/components/atoms/Button";
import PropTypes from "prop-types";

export default function P2PNavbar({ save }) {
  const postRef = useRef();
  const filesRef = useRef();

  const handleCreate = useCallback(() => {
    if (postRef.current.ariaCurrent !== null) {
      save("POST");
    }
    if (filesRef.current.ariaCurrent !== null) {
      save("FILE");
    }
  }, [save]);

  return (
    <div className="flex mb-4">
      <NavLink
        ref={postRef}
        className={({ isActive }) =>
          isActive ? "p2pNavbar-active border-b-2 px-5" : "px-5"
        }
        to={"posts"}
      >
        <Title color="default" size="xl">
          Publications
        </Title>
      </NavLink>
      <NavLink
        ref={filesRef}
        className={({ isActive }) =>
          isActive ? "p2pNavbar-active border-b-2 px-5" : "px-5"
        }
        to={"files"}
      >
        <Title color="default" size="xl">
          Files
        </Title>
      </NavLink>
      <Button
        onClick={handleCreate}
        className="ml-auto"
        radius="full"
        variant="bordered"
      >
        +
      </Button>
    </div>
  );
}

P2PNavbar.propTypes = {
  save: PropTypes.func,
};
