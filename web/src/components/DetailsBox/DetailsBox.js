const DetailsBox = ({ items, heading }) => {
  return (
    <div className="detailsBox flex flex-col">
      <div className="detailsBox__heading-wrapper">
        <p className="detailsBox__heading-text">{heading}</p>
      </div>
      <div className="detailsBox__items-wrapper">
        {items.map((item, i) => (
          <p className="detailsBox__item" key={i}>
            {item}
          </p>
        ))}
      </div>
    </div>
  )
}

export default DetailsBox
