export const accessToken =
  'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJzdW5ueSIsImlhdCI6MTcxOTIzMDQwOSwiZXhwIjoxNzIxODIyNDA5fQ.BgJWxoULoZhdn7ikdz_Q7OnUNAo2J-rymTZzethHCgi7UWtbLL1nOU9-M5CV5H_S'

export const getProfile = async (url: string) => {
  return await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }).then((res) => res.json())
}

export const getData = async (url: string) => {
  return await fetch(url, {
    method: 'GET',
  }).then((res) => res.json())
}
