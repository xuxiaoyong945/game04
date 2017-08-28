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
    },

    // use this for initialization
    onLoad: function () {
        console.log("gamescene onLoad");
        this.initData();
    },

    initData: function() {
        var card_type = ["红", "黑", "方", "梅"];
        var card_value = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
        var person_num = 4;
        var rule = {};
        rule["type"] = [2, 3, 0, 1];
        rule["card"] = [12, 0, 1, 2, 3, 4, 5 ,6, 7, 8, 9, 10, 11];

        var result_card_ids = this.randomCard(card_type, card_value);
        var person_cards = this.dealCard(result_card_ids, person_num);
        var sort_cards = [];
        for (var i = 0; i < person_cards.length; i++) {
            sort_cards.push(this.sortCard(person_cards[i], rule));
        }

        console.log(sort_cards);
    },

    randomCard: function(card_type, card_value) {
        var all_card_ids = [];
        var result_card_ids = [];

        for (var i = 0; i < card_type.length; i++) {
            for (var j = 0; j < card_value.length; j++) {
                var tmp = {};
                tmp["type"] = i;
                tmp["card"] = j;
                all_card_ids.push(tmp);
            }
        }

        for (var i = 0; i < card_type.length * card_value.length; i++) {
            var rand = Math.random();
            var random_index = Math.floor(rand/1*all_card_ids.length);
            result_card_ids.push(all_card_ids[random_index]);
            all_card_ids.splice(random_index, 1);
        }

        return result_card_ids;
    },

    dealCard: function(cards, person_num) {
        var person_cards = [];
        for (var i = 0; i < person_num; i++) {
            person_cards[i] = [];
            for (var j = 0; j < 9; j++) {
                person_cards[i].push(cards.pop());
            }
        }
        return person_cards;
    },

    sortCard: function(cards, rule) {
        var result;
        result = this.bubbleSort(cards, rule);
        return result;
    },

    showCard: function(card_type, card_value, arr) {
        return card_type[arr["type"]] + card_value[arr["card"]];
    },

    bubbleSort: function(arr, rule) {
        var i = arr.length;
        var j = 0;
        var tmp;
        while(i > 0) {
            for (var j = 0; j < i - 1; j++) {
                if(rule["card"][arr[j]["card"]] < rule["card"][arr[j + 1]["card"]]) {
                    tmp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = tmp; 
                }
            }
            i--;
        }
        return arr;
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {

    },
});
