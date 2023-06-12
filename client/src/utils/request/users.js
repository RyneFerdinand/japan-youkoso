const url = 'http://127.0.0.1:5000'

const getById = async (id) => {
  try {
    const response = await fetch(`${url}/users/${id}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    })
    return response.json()
  } catch (error) {
    console.error(error)
  }
}

export default { getById }
