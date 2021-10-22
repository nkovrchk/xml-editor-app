const { exec } = require('child_process');

const setup = {
    darwin: 'python3 -m venv venv\nsource venv/bin/activate\npip install -r requirements.txt\nnpm install',
    win32: 'python3 -m venv venv\nvenv/Scripts/activate.bat\npip install -r requirements.txt\nnpm install',
    linux: 'python3 -m venv venv\nsource venv/bin/activate\npip install -r requirements.txt\nnpm install',
};

exec(setup[process.platform], (err, stdout) => {
    if (err) {
        console.log(err);
        return;
    }

    console.log(stdout);
});
