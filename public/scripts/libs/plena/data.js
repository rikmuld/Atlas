//big mess, needs a ton of work
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var NUMBER_COMPARE = function (a, b) {
    return a - b;
};
var STRING_COMPARE = function (a, b) {
    return a.localeCompare(b);
};
//class HashMap<Key, Value> {
//}
//class DeepHashMap<Key, Value> {
//}
var Comparable = (function () {
    function Comparable(compare) {
        this.compare = compare;
    }
    return Comparable;
})();
var RBColor;
(function (RBColor) {
    RBColor[RBColor["RED"] = 0] = "RED";
    RBColor[RBColor["BLACK"] = 1] = "BLACK";
})(RBColor || (RBColor = {}));
;
var RBItemNode = (function () {
    function RBItemNode(value, color, size) {
        this.color = color;
        this.key = value;
        this.size = size;
    }
    return RBItemNode;
})();
var TreeSet = (function (_super) {
    __extends(TreeSet, _super);
    function TreeSet() {
        _super.apply(this, arguments);
    }
    TreeSet.prototype.clear = function () {
        this.root = null;
    };
    TreeSet.prototype.isEqual = function (that) {
        if (this.size() != that.size())
            return false;
        var ittr1 = this.iterator();
        var ittr2 = that.iterator();
        for (var i = 0; i < ittr1.length; i++) {
            if (ittr1[i] != ittr2[i])
                return false;
        }
        return true;
    };
    TreeSet.prototype.size = function () {
        if (this.root != null)
            return this.sizeAt(this.root);
        return 0;
    };
    TreeSet.prototype.sizeAt = function (node) {
        if (node == null)
            return 0;
        return node.size;
    };
    TreeSet.prototype.childSize = function (node) {
        return this.sizeAt(node.left) + this.sizeAt(node.right);
    };
    TreeSet.prototype.isEmpty = function () {
        return this.size() == 0;
    };
    TreeSet.prototype.isRed = function (node) {
        if (node == null)
            return false;
        return node.color == RBColor.RED;
    };
    TreeSet.prototype.applyAt = function (node, key) {
        if (node == null)
            return null;
        else {
            var comp = this.compare(key, node.key);
            if (comp < 0)
                return this.applyAt(node.left, key);
            else if (comp > 0)
                return this.applyAt(node.right, key);
            return node.key;
        }
    };
    TreeSet.prototype.contains = function (key) {
        return this.applyAt(this.root, key) != null;
    };
    TreeSet.prototype.pick = function () {
        return this.root.key;
    };
    TreeSet.prototype.add = function (item) {
        this.root = this.putAt(this.root, item);
        this.root.color = RBColor.BLACK;
    };
    TreeSet.prototype.putAt = function (node, key) {
        if (node == null)
            return new RBItemNode(key, RBColor.RED, 1);
        var comp = this.compare(key, node.key);
        if (comp < 0)
            node.left = this.putAt(node.left, key);
        else if (comp > 0)
            node.right = this.putAt(node.right, key);
        else
            node.key;
        if (this.isRed(node.right) && !this.isRed(node.left))
            node = this.leftRot(node);
        if (this.isRed(node.left) && this.isRed(node.left.left))
            node = this.rightRot(node);
        if (this.isRed(node.left) && this.isRed(node.right))
            this.flipColors(node);
        node.size = this.sizeAt(node.left) + this.sizeAt(node.right) + 1;
        return node;
    };
    TreeSet.prototype.rightRot = function (node) {
        return this.rotate(node, false);
    };
    TreeSet.prototype.leftRot = function (node) {
        return this.rotate(node, true);
    };
    TreeSet.prototype.rotate = function (node, left) {
        var nwTop = left ? node.right : node.left;
        if (left) {
            node.right = nwTop.left;
            nwTop.left = node;
            nwTop.color = nwTop.left.color;
            nwTop.left.color = RBColor.RED;
            nwTop.size = node.size;
        }
        else {
            node.left = nwTop.right;
            nwTop.right = node;
            nwTop.color = nwTop.right.color;
            nwTop.right.color = RBColor.RED;
            nwTop.size = node.size;
        }
        node.size = this.childSize(node) + 1;
        return nwTop;
    };
    TreeSet.prototype.flipColors = function (node) {
        this.flipColor(node);
        if (node.left != null)
            this.flipColor(node.left);
        if (node.right != null)
            this.flipColor(node.right);
    };
    TreeSet.prototype.flipColor = function (node) {
        switch (node.color) {
            case RBColor.BLACK: node.color = RBColor.RED;
            case RBColor.RED: node.color = RBColor.BLACK;
        }
    };
    TreeSet.prototype.redToLeft = function (node) {
        this.flipColors(node);
        if (this.isRed(node.right.left)) {
            node.right = this.rightRot(node.right);
            node = this.leftRot(node);
            this.flipColors(node);
        }
        return node;
    };
    TreeSet.prototype.redToRight = function (node) {
        this.flipColors(node);
        if (this.isRed(node.left.left)) {
            node = this.rightRot(node.right);
            this.flipColors(node);
        }
        return node;
    };
    TreeSet.prototype.balance = function (node) {
        if (this.isRed(node.right))
            node = this.leftRot(node);
        if (this.isRed(node.left) && this.isRed(node.left.left))
            node = this.rightRot(node);
        if (this.isRed(node.left) && this.isRed(node.right))
            this.flipColors(node);
        node.size = this.childSize(node) + 1;
        return node;
    };
    TreeSet.prototype.iterator = function () {
        var itterator = [];
        this.iteratorAt(this.root, itterator);
        return itterator;
    };
    TreeSet.prototype.iteratorAt = function (node, array) {
        if (node == null)
            return;
        array.push(node.key);
        this.iteratorAt(node.left, array);
        this.iteratorAt(node.right, array);
    };
    TreeSet.prototype.remove = function (item) {
        if (!this.contains(item))
            return false;
        if (!this.isRed(this.root.left) && !this.isRed(this.root.right))
            this.root.color = RBColor.RED;
        this.root = this.removeAt(this.root, item);
        if (!this.isEmpty())
            this.root.color = RBColor.BLACK;
    };
    TreeSet.prototype.removeAt = function (node, key) {
        if (this.compare(key, node.key) < 0) {
            if (!this.isRed(node.left) && !this.isRed(node.left.left))
                node = this.redToLeft(node);
            node.left = this.removeAt(node.left, key);
        }
        else {
            if (this.isRed(node.left))
                node = this.rightRot(node);
            if (this.compare(key, node.key) == 0 && (node.right == null))
                return null;
            if (!this.isRed(node.right) && !this.isRed(node.right.left))
                node = this.redToRight(node);
            if (this.compare(key, node.key) == 0) {
                var nwNode = this.minAt(node.right);
                node.key = nwNode.key;
                node.right = this.deleteMinAt(node.right);
            }
            else
                node.right = this.removeAt(node.right, key);
        }
        return this.balance(node);
    };
    TreeSet.prototype.min = function () {
        if (this.isEmpty())
            return null;
        return this.minAt(this.root).key;
    };
    TreeSet.prototype.minAt = function (node) {
        if (node.left == null)
            return node;
        else
            return this.minAt(node.left);
    };
    TreeSet.prototype.max = function () {
        if (this.isEmpty())
            return null;
        return this.maxAt(this.root).key;
    };
    TreeSet.prototype.maxAt = function (node) {
        if (node.right == null)
            return node;
        else
            return this.minAt(node.right);
    };
    TreeSet.prototype.deleteMin = function () {
        if (this.isEmpty())
            return;
        if (!this.isRed(this.root.left) && !this.isRed(this.root.right))
            this.root.color = RBColor.RED;
        this.root = this.deleteMinAt(this.root);
        if (!this.isEmpty())
            this.root.color = RBColor.BLACK;
    };
    TreeSet.prototype.deleteMinAt = function (node) {
        if (node.left == null)
            return null;
        if (!this.isRed(node.left) && !this.isRed(node.left.left))
            node = this.redToLeft(node);
        node.left = this.deleteMinAt(node.left);
        return this.balance(node);
    };
    TreeSet.prototype.deleteMax = function () {
        if (this.isEmpty())
            return;
        if (!this.isRed(this.root.left) && !this.isRed(this.root.right))
            this.root.color = RBColor.RED;
        this.root = this.deleteMaxAt(this.root);
        if (!this.isEmpty())
            this.root.color = RBColor.BLACK;
    };
    TreeSet.prototype.deleteMaxAt = function (node) {
        if (this.isRed(node.left))
            node = this.rightRot(node);
        if (node.right == null)
            return null;
        if (!this.isRed(node.right) && !this.isRed(node.right.left))
            node = this.redToRight(node);
        node.right = this.deleteMaxAt(node.right);
        return this.balance(node);
    };
    TreeSet.prototype.floor = function (item) {
        if (this.isEmpty)
            return null;
        var retNode = this.floorAt(this.root, item);
        return (retNode == null) ? null : retNode.key;
    };
    TreeSet.prototype.floorAt = function (node, item) {
        if (node == null)
            return null;
        var comp = this.compare(item, node.key);
        if (comp == 0)
            return node;
        if (comp < 0)
            return this.floorAt(node.left, item);
        var retNode = this.floorAt(node.right, item);
        return (retNode == null) ? null : retNode;
    };
    TreeSet.prototype.ceil = function (item) {
        if (this.isEmpty)
            return null;
        var retNode = this.ceilAt(this.root, item);
        return (retNode == null) ? null : retNode.key;
    };
    TreeSet.prototype.ceilAt = function (node, item) {
        if (node == null)
            return null;
        var comp = this.compare(item, node.key);
        if (comp == 0)
            return node;
        if (comp > 0)
            return this.floorAt(node.right, item);
        var retNode = this.floorAt(node.left, item);
        return (retNode == null) ? null : retNode;
    };
    return TreeSet;
})(Comparable);
var RBNode = (function (_super) {
    __extends(RBNode, _super);
    function RBNode(key, value, color, size) {
        _super.call(this, key, color, size);
        this.value = value;
    }
    return RBNode;
})(RBItemNode);
var TreeMap = (function (_super) {
    __extends(TreeMap, _super);
    function TreeMap(comp) {
        _super.call(this, comp);
    }
    TreeMap.prototype.clear = function () {
        this.root = null;
    };
    TreeMap.prototype.isEqual = function (that) {
        if (this.size() != that.size())
            return false;
        var ittr1 = this.itterator();
        var ittr2 = that.itterator();
        for (var i = 0; i < ittr1.length; i++) {
            if (ittr1[i][0] != ittr2[i][0] || ittr1[i][1] != ittr2[i][1])
                return false;
        }
        return true;
    };
    TreeMap.prototype.size = function () {
        if (this.root != null)
            return this.sizeAt(this.root);
        return 0;
    };
    TreeMap.prototype.sizeAt = function (node) {
        if (node == null)
            return 0;
        return node.size;
    };
    TreeMap.prototype.childSize = function (node) {
        return this.sizeAt(node.left) + this.sizeAt(node.right);
    };
    TreeMap.prototype.isEmpty = function () {
        return this.size() == 0;
    };
    TreeMap.prototype.isRed = function (node) {
        if (node == null)
            return false;
        return node.color == RBColor.RED;
    };
    TreeMap.prototype.apply = function (key) {
        return this.applyAt(this.root, key);
    };
    TreeMap.prototype.applyAt = function (node, key) {
        if (node == null)
            return null;
        else {
            var comp = this.compare(key, node.key);
            if (comp < 0)
                return this.applyAt(node.left, key);
            else if (comp > 0)
                return this.applyAt(node.right, key);
            return node.value;
        }
    };
    TreeMap.prototype.contains = function (key) {
        return this.apply(key) != null;
    };
    TreeMap.prototype.put = function (key, val) {
        this.root = this.putAt(this.root, key, val);
        this.root.color = RBColor.BLACK;
    };
    TreeMap.prototype.putAt = function (node, key, value) {
        if (node == null)
            return new RBNode(key, value, RBColor.RED, 1);
        var comp = this.compare(key, node.key);
        if (comp < 0)
            node.left = this.putAt(node.left, key, value);
        else if (comp > 0)
            node.right = this.putAt(node.right, key, value);
        else
            node.value = value;
        if (this.isRed(node.right) && !this.isRed(node.left))
            node = this.leftRot(node);
        if (this.isRed(node.left) && this.isRed(node.left.left))
            node = this.rightRot(node);
        if (this.isRed(node.left) && this.isRed(node.right))
            this.flipColors(node);
        node.size = this.sizeAt(node.left) + this.sizeAt(node.right) + 1;
        return node;
    };
    TreeMap.prototype.rightRot = function (node) {
        return this.rotate(node, false);
    };
    TreeMap.prototype.leftRot = function (node) {
        return this.rotate(node, true);
    };
    TreeMap.prototype.rotate = function (node, left) {
        var nwTop = left ? node.right : node.left;
        if (left) {
            node.right = nwTop.left;
            nwTop.left = node;
            nwTop.color = nwTop.left.color;
            nwTop.left.color = RBColor.RED;
            nwTop.size = node.size;
        }
        else {
            node.left = nwTop.right;
            nwTop.right = node;
            nwTop.color = nwTop.right.color;
            nwTop.right.color = RBColor.RED;
            nwTop.size = node.size;
        }
        node.size = this.childSize(node) + 1;
        return nwTop;
    };
    TreeMap.prototype.flipColors = function (node) {
        this.flipColor(node);
        if (node.left != null)
            this.flipColor(node.left);
        if (node.right != null)
            this.flipColor(node.right);
    };
    TreeMap.prototype.flipColor = function (node) {
        switch (node.color) {
            case RBColor.BLACK: node.color = RBColor.RED;
            case RBColor.RED: node.color = RBColor.BLACK;
        }
    };
    TreeMap.prototype.redToLeft = function (node) {
        this.flipColors(node);
        if (this.isRed(node.right.left)) {
            node.right = this.rightRot(node.right);
            node = this.leftRot(node);
            this.flipColors(node);
        }
        return node;
    };
    TreeMap.prototype.redToRight = function (node) {
        this.flipColors(node);
        if (this.isRed(node.left.left)) {
            node = this.rightRot(node.right);
            this.flipColors(node);
        }
        return node;
    };
    TreeMap.prototype.balance = function (node) {
        if (this.isRed(node.right))
            node = this.leftRot(node);
        if (this.isRed(node.left) && this.isRed(node.left.left))
            node = this.rightRot(node);
        if (this.isRed(node.left) && this.isRed(node.right))
            this.flipColors(node);
        node.size = this.childSize(node) + 1;
        return node;
    };
    TreeMap.prototype.itterator = function () {
        var itterator = [];
        this.itteratorAt(this.root, itterator);
        return itterator;
    };
    TreeMap.prototype.itteratorAt = function (node, itterator) {
        if (node == null)
            return;
        itterator.push([node.key, node.value]);
        this.itteratorAt(node.left, itterator);
        this.itteratorAt(node.right, itterator);
    };
    TreeMap.prototype.keys = function () {
        var itterator = [];
        this.keysAt(this.root, itterator);
        return itterator;
    };
    TreeMap.prototype.keysAt = function (node, array) {
        if (node == null)
            return;
        array.push(node.key);
        this.keysAt(node.left, array);
        this.keysAt(node.right, array);
    };
    TreeMap.prototype.values = function () {
        var itterator = [];
        this.valuesAt(this.root, itterator);
        return itterator;
    };
    TreeMap.prototype.valuesAt = function (node, array) {
        if (node == null)
            return;
        array.push(node.value);
        this.valuesAt(node.left, array);
        this.valuesAt(node.right, array);
    };
    TreeMap.prototype.remove = function (key) {
        if (!this.contains(key))
            return false;
        if (!this.isRed(this.root.left) && !this.isRed(this.root.right))
            this.root.color = RBColor.RED;
        this.root = this.removeAt(this.root, key);
        if (!this.isEmpty())
            this.root.color = RBColor.BLACK;
    };
    TreeMap.prototype.removeAt = function (node, key) {
        if (this.compare(key, node.key) < 0) {
            if (!this.isRed(node.left) && !this.isRed(node.left.left))
                node = this.redToLeft(node);
            node.left = this.removeAt(node.left, key);
        }
        else {
            if (this.isRed(node.left))
                node = this.rightRot(node);
            if (this.compare(key, node.key) == 0 && (node.right == null))
                return null;
            if (!this.isRed(node.right) && !this.isRed(node.right.left))
                node = this.redToRight(node);
            if (this.compare(key, node.key) == 0) {
                var nwNode = this.minAt(node.right);
                node.key = nwNode.key;
                node.value = nwNode.value;
                node.right = this.deleteMinAt(node.right);
            }
            else
                node.right = this.removeAt(node.right, key);
        }
        return this.balance(node);
    };
    TreeMap.prototype.min = function () {
        if (this.isEmpty())
            return null;
        return this.minAt(this.root).key;
    };
    TreeMap.prototype.minAt = function (node) {
        if (node.left == null)
            return node;
        else
            return this.minAt(node.left);
    };
    TreeMap.prototype.max = function () {
        if (this.isEmpty())
            return null;
        return this.maxAt(this.root).key;
    };
    TreeMap.prototype.maxAt = function (node) {
        if (node.right == null)
            return node;
        else
            return this.minAt(node.right);
    };
    TreeMap.prototype.deleteMin = function () {
        if (this.isEmpty())
            return;
        if (!this.isRed(this.root.left) && !this.isRed(this.root.right))
            this.root.color = RBColor.RED;
        this.root = this.deleteMinAt(this.root);
        if (!this.isEmpty())
            this.root.color = RBColor.BLACK;
    };
    TreeMap.prototype.deleteMinAt = function (node) {
        if (node.left == null)
            return null;
        if (!this.isRed(node.left) && !this.isRed(node.left.left))
            node = this.redToLeft(node);
        node.left = this.deleteMinAt(node.left);
        return this.balance(node);
    };
    TreeMap.prototype.deleteMax = function () {
        if (this.isEmpty())
            return;
        if (!this.isRed(this.root.left) && !this.isRed(this.root.right))
            this.root.color = RBColor.RED;
        this.root = this.deleteMaxAt(this.root);
        if (!this.isEmpty())
            this.root.color = RBColor.BLACK;
    };
    TreeMap.prototype.deleteMaxAt = function (node) {
        if (this.isRed(node.left))
            node = this.rightRot(node);
        if (node.right == null)
            return null;
        if (!this.isRed(node.right) && !this.isRed(node.right.left))
            node = this.redToRight(node);
        node.right = this.deleteMaxAt(node.right);
        return this.balance(node);
    };
    TreeMap.prototype.floor = function (key) {
        if (this.isEmpty)
            return null;
        var retNode = this.floorAt(this.root, key);
        return (retNode == null) ? null : retNode.key;
    };
    TreeMap.prototype.floorAt = function (node, key) {
        if (node == null)
            return null;
        var comp = this.compare(key, node.key);
        if (comp == 0)
            return node;
        if (comp < 0)
            return this.floorAt(node.left, key);
        var retNode = this.floorAt(node.right, key);
        return (retNode == null) ? null : retNode;
    };
    TreeMap.prototype.ceil = function (key) {
        if (this.isEmpty)
            return null;
        var retNode = this.ceilAt(this.root, key);
        return (retNode == null) ? null : retNode.key;
    };
    TreeMap.prototype.ceilAt = function (node, key) {
        if (node == null)
            return null;
        var comp = this.compare(key, node.key);
        if (comp == 0)
            return node;
        if (comp > 0)
            return this.floorAt(node.right, key);
        var retNode = this.floorAt(node.left, key);
        return (retNode == null) ? null : retNode;
    };
    return TreeMap;
})(Comparable);
var DeepTreeMap = (function () {
    function DeepTreeMap(compare) {
        this.map = new TreeMap(compare);
    }
    DeepTreeMap.prototype.put = function (key, value) {
        if (!this.contains(key))
            this.map.put(key, new Bag());
        this.map.apply(key).insert(value);
    };
    DeepTreeMap.prototype.putAll = function (key) {
        var value = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            value[_i - 1] = arguments[_i];
        }
        if (!this.contains(key))
            this.map.put(key, new Bag());
        this.map.apply(key).insertArray(value);
    };
    DeepTreeMap.prototype.putArray = function (key, value) {
        if (!this.contains(key))
            this.map.put(key, new Bag());
        this.map.apply(key).insertArray(value);
    };
    DeepTreeMap.prototype.itterator = function (key) {
        var val = this.map.apply(key);
        if (val != null)
            return val.iterator();
        else
            return [];
    };
    DeepTreeMap.prototype.clear = function () {
        this.map.clear();
    };
    DeepTreeMap.prototype.isEqual = function (that) {
        return this.map.isEqual(that.map);
    };
    DeepTreeMap.prototype.size = function (key) {
        if (typeof key == "undefined")
            return this.map.size();
        else
            return this.map.apply(key).size();
    };
    DeepTreeMap.prototype.isEmpty = function () {
        return this.size() == 0;
    };
    DeepTreeMap.prototype.apply = function (key) {
        return this.map.apply(key);
    };
    DeepTreeMap.prototype.contains = function (key) {
        return this.apply(key) != null;
    };
    DeepTreeMap.prototype.remove = function (key) {
        return this.map.remove(key);
    };
    return DeepTreeMap;
})();
var List = (function () {
    function List() {
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i - 0] = arguments[_i];
        }
        if (typeof items != 'undefined' && items.length > 0)
            this.data = items;
        else
            this.data = [];
    }
    List.prototype.filter = function (call) {
        var nw = this.clone();
        var ittr = this.iterator();
        var list = this.empty();
        for (var a = 0; a < this.size(); a++) {
            if (call(ittr[a], a, ittr))
                list.data.push(ittr[a]);
        }
        return list;
    };
    List.prototype.map = function (call) {
        var nw = this.clone();
        var ittr = this.iterator();
        var list = new List();
        for (var a = 0; a < this.size(); a++) {
            list.data.push(call(list[a], a, ittr));
        }
        return list;
    };
    List.prototype.empty = function () {
        return new List();
    };
    List.prototype.foreach = function (call) {
        this.data.forEach(call);
    };
    List.prototype.isEmpty = function () {
        return this.size() == 0;
    };
    List.prototype.size = function () {
        return this.data.length;
    };
    List.prototype.iterator = function () {
        return this.data.slice();
    };
    List.prototype.toArray = function () {
        return this.data;
    };
    List.prototype.join = function (data) {
        this.data = this.toArray().concat(data.toArray());
    };
    List.prototype.apply = function (index) {
        return this.data[index];
    };
    List.prototype.clone = function () {
        var arr = this.iterator();
        var l = new List();
        l.data = arr;
        return l;
    };
    List.prototype.isEqual = function (that) {
        if (this.size() != that.size())
            return false;
        for (var i = 0; i < this.size(); i++) {
            if (this.data[i] != that.data[i])
                return false;
        }
        return true;
    };
    List.prototype.exch = function (index, index2) {
        var old = this.data[index];
        var old2 = this.data[index2];
        this.data[index] = old2;
        this.data[index2] = old;
    };
    List.exch = function (data, index, index2) {
        var old = data[index];
        var old2 = data[index2];
        data[index] = old2;
        data[index2] = old;
    };
    return List;
})();
var Bag = (function (_super) {
    __extends(Bag, _super);
    function Bag() {
        _super.apply(this, arguments);
    }
    Bag.prototype.insert = function (item) {
        this.data.push(item);
    };
    Bag.prototype.insertAll = function () {
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i - 0] = arguments[_i];
        }
        for (var i = 0; i < items.length; i++)
            this.insert(items[i]);
    };
    Bag.prototype.insertArray = function (items) {
        for (var i = 0; i < items.length; i++)
            this.insert(items[i]);
    };
    Bag.prototype.clone = function () {
        var arr = this.iterator();
        var l = new Bag();
        l.data = arr;
        return l;
    };
    Bag.prototype.empty = function () {
        return new Bag();
    };
    Bag.prototype.filter = function (call) {
        return _super.prototype.filter.call(this, call);
    };
    Bag.prototype.clear = function () {
        this.data = [];
    };
    return Bag;
})(List);
var MutableList = (function (_super) {
    __extends(MutableList, _super);
    function MutableList() {
        _super.apply(this, arguments);
    }
    MutableList.prototype.remove = function (item) {
        var index = this.indexOf(item);
        if (index >= 0)
            this.removeAt(index);
        return index;
    };
    MutableList.prototype.removeAt = function (index) {
        return this.data.splice(index, 1)[0];
    };
    MutableList.prototype.replace = function (index, number, item) {
        this.data[index] = item;
    };
    MutableList.prototype.indexOf = function (item) {
        return this.data.indexOf(item);
    };
    MutableList.prototype.contains = function (item) {
        return this.indexOf(item) >= 0;
    };
    MutableList.prototype.clear = function () {
        this.data = [];
    };
    MutableList.prototype.clone = function () {
        var arr = this.iterator();
        var l = new MutableList();
        l.data = arr;
        return l;
    };
    MutableList.prototype.empty = function () {
        return new MutableList();
    };
    MutableList.prototype.filter = function (call) {
        return _super.prototype.filter.call(this, call);
    };
    return MutableList;
})(Bag);
var Queue = (function (_super) {
    __extends(Queue, _super);
    function Queue() {
        _super.apply(this, arguments);
        this.low = 0;
    }
    Queue.prototype.size = function () {
        return _super.prototype.size.call(this) - this.low;
    };
    Queue.prototype.enqueue = function (item) {
        this.data.push(item);
    };
    Queue.prototype.dequeue = function () {
        var sample = this.sample();
        delete this.data[this.low];
        this.low++;
        if (this.data.length >= 16 && this.low >= this.size() * 2) {
            this.toArray();
        }
        return sample;
    };
    Queue.prototype.sample = function () {
        return this.apply(this.low);
    };
    Queue.prototype.toArray = function () {
        this.data = this.data.slice(this.low, this.data.length);
        this.low = 0;
        return this.data;
    };
    Queue.prototype.iterator = function () {
        return this.data.slice(this.low, this.data.length);
    };
    Queue.prototype.clear = function () {
        this.data = [];
    };
    Queue.prototype.clone = function () {
        var arr = this.iterator();
        var l = new Queue();
        l.data = arr;
        l.low = this.low;
        return l;
    };
    Queue.prototype.empty = function () {
        return new Queue();
    };
    Queue.prototype.filter = function (call) {
        return _super.prototype.filter.call(this, call);
    };
    return Queue;
})(List);
var Stack = (function (_super) {
    __extends(Stack, _super);
    function Stack() {
        _super.apply(this, arguments);
    }
    Stack.prototype.push = function (item) {
        this.data.push(item);
    };
    Stack.prototype.pop = function () {
        return this.data.pop();
    };
    Stack.prototype.sample = function () {
        return this.data[this.size() - 1];
    };
    Stack.prototype.clear = function () {
        this.data = [];
    };
    Stack.prototype.clone = function () {
        var arr = this.iterator();
        var l = new Stack();
        l.data = arr;
        return l;
    };
    Stack.prototype.empty = function () {
        return new Stack();
    };
    Stack.prototype.filter = function (call) {
        return _super.prototype.filter.call(this, call);
    };
    return Stack;
})(List);
var ComparableList = (function (_super) {
    __extends(ComparableList, _super);
    function ComparableList(compare) {
        var items = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            items[_i - 1] = arguments[_i];
        }
        _super.call(this);
        if (typeof items != 'undefined')
            this.data = items;
        this.compare = compare;
    }
    ComparableList.prototype.sort = function () {
        return this.iterator().sort(this.compare);
    };
    ComparableList.prototype.empty = function () {
        return new ComparableList(this.compare);
    };
    ComparableList.prototype.filter = function (call) {
        return _super.prototype.filter.call(this, call);
    };
    ComparableList.prototype.less = function (index, index2) {
        return this.compare(this.data[index], this.data[index2]) < 0;
    };
    ComparableList.prototype.more = function (index, index2) {
        return this.compare(this.data[index], this.data[index2]) > 0;
    };
    ComparableList.prototype.equal = function (index, index2) {
        return this.compare(this.data[index], this.data[index2]) == 0;
    };
    ComparableList.less = function (data, compare, index, index2) {
        return compare(data[index], data[index2]) < 0;
    };
    ComparableList.more = function (data, compare, index, index2) {
        return compare(data[index], data[index2]) > 0;
    };
    ComparableList.equal = function (data, compare, index, index2) {
        return compare(data[index], data[index2]) == 0;
    };
    return ComparableList;
})(List);
var Heap = (function (_super) {
    __extends(Heap, _super);
    function Heap(compare, max) {
        var items = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            items[_i - 2] = arguments[_i];
        }
        this.isMaxList = max;
        if (!max) {
            var oldComp = compare;
            compare = function (a, b) {
                return oldComp(b, a);
            };
        }
        _super.call(this, compare);
        if (typeof items != 'undefined')
            this.data = Heap.heapefy(items.slice(), compare, true);
        else
            this.data = [];
    }
    Heap.prototype.insertAll = function () {
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i - 0] = arguments[_i];
        }
        for (var i = 0; i < items.length; i++)
            this.insert(items[i]);
    };
    Heap.prototype.insertArray = function (items) {
        for (var i = 0; i < items.length; i++)
            this.insert(items[i]);
    };
    Heap.prototype.insert = function (item) {
        this.data.push(item);
        this.swim(this.size() - 1);
    };
    Heap.prototype.clear = function () {
        this.data = [];
    };
    Heap.prototype.empty = function () {
        return new Heap(this.compare, this.isMaxList);
    };
    Heap.prototype.filter = function (call) {
        return _super.prototype.filter.call(this, call);
    };
    Heap.prototype.pop = function () {
        this.exch(0, this.size() - 1);
        var item = this.data.pop();
        this.sink(0);
        return item;
    };
    Heap.prototype.sample = function () {
        return this.data[0];
    };
    Heap.prototype.join = function (collection) {
        this.insertArray(collection.toArray());
    };
    Heap.prototype.sort = function () {
        return Heap.sort(this.iterator(), this.compare, true, true);
    };
    Heap.prototype.clone = function () {
        var arr = this.iterator();
        var l = new Heap(this.compare, this.isMaxList);
        l.data = arr;
        return l;
    };
    Heap.sort = function (arr, compare, max, isHeap) {
        if (!max) {
            var oldComp = compare;
            compare = function (a, b) {
                return oldComp(b, a);
            };
        }
        if (typeof isHeap == 'undefined' || !isHeap)
            Heap.heapefy(arr, compare, true);
        var size = arr.length;
        while (size > 0) {
            List.exch(arr, 0, size - 1);
            Heap.sink(arr, compare, 0, --size);
        }
        return arr;
    };
    Heap.heapefy = function (arr, compare, max) {
        if (!max) {
            var oldComp = compare;
            compare = function (a, b) {
                return oldComp(b, a);
            };
        }
        var size = arr.length;
        for (var i = Math.ceil(size / 2); i >= 0; i--) {
            Heap.sink(arr, compare, i, size);
        }
        return arr;
    };
    Heap.prototype.swim = function (index) {
        var parent = Math.floor((index - 1) / 2);
        while (index > 0 && this.less(parent, index)) {
            this.exch(index, parent);
            index = parent;
            parent = Math.floor((index - 1) / 2);
        }
    };
    Heap.prototype.sink = function (index) {
        var child = index * 2 + 1;
        while (child < this.size()) {
            if (child < this.size() - 1 && this.less(child, child + 1))
                child++;
            if (this.less(index, child)) {
                this.exch(index, child);
                index = child;
                child = index * 2 + 1;
            }
            else
                break;
        }
    };
    Heap.sink = function (arr, compare, index, size) {
        var child = index * 2 + 1;
        while (child < size) {
            if (child < size - 1 && ComparableList.less(arr, compare, child, child + 1))
                child++;
            if (ComparableList.less(arr, compare, index, child)) {
                List.exch(arr, index, child);
                index = child;
                child = index * 2 + 1;
            }
            else
                break;
        }
    };
    return Heap;
})(ComparableList);
var PriorityQueue = (function (_super) {
    __extends(PriorityQueue, _super);
    function PriorityQueue() {
        _super.apply(this, arguments);
    }
    PriorityQueue.prototype.dequeue = function () {
        return this.pop();
    };
    PriorityQueue.prototype.clone = function () {
        var arr = this.iterator();
        var l = new PriorityQueue(this.compare, this.isMaxList);
        l.data = arr;
        return l;
    };
    PriorityQueue.prototype.empty = function () {
        return new PriorityQueue(this.compare, this.isMaxList);
    };
    PriorityQueue.prototype.filter = function (call) {
        return _super.prototype.filter.call(this, call);
    };
    return PriorityQueue;
})(Heap);
//# sourceMappingURL=data.js.map