import * as React from 'react'
import * as SorobanClient from 'soroban-client'
let xdr = SorobanClient.xdr

interface GeneratedLibrary {
  Server: SorobanClient.Server
  CONTRACT_ID_HEX: string
}
interface GetEventsWithLatestLedger extends SorobanClient.SorobanRpc.GetEventsResponse {
  latestLedger: string;
}

type PagingKey = string

/**
 * Paging tokens for each contract/topic pair. These can be mutated directly,
 * rather than being stored as state within the React hook.
 */
const paging: Record<PagingKey, { lastLedgerStart?: number, pagingToken?: string }> = {}

export function useSubscription(
  library: GeneratedLibrary,
  topic: string,
  onEvent: (event: SorobanClient.SorobanRpc.EventResponse) => void,
  pollInterval = 5000
) {
  const id = `${library.CONTRACT_ID_HEX}:${topic}`
  paging[id] = paging[id] || {}

  React.useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null
    let stop = false

    async function pollEvents(): Promise<void> {
      try {
        if (!paging[id].lastLedgerStart) {
          let latestLedgerState = await library.Server.getLatestLedger();
          paging[id].lastLedgerStart = latestLedgerState.sequence
        } 
       
        let response = await library.Server.getEvents({
          startLedger: !paging[id].pagingToken
            ? paging[id].lastLedgerStart
            : undefined,
          cursor: paging[id].pagingToken,
          filters: [
            {
              contractIds: [library.CONTRACT_ID_HEX],
              topics: [[
                xdr.ScVal.scvSymbol(topic).toXDR("base64")
              ]],
              type: "contract"
            }  
          ],
          limit: 10
        }) as GetEventsWithLatestLedger;
     
        paging[id].pagingToken = undefined;
        if (response.latestLedger) {
          paging[id].lastLedgerStart = parseInt(response.latestLedger);
        }
        response.events && response.events.forEach(event => {
          try {
            onEvent(event)
          } catch (error) {
            console.error("Poll Events: subscription callback had error: ", error);
          } finally {
            paging[id].pagingToken = event.pagingToken
          }
        }) 
      } catch (error) {
        console.error("Poll Events: error: ", error);
      } finally {
        if (!stop) {
          timeoutId = setTimeout(pollEvents, pollInterval);
        }
      }
    }

    pollEvents();

    return () => {
      if (timeoutId != null) clearTimeout(timeoutId)
      stop = true
    }
  }, [library, topic, onEvent, id, pollInterval])
}
