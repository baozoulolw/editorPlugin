declare type ComKey = string;
declare type PageParams = object;

declare interface LoadingOptions {
  show: boolean;
  text?: string;
  spinner?: string;
  background?: string;
}

declare interface ButtonEvent {
  btnCom: {
    buttonType?: string;
    isLoading?: boolean;
  };
  btn: {
    loading?: boolean;
  };
}

declare interface PageValues {
  [key: string]: any; // 存储组件值的字典，具体类型可能需要根据实际情况调整
}

declare interface PageApiJs {
  [key: string]: {
    requestFunc?: (config: RequestConfig, headers: any) => void;
    responseFunc?: (response: any) => void;
    errorFunc?: (error: any) => void;
  };
}

declare interface PageService {
  [key: string]: RequestConfig;
}

declare interface RequestConfig {
  method: string;
  url: string;
  headers?: any;
  params?: any;
  data?: any;
  options: {
    source: string;
    uri: string;
    method: string;
    params?: any;
  };
  requestFunc?: (config: RequestConfig, headers: any) => void;
  responseFunc?: (response: any) => void;
  errorFunc?: (error: any) => void;
  isEncrypt?: boolean;
}

declare interface ComHideObj {
  [key: string]: boolean;
}

declare interface ThrottleProps {
  params?: any; // 需要传递的参数
  time?: number; // 间隔时间，默认为200毫秒
  leading?: boolean; // 前触发，默认为false
  trailing?: boolean; // 后触发，默认为true
}

declare interface DialogParams {
  key: ComKey;
  params?: object; // 附加参数，具体类型可能需要根据实际情况调整
  winParams?: {
    title: string;
  }; // 弹窗配置参数，具体类型可能需要根据实际情况调整
  callback?: () => void; // 弹窗(关闭)回调
  beforeClose: (done: Function) => {};
  type?: string; // 弹窗类型
}

declare interface PageMixin {
  /**
   * 页面的所有值存在位置
   */
  $pageValues: PageValues;

  /**
   * 全局变量
   */
  globalVars: object;

  /**
   * 页面参数
   */
  pageParams: PageParams;

  /**
   * 页面代码
   */
  pageCode: string;

  /**
   * 校验工具类
   */
  $Validate: Validate;

  pageComHides: ComHideObj;

  pageService: PageService;
  pageApiJs: PageApiJs;

  /**
   * 存储组件加载状态的字典
   */
  pageComLoading: { [key: string]: LoadingOptions };

  $pageRoute: {
    pageQuery: Record<string, string>;
    vueQuery: object;
    pageParams: PageParams;
  };

  /**
   * 控制页面展示
   * @param bo - 页面是否显示
   */
  setPageShow(bo: boolean): void;

  // /**
  //  * 打开内部页面tab
  //  * @param page - 页面信息
  //  * @param dialogParams - 对话框参数
  //  * @returns 返回值取决于$virtTabs或PageDialog.show的结果
  //  */
  // $openPage(page: PageInfo, dialogParams?: DialogParams): any;

  /**
   * 下载文件
   * @param url - 文件的URL
   * @param params - 请求参数
   * @param sendTime - 发送时间戳，默认为当前时间
   */
  $getFile(url: string, params?: object, sendTime?: number): void;

  /**
   * 页面弹窗
   * @param params - 弹窗参数
   * @param com - 弹窗挂载节点
   * @returns 弹窗实例或null
   */
  $pageDialog(params: DialogParams, com?: any): Dialog;

  /**
   * 获取dialog
   * @param key - 弹窗的key
   * @returns 弹窗实例或所有弹窗实例
   */
  $getDialog(key: ComKey): Dialog;

  /**
   * 访问页面组件对象
   * @param comKey - 组件的key
   * @returns 组件对象或PageController实例
   */
  $page(comKey: ComKey): Page;

  /**
   * 组件内部方法调用，支持异步调用
   * @param comKey - 组件的key
   * @param funcName - 方法名称
   * @param params - 方法参数
   * @returns Promise，解析为方法的返回值
   */
  $comMethod(comKey: string, funcName: string, ...params: any[]): Promise<any>;

  /**
   * 节流方法
   * @param key - 节流key
   * @param func - 运行的防抖函数
   * @param props - 配置参数
   * @returns 节流函数
   */
  $throttle(
    key: string,
    func: (...args: any[]) => void,
    props?: ThrottleProps
  ): any;

  /**
   * 控制组件loading
   * @param loadObj - 加载对象或布尔值
   */
  $pageLoading(
    loadObj: { [key: string]: boolean | LoadingOptions } | boolean
  ): void;

  /**
   * 设置组件显示隐藏，但是不移除节点
   * @param obj - 组件显示隐藏状态对象
   */
  $setHide(obj: ComHideObj): void;

  /**
   * 数据请求方法
   * @param key - API名称或请求配置对象
   * @param params - 请求参数
   * @param btnEvent - 按钮事件对象
   * @returns Promise，解析为请求的响应
   */
  $request(
    key: string | RequestConfig,
    params?: any,
    btnEvent?: ButtonEvent
  ): Promise<any>;

  /**
   * 获取组件值
   * @param key - 组件的key
   * @returns 组件值或所有组件值
   */
  $getVal(key?: ComKey): any | PageValues;

  /**
   * 设置模型组件值的变化
   * @param key - 组件的key
   * @param modelKey - 模型的key
   * @param value - 要设置的值
   */
  $setModelVal(key: ComKey, modelKey: string, value: any): void;

  /**
   * 设置组件值
   * @param key - 组件的key
   * @param value - 组件值
   * @returns Promise，解析为空值
   */
  $setVal(key: ComKey, value: any): Promise<void>;

  /**
   * 设置组件值
   * @param key - 组件的key
   * @param value - 组件值
   * @returns Promise，解析为空值
   */
  $setVal(key: ComKey, value: any): Promise<void>;

  /**
   * 调用消息接口
   * @param params - 消息参数，为object类型时参考element ui的message参数，为string时直接传显示内容
   * @param type - 消息类型，参数参考element ui，只有在params类型为string时有效
   */
  $Msg(
    params: string | { [key: string]: any },
    type?: "success" | "warning" | "info" | "error"
  ): void;
}

declare interface ComProps {
  [key: string]: any; // 组件属性，具体类型可能需要根据实际情况调整
}

declare interface ComsProps {
  [key: string]: ComProps; // 组件及其属性的字典
}

declare interface ComJSON {
  dataOptions?: {
    modelConfig?: any; // 具体类型可能需要根据实际情况调整
  };
}

declare interface ModelConfig {
  [key: string]: any; // 需要修改的配置，具体类型可能需要根据实际情况调整
}

declare interface SourceConfig {
  [key: string]: any; // 需要修改的配置，具体类型可能需要根据实际情况调整
}

declare interface CommonApi {
  pageComJSON: { [key: string]: ComJSON };
  /**
   * 设置组件属性
   * @param key - 组件的key
   * @param prop - 需要修改的属性
   */
  $setComProps(key: string, prop: ComProps): void;

  /**
   * 批量设置组件属性
   * @param comsProps - 需要修改组件的属性
   */
  $setComsProps(comsProps: ComsProps): void;

  /**
   * 获取组件属性
   * @param key - 组件的key
   * @returns 组件属性
   */
  $getComProps(key: string): ComProps | undefined;

  /**
   * 获取组件JSON
   * @param key - 组件的key
   * @returns 组件JSON
   */
  $getComJSON(key: ComKey): ComJSON;

  /**
   * 修改模型字段配置
   * @param key - 组件的key
   * @param prop - 需要修改的属性
   */
  $setModelConfig(key: ComKey, prop: any): void;

  /**
   * 设置组件远程模型配置属性
   * @param modelConfig - 包含组件key和需要修改的配置的对象
   */
  $setRemoteModels(modelConfig: { [key: string]: ModelConfig }): void;

  /**
   * 设置组件远程数据配置属性
   * @param sourceConfig - 包含组件key和需要修改的配置的对象
   */
  $setDataSource(sourceConfig: { [key: string]: SourceConfig }): void;

  /**
   * 隐藏指定tab
   * @param key - 组件的key
   * @param tabKey - 需要隐藏的tab的key
   */
  $hideComTab(key: string, tabKey: string): void;

  /**
   * 显示指定tab
   * @param key - 组件的key
   * @param tabKey - 需要显示的tab的key
   */
  $showComTab(key: string, tabKey: string): void;
}

declare interface Page extends PageMixin, CommonApi {
  pageLoading: LoadingOptions;
  pageType: string;
  owner: object | null;
  appCode: string;
  pageCode: string;
  isDesign: boolean;
  pageInfo: object;
  pageName: string;
  pageShow: boolean;
}

declare interface Request {}

declare interface Validate {
  /**
   * @description 判断是否为外链
   * @param path
   * @returns {boolean}
   */
  isExternal(path: string): boolean;

  /**
   * @description 校验密码是否小于6位
   * @param value
   * @returns {boolean}
   */
  isPassword(value: string): boolean;

  /**
   * @description 判断是否为数字
   * @param value
   * @returns {boolean}
   */
  isNumber(value: string): boolean;

  /**
   * @description 判断是否是名称
   * @param value
   * @returns {boolean}
   */
  isName(value: string): boolean;

  /**
   * @description 判断是否为IP
   * @param ip
   * @returns {boolean}
   */
  isIP(ip: string): boolean;

  /**
   * @description 判断是否是传统网站
   * @param url
   * @returns {boolean}
   */
  isUrl(url: string): boolean;

  /**
   * @description 判断是否是小写字母
   * @param value
   * @returns {boolean}
   */
  isLowerCase(value: string): boolean;

  /**
   * @description 判断是否是大写字母
   * @param value
   * @returns {boolean}
   */
  isUpperCase(value: string): boolean;

  /**
   * @description 判断是否是大写字母开头
   * @param value
   * @returns {boolean}
   */
  isAlphabets(value: string): boolean;

  /**
   * @description 判断是否是字符串
   * @param value
   * @returns {boolean}
   */
  isString(value: any): boolean;

  /**
   * @description 判断是否是数组
   * @param arg
   * @returns {boolean}
   */
  isArray(arg: any): boolean;

  /**
   * @description 判断是否是端口号
   * @param value
   * @returns {boolean}
   */
  isPort(value: string): boolean;

  /**
   * @description 判断是否是手机号
   * @param value
   * @returns {boolean}
   */
  isPhone(value: string): boolean;

  /**
   * @description 判断是否是身份证号(第二代)
   * @param value
   * @returns {boolean}
   */
  isIdCard(value: string): boolean;

  /**
   * @description 判断是否是邮箱
   * @param value
   * @returns {boolean}
   */
  isEmail(value: string): boolean;

  /**
   * @description 手机号码
   * @param str
   * @returns {boolean}
   */
  isMobile(str: string): boolean;

  /**
   * @description 判断是否中文
   * @param value
   * @returns {boolean}
   */
  isChina(value: string): boolean;

  /**
   * @description 判断是否为空
   * @param value
   * @returns {boolean}
   */
  isBlank(value: any): boolean;

  /**
   * @description 判断是否为固话
   * @param value
   * @returns {boolean}
   */
  isTel(value: string): boolean;

  /**
   * @description 判断是否为数字且最多两位小数
   * @param value
   * @returns {boolean}
   */
  isNum(value: string): boolean;

  /**
   * @description 判断是否为json
   * @param value
   * @returns {boolean}
   */
  isJson(value: string): boolean;
}

declare interface ComponentOptions {
  [key: string]: any; // 组件选项，具体类型可能需要根据实际情况调整
}

declare interface Component {
  options: ComponentOptions;
}

declare interface ComList {
  map: { [key: string]: Component };
}

declare interface WatchHandler<T> {
  (newVal: any, oldVal: any, this: T): void;
}

declare interface PageWatch<T> {
  [key: string]: {
    /**
     * @this {Page}
     */
    handler: WatchHandler<T>;
  };
}

declare interface PageComputed<T> {
  /**
   * @this {T}
   */
  [key: string]: (this: T) => any;
}

declare interface ReturnModule extends Page, CommonModule {
  [key: string]: any; // 动态属性和方法
}

interface CommonModule {
  pageWatch: PageWatch<ReturnModule>;
  pageComputed: PageComputed<ReturnModule>;
  /**
   * 固定方法，页面准备完成后调用，当前可以操作组件属性，调用未隐藏组件实例方法
   */
  pageReady(): void;
  /**
   * 固定方法，页面js初始化完成后调用,当前能修改js变量，修改组件初始化属性或者设置组件默认值
   */
  pageCreated(): void;
  /**
   * 页面被重新激活时调用
   */
  pageActivated(): void;
  /**
   * 页面失去激活被缓存时调用
   */
  pageDeactivated(): void;
  /**
   * 固定方法，页面销毁前调用
   */
  pageDestroy(): void;
}

type That = Omit<ReturnModule, keyof CommonModule>;
