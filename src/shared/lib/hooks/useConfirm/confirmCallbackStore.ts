// shared/lib/hooks/confirmCallbackStore.ts
let onConfirmCallback: (() => void) | null = null

export const setOnConfirm = (callback: () => void) => {
  onConfirmCallback = callback
}

export const runOnConfirm = () => {
  onConfirmCallback?.()
  onConfirmCallback = null
}

export const resetOnConfirm = () => {
  onConfirmCallback = null
}
