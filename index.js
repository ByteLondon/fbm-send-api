const {filter, isEmpty, isString, map, pickBy, truncate} = require('lodash')

const ensureLength = (name, maxLen, s) => {
  if (isString(s) && s.length > maxLen) {
    const message = `${name} must be ≤ ${maxLen} characters: "${truncate(s)}" (${s.length})`
    switch (process.env['FB_SEND_API_ON_ERROR']) {
      case 'console':
        console.error(message)
      case 'throw':
      default:
        throw new Error(message)
    }
  }
  return s
}

const prepareURI = uri => {
  if (!isString(uri)) {
    return undefined
  } else {
    return encodeURI(uri)
  }
}

const mkButton = (title, payload) => ({
  type: 'postback',
  title: ensureLength('title', 20, title),
  payload: ensureLength('payload', 1000, payload)
})

const mkLinkButton = (title, url, options) => Object.assign({
  type: 'web_url',
  title: ensureLength('title', 20, title),
  url: encodeURI(url)
}, options)

const mkPhoneNumberButton = (title, number, options) => Object.assign({
  type: 'phone_number',
  title: ensureLength('title', 20, title),
  payload: number.startsWith('+44') ? number : `+44${number}`
}, options)

const mkTextMessage = (text, options) => Object.assign({
  text: ensureLength('text', 320, text)
}, options)

const mkImageMessage = (url, options) => Object.assign({
  attachment: {
    type: 'image',
    payload: {url: prepareURI(url)}
  }
}, options)

const mkVideoMessage = (url, options) => Object.assign({
  attachment: {
    type: 'video',
    payload: {url: prepareURI(url)}
  }
}, options)

const mkQuickReplies = replies => ({
  quick_replies: map(replies, (payload, title) => ({content_type: 'text', title, payload}))
})

const mkElement = (title, subtitle, imageUrl, ...buttons) => {
  const b = filter(buttons)
  return pickBy({
    title: ensureLength('title', 80, title),
    subtitle: ensureLength('subtitle', 80, subtitle),
    image_url: prepareURI(imageUrl),
    buttons: isEmpty(b) ? null : b
  })
}

const mkButtonTemplate = (text, buttons, options) => {
  const b = filter(buttons)
  return Object.assign({
    attachment: {
      type: 'template',
      payload: {
        template_type: 'button',
        text: ensureLength('text', 320, text),
        buttons: isEmpty(b) ? null : b
      }
    }
  }, options)
}

const mkGenericTemplate = (elements, options) => Object.assign({
  attachment: {
    type: 'template',
    payload: { template_type: 'generic', elements }
  }
}, options)

module.exports = {
  mkButton,
  mkButtonTemplate,
  mkElement,
  mkGenericTemplate,
  mkImageMessage,
  mkLinkButton,
  mkPhoneNumberButton,
  mkQuickReplies,
  mkTextMessage,
  mkVideoMessage
}
