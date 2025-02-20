import PropTypes from 'prop-types';

const Header = ({title}) => {
  return (
    <h1 className="text-2xl font-bold mb-4 text-center">{title}</h1>
  )
}

Header.propTypes = {
    title: PropTypes.string.isRequired
};

export default Header
