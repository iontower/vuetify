import './VIcon.sass'

// Utilities
import { computed, defineComponent, h } from 'vue'
import { makeSizeProps, useSize } from '@/composables/size'
import { useIcon } from '@/composables/icons'
import makeProps from '@/util/makeProps'

// Types
import type { PropType } from 'vue'
import type { VuetifyIcon } from '@/composables/icons'

export const VSvgIcon = defineComponent({
  name: 'VSvgIcon',
  inheritAttrs: false,
  props: {
    icon: {
      type: String,
      required: true,
    },
    tag: {
      type: String,
      required: true,
    },
    set: {
      type: String,
      required: true,
    },
  },
  setup (props, context) {
    return () => h(props.tag, {
      ...context.attrs,
      style: null,
    }, [
      h('svg', {
        style: context.attrs.style,
        class: 'v-icon__svg',
        xmlns: 'http://www.w3.org/2000/svg',
        viewBox: '0 0 24 24',
        role: 'img',
        'aria-hidden': true,
      }, [h('path', { d: props.icon })]),
    ])
  },
})

export const VLigatureIcon = defineComponent({
  name: 'VLigatureIcon',
  props: {
    icon: {
      type: String,
      required: true,
    },
    tag: {
      type: String,
      required: true,
    },
    set: {
      type: String,
      required: true,
    },
  },
  setup (props) {
    return () => h(props.tag, {
      class: props.set,
    }, [props.icon])
  },
})

export const VClassIcon = defineComponent({
  name: 'VClassIcon',
  props: {
    icon: {
      type: String,
      required: true,
    },
    tag: {
      type: String,
      required: true,
    },
    set: {
      type: String,
      required: true,
    },
  },
  setup (props) {
    return () => h(props.tag, {
      class: [props.set, props.icon],
    })
  },
})

export default defineComponent({
  name: 'VIcon',

  props: makeProps({
    disabled: Boolean,
    left: Boolean,
    right: Boolean,
    tag: {
      type: String,
      required: false,
      default: 'i',
    },
    icon: {
      type: [String, Object] as PropType<VuetifyIcon>,
      required: true,
    },
    set: {
      type: String,
      default: 'mdi',
    },
    ...makeSizeProps(),
  }),

  setup (props, context) {
    const { sizeClasses } = useSize(props)
    const { icon } = useIcon(props)

    const styles = computed(() => !sizeClasses.value ? ({
      'font-size': props.size,
      width: props.size,
      height: props.size,
    }) : null)

    return () => {
      const hasClickListener = !!context.attrs.onClick
      const tag = hasClickListener ? 'button' : props.tag

      return icon.value.component({
        tag,
        set: props.set,
        icon: icon.value.icon,
        class: [
          'v-icon',
          'notranslate',
          sizeClasses.value,
          {
            'v-icon--disabled': props.disabled,
            'v-icon--left': props.left,
            'v-icon--right': props.right,
            'v-icon--link': hasClickListener,
          },
        ],
        style: styles.value,
        type: hasClickListener ? 'button' : undefined,
        'aria-hidden': !hasClickListener,
      })
    }
  },
})
