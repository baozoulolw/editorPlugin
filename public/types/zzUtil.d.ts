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

  /**
   * 指定方法执行此时
   * @param fun 要指定的方法
   * @param times 指定的此时，默认为1
   * @returns 方法
   */
  timeFunction(fun: Function, times: number): Function;
  /**
   * 使用elementUi的图片预览 不用再写el-image节点，直接大屏预览
   * @param imgList 图片列表 要预览的图片路径数组
   * @param node 节点，默认为 vueThis
   * @example
   * zzUtil.usePreviewImg(['1.png', '2.png'])
   * @returns 无
   */
  usePreviewImg(imgList: string[], node?: any): void;
  /**
   * @description: 删除结果提示
   * @Date: 2024-12-02 15:17:02
   * @Author: 王浩然
   * @param {number} success 成功数量
   * @param {number} fail 失败数量
   * @param {string} fileId 文件fileId
   * @param {string} fileName 文件名
   * @return {Promise} Promise
   */
  useDeleteConfirm(
    success: number,
    fail: number,
    fileId: string,
    fileName: string
  ): Promise<any>;
  /**
   * @description: 根据fileId下载文件
   * @param {string} fileId 文件Id
   * @param {string} fileName 下载文件名
   * @author: 王浩然
   * @return {*}
   */
  downloadFile(fileId: string, fileName: string): Promise<any>;
  /**
   * @description: 根据url下载文件
   * @param {object} options 配置项
   * @param {string} options.url url
   * @param {string} options.method 请求类型
   * @param {object} options.data requestBody
   * @param {string} fileName 下载文件名
   * @author: 王浩然
   * @return {*}
   */
  downloadFileByUrl(option: object, fileName: string): Promise<any>;
  /**
   * 创建一个包装函数，限制函数最多执行指定次数。
   * @param func - 需要限制执行次数的函数
   * @param times - 执行次数，默认 1
   * @returns 返回一个新函数，该函数最多执行 `times` 次
   */
  timesExecuted<T extends (...args: any[]) => any>(
    func: T,
    times?: number
  ): T & { reset: () => void };

  /**
   * 创建一个包装函数，限制函数最多跳过指定次数后再执行。
   * @param func - 需要限制执行次数的函数
   * @param times - 跳过次数，默认 1
   * @returns 返回一个新函数，该函数最多跳过 `times` 次，超过后执行
   */
  timesNotExecuted<T extends (...args: any[]) => any>(
    func: T,
    times?: number
  ): T & { reset: () => void };

  /**
   * @description:
   * @Date: 2024-12-02 15:17:02
   * @Author: 王浩然
   * @param {number} success 成功数量
   * @param {number} fail 失败数量
   * @param {string} fileId 文件fileId
   * @param {string} fileName 文件名
   * @param {string} appCode appCode
   * @return {Promise} Promise
   */
  batchDeleteResConfirm(
    success: number,
    fail: number,
    fileId: string,
    fileName: string,
    appCode: string
  ): Promise<any>;
  /**
   * @description 通过浏览器api获取当前位置
   * @author 王浩然
   * @date 2025-03-31 15:16:22
   * @return {Promise} Promise
   */
  getLocationByJs(): Promise<[number, number]>;
  /**
   * @description: 平滑对象
   * @Date: 2025-03-31 17:23:05
   * @Author: 王浩然
   * @return {*}
   */
  flattenObjList(objList: object): object;

  /**
   * 创建一个包含Promise、resolve和reject的对象
   * @returns {{promise: Promise, resolve: Function, reject: Function}} 包含Promise及其控制函数的对象
   */
  withResolvers(): {
    promise: Promise<any>;
    resolve: (value?: any) => void;
    reject: (reason?: any) => void;
  };

  /**
   * 使用RSA公钥加密输入字符串
   * @param {string} input - 需要加密的字符串
   * @returns {string} - 加密并URI编码后的字符串
   */
  encryptWithPublicKey(input: string): string;

  /**
   * 解析URL参数
   * @param {string} key - 参数名称
   * @param {string} [url] - URL字符串，默认为window.location.href
   * @returns {string|null} - 解码后的数据，若不存在则返回null
   */
  parseUrlParam(key: string, url?: string): string | null;

  /**
   * 将数字格式化为带千位分隔符的字符串
   * @param {number|string} num - 要格式化的数字或数字字符串
   * @returns {string} - 格式化后的字符串
   */
  formatNumberLocale(num: number | string): string;

  /**
   * 计算百分比
   * @param {number} value - 当前值
   * @param {number} total - 总值
   * @param {number} [precision=2] - 小数精度，默认为2
   * @returns {string} - 百分比字符串
   */
  calcPercent(value: number, total: number, precision?: number): string;

  /**
   * 等待组件方法执行完成
   * @param {any} node - 节点对象
   * @param {string} comkey - 组件key
   * @returns {Promise<any>} - 返回组件页面
   */
  getComWait(node: any, comkey: string): Promise<any>;
  /**
   * 设置链接表单值
   * @param node - 节点对象
   * @param formKey - 表单键
   * @param value - 要设置的值
   * @returns {Promise<void>} - Promise
   */
  setLinkFormValue(node: any, formKey: string, value: any): Promise<void>;
}

declare var zzUtil: zzUtil;
