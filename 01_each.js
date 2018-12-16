/*

  < Parameters >

  @collection {Array}
    - A collection to iterate over
  @iteratee {AsyncFunction}
    - An async function to apply to each item in collection. Invoked with (item, callback).
      The array index is NOT passed to the iteratee.
  @callback {function<optional>}
    - A callback which is called when all iteratee functions have finished, or an error occurs.
      Invoked with (error).

  < Example >

  const files = [ "file1", "file2", "file3", "file4", "file5" ];

  async.each(files, function(file, callback) {
      if( file.length > 32 ) {
        callback('파일명이 너무 길어서 안됩니다!'); // 에러 처리
      } else {
        // 파일 처리 - 비동기
        setTimeout(function () {
          console.log('파일 처리 성공적으로 완료!');
          callback();
        }, 3000);
      }
  }, function(err) {
      // if any of the file processing produced an error, err would equal that error
      if( err ) {
        // One of the iterations produced an error.
        // All processing will now stop.
        console.log('A file failed to process');
      } else {
        console.log('All files have been processed successfully');
      }
  });

 */
export default function each (collection, iteratee, callback) {
    let count = 0;
    let done = false;

    if (collection.length) {
        for (let i = 0; i < collection.length; i++) {
            iteratee(collection[i], cb);
        }
    } else {
        callback();
    }

    function cb (err) {
        count++;

        if (err && !done) {
            done = true;
            callback(err);
        } else if (!done && (count === collection.length)) {
            callback(null);
        }
    }
}
