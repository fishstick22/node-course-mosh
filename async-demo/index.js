console.log('Before');
getUser(1, getRepositories);

console.log('After');

function getRepositories(user) {
    getRepositories(user.gitHubUserName, getCommits);
}

function getCommits(repos) {
    getCommits(repo, displayCommits);
}

function displayCommits(commits) {
    console.log('commits', commits);
}

function getUser(id, callback) {
    setTimeout(() => {
        console.log('reading a user from database...');
        callback({ id: id, gitHubUserName: 'mosh' });
    }, 2000);
}

function getRepositories(username, callback) {
    setTimeout(() => {
        console.log('Calling GitHub API...');
        callback(['repo1','repo2','repo3']);// some bug where callback is not a function
    }, 2000);
}

function getCommits(repo, callback) {
    setTimeout(() => {
        console.log('Calling GitHub API...');
        callback(['commit1','commit2','commit3']);
    }, 2000);
}