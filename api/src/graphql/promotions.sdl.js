export const schema = gql`
  type Promotion {
    id: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    rewardType: PromotionRewardType!
    type: PromotionType!
    mintCredits: Int
    enabled: Boolean!
    users: [PromotionsOnMembers]!
  }

  type PromotionsOnMembers {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    user: Member!
    userId: String!
    promotion: Promotion!
    promotionId: Int!
  }

  enum PromotionRewardType {
    MINT_CREDIT
  }
  enum PromotionType {
    TWITCH_CONNECTION
  }
`
