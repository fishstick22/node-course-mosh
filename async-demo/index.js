console.log('Before');

// Promise-based approach
// getUser(1)
//     .then(user => getRepositories(user.gitHubUserName))
//     .then(repos => getCommits(repos[0]))
//     .then(commits => console.log('Commits: ', commits))
//     .catch(error => console.log('Error', error.message));

// Async and Await approach
async function displayCommits() {
    try {
        const user = await getUser(1);
        const repos = await getRepositories(user.gitHubUserName);
        const commits = await getCommits(repos[0]);
        console.log('Commits: ', commits);
    }
    catch (error) {
        console.log('Error', error.message);
    }
}
displayCommits();

console.log('After');

function getUser(id) {
    return new Promise((resolve, reject) => {
        // Kick off some async work
        setTimeout(() => {
            console.log('reading a user from database...');
            resolve({ id: id, gitHubUserName: 'mosh' });
        }, 2000);
    });
}

function getRepositories(username) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Calling GitHub API...');
            //resolve(['repo1','repo2','repo3']);
            reject(new Error('could not get repo3'));
        }, 2000);
    });
}

function getCommits(repo, callback) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Calling GitHub API...');
            resolve(['commit1','commit2','commit3']);
        }, 2000);
    });
}