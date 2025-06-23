import PropTypes from "prop-types";
export default function Layout({ children }) {
  return <div className="px-20 py-4">{children}</div>;
}
Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
