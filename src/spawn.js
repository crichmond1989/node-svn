import { spawn } from "child_process";

export default (command, args) => {
    return new Promise((res, rej) => {
        let stdout = "";
        let stderr = "";

        const proc = spawn(command, args);

        proc.stdout.on("data", data => stdout += data);
        proc.stderr.on("data", data => stderr += data);

        proc.on("close", code => {
            if (stderr)
                return rej(new Error(stderr));

            if (code)
                return rej(new Error(`Exit code: ${code}`));

            return res(stdout);
        });
    });
}