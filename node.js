// 1.
const { exec } = require('child_process');

exec('node -v', (error, stdout, stderr) => {
    if (error) {
        console.error('Node.js가 설치되지 않았습니다.');
        return;
    }
    console.log(`Node.js 버전: ${stdout}`);
});

exec('npm -v', (error, stdout, stderr) => {
    if (error) {
        console.error('npm이 설치되지 않았습니다.');
        return;
    }
    console.log(`npm 버전: ${stdout}`);
});

// 2.
const http = require('http');

const server = http.createServer((req, res) => {
    if (req.url === '/' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Hello, Node.js!');
    } else if (req.url === '/about' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('About Page');
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

server.listen(3000, () => {
    console.log('서버가 http://localhost:3000 에서 실행 중입니다.');
});

// 3.
const fs = require('fs');

// 동기식 파일 쓰기
const fileName = 'example.txt';
const content = 'Hello, 파일 쓰기!';

try {
    fs.writeFileSync(fileName, content);
    console.log(`${fileName} 파일에 쓰기 성공!`);
    const data = fs.readFileSync(fileName, 'utf8');
    console.log(`${fileName} 파일 내용: ${data}`);
} catch (err) {
    console.error(err);
}

// 비동기식 파일 쓰기
fs.writeFile(fileName, content, (err) => {
    if (err) throw err;
    console.log(`${fileName} 파일에 비동기 쓰기 성공!`);
    fs.readFile(fileName, 'utf8', (err, data) => {
        if (err) throw err;
        console.log(`${fileName} 파일 내용: ${data}`);
    });
});

// 4.
const fs = require('fs').promises;

async function copyFile(src, dest) {
    try {
        await fs.copyFile(src, dest);
        console.log(`${src} 파일이 ${dest} 파일로 복사되었습니다.`);
    } catch (err) {
        console.error(`복사 실패: ${err.message}`);
    }
}

copyFile('source.txt', 'destination.txt');

// 5.
const { program } = require('commander');
const path = require('path');

program
    .command('parse <filepath>')
    .description('파일 경로 파싱')
    .action((filepath) => {
        const parsed = path.parse(filepath);
        console.log(parsed);
    });

program
    .command('join <paths...>')
    .description('경로 결합')
    .action((paths) => {
        const joinedPath = path.join(...paths);
        console.log(joinedPath);
    });

program
    .command('resolve <paths...>')
    .description('절대 경로로 변환')
    .action((paths) => {
        const resolvedPath = path.resolve(...paths);
        console.log(resolvedPath);
    });

program.parse(process.argv);

// 6.
const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question('생성할 디렉토리 이름을 입력하세요: ', (dirName) => {
    fs.mkdir(dirName, { recursive: true }, (err) => {
        if (err) {
            console.error(`디렉토리 생성 실패: ${err.message}`);
        } else {
            console.log(`${dirName} 디렉토리가 생성되었습니다.`);
        }
        rl.close();
    });
});

// 7.
const fs = require('fs');

const obj = { name: 'Kim', age: 30 };
const jsonContent = JSON.stringify(obj);

fs.writeFile('data.json', jsonContent, (err) => {
    if (err) throw err;
    console.log('JSON 파일이 저장되었습니다.');

    fs.readFile('data.json', 'utf8', (err, data) => {
        if (err) throw err;
        console.log('읽은 JSON 데이터:', JSON.parse(data));
    });
});

// 8.
const EventEmitter = require('events');

class UserEvent extends EventEmitter {}

const userEvent = new UserEvent();

userEvent.on('userRegistered', (username) => {
    console.log(`${username} 님이 등록되었습니다. 환영합니다!`);
});

function registerUser(username) {
    userEvent.emit('userRegistered', username);
}

registerUser('Kayla');

// 9.
const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: 'app.log' }),
        new winston.transports.Console(),
    ],
});

logger.info('정보 메시지');
logger.warn('경고 메시지');
logger.error('오류 메시지');

// 10.
require('dotenv').config();

console.log('DATABASE_URL:', process.env.DATABASE_URL);
console.log('PORT:', process.env.PORT);

// 17.
const crypto = require('crypto');

const password = 'myPassword';
const hash = crypto.createHash('sha256').update(password).digest('hex');
console.log('비밀번호 해시:', hash);

const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

const cipher = crypto.createCipheriv(algorithm, key, iv);
let encrypted = cipher.update('myMessage', 'utf8', 'hex');
encrypted += cipher.final('hex');
console.log('암호화된 메시지:', encrypted);

const decipher = crypto.createDecipheriv(algorithm, key, iv);
let decrypted = decipher.update(encrypted, 'hex', 'utf8');
decrypted += decipher.final('utf8');
console.log('복호화된 메시지:', decrypted);

// 18.
console.log('메모리 사용량:', process.memoryUsage());
console.log('실행 경로:', process.execPath);
console.log('환경 변수:', process.env);

process.argv.forEach((val, index) => {
    console.log(`${index}: ${val}`);
});

// 20.
const utility = require('./utility.js');

console.log(utility.greet('Kayla'));

// utility.js
function greet(name) {
    return `안녕하세요, ${name}님!`;
}

module.exports = { greet };
