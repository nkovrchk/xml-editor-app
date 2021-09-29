const { exec } = require('child_process');

const SETUP = {
    darwin: 'sudo python3 -m venv "${PWD}/venv"\nsudo ./venv/bin/pip install -r requirements.txt\nnpm install',
    win32: 'pip install -r requirements.txt\nnpm install',
    linux: 'pip install -r requirements.txt\nnpm install',
};

exec(SETUP[process.platform], (err, stdout) => {
    if (err) {
        console.log(err);
        return;
    }

    console.log(stdout);
});
