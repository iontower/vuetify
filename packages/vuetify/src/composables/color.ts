// Utilities
import { computed, isRef } from 'vue'
import { isCssColor } from '@/util/colorUtils'

// Types
import type { Ref } from 'vue'

type ColorValue = string | null | undefined
type TextColorData = { textColorStyles: Ref<{ color?: string, 'caret-color'?: string }>, textColorClasses: Ref<string | null> }
type BackgroundColorData = { backgroundColorStyles: Ref<{ 'background-color'?: string }>, backgroundColorClasses: Ref<string | null> }

export function useTextColor (color: Ref<ColorValue>): TextColorData
export function useTextColor <T extends Record<string, any>>(props: T, name: keyof T): TextColorData
export function useTextColor <T extends Record<string, any>> (props: T | Ref<ColorValue>, name?: keyof T): TextColorData {
  const color: Ref<ColorValue> = isRef(props) ? props : computed(() => name && props[name])
  const cssColor = computed(() => isCssColor(color.value))

  const textColorStyles = computed(() => {
    if (!color.value || !cssColor.value) return {}

    return {
      color: color.value,
      'caret-color': color.value,
    }
  })

  const textColorClasses = computed(() => {
    if (!color.value || cssColor.value) return null

    return `text-${color.value}`
  })

  return { textColorStyles, textColorClasses }
}

export function useBackgroundColor (color: Ref<ColorValue>): BackgroundColorData
export function useBackgroundColor <T extends Record<string, any>>(props: T, name: keyof T): BackgroundColorData
export function useBackgroundColor <T extends Record<string, any>> (props: T | Ref<ColorValue>, name?: keyof T): BackgroundColorData {
  const color: Ref<ColorValue> = isRef(props) ? props : computed(() => name && props[name])
  const cssColor = computed(() => isCssColor(color.value))

  const backgroundColorStyles = computed(() => {
    if (!color.value || !isCssColor(color.value)) return {}

    return {
      'background-color': color.value,
    }
  })

  const backgroundColorClasses = computed(() => {
    if (!color.value || cssColor.value) return null

    return `bg-${color.value}`
  })

  return { backgroundColorStyles, backgroundColorClasses }
}
