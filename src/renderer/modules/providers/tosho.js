import { mapBestRelease } from '../anime.js'
import { fastPrettyBytes } from '../util.js'
import { exclusions } from '../rss.js'

const toshoURL = decodeURIComponent(atob('aHR0cHM6Ly9mZWVkLmFuaW1ldG9zaG8ub3JnL2pzb24/'))

// TODO query resolution

export default async function ({ media, episode }) {
  const mappings = await fetch('https://api.ani.zip/mappings?anilist_id=' + media.id + '&qx=' + exclusions.map(e => '!' + e).join(' '))
  const { episodes, mappings: map } = await mappings.json()
  const entries = []

  if (episodes[Number(episode)]) {
    const { anidbEid } = episodes[Number(episode)]

    const torrents = await fetch(toshoURL + 'eid=' + anidbEid)

    entries.push(...await torrents.json())
  }

  // look for batches
  if (map.anidb_id && (media.status === 'FINISHED' || media.episodes === 1)) {
    const torrents = await fetch(toshoURL + 'aid=' + map.anidb_id + '&order=size-d' + '&qx=' + exclusions.map(e => '!' + e).join(' '))

    const batches = (await torrents.json()).filter(entry => {
      return entry.num_files >= media.episodes
    })

    entries.push(...batches)
  }

  const mapped = mapTosho2dDeDupedEntry(entries)

  return mapBestRelease(mapped)
}

function mapTosho2dDeDupedEntry (entries) {
  const deduped = {}
  for (const entry of entries) {
    if (deduped[entry.info_hash]) {
      const dupe = deduped[entry.info_hash]
      dupe.title ??= entry.torrent_name || entry.title
      dupe.id ||= entry.nyaa_id
      dupe.seeders ||= entry.seeders ?? 0
      dupe.leechers ||= entry.leechers ?? 0
      dupe.size ||= entry.total_size && fastPrettyBytes(entry.total_size)
      dupe.date ||= entry.timestamp && new Date(entry.timestamp * 1000)
    } else {
      deduped[entry.info_hash] = {
        title: entry.torrent_name || entry.title,
        link: entry.magnet_uri,
        id: entry.nyaa_id,
        seeders: entry.seeders,
        leechers: entry.leechers,
        size: entry.total_size && fastPrettyBytes(entry.total_size),
        date: entry.timestamp && new Date(entry.timestamp * 1000)
      }
    }
  }

  return Object.values(deduped)
}