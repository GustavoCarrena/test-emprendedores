export function setAnswersToLocalStorage(answers) {
  localStorage.setItem('answers', JSON.stringify(answers))
}

export function getAnswersFromLocalStorage() {
  const answers = localStorage.getItem('answers')
  if (!answers) return null
  return JSON.parse(answers)
}

export function deleteAnswersFromLocalStorage() {
  localStorage.removeItem('answers')
}
