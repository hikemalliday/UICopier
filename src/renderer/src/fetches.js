import axios from 'axios'

function titleCase(str) {
  return str.toLowerCase().replace(/\b\w/g, function (param) {
    return param.toUpperCase()
  })
}

export const getEqDir = async () => {
  const url = 'http://127.0.0.1:3001/getEqDir'
  try {
    const response = await axios.get(url)
    if (response !== null) {
      return response.data.payload
    }
  } catch (error) {
    console.error('Error fetching eqDir: ', error)
    throw error
  }
}

export const copyUi = async (params) => {
  if (params['from']) params['from'] = titleCase(params['from'])
  if (params['to']) params['to'] = titleCase(params['to'])
  if (params['url']) params['url'] = titleCase(params['url'])
  console.log(params)
  const url = 'http://127.0.0.1:3001/copyUi'
  console.log('*****************')
  console.log(url)
  console.log('*****************')
  try {
    const response = await axios.post(url, params)
    if (response !== null) {
      console.log('**************')
      console.log('copy ui payload return (frontend)')
      console.log(response.data.message)
      console.log('************')
      return response.data.message
    }
  } catch (error) {
    console.error('Error copying ui: ', error)
    throw error
  }
}
