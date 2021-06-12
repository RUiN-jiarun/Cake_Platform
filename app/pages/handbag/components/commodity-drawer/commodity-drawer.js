import { getCommodityDetail } from '../../../../services/commodity';
import * as log from '../../../../utils/log';

Component({
  mixins: [],
  data: {
    selectedTagId: '',
    selectedOptionIds: [],
    currentCommodity: {},
    // commentsLike: [],
  },
  props: {
    show: false,
    onClose: () => {},
    onConfirm: () => {},
    onConfirmVote: () => {},
    commodityId: '',
  },
  didMount() {},
  didUpdate(preProps) {
    console.log('更新');
    const { commodityId } = this.props;
    // this.fetchCommodityDetailById(commodityId);
    if (preProps.commodityId !== commodityId) {
      this.fetchCommodityDetailById(commodityId);
    }
  },
  didUnmount() {},
  methods: {
    onClose() {
      this.props.onClose();
    },
    fetchCommodityDetailById(id) {
      console.log(id);
      getCommodityDetail(id)
        .then(({ data }) => {
          console.log(data);
          this.setData({
            currentCommodity: data[id],
            selectedTagId: this.getFirstId(data[id].Tag),
            // selectedOptionIds: data[id].options.map(item =>
            //   this.getFirstId(item.values)
            // ),
          })}
        )
        .catch(err =>
          log.error(
            'CommodityDrawer.fetchCommodityDetailById.getCommodityDetail',
            err
          )
        );
    },
    getFirstId(list = []) {
      if (list.length > 0) {
        return list[0].id;
      }
      return null;
    },
    onTagSelect(id) {
      this.setData({ selectedTagId: id });
    },
    onOptionSelect(id, index) {
      console.log("option select");
      const nextSelectedOptionIds = [...this.data.selectedOptionIds];
      nextSelectedOptionIds[index] = id;
      this.setData({ selectedOptionIds: nextSelectedOptionIds });
    },
    onPurchaseNumberChange(num) {
      this.setData({ purchaseNumber: num });
    },
    onConfirm() {
      // TODO: add request
      this.props.onConfirm();
      this.onClose();
    },
    onConfirmVote() {
      // TODO: add request
      this.props.onConfirmVote();
      this.onClose();
    },
    onLikeComments(e) {
      var attr = e.currentTarget.dataset.attr;
      var state = this.data.currentCommodity.comments[attr].likeState;
      this.data.currentCommodity.comments[attr].likeState = !state;
      my.showToast({
        type: 'success',
        content: '点赞成功',
        duration: 3000,
      });
      console.log(this.data.currentCommodity.comments[attr].likeState);
      // this.props.onLikeComments(attr);
      this.onClose();
    },
  },
});
