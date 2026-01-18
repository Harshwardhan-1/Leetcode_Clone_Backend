import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
export const executeCode=(language:string,userCode:string,input:string):Promise<String>=>{
return new Promise((resolve,reject)=>{
    const tempDir=path.join(__dirname,"../../temp");
    if(!fs.existsSync(tempDir)){
        fs.mkdirSync(tempDir);
    }
    let filePath="";
    let command="";
    
    if(language=== 'Javascript'){
        filePath=path.join(tempDir,"code.js");
        fs.writeFileSync(filePath,userCode);
        command=`node ${filePath}`;
    }
   else if(language=== 'Python'){
        filePath=path.join(tempDir,"code.py");
        fs.writeFileSync(filePath,userCode);
        command = `echo '${input}' | python ${filePath}`;
    }
   else if(language=== 'C++'){
        filePath=path.join(tempDir,"code.cpp");
        fs.writeFileSync(filePath,userCode);
        
      const outputPath = path.join(tempDir, "code.exe");
        command = `g++ ${filePath} -o ${outputPath} && echo ${input} | ${outputPath}`;
    }
    exec(command, (err, stdout, stderr) => {
      if (err) return reject(stderr);
      resolve(stdout);
    });
})
}