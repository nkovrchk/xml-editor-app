const { exec } = require('child_process');

const SETUP = {
    darwin: 'pip3 install virtualenv\nvirtual venv\nsource ./venv/bin/activate\npip install -r requirements.txt\nnpm install',
    win32: 'pip3 install virtualenv\nvirtual venv\n./venv/Scripts/activate.bat\npip install -r requirements.txt\nnpm install',
    linux: 'pip3 install virtualenv\nvirtual venv\nsource ./venv/bin/activate\npip install -r requirements.txt\nnpm install',
};

exec(SETUP[process.platform], (err, stdout) => {
    if (err) {
        console.log(err);
        return;
    }

    console.log(stdout);
});
