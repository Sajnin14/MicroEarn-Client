import PropTypes from 'prop-types';


const SectionTitle = ({heading, subHeading}) => {
    return (
        <div className='text-center my-10'>
            <p className="text-[#FFC107] font-semibold italic">{subHeading}</p>
            <h3 className="text-3xl font-bold">{heading}</h3>
            
        </div>
    );
};

SectionTitle.propTypes = {
    heading: PropTypes.str,
    subHeading: PropTypes.str,
}

export default SectionTitle;