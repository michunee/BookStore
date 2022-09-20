const is_array = (input) => {
    if (Array.isArray(input)) {
        return true
    }
    else return false
}

console.log(is_array('ABC'))
console.log(is_array([123]))


const arrayClone = (arr) => arr.slice(0)

console.log(arrayClone([1, 2, 4, 0]))
console.log(arrayClone([1, 2, [4, 0], 3]));

const styles = ["jazz", "blues"]
styles.push("rock-n-roll")
console.log(styles);
styles.splice(1, 1, "Classics")
console.log(styles);
console.log(styles.slice(1))
console.log(styles.unshift("abc", "bcd"))
console.log(styles)







