const chunkSize = 3;
const numberOfTasks = 10;
let tasksSleepInput: Array<{delay: number, index: string }> = Array(numberOfTasks).fill(30).map(v => ({delay: v, index: '' }));

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
    for(let i = 0; i < tasksSleepInput.length; i+= chunkSize) {
        let batch = tasksSleepInput.slice(i, i + chunkSize);
        console.log(`* start running batch ${i}`);
        await Promise.all(batch.map(taskExecutor));
        console.log(`* finished running batch ${i}`);
    }
}

solution1();
