/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// Declare @heroicons/vue modules
declare module '@heroicons/vue/24/outline' {
  const content: any
  export const {
    Bars3Icon,
    XMarkIcon,
    EnvelopeIcon,
    PhoneIcon,
    ClockIcon,
    ChevronDownIcon,
    ShareIcon,
    DocumentTextIcon,
    PencilIcon,
    ChartBarIcon,
    PresentationChartLineIcon,
    LightBulbIcon,
    ChatBubbleLeftRightIcon,
    DocumentMagnifyingGlassIcon,
    CheckCircleIcon,
    CheckIcon,
    ArrowTopRightOnSquareIcon
  }: typeof content
}

// Declare @headlessui/vue modules
declare module '@headlessui/vue' {
  const content: any
  export const {
    Dialog,
    DialogPanel,
    TransitionChild,
    TransitionRoot
  }: typeof content
}
