/**
 * Returns `true` if at least one element in the `coll` satisfies an async test.
 * If any iteratee call returns `true`, the main `callback` is immediately
 * called.
 *
 * @param {Array} coll - A collection to iterate over.
 *
 * @param {AsyncFunction} iteratee - An async truth test to apply to each item
 * in the collections in parallel.
 * The iteratee should complete with a boolean `result` value.
 * Invoked with (item, callback).
 *
 * @param {Function} [callback] - A callback which is called as soon as any
 * iteratee returns `true`, or after all the iteratee functions have finished.
 * Result will be either `true` or `false` depending on the values of the async
 * tests. Invoked with (err, result).
 *
 * async.some(['file1','file2','file3'], function(filePath, callback) {
 *     setTimeout(filePath, function(err) {
 *         callback(null, !err)
 *     }, 2000);
 * }, function(err, result) {
 *     // if result is true then at least one of the files exists
 * });
 */

// mocha_test 디렉토리내의 해당 테스트 파일을 찾아
// `describe.skip`이라고 되어있는 부분에서 `.skip`을 삭제하고 테스트를 실행하세요.
export default function some (collection, iteratee, callback) {
    let count = 0;
    let done = false;

    for (let i = 0; i < collection.length; i++) {
        iteratee(collection[i], cb);
    }

    function cb(err, result) {
        count++;

        if (err && !done) {
            done = true;
            callback(err);
        } else if (!done) {
            if (result) {
                done = true;
                callback(null, true);
            } else if (count === collection.length) {
                callback(null, false);
            }
        }
    }
}
