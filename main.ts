const chunkSize = 3;
const numberOfTasks = 10;
let tasksSleepInput: Array<{delay: number, index: string }>;



function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let taskExecutor = async (task: {delay: number, index: string}) => {
    console.log(`  --> Task ${task.index} started`);
    await sleep(task.delay);
    console.log(`  <-- Task ${task.index} finished`);
};

async function solution1() {
    // let's give index to each task
    let tasksSleepInput = Array(numberOfTasks).fill(30).map(v => ({delay: v, index: '' }));
    Object.keys(tasksSleepInput).forEach(k => tasksSleepInput[Number.parseInt(k)].index = k);
    
    for(let i = 0; i < tasksSleepInput.length; i+= chunkSize) {
        let batch = tasksSleepInput.slice(i, i + chunkSize);
        console.log(`* start running batch ${i}`);
        await Promise.all(batch.map(taskExecutor));
        console.log(`* finished running batch ${i}`);
    }
}




async function solution2() {
    
    let idx =1, tasksQueue = Array(numberOfTasks).fill(1)
    .map(v => Math.round(Math.random() * 30) + v)
    .map(v => (() => taskExecutor({delay: v, index: `${idx++}` })));
    console.log(`Total tasks: ${tasksQueue.length}`);
    let worker = async (index: number) => {
        console.log(`worker ${index} is started`);
        while(tasksQueue.length > 0) {
            console.log(`worker ${index} handles task`);
            let task = tasksQueue[0]; // should be atomic
            tasksQueue = tasksQueue.slice(1);
            await task();
            console.log(`worker ${index} finished handling task`);
        }
        console.log(`worker ${index} is retired`);
    };
    
    await Promise.all([worker(1), worker(2), worker(3), worker(4)]);
}

solution1();