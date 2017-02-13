export function mkButton(title: string, payload: string): PostbackButton

export function mkLinkButton(title: string, url: string, options?: Object): LinkButton

export function mkPhoneNumberButton(title: string, number: string, options?: Object): CallButton

export function mkTextMessage(text: string, options?: Object): TextMessage

export function mkImageMessage(url: string, options?: Object): ImageMessage

export function mkVideoMessage(url: string, options?: Object): VideoMessage

export function mkQuickReplies(qrs: Object): Array<QuickReply>

export function mkElement(title: string, subtitle?: string, imageUrl?: string, ...buttons: Array<Button>): Element

export function mkButtonTemplate(text: string, buttons: Array<Button>, options?: Object): ButtonTemplateMessage

export function mkGenericTemplate(elements: Array<Element>, options?: Object): GenericTemplateMessage


export interface Button {
  type: string
}

export interface LinkButton extends Button {
  type: 'web_url'
  title: string
  url: string
  webview_height_ratio?: 'compact' | 'tall' | 'full'
  messenger_extensions?: boolean
  fallback_url?: string
}

export interface PostbackButton extends Button {
  type: 'postback'
  title: string
  payload: string
}

export interface CallButton extends Button {
  type: 'phone_number'
  title: string
  payload: string
}

export interface ShareButton extends Button {
  type: 'element_share'
}

export interface Message {}

export interface TextMessage extends Message {
  text: string
}

export interface ImageMessage extends Message {
  attachment: {
    type: 'image'
    payload: {
      url: string
    }
  }
}

export interface VideoMessage extends Message {
  attachment: {
    type: 'video'
    payload: {
      url: string
    }
  }
}

export interface ButtonTemplateMessage extends Message {
  attachment: {
    type: 'template'
    payload: {
      template_type: 'button'
      text: string
      buttons: Array<Element>
    }
  }
}

export interface Element {
  title: string
  subtitle?: string
  image_url?: string
  default_action?: LinkButton
  buttons?: Array<Button>
}

export interface GenericTemplateMessage extends Message {
  attachment: {
    type: 'template'
    payload: {
      template_type: 'generic'
      elements: Array<Element>
    }
  }
}

export interface QuickReply {
  content_type: 'text' | 'location'
  title?: string
  payload?: string
  image_url?: string
}
