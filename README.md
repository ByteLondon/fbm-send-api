# Facebook Messenger Send API

Helper methods for interacting with the send API, these perform validation of text lengths and also filter out any `null` or `undefined` values from button arrays.

## Installation

Add this to your project with `npm install --save ByteLondon/fbm-send-api`.

## Usage

Set up functions like this, to generate messages ready for sending to Facebook.

```javascript
const mkFeedbackMessage = () => mkTextMessage('Are you happy?', mkQuickReplies({
  '👍': 'YES',
  '👎': 'NO'
}))
```

These can be used directly with the Send API, and also with some SAAS providers such as ChatFuel.
