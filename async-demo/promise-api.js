
//const p = Promise.resolve({ id: 1 });
//p.then(result => console.log(result));
const p = Promise.reject(new Error('reason for rejection...'));
p.catch(error => console.log(error));

const p1 = new Promise((resolve, reject) => {
    // Kick off some async work
    setTimeout(() => {
        console.log('Async op: reading a user from database...');
        resolve({ id: 1, gitHubUserName: 'mosh' });
        // reject(new Error('DB exception getting user info'));
    }, 2000);
});

const p2 = new Promise((resolve) => {
    // Kick off some async work
    setTimeout(() => {
        console.log('Async op: getting authentication...');
        resolve({ id: 1, userName: 'mosh', authToken: 'h8s8392ks#' });
    }, 2000);
});

// Promise.all([p1, p2])
//     .then(result => console.log(result))
//     .catch(error => console.log('Error', error.message));

Promise.race([p1, p2])
    .then(result => console.log(result))
    .catch(error => console.log('Error', error.message));