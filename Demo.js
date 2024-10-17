function Sum(a, b) {
    return a + b
}

// function Sum(a) {
//     return (b) => {
//         return a + b
//     }
// }

// let result1 = Sum(10)(20);
// // let result = result1(20)
// console.log(result1)

function calculateVolume(length) {
    return function (breadth) {
        return function (height) {
            return length * breadth * height;
        }
    }
}
// console.log(calculateVolume(4)(5)(6));

let result = calculateVolume(4)(5);
let result1 = result(6);
console.log(result1)