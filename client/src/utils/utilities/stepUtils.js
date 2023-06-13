const getRecommendations = (currentSteps, datasetSteps) => {
  return [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
}

const getNextMandatoryStep = (currentSteps, datasetSteps) => {
  const unfinishedMandatoryStep = datasetSteps.filter((step) => {
    return step.mandatory && !currentSteps.includes(step.id)
  })

  if (unfinishedMandatoryStep.length === 0) return null
  return unfinishedMandatoryStep[0]
}

export default { getRecommendations, getNextMandatoryStep }
