Component({
  mixins: [],
  data: {},
  props: {
    options: [],
    selectedOptionId: "",
    onSelectOption: () => {},
    identifyId: "",
  },
  onInit() {
    var tags = this.props.options;
    console.log(tags);
    for (var i=0, len=tags.length; i < len; i++) {
      console.log(tags[i]);
      tags[i].color = this.getColor(1,50,tags[i].num);
      console.log(tags[i]);
    }
  },
  didMount() {
    
    
  },
  didUpdate() {
    // var tags = this.props.options;
    // console.log(tags);
    // for (var i=0, len=tags.length; i < len; i++) {
    //   console.log(tags[i]);
    //   tags[i].color = this.getColor(1,50,tags[i].num);
    // }
  },
  didUnmount() {},
  
  methods: {
    onSelectOption(e) {
      // console.log(this);
      // console.log(this.props.options[e.target.dataset.id-1].num);
      // var curNum = this.props.options[e.target.dataset.id-1].num;
      this.props.onSelectOption(e.target.dataset.id, this.props.identifyId);
      // var color = this.getColor(1,50,curNum);
      // console.log(color);
    },
    getColor(min,max,n) {
      if(max == min) {
        if(n>0) {
          return 'rgb(255,0,0)'
        } 
        else{
          return 'rgb(255,255,255)'
        }
      }
      let c = Math.max(0.1, (n-min)/(max-min))
      let red = 255;
      let green = (1-c)*255
      return 'rgb('+red+','+green+','+green+')'
    }
  },
});
