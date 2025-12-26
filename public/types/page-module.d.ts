declare interface PageModule {
  /**
   * 监听指定对象的值发生变化，然后执行特定方法
   */
  pageWatch?: {
    [key: string]: ((newVal: any, oldVal: any) => void) | {
      handler: () => void;
      immediate?: boolean;
      deep?: boolean;
    };
  };

  /**
   * 计算属性，当依赖的值变化时重新计算
   */
  pageComputed?: {
    [key: string]: (() => any) | {
      get(): any;
      set(v: any): void;
    };
  };

  /**
   * 响应式变量，该变量不能加到组件参数内,但是写到组件模板里
   */
  [key: string]: any;

  /**
   * 响应式变量，当值变化时可以影响所有绑定的值,建议把需要绑定到组件参数里的变量申明到这里面
   */
  globalVars?: {
    [key: string]: any;
  };

  /**
   * 页面被重新激活时调用
   */
  pageActivated?(): void;

  /**
   * 页面失去激活被缓存时调用
   */
  pageDeactivated?(): void;

  /**
   * 固定方法，页面js初始化完成后调用,当前能修改js变量，修改组件初始化属性或者设置组件默认值
   */
  pageCreated?(): void;

  /**
   * 固定方法，页面准备完成后调用，当前可以操作组件属性，调用未隐藏组件实例方法
   */
  pageReady?(): void;

  /**
   * 固定方法，页面销毁前调用
   */
  pageDestroy?(): void;
}

declare function define(
  factory: (require: NodeRequire) => PageModule
): PageModule;