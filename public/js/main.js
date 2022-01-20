(function() {
    const worker = new Worker('js/worker.js');

    const testWorker = function() {
        let data = { fn: 'guess', val: [1234] };
        worker.postMessage(data);
    }

    const testWorkerButton = document.getElementById('testWorker');
    testWorkerButton.addEventListener('click', testWorker);
})();
