module.exports = Collection;

/**
 * Конструктор коллекции
 * @constructor
 */
function Collection() {

    if (arguments[0] === undefined)
        this.elements = [];
    else {
            this.elements = arguments[0];
    }
}

Collection.prototype.values = function () {
    return this.elements;
};

Collection.prototype.at = function () {
    var index = arguments[0];

    if (!check(index, this.elements.length))
        return null;
    
    return this.elements[--index];
};

Collection.prototype.append = function () {

    if (arguments[0] instanceof Collection)
        this.elements = this.elements.concat(arguments[0].values());

    else if (arguments[0] !== undefined)
        this.elements = this.elements.concat(arguments[0]);
};

Collection.prototype.removeAt = function () {
    var index = arguments[0];

    if (!check(index, this.elements.length))
        return false;

    this.elements.splice(index - 1, 1);
    return true;
};

Collection.prototype.count = function () {
    return this.elements.length;
};

Collection.from = function () {
    return new Collection(arguments[0]);
};

function check(index, length){
    if (index - 1 < 0 || index > length || index === undefined)
        return false;
    
    return true;
}
