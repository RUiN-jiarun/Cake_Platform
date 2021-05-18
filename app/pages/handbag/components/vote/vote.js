Component({
  mixins: [],
  data: {},
  props: {
    voteData: [],
    columns: 1,
    // isRanking: false,
    onTapCommodity: () => {},
  },
  didMount() {},
  didUpdate() {},
  didUnmount() {},
  methods: {
    onTapCommodity(e) {
      this.props.onTapCommodity(e.target.dataset.id);
    },
  },
});