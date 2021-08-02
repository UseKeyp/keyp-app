import GameCard from './GameCard'

const TEST_PLAYER_DATA = [
  {
    username: 'Pi0neerPat',
    userNumber: 1977,
    countryCode: 'ar',
    isGrandMaster: true,
    profilePicSrc:
      'https://static.photocdn.pt/images/articles/2019/08/07/images/articles/2019/07/31/linkedin_profile_picture_tips-1.jpg',
  },
  {
    username: 'Josephs',
    userNumber: 2103,
    countryCode: 'us',
    isGrandMaster: true,
    profilePicSrc:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTP15FZfst0-N18LQ-T8PoeLOp4b2aJ2J07hA&usqp=CAU',
  },
]

const TEST_NOTABLE_FEATURES = [
  'Knight Under-promotion',
  'Pawn Checkmate',
  'Played 2100+ Rated Games',
]

const sharedProps = {
  title: 'Crazy Pawn Checkmate Comeback',
  players: TEST_PLAYER_DATA,
  matchId: 9873678,
  wonByText: 'Checkmate',
  notableFeatures: TEST_NOTABLE_FEATURES,
  bannerColors: ['#E58F2A', '#C76F07'],
  lengthOfGameString: '10 min',
  gameTypeString: 'Standard',
  matchDate: new Date(),
  gifUrl: 'https://media0.giphy.com/media/3o6ZsYLRb6IG6vAkcU/giphy.gif',
}

export const whiteWinBlackEdition = () => {
  return (
    <div className="p-8">
      <GameCard {...sharedProps} winner="WHITE" edition="BLACK" />
    </div>
  )
}

export const blackWinBlackEdition = () => {
  return (
    <div className="p-8">
      <GameCard {...sharedProps} winner="BLACK" edition="BLACK" />
    </div>
  )
}

export const drawBlackEdition = () => {
  return (
    <div className="p-8">
      <GameCard {...sharedProps} winner="DRAW" edition="BLACK" />
    </div>
  )
}

export const whiteWinWhiteEdition = () => {
  return (
    <div className="p-8">
      <GameCard {...sharedProps} winner="WHITE" edition="WHITE" />
    </div>
  )
}

export const blackWinWhiteEdition = () => {
  return (
    <div className="p-8">
      <GameCard {...sharedProps} winner="BLACK" edition="WHITE" />
    </div>
  )
}

export const drawWhiteEdition = () => {
  return (
    <div className="p-8">
      <GameCard {...sharedProps} winner="DRAW" edition="WHITE" />
    </div>
  )
}

export default { title: 'Components/GameCard' }
