import { getCommodityDetail } from '../../../../services/commodity';
import * as log from '../../../../utils/log';

Component({
  mixins: [],
  data: {
    selectedTagId: '',
    selectedOptionIds: [],
    currentCommodity: {},
    purchaseNumber: 1,
    address: '杭州市 余杭区  闲林街道  翡翠城东北区',
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
    const { commodityId } = this.props;
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
      getCommodityDetail(id)
        .then(({ data }) =>
          this.setData({
            currentCommodity: data[id],
            selectedTagId: this.getFirstId(data[id].Tag),
            selectedOptionIds: data[id].options.map(item =>
              this.getFirstId(item.values)
            ),
          })
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
    },
    onConfirmVote() {
      // TODO: add request
      this.props.onConfirmVote();
    },
  },
});
