// // получить из массива обьект
// const arr = [1, 2, 3];
// const fullArr = Object.entries(arr); // [ ['0', 1], ['1', 2], ['2', 3], ['3', 4] ]
// const Obj = Object.fromEntries(fullArr); //{0: 1, 1: 2, 2: 3, 3: 4}

// //  "a,b,с" => "a,bb,ccc"
// const a = 'a,b,с';
// const arr = a.split(',');
// const nArr = arr.map((item, index) => item.repeat(index + 1));
// const string = nArr.join(); // a,bb,ссс

// // "three3two2one" ==> "one two three"
// const a = 'three3two2one';
// const arr = a.split('');
// const nArr = arr.map((item) => {
//   if (Number(item)) {
//     return ' ';
//   }
//   return item;
// });
// const string = nArr.join('');
// const arr2 = string.split(' ');
// const arr3 = arr2.reverse();
// const fString = arr3.join(' ');

// // самое длинное слово вывести со строки
// const string = 'qwe qweqwe qweqweqwe'
// const arr = string.split(' ');
// const nArr = arr.sort((item) => item.length);
// const f = nArr[nArr.length - 1];

// // функция возвращает массив подмассивов
// // f(["a", "b", "b", "c", "d", "e", "f"], 3) ==> [ ["a", "b", "b"], ["c", "d", "e"], ["f"] ]
// const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// const ARRAY_SIZE = 3;
// const sliced_array = [];

// for (let i = 0; i < array.length; i += ARRAY_SIZE) {
//   sliced_array.push(array.slice(i, i + ARRAY_SIZE));
// }
