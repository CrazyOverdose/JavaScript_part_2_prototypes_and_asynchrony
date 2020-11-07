# 1. Коллекция

В этой задаче необходимо реализовать конструктор для создания коллекции элементов.

```
var numbers = new Collection();
numbers.append(10);
numbers.append(20);
    
numbers.at(2); // 20
numbers.values(); // [10, 20] 
numbers.count(); // 2
numbers.removeAt(1); // 10
```

## Создание коллекции
Коллекцию можно создать двумя способами: через конструктор Collection или через метод Collection.from().

Через конструктор создается пустая коллекция.

```
var collection = new Collection();
collection.count(); // 0
```
Через метод Collection.from() можно создать коллекцию с начальными значениями, передав в нее массив элементов. Возвращается инстанс конструктора Collection.

```
var letters = Collection.from(['a', 'b', 'c']);

letters.count(); // 3
letters instanceof Collection; // true
```

## Метод values
Метод возвращает массив элементов коллекции.

```
var names = Collection.from(['Ivan', 'Petr']);

names.values(); // ['Ivan', 'Petr']
```

Метод at
Метод возвращает элемент с определенной позиции (нумерация начинается с единицы, а не нуля). Если позиция не существует, возвращается null.

```
var letters = Collection.from(['a', 'b']);

letters.at(0); // null
letters.at(1); // 'a'
letters.at(2); // 'b'
letters.at(3); // null
```

Метод append
Метод добавляет элемент в коллекцию.

```
var letters = Collection.from(['a', 'b', 'c']);
letters.append('d');

letters.values(); // ['a', 'b', 'c', 'd']
```

Если в метод append передана другая коллекция, то все её элементы добавляются в текущую.

```
var letters = Collection.from(['a']);
var letters2 = Collection.from(['b', 'c']);

letters.append(letters2);

letters.values(); // ['a', 'b', 'c']
letters2.values(); // ['b', 'c']

letters.at(3); // 'c'
letters.count(); // 3
```

## Метод removeAt
Метод удаляет элемент с переданной позиции (нумерация начинается с единицы) и в случае успеха возвращает true. Если элемента на переданной позиции 
не существует, то метод возвращает false.

```
var numbers = Collection.from([10, 20, 30]);

numbers.removeAt(0); // false
numbers.values(); // [10, 20, 30]

numbers.removeAt(2);
numbers.count(); // 2
numbers.values(); // [10, 30]
```

## Пояснения
+ Гарантируется корректное использование методов.
+ Коллекция может содержать любые элементы кроме экземпляров конструктора Collection.
+ Ожидается, что все методы (кроме from) будут объявлены в Collection.prototype.
+ Проверку добавляемого элемента в методе append можно сделать через instanceof.
