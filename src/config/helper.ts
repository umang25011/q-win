export const TIME_QR_CODE_REFRESHES = 5000

// TODO : store entire state in LocalStorage
// TODO : Only show forms for the first time only

// TODO : Fix private route
// TODO : Fix Authorization

export const FIREBASE_COLLECTIONS = {
  users: "users",
  usersSubEvent: "user_events",
  events: "events",
  eventsSubAttendees: "attendees",
  eventsPrivate: "events-private",
  eventsRandomStringDocument: "random-string",
}

export function generateRandomCharacters(): string {
  const length = 10
  let result = ""
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-={}[]|\\:;"<>,.?/~`'
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return result
}

/**generte hash of passed string */
export async function hashString(s: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(s)
  const hashBuffer = await crypto.subtle.digest("SHA-1", data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
  return hashHex
}

export async function getVerificationString(s1: string, s2: string): Promise<string> {
  const timestamp = Date.now()
  const interval = Math.floor(timestamp / TIME_QR_CODE_REFRESHES)
  const concatenated = s1 + s2 + interval.toString()
  return hashString(concatenated)
}
