import Icon from 'src/components/Icon/Icon'

import packageInfo from '../../../package.json'

export const Footer = ({ title, links }) => {
  return (
    <div className="mb-12 flex w-full flex-row justify-between border-t border-gray-300 pt-4">
      <div className="flex flex-row items-center gap-x-[5.57px] sm:gap-y-0">
        <Icon name="keypnameandlogo" height="14px" width="32px" />
        <h1 className="flex text-[12px] font-light text-blue-1200">{title}</h1>
        {packageInfo?.version ? (
          <div className="text-[12px] text-gray-400">
            v.{packageInfo?.version}
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="flex flex-row gap-x-4 font-light text-blue-1200">
        {links?.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            className="flex text-[12px] hover:text-blue-1600"
            rel="noreferrer"
          >
            {link.title}
          </a>
        ))}
      </div>
    </div>
  )
}
