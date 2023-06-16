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

const getNextByUserId = async (userId) => {
  try {
    const response = await fetch(`${url}/usersteps?usersteps.user_id=${userId}`, {
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

const getAllActiveSteps = async () => {
  try {
    const response = await fetch(`${url}/steps?approved=1`, {
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

const getUsersSteps = async (userId) => {
  try {
    const response = await fetch(`${url}/usersteps?usersteps.user_id=${userId}`, {
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

const updateUserStep = async (userStepObject) => {
  const body = JSON.stringify(userStepObject)
  try {
    await fetch(`${url}/usersteps/${userStepObject.id}`, {
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

export default {
  create,
  getById,
  getAll,
  approve,
  getNextByUserId,
  getAllActiveSteps,
  getUsersSteps,
  updateUserStep
}
