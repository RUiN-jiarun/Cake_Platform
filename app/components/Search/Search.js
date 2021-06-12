Component({
  mixins: [],
  data: {
    focus: false,
  },
  props: {
    disabled: false,
    defaultFocus: false,
    value: "",
    className: "",
    onInput: () => {},
    onClear: () => {},
    onConfirm: () => {},
    onSearch: (data) => {console.log(data)},
  },
  didMount() {
    if (this.props.defaultFocus) {
      this.onFocus();
    }
  },
  didUpdate() {},
  didUnmount() {},
  methods: {
    onBlur() {
      this.setData({ focus: false });
    },
    onFocus() {
      this.setData({ focus: true });
    },
    clear() {
      this.props.onClear();
    },
    onConfirm() {
      // 触发方式是回车键
      // console.log(this.props.value);
      // this.setData({searchVal: this.props.value});
      // console.log(this.searchVal);
      this.props.onSearch(this.props.value);
      // console.log(this)
      this.props.onConfirm();

      // 只能在这里调用刷新handbag界面的方法吗。。。。
      
    },

    // onSearch() {
    //   // 这里更改搜索后的反馈
    //   console.log('change');
    // },
    onInput(e) {
      // console.log(e)
      this.props.onInput(e);
    },
  },
});
