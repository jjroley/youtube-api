import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"

dayjs.extend(relativeTime)

export const truncate = (str:string, len:number) => (
  str.length > len ? str.slice(0, len) + '...' : str
)

export const timeSince = (time:string) => (
  dayjs().to(time)
)

export const shortenNumber = (n:number|string) => {
  n = parseInt(n.toString())

  if(n < 1000) return n

  const nums = {
    'B': 1000 * 1000 * 1000,
    'M': 1000 * 1000,
    'K': 1000,
  }

  for(const s in nums) {
    if(n >= nums[s as keyof typeof nums]) {
      const d = (n / nums[s as keyof typeof nums])

      if(Math.floor(d) > 9) {
        return `${Math.floor(d)}${s}`
      }

      return `${d.toFixed(1)}${s}`
    }
  }
}

const padZero = (n:any) => {
  if(!n && n !== 0) {
    return ''
  }
  n = n.toString()
  return n.length === 1 ? '0' + n : n
}

export const getDuration = (duration:string) => {
  const data = duration.match(/^PT(\d+H)?(\d+M)?(\d+S)?/)
  let [_match, hours, minutes, seconds] = data || []

  hours = hours?.slice(0, -1)
  minutes = minutes?.slice(0, -1)
  seconds = seconds?.slice(0, -1)

  const timeArr = [hours, (hours ? padZero(minutes) : minutes) || '0', padZero(seconds)]

  return timeArr.filter(a => !!a).join(":")
}