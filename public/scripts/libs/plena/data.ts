//big mess, needs a ton of work


var NUMBER_COMPARE = function (a: number, b: number): number {
    return a - b;
}

var STRING_COMPARE = function (a: string, b: string): number {
    return a.localeCompare(b);
}

//class HashMap<Key, Value> {

//}

//class DeepHashMap<Key, Value> {

//}

class Comparable<Item> {
    protected compare: (a: Item, b: Item) => number;

    constructor(compare: (a: Item, b: Item) => number) {
        this.compare = compare;
    }
}

enum RBColor { RED, BLACK };

class RBItemNode<Item> {
    key: Item;
    left: RBItemNode<Item>;
    right: RBItemNode<Item>;
    color: RBColor;
    size: number;

    constructor(value: Item, color: RBColor, size: number) {
        this.color = color;
        this.key = value;
        this.size = size;
    }
}

class TreeSet<Item> extends Comparable<Item> {
    private root: RBItemNode<Item>;

    clear() {
        this.root = null;
    }
    isEqual(that: TreeSet<Item>): boolean {
        if (this.size() != that.size()) return false;
        var ittr1 = this.iterator();
        var ittr2 = that.iterator();
        for (var i = 0; i < ittr1.length; i++) {
            if (ittr1[i] != ittr2[i]) return false;
        }
        return true;
    }

    size(): number {
        if (this.root != null) return this.sizeAt(this.root);
        return 0;
    }

    private sizeAt(node: RBItemNode<Item>): number {
        if (node == null) return 0
        return node.size;
    }

    private childSize(node: RBItemNode<Item>): number {
        return this.sizeAt(node.left) + this.sizeAt(node.right);
    }

    isEmpty(): boolean {
        return this.size() == 0;
    }

    private isRed(node: RBItemNode<Item>): boolean {
        if (node == null) return false
        return node.color == RBColor.RED;
    }

    private applyAt(node: RBItemNode<Item>, key: Item) {
        if (node == null) return null;
        else {
            var comp = this.compare(key, node.key)
            if (comp < 0) return this.applyAt(node.left, key)
            else if (comp > 0) return this.applyAt(node.right, key)
            return node.key;
        }
    }

    contains(key: Item): boolean {
        return this.applyAt(this.root, key) != null;
    }

    pick(): Item {
        return this.root.key;
    }

    add(item:Item) {
        this.root = this.putAt(this.root, item);
        this.root.color = RBColor.BLACK;
    }

    private putAt(node: RBItemNode<Item>, key: Item): RBItemNode<Item> {
        if (node == null) return new RBItemNode(key, RBColor.RED, 1)

        var comp = this.compare(key, node.key)
        if (comp < 0) node.left = this.putAt(node.left, key);
        else if (comp > 0) node.right = this.putAt(node.right, key);
        else node.key;

        if (this.isRed(node.right) && !this.isRed(node.left)) node = this.leftRot(node);
        if (this.isRed(node.left) && this.isRed(node.left.left)) node = this.rightRot(node);
        if (this.isRed(node.left) && this.isRed(node.right)) this.flipColors(node);
        node.size = this.sizeAt(node.left) + this.sizeAt(node.right) + 1;

        return node
    }

    private rightRot(node: RBItemNode<Item>): RBItemNode<Item> {
        return this.rotate(node, false);
    }

    private leftRot(node: RBItemNode<Item>): RBItemNode<Item> {
        return this.rotate(node, true);
    }

    private rotate(node: RBItemNode<Item>, left: boolean): RBItemNode<Item> {
        var nwTop = left ? node.right : node.left;

        if (left) {
            node.right = nwTop.left;
            nwTop.left = node;
            nwTop.color = nwTop.left.color;
            nwTop.left.color = RBColor.RED;
            nwTop.size = node.size;
        } else {
            node.left = nwTop.right;
            nwTop.right = node;
            nwTop.color = nwTop.right.color;
            nwTop.right.color = RBColor.RED;
            nwTop.size = node.size;
        }

        node.size = this.childSize(node) + 1;
        return nwTop;
    }

    private flipColors(node: RBItemNode<Item>) {
        this.flipColor(node)
        if (node.left != null) this.flipColor(node.left)
        if (node.right != null) this.flipColor(node.right)
    }

    private flipColor(node: RBItemNode<Item>) {
        switch (node.color) {
            case RBColor.BLACK: node.color = RBColor.RED
            case RBColor.RED: node.color = RBColor.BLACK
        }
    }

    private redToLeft(node: RBItemNode<Item>): RBItemNode<Item> {
        this.flipColors(node);
        if (this.isRed(node.right.left)) {
            node.right = this.rightRot(node.right);
            node = this.leftRot(node);
            this.flipColors(node);
        }
        return node;
    }

    private redToRight(node: RBItemNode<Item>): RBItemNode<Item> {
        this.flipColors(node);
        if (this.isRed(node.left.left)) {
            node = this.rightRot(node.right);
            this.flipColors(node);
        }
        return node;
    }

    private balance(node: RBItemNode<Item>): RBItemNode<Item> {
        if (this.isRed(node.right)) node = this.leftRot(node);
        if (this.isRed(node.left) && this.isRed(node.left.left)) node = this.rightRot(node);
        if (this.isRed(node.left) && this.isRed(node.right)) this.flipColors(node);

        node.size = this.childSize(node) + 1;
        return node;
    }

    iterator(): Item[] {
        var itterator: Item[] = [];
        this.iteratorAt(this.root, itterator)
        return itterator;
    }

    private iteratorAt(node: RBItemNode<Item>, array: Item[]){
        if (node == null) return;

        array.push(node.key);
        this.iteratorAt(node.left, array);
        this.iteratorAt(node.right, array);
    }

    remove(item: Item): boolean {
        if (!this.contains(item)) return false;
        if (!this.isRed(this.root.left) && !this.isRed(this.root.right)) this.root.color = RBColor.RED;
        this.root = this.removeAt(this.root, item);
        if (!this.isEmpty()) this.root.color = RBColor.BLACK;
    }

    private removeAt(node: RBItemNode<Item>, key: Item): RBItemNode<Item> {
        if (this.compare(key, node.key) < 0) {
            if (!this.isRed(node.left) && !this.isRed(node.left.left)) node = this.redToLeft(node);
            node.left = this.removeAt(node.left, key);
        } else {
            if (this.isRed(node.left)) node = this.rightRot(node);
            if (this.compare(key, node.key) == 0 && (node.right == null)) return null;
            if (!this.isRed(node.right) && !this.isRed(node.right.left)) node = this.redToRight(node);
            if (this.compare(key, node.key) == 0) {
                var nwNode = this.minAt(node.right);
                node.key = nwNode.key;
                node.right = this.deleteMinAt(node.right);
            }
            else node.right = this.removeAt(node.right, key);
        }
        return this.balance(node);
    }

    min(): Item {
        if (this.isEmpty()) return null;
        return this.minAt(this.root).key;
    }

    private minAt(node: RBItemNode<Item>): RBItemNode<Item> {
        if (node.left == null) return node;
        else return this.minAt(node.left);
    }

    max(): Item {
        if (this.isEmpty()) return null;
        return this.maxAt(this.root).key;
    }

    private maxAt(node: RBItemNode<Item>): RBItemNode<Item> {
        if (node.right == null) return node;
        else return this.minAt(node.right);
    }

    deleteMin() {
        if (this.isEmpty()) return;
        if (!this.isRed(this.root.left) && !this.isRed(this.root.right)) this.root.color = RBColor.RED;
        this.root = this.deleteMinAt(this.root);
        if (!this.isEmpty()) this.root.color = RBColor.BLACK;
    }

    private deleteMinAt(node: RBItemNode<Item>): RBItemNode<Item> {
        if (node.left == null) return null;
        if (!this.isRed(node.left) && !this.isRed(node.left.left)) node = this.redToLeft(node);

        node.left = this.deleteMinAt(node.left);
        return this.balance(node);
    }

    deleteMax() {
        if (this.isEmpty()) return;
        if (!this.isRed(this.root.left) && !this.isRed(this.root.right)) this.root.color = RBColor.RED;
        this.root = this.deleteMaxAt(this.root);
        if (!this.isEmpty()) this.root.color = RBColor.BLACK;
    }

    private deleteMaxAt(node: RBItemNode<Item>): RBItemNode<Item> {
        if (this.isRed(node.left)) node = this.rightRot(node);
        if (node.right == null) return null;
        if (!this.isRed(node.right) && !this.isRed(node.right.left)) node = this.redToRight(node);

        node.right = this.deleteMaxAt(node.right);
        return this.balance(node);
    }


    floor(item: Item): Item {
        if (this.isEmpty) return null;
        var retNode = this.floorAt(this.root, item);
        return (retNode == null) ? null : retNode.key;
    }

    private floorAt(node: RBItemNode<Item>, item: Item): RBItemNode<Item> {
        if (node == null) return null;
        var comp = this.compare(item, node.key)
        if (comp == 0) return node;
        if (comp < 0) return this.floorAt(node.left, item)
        var retNode = this.floorAt(node.right, item);
        return (retNode == null) ? null : retNode;
    }

    ceil(item: Item): Item {
        if (this.isEmpty) return null;
        var retNode = this.ceilAt(this.root, item);
        return (retNode == null) ? null : retNode.key;
    }

    private ceilAt(node: RBItemNode<Item>, item: Item): RBItemNode<Item> {
        if (node == null) return null;
        var comp = this.compare(item, node.key)
        if (comp == 0) return node;
        if (comp > 0) return this.floorAt(node.right, item)
        var retNode = this.floorAt(node.left, item);
        return (retNode == null) ? null : retNode;
    }
}

class RBNode<Key, Value> extends RBItemNode<Key> {
    value: Value;
    left: RBNode<Key, Value>;
    right: RBNode<Key, Value>;

    constructor(key: Key, value: Value, color: RBColor, size: number) {
        super(key, color, size)
        this.value = value;
    }
}

class TreeMap<Key, Value> extends Comparable<Key> {
    root: RBNode<Key, Value>;

    constructor(comp: (a: Key, b: Key) => number) {
        super(comp);
    }

    clear() {
        this.root = null;
    }
    isEqual(that: TreeMap<Key, Value>): boolean {
        if (this.size() != that.size()) return false;
        var ittr1 = this.itterator();
        var ittr2 = that.itterator();
        for (var i = 0; i < ittr1.length; i++) {
            if (ittr1[i][0] != ittr2[i][0] || ittr1[i][1] != ittr2[i][1])return false;
        }
        return true;
    }

    size(): number {
        if (this.root != null) return this.sizeAt(this.root);
        return 0;
    }

    private sizeAt(node: RBNode<Key, Value>): number {
        if (node == null) return 0
        return node.size;
    }

    private childSize(node: RBNode<Key, Value>): number {
        return this.sizeAt(node.left) + this.sizeAt(node.right);
    }

    isEmpty(): boolean {
        return this.size() == 0;
    }

    private isRed(node: RBNode<Key, Value>): boolean {
        if (node == null) return false
        return node.color == RBColor.RED;
    }

    apply(key: Key):Value {
        return this.applyAt(this.root, key);
    }

    private applyAt(node: RBNode<Key, Value>, key: Key):Value {
        if (node == null) return null;
        else {
            var comp = this.compare(key, node.key)
            if (comp < 0) return this.applyAt(node.left, key)
            else if (comp > 0) return this.applyAt(node.right, key)
            return node.value;
        }
    }

    contains(key: Key): boolean {
        return this.apply(key) != null;
    }

    put(key: Key, val: Value) {
        this.root = this.putAt(this.root, key, val);
        this.root.color = RBColor.BLACK;
    }

    private putAt(node: RBNode<Key, Value>, key: Key, value: Value): RBNode<Key, Value> {
        if (node == null) return new RBNode(key, value, RBColor.RED, 1)

        var comp = this.compare(key, node.key)
        if (comp < 0) node.left = this.putAt(node.left, key, value);
        else if (comp > 0) node.right = this.putAt(node.right, key, value);
        else node.value = value;

        if (this.isRed(node.right) && !this.isRed(node.left)) node = this.leftRot(node);
        if (this.isRed(node.left) && this.isRed(node.left.left)) node = this.rightRot(node);
        if (this.isRed(node.left) && this.isRed(node.right)) this.flipColors(node);
        node.size = this.sizeAt(node.left) + this.sizeAt(node.right) + 1;

        return node
    }

    private rightRot(node: RBNode<Key, Value>): RBNode<Key, Value> {
        return this.rotate(node, false);
    }

    private leftRot(node: RBNode<Key, Value>): RBNode<Key, Value> {
        return this.rotate(node, true);
    }

    private rotate(node: RBNode<Key, Value>, left: boolean): RBNode<Key, Value> {
        var nwTop = left ? node.right : node.left;

        if (left) {
            node.right = nwTop.left;
            nwTop.left = node;
            nwTop.color = nwTop.left.color;
            nwTop.left.color = RBColor.RED;
            nwTop.size = node.size;
        } else {
            node.left = nwTop.right;
            nwTop.right = node;
            nwTop.color = nwTop.right.color;
            nwTop.right.color = RBColor.RED;
            nwTop.size = node.size;
        }

        node.size = this.childSize(node) + 1;
        return nwTop;
    }

    private flipColors(node: RBNode<Key, Value>) {
        this.flipColor(node)
        if(node.left != null)this.flipColor(node.left)
        if(node.right != null)this.flipColor(node.right)
    }

    private flipColor(node: RBNode<Key, Value>) {
        switch (node.color) {
            case RBColor.BLACK: node.color = RBColor.RED
            case RBColor.RED: node.color = RBColor.BLACK
        }
    }

    private redToLeft(node: RBNode<Key, Value>): RBNode<Key, Value> {
        this.flipColors(node);
        if (this.isRed(node.right.left)) {
            node.right = this.rightRot(node.right);
            node = this.leftRot(node);
            this.flipColors(node);
        }
        return node;
    }

    private redToRight(node: RBNode<Key, Value>): RBNode<Key, Value> {
        this.flipColors(node);
        if (this.isRed(node.left.left)) {
            node = this.rightRot(node.right);
            this.flipColors(node);
        }
        return node;
    }

    private balance(node: RBNode<Key, Value>): RBNode<Key, Value> {
        if (this.isRed(node.right)) node = this.leftRot(node);
        if (this.isRed(node.left) && this.isRed(node.left.left)) node = this.rightRot(node);
        if (this.isRed(node.left) && this.isRed(node.right)) this.flipColors(node);

        node.size = this.childSize(node) + 1;
        return node;
    }

    itterator(): [Key, Value][]{
        var itterator: [Key, Value][] = [];
        this.itteratorAt(this.root, itterator);
        return itterator;
    }

    private itteratorAt(node: RBNode<Key, Value>, itterator: [Key, Value][]) {
        if (node == null) return;

        itterator.push([node.key, node.value]);
        this.itteratorAt(node.left, itterator);
        this.itteratorAt(node.right, itterator);
    }

    keys(): Key[]{
        var itterator: Key[] = [];
        this.keysAt(this.root, itterator)
        return itterator;
    }

    private keysAt(node: RBNode<Key, Value>, array: Key[]) {
        if (node == null) return;

        array.push(node.key);
        this.keysAt(node.left, array);
        this.keysAt(node.right, array);
    }

    values(): Value[] {
        var itterator: Value[] = [];
        this.valuesAt(this.root, itterator)
        return itterator;
    }

    private valuesAt(node: RBNode<Key, Value>, array: Value[]) {
        if (node == null) return;

        array.push(node.value);
        this.valuesAt(node.left, array);
        this.valuesAt(node.right, array);
    }

    remove(key:Key):boolean { 
        if (!this.contains(key)) return false;
        if (!this.isRed(this.root.left) && !this.isRed(this.root.right)) this.root.color = RBColor.RED;
        this.root = this.removeAt(this.root, key);
        if (!this.isEmpty()) this.root.color = RBColor.BLACK;
    }

    private removeAt(node: RBNode<Key, Value>, key: Key): RBNode<Key, Value> {
        if (this.compare(key, node.key) < 0) {
            if (!this.isRed(node.left) && !this.isRed(node.left.left)) node = this.redToLeft(node);
            node.left = this.removeAt(node.left, key);
        } else {
            if (this.isRed(node.left)) node = this.rightRot(node);
            if (this.compare(key, node.key) == 0 && (node.right == null)) return null;
            if (!this.isRed(node.right) && !this.isRed(node.right.left)) node = this.redToRight(node);
            if (this.compare(key, node.key) == 0) {
                var nwNode = this.minAt(node.right);
                node.key = nwNode.key;
                node.value = nwNode.value;
                node.right = this.deleteMinAt(node.right);
            }
            else node.right = this.removeAt(node.right, key);
        }
        return this.balance(node);
    }

    min(): Key {
        if (this.isEmpty()) return null;
        return this.minAt(this.root).key;
    }

    private minAt(node: RBNode<Key, Value>): RBNode<Key, Value> {
        if (node.left == null) return node;
        else return this.minAt(node.left);
    } 
    
    max(): Key {
        if (this.isEmpty()) return null;
        return this.maxAt(this.root).key;
    }

    private maxAt(node: RBNode<Key, Value>): RBNode<Key, Value> {
        if (node.right == null) return node;
        else return this.minAt(node.right);
    }   

    deleteMin() {
        if (this.isEmpty()) return;
        if (!this.isRed(this.root.left) && !this.isRed(this.root.right)) this.root.color = RBColor.RED;
        this.root = this.deleteMinAt(this.root);
        if (!this.isEmpty()) this.root.color = RBColor.BLACK;
    }

    private deleteMinAt(node: RBNode<Key, Value>): RBNode<Key, Value> {
        if (node.left == null) return null;
        if (!this.isRed(node.left) && !this.isRed(node.left.left)) node = this.redToLeft(node);

        node.left = this.deleteMinAt(node.left);
        return this.balance(node);
    }

    deleteMax() {
        if (this.isEmpty()) return;
        if (!this.isRed(this.root.left) && !this.isRed(this.root.right)) this.root.color = RBColor.RED;
        this.root = this.deleteMaxAt(this.root);
        if (!this.isEmpty()) this.root.color = RBColor.BLACK;
    }

    private deleteMaxAt(node: RBNode<Key, Value>): RBNode<Key, Value> {
        if (this.isRed(node.left)) node = this.rightRot(node);
        if (node.right == null) return null;
        if (!this.isRed(node.right) && !this.isRed(node.right.left)) node = this.redToRight(node);

        node.right = this.deleteMaxAt(node.right);
        return this.balance(node);
    }


    floor(key: Key): Key {
        if (this.isEmpty) return null;
        var retNode = this.floorAt(this.root, key);
        return (retNode == null) ? null : retNode.key;
    }

    private floorAt(node: RBNode<Key, Value>, key: Key): RBNode<Key, Value> {
        if (node == null) return null;
        var comp = this.compare(key, node.key)
        if (comp == 0) return node;
        if (comp < 0) return this.floorAt(node.left, key)
        var retNode = this.floorAt(node.right, key);
        return (retNode == null) ? null : retNode;
    }

    ceil(key: Key): Key {
        if (this.isEmpty) return null;
        var retNode = this.ceilAt(this.root, key);
        return (retNode == null) ? null : retNode.key;
    }

    private ceilAt(node: RBNode<Key, Value>, key: Key): RBNode<Key, Value> {
        if (node == null) return null;
        var comp = this.compare(key, node.key)
        if (comp == 0) return node;
        if (comp > 0) return this.floorAt(node.right, key)
        var retNode = this.floorAt(node.left, key);
        return (retNode == null) ? null : retNode;
    }
}


class DeepTreeMap<Key, Value> {
    map: TreeMap<Key, Bag<Value>>;

    constructor(compare: (a: Key, b: Key) => number) {
        this.map = new TreeMap<Key, Bag<Value>>(compare);
    }

    put(key: Key, value: Value) {
        if (!this.contains(key)) this.map.put(key, new Bag<Value>());
        this.map.apply(key).insert(value);
    }

    putAll(key: Key, ...value: Value[]) {
        if (!this.contains(key)) this.map.put(key, new Bag<Value>());
        this.map.apply(key).insertArray(value);
    }

    putArray(key: Key, value: Value[]) {
        if (!this.contains(key)) this.map.put(key, new Bag<Value>());
        this.map.apply(key).insertArray(value);
    }

    itterator(key: Key): Value[]{
        var val = this.map.apply(key);
        if (val != null) return val.iterator();
        else return [];
    }

    clear() {
        this.map.clear();
    }

    isEqual(that: DeepTreeMap<Key, Value>): boolean {
        return this.map.isEqual(that.map);
    }

    size(key?: Key): number {
        if (typeof key == "undefined") return this.map.size();
        else return this.map.apply(key).size();
    }

    isEmpty(): boolean {
        return this.size() == 0;
    }

    apply(key: Key): Bag<Value> {
        return this.map.apply(key);
    }

    contains(key: Key): boolean {
        return this.apply(key) != null;
    }

    remove(key: Key): boolean {
        return this.map.remove(key);
    }
}


class List<Item> {
    protected data: Item[];

    constructor(...items: Item[]) {
        if (typeof items != 'undefined' && items.length > 0) this.data = items;
        else this.data = [];
    }

    filter(call: (Item: Item, index: number, Array: Item[]) => boolean): List<Item> {
        var nw = this.clone();
        var ittr = this.iterator();
        var list = this.empty();
        for (var a = 0; a < this.size(); a++) {
            if (call(ittr[a], a, ittr)) list.data.push(ittr[a]);
        }
        return list;
    }
    map<NewItem>(call: (Item: Item, index: number, Array: Item[]) => NewItem): List<NewItem> {
        var nw = this.clone();
        var ittr = this.iterator();
        var list = new List<NewItem>()
        for (var a = 0; a < this.size(); a++) {
            list.data.push(call(list[a], a, ittr));
        }
        return list;
    }
    empty():List<Item> {
        return new List<Item>();
    }
    foreach(call: (Item: Item, index:number, Array:Item[])=>void) {
        this.data.forEach(call);
    }
    isEmpty(): boolean {
        return this.size() == 0;
    }
    size(): number {
        return this.data.length;
    }
    iterator(): Item[] {
        return this.data.slice()
    }
    toArray(): Item[] {
        return this.data;
    }
    join(data: List<Item>) {
        this.data = this.toArray().concat(data.toArray());
    }
    apply(index: number): Item {
        return this.data[index];
    }
    clone(): List<Item> {
        var arr = this.iterator();
        var l = new List<Item>();
        l.data = arr;
        return l;
    }
    isEqual(that: List<Item>):boolean {
        if (this.size() != that.size()) return false;
        for (var i = 0; i < this.size(); i++) {
            if (this.data[i] != that.data[i]) return false;
        }

        return true;
    }

    protected exch(index: number, index2: number) {
        var old = this.data[index];
        var old2 = this.data[index2];

        this.data[index] = old2;
        this.data[index2] = old;
    }

    protected static exch<Item>(data: Item[], index: number, index2: number) {
        var old = data[index];
        var old2 = data[index2];

        data[index] = old2;
        data[index2] = old;
    }
}

class Bag<Item> extends List<Item> {
    insert(item: Item) {
        this.data.push(item);
    }
    insertAll(...items: Item[]) {
        for (var i = 0; i < items.length; i++) this.insert(items[i]);
    }
    insertArray(items: Item[]) {
        for (var i = 0; i < items.length; i++) this.insert(items[i]);
    }
    clone(): Bag<Item> {
        var arr = this.iterator();
        var l = new Bag<Item>();
        l.data = arr;
        return l;
    }
    empty(): Bag<Item> {
        return new Bag<Item>();
    }
    filter(call: (Item: Item, index: number, Array: Item[]) => boolean): Bag<Item> {
        return <Bag<Item>>super.filter(call);
    }
    clear() {
        this.data = [];
    }
}

class MutableList<Item> extends Bag<Item> {
    remove(item: Item): number {
        var index = this.indexOf(item);
        if (index >= 0) this.removeAt(index);
        return index;
    }
    removeAt(index: number):Item {
        return this.data.splice(index, 1)[0];
    }
    replace(index, number, item: Item) {
        this.data[index] = item;
    }
    indexOf(item: Item): number {
        return this.data.indexOf(item);
    }
    contains(item: Item): boolean {
        return this.indexOf(item) >= 0;
    }
    clear() {
        this.data = [];
    }
    clone(): MutableList<Item> {
        var arr = this.iterator();
        var l = new MutableList<Item>();
        l.data = arr;
        return l;
    }
    empty(): MutableList<Item> {
        return new MutableList<Item>();
    }
    filter(call: (Item: Item, index: number, Array: Item[]) => boolean): MutableList<Item> {
        return <MutableList<Item>>super.filter(call);
    }
}

class Queue<Item> extends List<Item> {
    private low: number = 0;

    size(): number {
        return super.size() - this.low;
    }
    enqueue(item: Item) {
        this.data.push(item);
    }
    dequeue():Item {
        var sample = this.sample();
        delete this.data[this.low];
        this.low++;

        if (this.data.length >= 16 && this.low >= this.size() * 2) {
            this.toArray();
        }

        return sample;
    }
    sample():Item {
        return this.apply(this.low);
    }
    toArray():Item[] {
        this.data = this.data.slice(this.low, this.data.length);
        this.low = 0;
        return this.data;
    }
    iterator(): Item[]{
        return this.data.slice(this.low, this.data.length);
    }
    clear() {
        this.data = [];
    }
    clone(): Queue<Item> {
        var arr = this.iterator();
        var l = new Queue<Item>();
        l.data = arr;
        l.low = this.low;
        return l;
    }
    empty(): Queue<Item> {
        return new Queue<Item>();
    }
    filter(call: (Item: Item, index: number, Array: Item[]) => boolean): Queue<Item> {
        return <Queue<Item>>super.filter(call);
    }
}

class Stack<Item> extends List<Item>{
    push(item:Item) {
        this.data.push(item);
    }
    pop(): Item {
        return this.data.pop();
    }
    sample(): Item {
        return this.data[this.size() - 1];
    }
    clear() {
        this.data = [];
    }
    clone(): Stack<Item> {
        var arr = this.iterator();
        var l = new Stack<Item>();
        l.data = arr;
        return l;
    }
    empty(): Stack<Item> {
        return new Stack<Item>();
    }
    filter(call: (Item: Item, index: number, Array: Item[]) => boolean): Stack<Item> {
        return <Stack<Item>>super.filter(call);
    }
}

class ComparableList<Item> extends List<Item> {
    protected compare: (a: Item, b: Item) => number;

    constructor(compare: (a: Item, b: Item) => number, ...items:Item[]) {
        super();
        if (typeof items != 'undefined')this.data = items;
        this.compare = compare;
    }

    sort(): Item[]{
        return this.iterator().sort(this.compare);
    }

    empty(): ComparableList<Item> {
        return new ComparableList<Item>(this.compare);
    }

    filter(call: (Item: Item, index: number, Array: Item[]) => boolean): ComparableList<Item> {
        return <ComparableList<Item>>super.filter(call);
    }

    protected less(index: number, index2: number): boolean {
        return this.compare(this.data[index], this.data[index2]) < 0;
    }
    protected more(index: number, index2: number): boolean {
        return this.compare(this.data[index], this.data[index2]) > 0;
    }
    protected equal(index: number, index2: number): boolean {
        return this.compare(this.data[index], this.data[index2]) == 0;
    }

    protected static less<Item>(data: Item[], compare: (a: Item, b: Item) => number, index: number, index2: number): boolean {
        return compare(data[index], data[index2]) < 0;
    }
    protected static more<Item>(data: Item[], compare: (a: Item, b: Item) => number, index: number, index2: number): boolean {
        return compare(data[index], data[index2]) > 0;
    }
    protected static equal<Item>(data: Item[], compare: (a: Item, b: Item) => number, index: number, index2: number): boolean {
        return compare(data[index], data[index2]) == 0;
    }
}

class Heap<Item> extends ComparableList<Item> {
    protected isMaxList: boolean;

    constructor(compare: (a: Item, b: Item) => number, max: boolean, ...items: Item[]) {
        this.isMaxList = max;
        if (!max) {
            var oldComp = compare;
            compare = (a: Item, b: Item): number => {
                return oldComp(b, a);
            }
        }

        super(compare);

        if (typeof items != 'undefined') this.data = Heap.heapefy(items.slice(), compare, true);
        else this.data = [];
    }

    insertAll(...items: Item[]) {
        for (var i = 0; i < items.length; i++) this.insert(items[i]);
    }
    insertArray(items: Item[]) {
        for (var i = 0; i < items.length; i++) this.insert(items[i]);
    }
    insert(item: Item) {
        this.data.push(item);
        this.swim(this.size() - 1);
    }
    clear() {
        this.data = [];
    }
    empty(): Heap<Item> {
        return new Heap<Item>(this.compare, this.isMaxList);
    }
    filter(call: (Item: Item, index: number, Array: Item[]) => boolean): Heap<Item> {
        return <Heap<Item>>super.filter(call);
    }
    pop(): Item {
        this.exch(0, this.size() - 1);
        var item = this.data.pop();
        this.sink(0);
        return item;
    }
    sample(): Item {
        return this.data[0];
    }
    join(collection: List<Item>) {
        this.insertArray(collection.toArray());
    }
    sort(): Item[]{
        return Heap.sort(this.iterator(), this.compare, true, true);
    }
    clone(): Heap<Item> {
        var arr = this.iterator();
        var l = new Heap<Item>(this.compare, this.isMaxList);
        l.data = arr;
        return l;
    }

    static sort<Item>(arr: Item[], compare: (a: Item, b: Item) => number, max: boolean, isHeap?: boolean): Item[]{
        if (!max) {
            var oldComp = compare;
            compare = (a: Item, b: Item): number => {
                return oldComp(b, a);
            }
        }
        if (typeof isHeap == 'undefined' || !isHeap) Heap.heapefy(arr, compare, true);

        var size = arr.length;
        while (size > 0) {
            List.exch(arr, 0, size - 1);
            Heap.sink(arr, compare, 0, --size);
        }

        return arr;
    }
    static heapefy<Item>(arr: Item[], compare: (a: Item, b: Item) => number, max: boolean): Item[]{
        if (!max) {
            var oldComp = compare;
            compare = (a: Item, b: Item): number => {
                return oldComp(b, a);
            }
        }

        var size = arr.length;  
        for (var i = Math.ceil(size / 2); i >= 0; i--) {
            Heap.sink(arr, compare, i, size);
        }

        return arr;
    }

    private swim(index: number) {
        var parent = Math.floor((index - 1) / 2);

        while (index > 0 && this.less(parent, index)) {
            this.exch(index, parent)
            index = parent;
            parent = Math.floor((index - 1) / 2);
        }
    }
    private sink(index: number) {
        var child = index * 2 + 1;

        while (child < this.size()) {
            if (child < this.size() - 1 && this.less(child, child + 1)) child++;
            if (this.less(index, child)) {
                this.exch(index, child);
                index = child;
                child = index * 2 + 1;
            } else break;
        }
    }
    private static sink<Item>(arr: Item[], compare: (a: Item, b: Item) => number, index: number, size:number) {
        var child = index * 2 + 1;

        while (child < size) {
            if (child < size - 1 && ComparableList.less(arr, compare, child, child + 1)) child++;
            if (ComparableList.less(arr, compare, index, child)) {
                List.exch(arr, index, child);
                index = child;
                child = index * 2 + 1;
            } else break;
        }
    }
}

class PriorityQueue<Item> extends Heap<Item> {
    dequeue():Item {
        return this.pop();
    }
    clone(): PriorityQueue<Item> {
        var arr = this.iterator();
        var l = new PriorityQueue<Item>(this.compare, this.isMaxList);
        l.data = arr;
        return l;
    }
    empty(): PriorityQueue<Item> {
        return new PriorityQueue<Item>(this.compare, this.isMaxList);
    }
    filter(call: (Item: Item, index: number, Array: Item[]) => boolean): PriorityQueue<Item> {
        return <PriorityQueue<Item>>super.filter(call);
    }
}