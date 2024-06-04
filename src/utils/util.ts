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
