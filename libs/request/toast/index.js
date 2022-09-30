import Toast from './Toast'
import ToastDecorator from './ToastDecorator'

const sington = new ToastDecorator(new Toast())

export default sington
