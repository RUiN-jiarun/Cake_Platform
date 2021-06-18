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
    onClose: () => { },
    onConfirm: () => { },
    onConfirmVote: () => { },
    commodityId: '',
  },
  didMount() { },
  // deriveDataFromProps(nextProps) {
  //   this.setData({ currentCommodity: nextProps.currentCommodity, });
  // },
  didUpdate(preProps) {
    console.log('更新');
    const { commodityId } = this.props;
    // this.fetchCommodityDetailById(commodityId);
    if (preProps.commodityId !== commodityId) {
      this.fetchCommodityDetailById(commodityId);
    }
  },
  didUnmount() { },
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
          })
        }
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
      var key=  'currentCommodity.comments['+attr.toString()+'].likeState';
      var ostate=this.data.currentCommodity.comments[attr].likeState
      var nstate=!ostate;

      this.setData({[key]:nstate});
      // this.data.currentCommodity.comments[attr].likeState = !state;

      console.log(nstate);
      console.log(this.data.currentCommodity.comments[attr].likeState);
      // this.props.onLikeComments(attr);
      // this.onClose();
    },
    bindFormSubmit(e) {
      this.AddNewComment(e.detail.value.textarea);
      // my.alert({
      //   content: e.detail.value.textarea,
      // });
    },
    AddNewComment(remark) {
      var ncom =
      {
        id: 2,
        name: "什么鬼",
        useravatar: "https://gw.alipayobjects.com/mdn/rms_107da2/afts/img/A*O-qpSpu9vgQAAAAAAAAAAABkARQnAQ",
        description: remark,
        time: "2021-6-17",
        likeState: false,
        num: 0
      };
      this.setData({ 'currentCommodity.comments': [...this.data.currentCommodity.comments, ncom]});

    }
  },
});
