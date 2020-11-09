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

# 2. Параллельное выполнение асинхронных функций

В этом задании необходимо реализовать функцию parallel, которая выполняет асинхронные операции параллельно.

Функция parallel принимает два аргумента: массив операций и результирующий callback.

```
var parallel = require('./index.js);

parallel(
    [
        function (next) { /* асинхронная операция 1 */ },
        function (next) { /* асинхронная операция 2 */ },
        // ...
    ],
    function(err, result) {
        // обработка результата выполнения операций
    }
)
```

## Операции
Каждая операция – это синхронная или асинхронная функция. На вход ей приходит callback-функция next. По завершению работы операция вызывает функцию next либо с результатом выполнения, либо с ошибкой.

Если операция успешно завершилась, то вызывается callback-функция с первым аргументом null, а вторым – результатом выполнения:

```
function (next) {
    setTimeout(function () {
        next(null, 'data');
    }, 1000);
}
```
Если операция завершается с ошибкой, то callback-функция вызывается с единственным аргументом – возникшей ошибкой:
```
function (next) {
    setTimeout(function () {
        next(new Error('Что-то пошло не так'));
    }, 1000);
}
```

## Результирующий callback
Результирующий callback (второй параметр функции parallel) вызывается по окончанию выполнения всех операций или при возникновения ошибки в одной из них.

Если все операции завершились успешно, в callback передаётся первым аргументом null, а вторым – массив с результатами выполнения операций. Порядок данных должен соответствовать порядку операций в массиве, а не их вызову.

Если не переданы операции (передан пустой массив), то результатом выполнения должен быть пустой массив.

Если хотя бы одна из операций закончилась ошибкой, то callback-функция вызывается с произошедшей ошибкой. Если несколько операцией завершились ошибкой, то callback будет вызван с первой из них.

Callback вызывается ровно один раз: либо с первой пойманной ошибкой, либо с результатами выполнения операций.

## Ограничения
Гарантируется корректность вызова функции parallel и передача операций в правильном формате.
Гарантируется, что функция next всегда вызывается в операциях.

## Пояснения
В данном задании используется термин callback. При этом подходе в асинхронную функцию передается другая функция, которую исходная должна вызвать по завершению. Это способ асинхронной функции сообщить о своем завершении.

```
setTimeout(function callback() {
    // Функция setTimeout вызовет нашу callback-функцию, когда завершит отсчет 1000 ms
}, 1000);
```

По условию задачи мы имеем дело с двумя callback-функциями: 1. Функция next — передается в операцию, которая по своему завершению должна вызвать функцию next. 2. Вторая функция используется внутри операции, чтобы узнать о завершении работы setTimeout.
```
function operation(next) {
  setTimeout(function callback() {
      // Данная функция вызывается по завершению setTimeout
      // Мы вызываем функцию next, чтобы сообщить о завершении работы функции operation
      next(null, 'data');
  }, 1000);
}
```
В данном примере функция setTimeout сама вызывает callback, а для функции operation callback-функцию (next) мы вызываем вручную. Использование функции operation практически не отличается от использования функции setTimeout:
```
// Вызываем функцию operation, в которую передаем callback
operation(function callback(err, data) {
    // Данная функция будет вызвана по завершению асинхронной функции operation
})
```

## Подсказка
Сохранение порядка можно сделать через замыкания, для каждой операции создавая функцию next.
