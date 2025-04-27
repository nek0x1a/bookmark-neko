export default class Logger {
  /** 记录器所在组件 */
  #module: string;
  /**
   * 日志规范记录器
   * 使控制台输出更规范，格式为：'${记录类型}|[${模块}]${消息}'。
   *
   * @param module - 记录器所在组件
   */
  constructor(module: string) {
    this.#module = module;
  }
  /**
   * 记录 Debug 消息
   *
   * @param massage - 消息
   */
  debug(...massage: unknown[]) {
    console.debug(`debug|[${this.#module}]`, ...massage);
  }
  /**
   * 记录 Info 消息
   *
   * @param massage - 消息
   */
  info(...massage: unknown[]) {
    console.info(`info |[${this.#module}]`, ...massage);
  }
  /**
   * 记录 Warning 消息
   *
   * @param massage - 消息
   */
  warn(...massage: unknown[]) {
    console.warn(`warn |[${this.#module}]`, ...massage);
  }
  /**
   * 记录 Error 消息
   *
   * @param massage - 消息
   */
  error(...massage: unknown[]) {
    console.error(`error|[${this.#module}]`, ...massage);
  }
}
