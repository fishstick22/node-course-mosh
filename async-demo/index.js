console.log('Before');
getUser(1, (user) => {
    getRepositories(user, (repos) => {
        console.log('Repos', repos);
    })
});

console.log('After');

function getUser(id, callback) {
    setTimeout(() => {
        console.log('reading a user from database...');
        callback({ id: id, gitHubUserName: 'mosh' });
    }, 2000);
}


function getRepositories(username, callback) {
    setTimeout(() => {
        console.log('Calling GitHub API...');
        callback(['repo1','repo2','repo3']);
    }, 2000);
}