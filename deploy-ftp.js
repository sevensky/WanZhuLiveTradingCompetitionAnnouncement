const { Client } = require("basic-ftp");
const path = require("path");
require('dotenv').config(); // npm install dotenv

// 添加这行来查看当前环境变量
console.log('当前FTP_HOST:', process.env.FTP_HOST) 
async function deploy() {
    const client = new Client();
    client.ftp.verbose = false; // 启用详细日志输出
    
    try {
        // 连接配置
        await client.access({
            host: process.env.FTP_HOST,
            port: 2121,
            user: process.env.FTP_USER,
            password: process.env.FTP_PASSWORD,
            secure: false // 如果需要 FTPS，设置为 true
        });

        // 确保远程目录存在
        await client.ensureDir( process.env.FTP_REMOVE_DIR );
        // 清空远程ftp的css目录
        await client.removeDir( process.env.FTP_REMOVE_DIR+"/css" );
        await client.ensureDir( process.env.FTP_REMOVE_DIR+"/css");
        
        // 上传整个 dist 目录
        await client.uploadFromDir(
            path.join(__dirname, "dist"), process.env.FTP_REMOVE_DIR
        );

        console.log("部署成功！");
    }
    catch(err) {
        console.error("部署失败:", err);
    }
    finally {
        client.close(); // 关闭连接
    }
}

// 执行部署
deploy();