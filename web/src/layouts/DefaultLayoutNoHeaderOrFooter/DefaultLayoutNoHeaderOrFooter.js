const DefaultLayoutNoHeaderOrFooter = ({ children }) => {
  return (
    <div>
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow">
          <div className="max-w-7xl mx-4 sm:mx-auto px-0 sm:px-4 sm:max-w-screen">
            <div className="min-h-screen mb-15 md:mb-0">{children}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DefaultLayoutNoHeaderOrFooter
