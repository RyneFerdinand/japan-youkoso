const url = 'http://127.0.0.1:5000'

const create = async (stepObject) => {
  try {
    const body = JSON.stringify(stepObject)
    const response = await fetch(`${url}/steps`, {
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

const getById = async (id) => {
  try {
    const response = await fetch(`${url}/steps/${id}`, {
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

const getAll = async (page = 0) => {
  let currUrl = `${url}/steps`
  if (page > 0) currUrl += `?_page=${page}&_limit=12`

  try {
    const response = await fetch(currUrl, {
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

const approve = async (id) => {
  try {
    const data = await getById(id)
    console.log(data)
    const body = JSON.stringify({ ...data, approved: 1 })

    await fetch(`${url}/steps/${id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: body
    })
    return { success: true }
  } catch (error) {
    console.error(error)
  }
}

export default { create, getById, getAll, approve }
