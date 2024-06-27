const accessTokenKey = 'access_token'
const refreshTokenKey = 'refresh_token'

export function getToken() {
  const accessToken = localStorage.getItem(accessTokenKey)
  const refreshToken = localStorage.getItem(refreshTokenKey)

  return {
    accessToken,
    refreshToken
  }

}

export function convertTime(time: string, detail = false) {
  if (detail) {
    return new Date(time).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    })
  }
  const inputDate = new Date(time)
  const today = new Date()
  const yesterday = new Date()
  yesterday.setDate(today.getDate() - 1)

  if (inputDate.toDateString() === today.toDateString()) {
    return inputDate.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    })
  } else if (inputDate.toDateString() === yesterday.toDateString()) {
    return 'Yesterday'
  } else {
    return inputDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }
}
