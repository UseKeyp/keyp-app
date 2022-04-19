import { Link, routes } from '@redwoodjs/router'

import Icon from 'src/components/Icon/Icon'

const SeeMore = ({ to = routes.treasures() }) => {
  return (
    <Link
      to={to}
      className="w-[266px] h-[485px] flex flex-col items-center justify-center space-y-6 cursor-pointer bg-chessBlack-300 rounded-xl ease-in-out duration-300 shadow-xl hover:shadow-2xl hover:scale-[1.05] hover:no-underline"
    >
      <Icon name="treasure_chess" color="#ffffff" height="60px" />
      <h3 className="font-semibold text-grey">See More</h3>
    </Link>
  )
}

export default SeeMore
