cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        layout: cc.Layout
    },

    // use this for initialization
    onLoad: function () {
        this.label_string = "";
        this.input_index = 0;
        this.input_max = 4;
        this.initUI();
    },

    initUI: function() {
        var self = this;
        this.label = this.layout.node.getChildByName("label").getComponent(cc.Label);
        this.label.string = this.label_string;

        this.confirm = this.layout.node.getChildByName("button_confirm").getComponent(cc.Button);
        this.confirm.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            if(self.input_index == self.input_max || self.input_index == self.input_max + 1) {
                cc.director.loadScene("GameScene");
            }else{
                console.log("error input");
                alert("输入的位数不对");
            }
        });

        this.back = this.layout.node.getChildByName("button_back").getComponent(cc.Button);
        this.back.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            console.log("back");
            self.input_index = self.input_index - 1;
            if(self.input_index < 0) {
                console.log("input 0")
                self.input_index = 0;
                return
            }
            self.label_string = self.label_string.slice(0, self.label_string.length-1);
            self.label.string = self.label_string;
        });

        this.number_button = [];
        for (var i = 0; i < 10; i++) {
            this.number_button[i] = this.layout.node.getChildByName("button" + i).getComponent(cc.Button);
            this.number_button[i].node.tag = i;
            this.number_button[i].node.on(cc.Node.EventType.TOUCH_START, function (event) {
                var tag = event.target.getTag();
                self.input_index = self.input_index + 1;
                if(self.input_max < self.input_index) {
                    self.input_index = self.input_max + 1;
                    console.log("input max");
                    return
                }
                self.label_string = self.label_string + "" + tag;
                self.label.string = self.label_string;
            });
        }        
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
