import { getCommodityDetail } from '../../../../services/commodity';
import * as log from '../../../../utils/log';

Component({
  mixins: [],
  data: {
    selectedTagId: '',
    selectedOptionIds: [],
    currentCommodity: {},
  },
  props: {
    show: false,
    onClose: () => {},
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
            currentCommodity: data,
            selectedTagId: this.getFirstId(data.Tag),
            selectedOptionIds: data.options.map(item =>
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
  },
});