export const MEMBER_RAMPS_QUERY = gql`
  query FindMemberRampsQuery {
    ramps {
      id
      address
      accountNickname
      isoCurrencyCode
      type
      createdAt
    }
  }
`
export const WYRE_DEPOSIT_URL_QUERY = gql`
  query wyreDepositUrlQuery {
    wyreDepositUrl
  }
`
export const CONNECT_PLAID_QUERY = gql`
  query connectPlaidQuery($code: String!, $accountId: String!) {
    connectPlaid(code: $code, accountId: $accountId) {
      id
      address
      accountNickname
      isoCurrencyCode
      type
    }
  }
`

export const OAUTH_URL_QUERY = gql`
  query oAuthUrlQuery($type: String!) {
    oAuthUrl(type: $type) {
      url
      type
      text
    }
  }
`
