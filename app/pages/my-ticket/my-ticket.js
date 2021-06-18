import { getTickets } from '../../services/commodity';

Page({
  data: {

    tickets: [],
  },
  onLoad() {
    // console.log(getTickets());
    getTickets().then(({ data }) =>
          this.setData({
              tickets: data
          })
        );
  },
  
});
