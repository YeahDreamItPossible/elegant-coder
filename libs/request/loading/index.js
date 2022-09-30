import Loading from "./Loading"
import LoadingDecorator from './LoadingDecorator'

const sington = new LoadingDecorator(new Loading())

export default sington
