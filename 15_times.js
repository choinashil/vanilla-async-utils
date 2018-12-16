/**
 * Calls the iteratee function n times, and accumulates results in the same manner you would use with map.
 *
 * @param {Number} n - The number of times to run the function.
 *
 * @param {Function} iteratee - The async function to call n times. Invoked with the iteration index and a callback: (n, next).
 *
 * @param {Function} callback - A callback which is called when all iteratee functions have finished, or an error occurs.
 * Results is an Array of the transformed items from the coll. Invoked with (err, results).
 *
 * // Pretend this is some complicated async factory
 * var createUser = function(id, callback) {
 *     callback(null, {
 *         id: 'user' + id
 *     });
 * };
 *
 * // generate 5 users
 * async.times(5, function(n, next) {
 *     createUser(n, function(err, user) {
 *         next(err, user);
 *     });
 * }, function(err, users) {
 *     // we should now have 5 users
 * });
 */

// mocha_test 디렉토리내의 해당 테스트 파일을 찾아
// `describe.skip`이라고 되어있는 부분에서 `.skip`을 삭제하고 테스트를 실행하세요.
export default function times (n, iteratee, callback) {
    let count = 0;
    let done = false;
    let list = [];

    for (let i = 0; i < n; i++) {
        iteratee(i, next);
    }

    function next(err, result) {
        count++;

        if (err && !done) {
            done = true;
            callback(err);
        } else if (!done) {
            list.push(result);
            if (count === n) {
                callback(null, list);
            }
        }
    }
}
