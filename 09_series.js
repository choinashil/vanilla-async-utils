/**
 * Run the functions in the `tasks` collection in series, each one running once
 * the previous function has completed. If any functions in the series pass an
 * error to its callback, no more functions are run, and `callback` is
 * immediately called with the value of the error. Otherwise, `callback`
 * receives an array of results when `tasks` have completed.
 *
 * @param {Array} tasks - A collection containing
 * [async functions]{@link AsyncFunction} to run in series.
 * Each function can complete with any number of optional `result` values.
 *
 * @param {Function} [callback] - An optional callback to run once all the
 * functions have completed. This function gets a results array (or object)
 * containing all the result arguments passed to the `task` callbacks. Invoked
 * with (err, result).
 *
 * async.series([
 *     function(callback) {
 *         // do some stuff ...
 *         callback(null, 'one');
 *     },
 *     function(callback) {
 *         // do some more stuff ...
 *         callback(null, 'two');
 *     }
 * ],
 * // optional callback
 * function(err, results) {
 *     // results is now equal to ['one', 'two']
 * });
 *
 */

// mocha_test 디렉토리내의 해당 테스트 파일을 찾아
// `describe.skip`이라고 되어있는 부분에서 `.skip`을 삭제하고 테스트를 실행하세요.
export default function series (tasks, callback) {
    let count = 0;
    let tasksIsArray = Array.isArray(tasks);
    let length = tasksIsArray ? tasks.length : Object.values(tasks).length;

    if (tasksIsArray) {
        length ? tasks[count](cb) : callback(null, []);
    } else {
        length ? Object.values(tasks)[count](cb) : callback(null, {});
    }

    function cb(err, result) {
        count++;

        if (arguments.length > 2) {
            result = [...arguments].slice(1, arguments.length);
        }

        if (err) {
            callback(err);
        } else if (result) {
            if (tasksIsArray) {
                tasks[count - 1] = result;
                (count < length) ? tasks[count](cb) : callback(null, tasks);
            } else {
                tasks[Object.keys(tasks)[count - 1]] = result;
                (count < length) ? Object.values(tasks)[count](cb) : callback(null, tasks);
            }
        }
    }
}
