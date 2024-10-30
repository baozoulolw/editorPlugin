const error = {
  DEFAULT: '#F53F3F',
  1: '#FFECE8',
  2: '#FDCDC5',
  3: '#FBACA3',
  5: '#F76560',
  6: '#F53F3F',
  7: '#CB2634',
}

export default {
  prefix: 'tw-',
  blocklist: [],
  safelist: [
    {
      pattern: /(text|bg)-(primary|success|warning|error|line|text|fill)(-\d)?$/,
      variants: ['hover'],
    },
    {
      pattern: /^tw-(text|font)-(\w+)(-\d)?$/,
      variants: ['hover'],
    },
    {
      pattern: /^-?tw-(m|p)(t|r|b|l|x|y)?-(\w+)/,
      // variants: ['hover'],
    },
    {
      pattern: /^-?tw-(w|h|left|right|top|bottom)-(\w+)/,
      // variants: ['hover'],
    },
    {
      pattern: /^tw-(block|inline-block|inline|flex|inline-flex|hidden)/,
      // variants: ['hover'],
    },
    {
      pattern: /^tw-(static|fixed|absolute|relative|sticky)/,
      // variants: ['hover'],
    },
    {
      pattern: /^tw-(justify|shrink|items|object|cursor-pointer)/,
      // variants: ['hover'],
    },
    {
      pattern: /^tw-rounded(-(sm|md|lg|xl|full))?$/,
      // variants: ['hover'],
    },
    {
      pattern: /^tw-border(-(\w+)(-\d)?)?$/,
      // variants: ['hover'],
    },
    {
      pattern: /^tw-whitespace-(\w+)$/,
      // variants: ['hover'],
    },
    {
      pattern: /^tw-gap-((\w+)|(\d+))$/,
      // variants: ['hover'],
    },
  ],
  corePlugins: {
    preflight: false,
  },
  theme: {
    colors: {
      default: '#BCC2CD',
      fff: '#fff',
      primary: {
        DEFAULT: '#165DFF',
        1: '#EFF7FF',
        2: '#BEDAFF',
        3: '#94BFFF',
        4: '#6AA1FF',
        5: '#4080FF',
        6: '#165DFF',
        7: '#0E42D2',
      },
      success: {
        DEFAULT: '#00B42A',
        1: '#E8FFEA',
        2: '#AFF0B5',
        3: '#7BE188',
        5: '#23C343',
        6: '#00B42A',
        7: '#009A29',
      },
      warning: {
        DEFAULT: '#FF7D00',
        1: '#FFF7E8',
        2: '#FFE4BA',
        3: '#FFCF8B',
        5: '#FF9A2E',
        6: '#FF7D00',
        7: '#D25F00',
      },
      error,
      // danger: error,
      line: {
        1: '#EDEFF2', // 浅
        2: '#DFE2E8', // 一般
        3: '#C9CDD4', // 深
      },
      text: {
        1: '#FFFFFF', // 纯白文字
        2: '#C9CDD4', // 占位符信息
        3: '#BCC2CD', // 新增禁用状态文字色
        4: '#86909C', // 次要信息
        5: '#4E5969', // 次强调/正文标题
        6: '#1D2129', // 强调/正文标题
      },
      fill: {
        1: '#FFFFFF', // 纯白
        2: '#F7F8FA', // 禁用背景色/表头/背景色
        3: '#EDEFF2', // 常规/一般
        4: '#EDEFF2', // 常规/一般
        5: '#EDEFF2', // 常规/一般
        6: '#BCC2CD', // 提示图标/一般
        7: '#86909C', // 次强调/图标
        8: '#4E5969', // 强调/图标/特殊场景
      },
    },
  },
  plugins: [],
}