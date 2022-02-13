/**
 * Given a target and a sorted array, returns the position of the
 * target in that array doing a binary search.
 * If the target isn't in the array returns -1
 * @param {String | Number} target
 * @param {[String | Number]} array has to be sorted from low to high
 * @returns {Number}
 */
function indexBinarySearch(target, array) {
    let left = 0;
    let right = array.length - 1;

    while (left <= right) {
        const middle = Math.floor((left + right) / 2);

        if (array[middle] == target) {
            return middle;
        } else if (target < array[middle]) {
            right = middle - 1;
        } else {
            left = middle + 1;
        }
    }

    return -1;
}

module.exports = indexBinarySearch;
