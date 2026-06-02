// =============================================================================
// GUARDRAILS DE SEGURANÇA — Milton Assis Portfolio
// Qualquer alteração neste bloco requer autorização explícita de Milton Assis.
// =============================================================================

/**
 * Sanitiza uma string removendo qualquer conteúdo que possa ser interpretado
 * como HTML ou código executável. Utilizado antes de inserir qualquer valor
 * dinâmico no DOM via textContent ou atributos.
 * @param {string} value
 * @returns {string}
 */
function sanitizeText(value) {
  if (typeof value !== 'string') return ''
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .slice(0, 120)
}

/**
 * Valida se uma URL é segura para navegação programática.
 * Aceita apenas âncoras internas, caminhos relativos e https.
 * @param {string} url
 * @returns {boolean}
 */
function isSafeUrl(url) {
  if (typeof url !== 'string' || url.trim() === '') return false
  const trimmed = url.trim().toLowerCase()
  // âncoras internas
  if (trimmed.startsWith('#')) return true
  // caminhos relativos sem protocolo (ex: politica_privacidade.html)
  if (/^[a-z0-9_\-./]+\.html(#[a-z0-9_-]*)?$/.test(trimmed)) return true
  // apenas https externo
  try {
    const parsed = new URL(url, window.location.href)
    return parsed.protocol === 'https:'
  } catch {
    return false
  }
}

/**
 * Emite um aviso de segurança no console sem expor detalhes sensíveis.
 * @param {string} context - Contexto onde ocorreu a violação.
 */
function reportSecurityViolation(context) {
  // Em produção, esta função pode ser substituída por envio a um endpoint de logging.
  // Não expor dados do usuário ou da URL.
  if (typeof console !== 'undefined' && console.warn) {
    console.warn('[Security] Tentativa bloqueada em: ' + context)
  }
}

// =============================================================================
// FIM DOS GUARDRAILS
// =============================================================================

const commandButton = document.querySelector('#commandButton')
const commandPalette = document.querySelector('#commandPalette')
const paletteLinks = document.querySelectorAll('.palette-box a')
const constructionTabs = document.querySelectorAll('.js-construction-tab')
const constructionModal = document.querySelector('#constructionModal')
const constructionCloseButton = document.querySelector(
  '#constructionCloseButton'
)
const constructionFeatureName = document.querySelector(
  '#constructionFeatureName'
)
let lastFocusedElement = null
let lastConstructionFocusedElement = null

function getFocusableElements() {
  if (!commandPalette) return []
  return Array.from(
    commandPalette.querySelectorAll(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )
  ).filter(element => !element.hasAttribute('disabled'))
}

function togglePalette(force) {
  if (!commandPalette) return
  const shouldOpen =
    typeof force === 'boolean'
      ? force
      : !commandPalette.classList.contains('open')
  commandPalette.classList.toggle('open', shouldOpen)
  commandPalette.setAttribute('aria-hidden', String(!shouldOpen))

  if (shouldOpen) {
    lastFocusedElement = document.activeElement
    const [firstFocusable] = getFocusableElements()
    ;(firstFocusable || commandPalette).focus()
    return
  }

  const fallbackTarget = commandButton || lastFocusedElement
  if (fallbackTarget && typeof fallbackTarget.focus === 'function') {
    fallbackTarget.focus()
  }
}

function getConstructionFocusableElements() {
  if (!constructionModal) return []
  return Array.from(
    constructionModal.querySelectorAll(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )
  ).filter(element => !element.hasAttribute('disabled'))
}

function toggleConstructionModal(force, featureLabel = '') {
  if (!constructionModal) return
  const shouldOpen =
    typeof force === 'boolean'
      ? force
      : !constructionModal.classList.contains('open')

  if (shouldOpen && featureLabel && constructionFeatureName) {
    // Guardrail: sanitizar o valor antes de inserir no DOM
    constructionFeatureName.textContent = sanitizeText(featureLabel)
  }

  constructionModal.classList.toggle('open', shouldOpen)
  constructionModal.setAttribute('aria-hidden', String(!shouldOpen))

  if (shouldOpen) {
    lastConstructionFocusedElement = document.activeElement
    const [firstFocusable] = getConstructionFocusableElements()
    ;(firstFocusable || constructionModal).focus()
    return
  }

  const fallbackTarget = lastConstructionFocusedElement
  if (fallbackTarget && typeof fallbackTarget.focus === 'function') {
    fallbackTarget.focus()
  }
}

commandButton?.addEventListener('click', () => togglePalette())
commandPalette?.addEventListener('click', event => {
  if (event.target === commandPalette) togglePalette(false)
})
paletteLinks.forEach(link => {
  link.addEventListener('click', event => {
    // Guardrail: validar href antes de permitir navegação
    const href = link.getAttribute('href') || ''
    if (!isSafeUrl(href)) {
      event.preventDefault()
      reportSecurityViolation('palette-link href: ' + href.slice(0, 30))
      return
    }
    togglePalette(false)
  })
})
constructionTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    // Guardrail: validar e sanitizar data-feature antes de usar
    const rawLabel = tab.dataset.feature || 'em desenvolvimento'
    const featureLabel = sanitizeText(rawLabel)
    toggleConstructionModal(true, featureLabel)
  })
})
constructionCloseButton?.addEventListener('click', () =>
  toggleConstructionModal(false)
)
constructionModal?.addEventListener('click', event => {
  if (event.target === constructionModal) toggleConstructionModal(false)
})

document.addEventListener('keydown', event => {
  const isCommandK =
    (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k'
  if (isCommandK) {
    event.preventDefault()
    togglePalette()
  }

  if (!commandPalette?.classList.contains('open')) return

  if (event.key === 'Escape') {
    togglePalette(false)
    return
  }

  if (event.key !== 'Tab') return

  const focusableElements = getFocusableElements()
  if (focusableElements.length === 0) {
    event.preventDefault()
    commandPalette.focus()
    return
  }

  const firstElement = focusableElements[0]
  const lastElement = focusableElements[focusableElements.length - 1]

  if (event.shiftKey && document.activeElement === firstElement) {
    event.preventDefault()
    lastElement.focus()
  } else if (!event.shiftKey && document.activeElement === lastElement) {
    event.preventDefault()
    firstElement.focus()
  }
})

document.addEventListener('keydown', event => {
  if (!constructionModal?.classList.contains('open')) return

  if (event.key === 'Escape') {
    toggleConstructionModal(false)
    return
  }

  if (event.key !== 'Tab') return

  const focusableElements = getConstructionFocusableElements()
  if (focusableElements.length === 0) {
    event.preventDefault()
    constructionModal.focus()
    return
  }

  const firstElement = focusableElements[0]
  const lastElement = focusableElements[focusableElements.length - 1]

  if (event.shiftKey && document.activeElement === firstElement) {
    event.preventDefault()
    lastElement.focus()
  } else if (!event.shiftKey && document.activeElement === lastElement) {
    event.preventDefault()
    firstElement.focus()
  }
})

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
        observer.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.12 }
)

document
  .querySelectorAll('.reveal')
  .forEach(element => observer.observe(element))
