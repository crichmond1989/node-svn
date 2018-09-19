import { spawn } from "child_process";

export default function (command: string, ...args: string[]): Promise<string> {
    return new Promise<string>((res, rej) => {
        let stdout = "";
        let stderr = "";

        const proc = spawn(command, args);

        proc.stdout.on("data", data => stdout += data);
        proc.stderr.on("data", data => stderr += data);

        proc.on("close", code => {
            if (stderr)
                return rej(new Error(stderr.trim()));

            if (code)
                return rej(new Error(`Exit code: ${code}`));

            return res(stdout.trim());
        });
    });
}