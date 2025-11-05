/* eslint-disable prefer-const */
import { BigDecimal, BigInt, ethereum, store } from '@graphprotocol/graph-ts'

import { Bundle, Token } from '../../../generated/schema'
import { ZERO_BD, ZERO_BI } from '../../common/constants'

export function updateTokenHourData(token: Token, event: ethereum.Event): TokenHourData {
  let bundle = Bundle.load('1')!
  let timestamp = event.block.timestamp.toI32()
  let hourIndex = timestamp / 3600 // get unique hour within unix history
  let hourStartUnix = hourIndex * 3600 // want the rounded effect
  let tokenHourID = token.id.concat('-').concat(hourIndex.toString())
  let tokenHourData = TokenHourData.load(tokenHourID)
  let tokenPrice = token.derivedETH.times(bundle.ethPrice)
  let isNew = false
  if (!tokenHourData) {
    tokenHourData = new TokenHourData(tokenHourID)
    tokenHourData.periodStartUnix = hourStartUnix
    tokenHourData.token = token.id
    tokenHourData.volume = ZERO_BD
    tokenHourData.volumeUSD = ZERO_BD
    tokenHourData.untrackedVolumeUSD = ZERO_BD
    tokenHourData.feesUSD = ZERO_BD
    tokenHourData.open = tokenPrice
    tokenHourData.high = tokenPrice
    tokenHourData.low = tokenPrice
    tokenHourData.close = tokenPrice
    let tokenHourArray = token.hourArray
    tokenHourArray.push(hourIndex)
    token.hourArray = tokenHourArray
    token.save()
    isNew = true
  }

  if (tokenPrice.gt(tokenHourData.high)) {
    tokenHourData.high = tokenPrice
  }

  if (tokenPrice.lt(tokenHourData.low)) {
    tokenHourData.low = tokenPrice
  }

  tokenHourData.close = tokenPrice
  tokenHourData.priceUSD = tokenPrice
  tokenHourData.totalValueLocked = BigDecimal.fromString('0')
  tokenHourData.totalValueLockedUSD = BigDecimal.fromString('0')
  tokenHourData.save()

  if (token.lastHourArchived.equals(ZERO_BI) && token.lastHourRecorded.equals(ZERO_BI)) {
    token.lastHourRecorded = BigInt.fromI32(hourIndex)
    token.lastHourArchived = BigInt.fromI32(hourIndex - 1)
  }

  if (isNew) {
    let lastHourArchived = token.lastHourArchived.toI32()
    let stop = hourIndex - 768
    if (stop > lastHourArchived) {
      archiveHourData(token, stop) //cur
    }
    token.lastHourRecorded = BigInt.fromI32(hourIndex)
    token.save()
  }

  return tokenHourData as TokenHourData
}
function archiveHourData(token: Token, end: i32): void {
  let length = token.hourArray.length

  let array = token.hourArray
  let modArray = token.hourArray
  let last = token.lastHourArchived.toI32()
  for (let i = 0; i < length; i++) {
    if (array[i] > end) {
      break
    }
    let tokenHourID = token.id.concat('-').concat(array[i].toString())
    // let tokenMinuteData = TokenMinuteData.load(tokenMinuteID)
    // if (tokenMinuteData) {
    store.remove('TokenHourData', tokenHourID)
    // }
    modArray.shift()
    last = array[i]
    if (BigInt.fromI32(i + 1).equals(BigInt.fromI32(500))) {
      // log.warning('INTERVAL REACH - {} - LIMITER - {}', [tokenMinuteID, i.toString()])
      break
    }
  }
  if (modArray) {
    token.hourArray = modArray
  } else {
    token.hourArray = []
  }
  token.lastHourArchived = BigInt.fromI32(last - 1)
  token.save()
}
