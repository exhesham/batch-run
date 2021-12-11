const chunkSize = 3;
const numberOfTasks = 10;
let tasksSleepInput: Array<{delay: number, index: string }>;

// let's give index to each task
Object.keys(tasksSleepInput).forEach(k => tasksSleepInput[Number.parseInt(k)].index = k);

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let taskExecutor = async (task: {delay: number, index: string}) => {
    console.log(`  --> Task ${task.index} started`);
    await sleep(task.delay);
    console.log(`  <-- Task ${task.index} finished`);
};

async function solution1() {
    tasksSleepInput = Array(numberOfTasks).fill(30).map(v => ({delay: v, index: '' }));
    for(let i = 0; i < tasksSleepInput.length; i+= chunkSize) {
        let batch = tasksSleepInput.slice(i, i + chunkSize);
        console.log(`* start running batch ${i}`);
        await Promise.all(batch.map(taskExecutor));
        console.log(`* finished running batch ${i}`);
    }
}




async function solution2() {
    let tasksQueue = Array(numberOfTasks).fill(Math.round(Math.random() * 30) + 1)
    .map(v => (() => taskExecutor({delay: v, index: '' })));
    let worker = async (index: number) => () => {
        
        while(tasksQueue.length > 0) {
            console.log(`worker ${index} handles task`);
            let task = delete tasksQueue[0];
            await task();
            console.log(`worker ${index} finished handling task`);
        }
    };
    await Promise.all([worker(1), worker(2), worker(3), worker(4)]);
}

solution2();