import { Address, BigDecimal, BigInt } from '@graphprotocol/graph-ts/index'

export const FACTORY_ADDRESS = '0x2cdd116C7d0cd9dF4b51b991dc1D5Bd2e6E9e0d3'

export const REFERENCE_TOKEN = '0xd9b6E8a0a8a65a8790E0dcA1E7076BE9F23063EC' // wrapped native

export const STABLE_TOKEN_PAIRS: Array<string> = [] // stable + reference token pair

// token where amounts should contribute to tracked volume and liquidity todo
export const WHITELIST: string[] = [
  '0xd9b6E8a0a8a65a8790E0dcA1E7076BE9F23063EC', // wrapped native
  '0xe3fa12bBEA3d9d94Dc1C0C8CEa8a1246AF1cE463', // CLONE
]

export const STABLECOINS: Array<string> = []

// minimum liquidity required to count towards tracked volume for pairs with small # of Lps
export const MINIMUM_USD_THRESHOLD_NEW_PAIRS = BigDecimal.fromString('10000')

// minimum liquidity for price to get tracked
export const MINIMUM_LIQUIDITY_THRESHOLD_ETH = BigDecimal.fromString('1')

export class TokenDefinition {
  address: Address
  symbol: string
  name: string
  decimals: BigInt
}

export const STATIC_TOKEN_DEFINITIONS: TokenDefinition[] = []

export const SKIP_TOTAL_SUPPLY: string[] = []
