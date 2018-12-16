/**
 * Run the `tasks` collection of functions in parallel, without waiting until
 * the previous function has completed. If any of the functions pass an error to
 * its callback, the main `callback` is immediately called with the value of the
 * error. Once the `tasks` have completed, the results are passed to the final
 * `callback` as an array.
 *
 * @param {Array} tasks - A collection of
 * [async functions]{@link AsyncFunction} to run.
 * Each async function can complete with any number of optional `result` values.
 *
 * @param {Function} [callback] - An optional callback to run once all the
 * functions have completed successfully. This function gets a results array
 * (or object) containing all the result arguments passed to the task callbacks.
 * Invoked with (err, results).
 *
 * async.parallel([
 *     function(callback) {
 *         setTimeout(function() {
 *             callback(null, 'one');
 *         }, 200);
 *     },
 *     function(callback) {
 *         setTimeout(function() {
 *             callback(null, 'two');
 *         }, 100);
 *     }
 * ],
 * // optional callback
 * function(err, results) {
 *     // the results array will equal ['one','two'] even though
 *     // the second function had a shorter timeout.
 * });
 *
 */

// mocha_test 디렉토리내의 해당 테스트 파일을 찾아
// `describe.skip`이라고 되어있는 부분에서 `.skip`을 삭제하고 테스트를 실행하세요.
export default function parallel (tasks, callback) {
    let count = 0;
    let done = false;
    let tasksIsArray = Array.isArray(tasks);
    let length = tasksIsArray ? tasks.length : Object.values(tasks).length;

    if (tasksIsArray) {
        if (length) {
            for (let i = 0; i < length; i++) {
                tasks[i](cb.bind(null, i));
            }
        } else {
            callback(null, []);
        }
    } else {
        if (length) {
            for (let i = 0; i < length; i++) {
                Object.values(tasks)[i](cb.bind(null, i));
            }
        } else {
            callback(null, {});
        }
    }

    function cb(index, err, result) {
        count++;

        if (arguments.length > 3) {
            result = [...arguments].slice(2, arguments.length);
        }

        if (err && !done) {
            done = true;
            callback(err);
        } else if (result && !done) {
            tasksIsArray ? tasks[index] = result : tasks[Object.keys(tasks)[index]] = result;
            if (count === length) {
                callback(null, tasks);
            }
        }
    }
}
