Component({
  mixins: [],
  data: {},
  props: {
    voteData: [],
    columns: 1,
    // isRanking: false,
    // onTapVote: () => {},
    onTapVote: () =>
          my.navigateTo({
            url: '/pages/vote/vote',
          }),
  },
  didMount() {},
  didUpdate() {},
  didUnmount() {},
  methods: {
    onTapVote(e) {
      this.props.onTapVote(e.target.dataset.id);
    },
  },
  // onListClick(e) {
  //   // const { onClick } = e.target.dataset.id;
  //   if (onClick) {
  //     onClick();
  //   }
  // },
});