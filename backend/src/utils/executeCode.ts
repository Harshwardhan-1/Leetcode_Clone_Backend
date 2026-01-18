import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { v4 as uuid } from 'uuid';
export const executeCode=(language:string,userCode:string,input:string):Promise<String>=>{
    return new Promise((resolve, reject) => {
        const jobId=uuid();
        const basePath=path.join(__dirname,"..","temp");  
        if(!fs.existsSync(basePath)){
            fs.mkdirSync(basePath);
        }

        const inputPath=path.join(basePath,`${jobId}.txt`);
        fs.writeFileSync(inputPath,input);
        let filePath="";
        let command="";


          const safeInput = input.replace(/\n/g, "\r\n");

       if (language === "C++") {
      filePath = path.join(basePath, `${jobId}.cpp`);
      fs.writeFileSync(filePath, userCode);
       if (language === "C++") {
      filePath = path.join(basePath, `${jobId}.cpp`);
      fs.writeFileSync(filePath, userCode);

      command = `
        g++ "${filePath}" -o "${basePath}\\${jobId}.exe" &&
        "${basePath}\\${jobId}.exe" < "${inputPath}"
      `;
    }
    }else if(language=== 'Python'){
            filePath=path.join(basePath,`${jobId}.py`);
            fs.writeFileSync(filePath,userCode);
            command = `python "${filePath}" < "${inputPath}"`;
        }else if(language=== 'Java'){
            filePath=path.join(basePath,`Main.java`);
            fs.writeFileSync(filePath,userCode);
          command = `
        javac "${filePath}" &&
        java -cp "${basePath}" Main < "${inputPath}"
      `;
        }
         exec(
      command,
      {timeout:5000}, 
      (error,stdout,stderr) => {
        if (error){
          resolve(stderr || error.message);
        }else{
          resolve(stdout.trim());
        }
         try {
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        if (fs.existsSync(inputPath)) fs.unlinkSync(inputPath);
        const exe = path.join(basePath, `${jobId}.exe`);
        if (fs.existsSync(exe)) fs.unlinkSync(exe);
      } catch {}
      }
    );
    });
}