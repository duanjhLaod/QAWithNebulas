var Q = function(obj) {
    this.id = obj.id;
    this.sum = obj.sum;
    this.desc = obj.desc;
    this.bonus = obj.bonus;
    this.closeTS = obj.closeTS;
    this.closed = obj.closed;
}

var Contract = function() {
    LocalContractStorage.defineProperties(this, {
        admin: null,
        qCounter: null
    });

    LocalContractStorage.defineMapProperties(this, {
        questions: {
            parse: function(str) {
                return new Q(JSON.parse(str));
            }
        }
    });
}

Contract.prototype = {
    init: function() {
        this.admin = Blockchain.transaction.from;
        this.questions.set(0,new Q({
            id: 0,
            sum: "question1",
            desc: "question1 desc",
            bonus: "0.5",
            closeTS: "143113",
            closed: true
        }));
        this.questions.set(1,new Q({
            id: 1,
            sum: "question2",
            desc: "question2 desc",
            bonus: "0.5",
            closeTS: "143113",
            closed: false
        }));
        this.questions.set(2,new Q({
            id: 2,
            sum: "question3",
            desc: "question3 desc",
            bonus: "0.5",
            closeTS: "1431137777777777",
            closed: false
        }));
        this.qCounter = 3;
    },

    qlist: function(closed) {
        var ret = [];
        for (let i = 0; i < this.qCounter; i++) {
            let q = this.questions.get(i);
            if (q) {
                let isClosedOrTimeout = new BigNumber(Blockchain.block.timestamp).greaterThan(new BigNumber(q.closeTS)) || q.closed;
                if (isClosedOrTimeout == closed) {
                    ret.push(q);
                }
            }
        }
        return ret;
    }
}

module.exports = Contract;

// n1nUXV6hfyoouamaaCut9MxL5mEJodif9C2
// d3db77719c7a7c1c78c1c574035b56f9e31cead2da4a870471ae743cc117b274