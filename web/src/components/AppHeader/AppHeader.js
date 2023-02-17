/**
 * Generic header for a studio's apps
 * @returns {JSX.Element} header component
 * @constructor
 */
const AppHeader = ({ title, links }) => {
  return (
    <div className="flex w-full flex-row justify-between border-t border-gray-300 pt-2">
      <div className="text-2xl font-bold text-gray-800">{title}</div>
      <div className="flex flex-row gap-x-4 font-light text-blue-1200">
        {links?.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            className="flex text-sm hover:text-blue-1600"
            rel="noreferrer"
          >
            {link.title}
          </a>
        ))}
      </div>
    </div>
  )
}

export default AppHeader
