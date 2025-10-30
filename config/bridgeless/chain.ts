import { Address, BigDecimal, BigInt } from '@graphprotocol/graph-ts/index'

export const FACTORY_ADDRESS = '0x2cdd116C7d0cd9dF4b51b991dc1D5Bd2e6E9e0d3'

export const REFERENCE_TOKEN = '0xd9b6e8a0a8a65a8790e0dca1e7076be9f23063ec' // WBRIDGE

export const STABLE_TOKEN_PAIRS: Array<string> = [] // stable token + reference token pair for price calculation

// token where amounts should contribute to tracked volume and liquidity
export const WHITELIST: string[] = [
  '0xd9b6e8a0a8a65a8790e0dca1e7076be9f23063ec', // WBRIDGE
  '0xe3fa12bbea3d9d94dc1c0c8cea8a1246af1ce463', // CLONE
]

export const STABLECOINS: Array<string> = []

// minimum liquidity required to count towards tracked volume for pairs with small # of Lps
export const MINIMUM_USD_THRESHOLD_NEW_PAIRS = BigDecimal.fromString('1')

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
