interface zzUtil {
  /**
   * 动态加载脚本文件
   * @param src - 脚本文件的 URL
   * @returns {Promise<void>} - 脚本加载完成的 Promise
   */
  appendScript(src: string): Promise<void>;

  /**
   * 动态加载 CSS 文件
   * @param src - CSS 文件的 URL
   */
  appendCss(src: string): void;
  /**
   * 在 Vue 组件及其子组件中查找指定的 ref 引用
   * @param node - Vue 组件实例
   * @param refName - 要查找的 ref 名称
   * @returns 如果找到则返回对应的 Vue 组件实例或元素，否则返回 undefined
   */
  findRef<T extends Vue>(node: T, refName: string): Vue | Element | undefined;

  /**
   * 判断当前设备是否为移动设备
   * @returns {boolean} - 如果是移动设备返回 true，否则返回 false
   */
  isMobile(): boolean;

  /**
   * 获取localStorage中的用户信息
   * @returns {{ [key: string]: any }} - 用户信息对象
   */
  getUserInfo(): { [key: string]: any };

  /**
   * 用于获取真实页面地址(确定栏目地址)
   * @param routeName - 路由名称
   * @returns {Promise<string[]>} - 包含页面地址的数组
   */
  getUrlByRouteName(routeName?: string): Promise<string[]>;

  /**
   * 获取参数类型
   * @param obj - 需要检测类型的对象
   * @returns {string} - 对象的类型字符串
   */
  getType(obj: any): string;

  /**
   * 一次性监听 监听表达式，如果为true 则resolve并销毁此监听器
   * @param getter - 表达式
   * @param options - 配置选项
   * @param options.timeout - 监听超时设置，默认8000毫秒
   * @param options.vm - 监听器挂载实例，默认为vueThis
   * @param options.judg - 自定义判断表达式，返回true或false，默认为(v) => v
   * @returns {Promise<any>} - 解析后的值为表达式的新值
   */
  watchEffectOnce(
    getter: () => any,
    options?: {
      timeout?: number;
      vm?: any;
      judg?: (newValue: any, oldValue: any) => boolean;
    }
  ): Promise<any>;

  /**
   * 处理嵌套对象
   * @param obj - 需要处理的扁平对象
   * @returns 嵌套对象
   */
  nestObject(obj: { [key: string]: any }): { [key: string]: any };

  /**
   * 深度合并对象
   * @param originalObj - 原始对象
   * @param newObj - 新对象
   * @returns {T & U} - 合并后的对象
   */
  mergeObjects<T, U>(originalObj: T, newObj: U): T & U;

  /**
   * 自定义请求，添加异常处理
   * @param that - 请求节点
   * @param params - 请求参数
   * @param final - 最终执行的回调函数
   * @returns {Promise<any>} - 请求结果
   */
  request(that: any, params?: any[], final?: () => void): Promise<any>;

  /**
   * 显示移动设备加载提示，并返回一个清除加载提示的函数
   * @param options - 加载提示的配置选项
   * @param options.message - 提示消息，默认为 '加载中...'
   * @param options.duration - 持续时间，默认为 0（无限）
   * @returns {() => void} - 清除加载提示的函数
   */
  useMobileLoading(options?: {
    message?: string;
    duration?: number;
  }): () => void;

  /**
   * 显示PC端加载提示，并返回一个清除加载提示的函数
   * @param vm - Vue 实例
   * @param keys - 需要显示加载提示的键列表
   * @returns {() => void} - 清除加载提示的函数
   */
  usePcLoading(vm: Vue, keys?: string[]): () => void;

  /**
   * 显示对象加载提示，并返回一个清除加载提示的函数
   * @param instance - 对象实例
   * @param key - 加载提示的键，默认为 'loading'
   * @returns {() => void} - 清除加载提示的函数
   */
  useObjectLoading(instance: any, key?: string): () => void;

  /**
   * 获取 ECharts 颜色
   * @param order - 颜色顺序，默认为 [0, 1, 2, 3]
   * @returns {string[]} - 颜色数组
   */
  getEchartsColors(order?: number[]): string[];

  /**
   * 获取所有 ECharts 颜色
   * @returns {string[]} - 颜色数组
   */
  getEchartsAllColors(): string[];

  /**
   * 设置 ECharts X 轴标签超过长度时省略
   * @param chartVm - 包含 ECharts 实例的 Vue 组件实例
   */
  setAxisOverflow(chartVm: {
    $refs: { chart: { chart: any; $el: HTMLElement } };
  }): void;

  /**
   * 获取 ECharts X 轴所占长度
   * @param chart - ECharts 实例
   * @returns {number} - X 轴所占长度
   */
  getChartXWidth(chart: any): number;

  /**
   * 设置 ECharts 常规选项
   * @param options - 原始 ECharts 选项
   * @param config - 配置选项
   * @param config.pickKeys - 需要保留的键列表
   * @param config.omitKeys - 需要排除的键列表
   * @returns {T & U} - 合并后的 ECharts 选项
   */
  setCommonOption(
    options: object,
    config?: { pickKeys?: string[]; omitKeys?: string[] }
  ): object;

  /**
   * 注册本地化消息。
   * @param node 当前节点对象
   * @param messages 本地化消息对象
   */
  regMessages(node: object, messages: object): void;

  /**
   * 获取本地化文本。
   * @param node 当前节点对象
   * @param key 本地化键
   * @returns 本地化文本
   */
  $t(node: object, key: string): string;
}

declare var zzUtil: zzUtil;
