const ExpandArrow = ({ expanded, hover }) => {

    
    return (
        <div className="domainArrowDiv"
            onClick={() => setExpanded(!expanded)}
        >
            {domainSettings.active ? <BsCaretRightFill className="domainLine__arrow" /> : <BsCaretRightFill style={{ color: "grey" }} />}
        </div>
    )
}

export default ExpandArrow
