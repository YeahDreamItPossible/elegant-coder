import ValveDecorator from './ValveDecorator'
import Valve from './Valve'

// 防止重复请求
const valve = new ValveDecorator(new Valve())

export default valve
