cc.Class({
    extends: cc.Component,

    properties: {
        point: cc.Label,
        suit: cc.Sprite,
        mainPic: cc.Sprite,
        cardBG: cc.Sprite,
        redTextColor: cc.Color.WHITE,
        blackTextColor: cc.Color.WHITE,
        texFrontBG: cc.SpriteFrame,
        texBackBG: cc.SpriteFrame,
        texFaces: {
            default: [],
            type: cc.SpriteFrame
        },
        texSuitBig: {
            default: [],
            type: cc.SpriteFrame
        },
        texSuitSmall: {
            default: [],
            type: cc.SpriteFrame
        }
    },

    // use this for initialization
    // onLoad: function () {
        
    // },

    init: function(data) {
        var card_type = ["红", "黑", "方", "梅"];
        var card_value = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
        this.point.string = card_value[data["card"]];
        this.suit.spriteFrame = this.texSuitSmall[data["type"]];
        if(data["type"] == 0 || data["type"] == 2) {
            this.point.node.color = this.redTextColor;
        }else{
            this.point.node.color = this.blackTextColor;
        }
        if(data["card"] > 10) {
            this.mainPic.spriteFrame = this.texFaces[data["card"] - 10];
        }else{
            this.mainPic.spriteFrame = this.texSuitBig[data["type"]];
        }
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
