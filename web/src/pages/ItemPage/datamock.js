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

export const opening = "Bird's Opening"
export const owner = 'eye-ults'
export const creator = 'E-ratic'
export const title = 'My first NFT!'

export const bids = {
  100: 'Person 1',
  25: 'Person 3',
  10: 'Person 5',
}
export const movesList = [
  { move: 1, from: 'a3', to: 'b5' },
  { move: 2, from: 'Nf3', to: 'Bb7' },
  { move: 3, from: 'c4', to: 'bxc4' },
  { move: 4, from: 'Qa4', to: 'Bc6' },
  { move: 5, from: 'Qxc4', to: 'd5' },
]
export const nftHistory = [
  'Person Bid $100',
  'Something happened',
  'Put on sale for - $1000',
  'Created - May 2021',
]

export const cardDetails = {
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
  winner: 'WHITE',
  edition: 'BLACK',
}
