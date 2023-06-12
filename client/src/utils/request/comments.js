const url = 'http://127.0.0.1:5000'

const getByStepId = async (id) => {
  try {
    const response = await fetch(`${url}/comments?step_id=${id}&_sort=id&_order=desc`, {
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

const create = async (commentObject) => {
  try {
    const body = JSON.stringify(commentObject)
    const response = await fetch(`${url}/comments`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: body
    })
    return response.json()
  } catch (error) {
    console.error(error)
  }
}

export default { getByStepId, create }
