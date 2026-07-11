import type { NavigateFunction } from 'react-router-dom'

export function scrollToSection(navigate: NavigateFunction, targetId: string) {
  const scrollNow = () => {
    if (targetId === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return true
    }

    const element = document.getElementById(targetId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      return true
    }

    return false
  }

  if (window.location.pathname === '/') {
    scrollNow()
    return
  }

  navigate('/')

  let attempts = 0
  const retry = () => {
    attempts += 1
    if (scrollNow() || attempts > 60) return
    requestAnimationFrame(retry)
  }

  requestAnimationFrame(retry)
}
