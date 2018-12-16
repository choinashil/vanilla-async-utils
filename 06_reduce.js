/**
 * Reduces `coll` into a single value using an async `iteratee` to return each
 * successive step. `memo` is the initial state of the reduction. This function
 * only operates in series.
 *
 * @param {Array} coll - A collection to iterate over.
 *
 * @param {*} memo - The initial state of the reduction.
 *
 * @param {AsyncFunction} iteratee - A function applied to each item in the
 * array to produce the next step in the reduction.
 * The `iteratee` should complete with the next state of the reduction.
 * If the iteratee complete with an error, the reduction is stopped and the
 * main `callback` is immediately called with the error.
 * Invoked with (memo, item, callback).
 *
 * @param {Function} [callback] - A callback which is called after all the
 * `iteratee` functions have finished. Result is the reduced value. Invoked with
 * (err, result).
 *
 * async.reduce([1,2,3], 0, function(memo, item, callback) {
 *     // 비동기 처리
 *     setTimeout(function() {
 *         callback(null, memo + item)
 *     }, 1000);
 * }, function(err, result) {
 *     // result is now equal to the last value of memo, which is 6
 * });
 */

// mocha_test 디렉토리내의 해당 테스트 파일을 찾아
// `describe.skip`이라고 되어있는 부분에서 `.skip`을 삭제하고 테스트를 실행하세요.
export default function reduce (collection, memo, iteratee, callback) {
    let count = 0;
    let accumulator = memo;

    if (!Array.isArray(collection)) {
        collection = Object.values(collection);
    }

    iteratee(accumulator, collection[count], cb);

    function cb(err, result) {
        count++;

        if (err) {
            callback(err);
        } else if (result) {
            if (count < collection.length) {
                accumulator = result;
                iteratee(accumulator, collection[count], cb);
            } else {
                callback(null, result);
            }
        }
    }
}
