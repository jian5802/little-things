//�������ģ��

const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cookieParser = require('cookie-parser');
const session = require('express-session');
global.md5 = require('md5');
const svgCaptcha = require('svg-captcha');
const multer = require('multer');

// ģ�����ò��ֽ���λ��
const app = express();
//������ֲ���
let secret = 'sports.app.myweb.www';

//�����м��
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser(secret));

//ģ����������
app.engine('html',ejs.renderFile);
app.set('view engine','html');
app.set('views','./views');

//���ݿ�����
global.conn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'jian5802',
    port:3306,
    database:'novelapp'
});
conn.connect();

//����session
app.use(session({
    secret:secret,
    resave:true,
    saveUninitialized:true,
    cookie:{maxAge:30*24*3600*1000}
}));


//�ļ��ϴ�
const diskstorage = multer.diskStorage({
    //·��
    destination:function(req,file,cb){
        cb(null, `./uploads/${new Date().getFullYear()}/${(new Date().getMonth()+1).toString().padStart(2, '0')}`);
    },
    //�ļ���
    filename: function (req, file, cb) {
        let filename = new Date().valueOf() + '_' +  Math.random().toString().substr(2, 8) + '.' + file.originalname.split('.').pop();
        cb(null, filename);
    }
});
const upload = multer({storage:diskstorage});

//��֤��ͼƬ
app.get('/coder',(req,res)=>{
    var captcha = svgCaptcha.create({noise:4,ignoreChars: '0o1i', size:1,background: '#cc9966',height:38, width:90});
	req.session.coder = captcha.text;
	
	res.type('svg'); // ʹ��ejs��ģ��ʱ������� res.type('html')
	res.status(200).send(captcha.data);
});

//�ϴ�ͼƬ�ӿ�
app.post('/uploads',upload.array('images',1000),(req,res)=>{
    console.log(req.files);
    let data = [];
    for (const ad of req.files) {
        //�ѷ�б��ת��б�ߣ���ֹ����ת�������·������
        let path = hostname +  ad.path.replace(/\\/g, '/');
        data.push(path);
    }
    res.json({
        "errno": 0,
        "data": data
    });
});


//��·��
//����Ա��¼
app.use('/admin/login',require('./module/admin/login'));





//��̬��Դ�й�
app.use('/uploads',express.static('uploads'));
app.use(express.static('static'));

app.listen(8088,()=>{
    console.log('�����������ɹ�...');
});